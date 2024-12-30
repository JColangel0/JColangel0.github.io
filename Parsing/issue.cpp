#include <iomanip>
#include <iostream>

#include "issue.h"

void Issue::build_dates()
{
    if (publication_date == "") return;
    
    std::string s_year = publication_date.substr(0, 4);
    year = std::stoi(s_year);

    std::string s_month = publication_date.substr(5, 2);
    month = std::stoi(s_month);

    std::string s_day = publication_date.substr(8, 2);
    day = std::stoi(s_day);
}

void Issue::print_all_data() const
{
    std::cout << std::setw(20) << "Series Name: " << series_name << std::endl;
    std::cout << std::setw(20) << "Publisher Name: " << publisher_name << std::endl;
    std::cout << std::setw(20) << "Publication Date: " << publication_date << std::endl;
    std::cout << std::setw(20) << "Page Count: " << page_count << std::endl;

    if (volume != -1)
        std::cout << std::setw(20) << "Volume Number: " << volume << std::endl;
    if (issue_number != -1)
        std::cout << std::setw(20) << "Issue Number : " << issue_number << std::endl;
    if (price != -1.0)
        std::cout << std::setw(20) << "Price: " << "$" << std::fixed << std::setprecision(2) << price << std::endl;
}