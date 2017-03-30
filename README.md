### Work in Progress

# -Board

## Description
This is a built from scratch web app that utilises external sources to provide readily available information in one place.


## Key features
The app consists of modular widgets. So, far theese are:
- Digital clock
- Weather widget
- Primary news feed
- Secondary news feed
- Work-ETA widget
- Notifications widget (supports: Google Mail, Twitter)

All of the widgets can be dragged to a desired position.
Unfortunately, resizing breaks the grid structure, so it has been disabled. Currently working on a fix.

The dashboard supports automatic refresh.

The grid redraws to 1,2 and 3 widget columns based on provided width, in consideration with smartphone, tablet and desktop screen widths. Does not support dynamic redraw - requires page refresh upon resizing. (Dynamic redraw has not been implemented, as it was not considered a crucial feature and would introduce unnecessary code complexity.)


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
 - fix a bug causing the


## Reflection
When initially designing the user interface a number of options have been considered.
- The first consideration was a simple table-based design. This was quickly rejected because of over-simplicity, less flexibility, no customization options and because tables are 'the old way'.
- Bootstrap was the second option as a foundation of the layout. It was a better choice than the table-based layout, however it lacked flexibility. The main idea behind the design was to have the widgets being able to be moved or at least occupy a different span of rows and the others arranged accordingly.
- In order to make the design idea happen, grids have been considered the best choice. A number of different libraries have been researched and tested, but GridList by HootSuite was the easiest to work with and understand.

Clock Widget
- Initially, the clock was going to be server-based, but after careful consideration and testing it has been decided to be client-based. For that purpose, a small module was implemented (time.js) to get current time and display it in a readable format.

Weather
- a number of sources and external APIs have been considered, before deciding to use an npm module for the sake of simplicity. This decision was mainly based on the fact that most weather API websites require registration and have limited request available.

News Feed
- initially was going to be just one widget, but then decided to include sports news and added another one. Source research lead to newsapi.org which was perfect for the purpose. Npm modules were also considered, but most of them were quite limited. Implementing the pagination feature (automatically alternating between 2 pages of 5 news articles each) included research of a number of methods that can be achieved (JQuery, Angular, ExtJS), but intervals and timeouts seemed to do the job just fine. The idea of scrolling text was also appealing (considered and tested), but for some reason was not cooperating with the grid library, so it was rejected.

Notifications Widget
- the idea behind this one was to get notifications from different sources (new emails, new social media notifications, etc.) and display them in one widget, ordered by 'most recent', mixing the different sources and having a small icon for each source. However, implementing this idea turned out be quite the challenge. First of all, that included a lot of research into OAuth1/2, xAuth, Passport and other authentication methods. Then all the different REST API were studied. This lead to the realization that not all APIs (Facebook) permit such requests or have very limited functionality. Furthermore having the user log in into more than 2 accounts introduced issues regarding token management and some of the authentication methods would not work as intended. That was probably due to inexperience with such technologies and revealed a lot of things to further learn and dig into. Needless to say that idea was rejected. Instead, it was decided to leave some of the already achieved functionality, such as the number of unread emails and displaying the latest tweet. Having the Google and Twitter APIs fully integrated at this point, can easily lead to some improvements, which will be worked on.
- This was probably the greatest challenge of the whole coursework, because of how broad the topic of (social media) authentication is. Research, testing, breaking and fixing things on this widget adds up to about 60% of the whole time spent on the project.

'Time-to-work' widget
- Pretty self explanatory: user specifies their home address, work address and time when they should arrive at the destination and get the time when they should leave, based on real-time road traffic data. In addition the widget takes into consideration some extra time, to address any unexpected delays.
- coding this widget lead to research on some quite interesting topics regarding geolocation and Google's Distance Matrix. Other sources were also considered, but were either paid or rather limited, in terms of what information they provide.

Other
- The most interesting thing to learn were Promises. Initially, a bit of a challenge to wrap your head around, but totally worth it. Enjoyed playing and testing stuff with them quite a lot.
