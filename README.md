### Work in Progress

# [-]Board

## Description
This is a built from scratch web app that utilises external sources to provide readily available information in one place.


## Key features
The app consists of modular widgets. So, far theese are:
- Digital clock
- Weather widget
- Primary news feed 
- Secondary news feed 
- Work-ETA widget
- Notifications widget
 - supports:
  - Google Mail


## How to run: (requires NodeJS)
 - download/clone rep
 - npm install
 - npm start
 - visit http://localhost
 
 
## Widgets

### Digital Clock
Self-explanatory. Does not need configuration. Based on system time.


### Weather widget
Provides information about the current temperature and 4-da min/max and rain forecast (including [today])
Can be configured at /setup.html or by pressing the Setup button on the main page.

Configuration consists of:
- location search field [supports [postcode], [city,country] and [city]]
* [city] not always accurate, as some city names are ambiguous
- Celsius and Fahrenheit options


### Primary and secondary news feed
Gets the top 10 news from a user defined source(s). 
Splits them into 2 batches of 5 and automatically alternates between them. 
Displays the headline and a small abstract; provides a link to the full article.

Configuration consists of:
- the user selects the primary and secondary source


### Work-ETA widget
Gets traffic information [GoogleMaps] for the fastest route between two locations and estimates the time to leave based on arrival time, specified by the user. The widget takes into account the usual and current traffic, as well as some additional time to ensure the destination is reached when specified.

Configuration consists of:
- set up origin and destination locations (search field similar to weather widget)
- time of arrival (24-hour format) 


### Notifications Widget
Currently only supports Google Mail
To do: 
- [ ] Facebook
- [ ] Twitter
- [ ] Instagram
- [ ] Google Plus

Configuration consists of:
- log in to apropriate social media/service
 
 
## To do:
 - integrate social media into the news feed widgets
 - improve UI
 - add comments/format code 
