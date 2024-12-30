#ifndef __issue_h__
#define __issue_h__

#include <string>

class Issue {
    public:
        // constructors
        Issue(std::string s_n, std::string p_n, std::string p_d, int p_c)
            : series_name(s_n), publisher_name(p_n), publication_date(p_d), 
            volume(-1), page_count(p_c), issue_number(-1), price(-1) { build_dates(); }

        Issue(std::string s_n, std::string p_n, std::string p_d, int p_c, float p, int v, int i)
            : series_name(s_n), publisher_name(p_n), publication_date(p_d), 
            volume(v), page_count(p_c), issue_number(i), price(p) { build_dates(); }

        // print function
        void print_all_data() const;

        // getter functions
        std::string& get_series_name() { return series_name; }
        std::string& get_publisher_name() { return publisher_name; }
        std::string& get_publication_date() { return publication_date; }
        float get_price() const { return price; }
        int get_page_count() const { return page_count; }
        int get_issue_number() const { return issue_number; }
        int get_year() const { return year; }
        int get_month() const { return month; }
        int get_day() const { return day; }

        // setter functions
        void set_price(float p) { price = p; }
        void set_volume(int v) { volume = v; }
        void set_issue(int i) { issue_number = i; }
 
    private:
        // functions
        void build_dates();

        // variables
        std::string series_name;
        std::string publisher_name;
        std::string publication_date;

        int volume;
        int page_count;
        int issue_number;
        float price;

        int year;
        int month;
        int day;
};

#endif