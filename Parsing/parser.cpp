#include <fstream>
#include <iostream>
#include <vector>

#include "issue.h"

// find the active issue number of a line
int get_line_num(const std::string& line)
{
    std::string num = "";
    int i = 1;
    while (line[i] != '"')
    {
        if (line[i] == '\n') break;
        num += line[i];
        ++i;
    }
    int n;
    try {
        n = std::stoi(num);
    } catch (...) {
        n = -1;
    }

    return n;
}

// find the identifier of each line
std::string get_line_id(const std::string& line)
{
    int quote_count = 0;

    std::string id = "";
    int i = 0;

    while (quote_count < 4)
    {
        if (line[i] == '"')
        {
            ++quote_count; ++i;
            continue;
        }

        if (quote_count == 3)
            id += line[i];
        
        ++i;
    }

    return id;
}

// find the value of each line
std::string get_line_value(const std::string& line)
{
    int quote_count = 0;

    std::string value = "";
    int i = 0;

    while (quote_count < 6)
    {
        if (line[i] == '"')
        {
            ++quote_count; ++i;
            continue;
        }

        if (quote_count == 5)
            value += line[i];
        
        ++i;
    }

    return value;
}

// parsing for the issue number
int format_issue_number(const std::string& value)
{
    if (value == "[nn]") return -1;

    std::string issue_number = "";

    for (unsigned int i = 0; i < value.size(); ++i)
    {
        if (value[i] >= 48 && value[i] <= 57)
            issue_number += value[i];

        if (value[i] == 32 || value[i] == 47 || value[i] == 46 || value[i] == 45)
            break;
    }

    if (issue_number == "") return -1;
    return std::stoi(issue_number);
}

// parsing for the price
float format_price(const std::string& value)
{
    std::string price = "";
    for (unsigned int i = 0; i < value.size(); ++i)
    {
        if ((value[i] >= 48 && value[i] <= 57) || value[i] == 46)
            price += value[i];

        if (value[i] == 32) break;
    }

    if (price == "") return -1;

    return std::stof(price);
}

void parse_chunk(const std::vector<std::string>& chunk)
{
    if (get_line_value(chunk[chunk.size()-2]) != "us") return;

    std::string series;
    int issue_num;
    int volume = -1;
    float price = -1;
    int page_count = -1;
    std::string publication_date = "";
    std::string publisher_name;

    unsigned int i = 0;
    while (i < chunk.size())
    {
        std::string line = chunk[i];
        std::string id = get_line_id(line);
        if (id == "series name")
            series = get_line_value(line);
        else if (id == "issue number") {
            issue_num = format_issue_number(get_line_value(line));
        } else if (id == "price") {
            price = format_price(get_line_value(line));
        } else if (id == "volume") {
            volume = format_issue_number(get_line_value(line));
        } else if (id == "issue page count") {
            page_count = std::stoi(get_line_value(line));
        } else if (id == "issue page count uncertain") {
            if (get_line_value(line) == "True")
                page_count = -1;
        } else if (id == "key date")
            publication_date = get_line_value(line);
        else if (id == "publisher name")
            publisher_name = get_line_value(line);
        else if (id == "indicia publisher name")
            publisher_name = get_line_value(line);
        ++i;
    }
    if (page_count == -1) return;

    Issue obj(series, publisher_name, publication_date, page_count, price, volume, issue_num);
    obj.print_all_data();
    std::cout << std::endl;
}

int main()
{
    std::ifstream instr("data.txt");
    if (!instr.good())
    {
        std::cerr << "Can't open data.txt" << std::endl;
        exit(1);
    }

    int active_num = 1;
    std::string line;
    std::vector<std::string> chunk;

    while(getline(instr, line))
    {
        int curr_num = get_line_num(line);

        if (curr_num == -1) continue;

        if (curr_num != active_num)
        {
            active_num = curr_num;
            parse_chunk(chunk);
            chunk.clear();
        }

        chunk.push_back(line);
    }
}