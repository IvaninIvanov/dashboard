
// ********************************
// ******** Dependencies **********
// ********************************

var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var weather = require('weather-js');
var requestify = require('requestify');
var fetch = require('node-fetch');
var gMaps = require('@google/maps').createClient({
  key: 'AIzaSyC5Y-uxgxcZggLssNse89lo7Pw6--0Bv-0'
});
var google = require('googleapis');
var urlshortener = google.urlshortener('v1');
var OAuth2 = google.auth.OAuth2;
var gmail = google.gmail('v1');
var oauth2 = new OAuth2('68157517411-j70o4lp2kmlf9e0vq1jpn36nsactc9rn.apps.googleusercontent.com', 'Y93zTLAfY7ZJxIN3_2SrFzJb', 'http://localhost:80/auth/success');
var scopes = [  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar'
];
google.options({ auth: oauth2 }); // set auth as a global default
var authUrl = oauth2.generateAuthUrl( {
  access_type: 'offline',
  scope: scopes
});






// ********************************
// ******** Variables *************
// ********************************

// weather
var weather;
var home = 'po40jd';
var postcode = null;
var degType = 'C';

// time-to-work
var origin = null;
var destination = null;
var arriveM;
var arriveH;

// news
var newsApi;
var newsSrc1 = 'bbc-news';
var newsSrc2 = 'bbc-sport';

var newsKey = '1e7fd484a32e4f86bc4db5042c76b194';
var newsFeed1 = 'https://newsapi.org/v1/articles?source='+newsSrc1+'&sortBy=top&apiKey='+newsKey;
var newsFeed2 = 'https://newsapi.org/v1/articles?source='+newsSrc2+'&sortBy=top&apiKey='+newsKey;


var googleKey = 'AIzaSyC5Y-uxgxcZggLssNse89lo7Pw6--0Bv-0'
var sampleTraffic = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=po40jd&destinations=po15lg&mode=drive&departure_time=1490385902&traffic_model=pessimistic&key=AIzaSyC5Y-uxgxcZggLssNse89lo7Pw6--0Bv-0"



// ********************************
// ******* Serve Static ***********
// ********************************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('modules'));
app.use(express.static('webpages'));
app.listen(80, function() { console.log('listening on port 80')});



// ********************************
// ******* Testing section ********
// ********************************



// ********************************
// ************ API ***************
// ********************************


// [V]   GET         /auth                     -> redirects to google login page
// [V]   GET         /auth/success?code        -> called after successful login, uses the provided code to get and store the access token
// [V]   GET         /api/weather              -> GET request to a weather database api using npmjs module (weather-js) > formats it > returns it
// [V]   POST        /api/weather              -> retrieve parameters from user [postcode, degreeType]
// [ ]   GET         /api/agenda
// [ ]   POST        /api/agenda/reminder?id
// [V]   GET         /api/news                 -> GET request to a news API [ENTER CREDITS], formats needed data and returns it
// [ ]   POST        /api/news                 -> retrieve parameters from user [news source]
// [V]   GET         /api/gmail                -> get unread emails count (if not logged in, display message and redirect to /api/auth )
// [V]   GET         /api/eta                  -> utilises Google's Distance Matrix to get the traffic data b/w two postcodes > process > return



// ********************************
// ********* API Calls ************
// ********************************

app.get('/auth', authServer);
app.get('/auth/success', getToken);
app.get('/api/weather', getWeather);
app.post('/api/weather', retrieveWeatherVars);
app.get('/api/news1', getNews1);
app.post('/api/news1', postNews1);
app.get('/api/news2', getNews2);
app.post('/api/news2', postNews2);
app.get('/api/newsSources', getNewsSources);
app.get('/api/eta', getEta);
app.post('/api/eta', retrieveEtaVars)
app.get('/api/gmail', googleUnread);




// ********************************
// ********* API Functions ********
// ********************************


// *** AUTHENTICATION *** //

function authServer(req, res) {
  console.log('Redirecting to URL: ' + JSON.stringify(authUrl));
  res.redirect(authUrl);
}

function getToken(req, res) {
  console.log('Got code: ', (req.query.code));
  oauth2.getToken(req.query.code, function(err, tokens) {
    if(err) {
        console.log("Error getting tokens: ", err);
        res.redirect('/');
    } else {
        console.log("Saving tokens: ", JSON.stringify(tokens));
        // Save tokens
        oauth2.setCredentials(tokens);
        var toSend = 'Login Successful! <input class=\'button\' type=\"button\" onclick=\"location.href=\'/\';\" value="Proceed\" />'
        res.send(toSend);
        console.log('Login Successful!');
      }
    });
  }


// ** GMAIL ** //


function googleUnread (req, res) {

  reqGoogleUnread()
    .then (
      function (d) {
        var sample = [
          {

          }
        ]
        var gUnread = 'You have ' + d.messages.length + ' unread emails.'
        res.send(gUnread);
      }
    )
    .catch(
      function(e) {
        console.log(e);
        var toSend = 'Login Required! <input class=\'button\' type=\"button\" onclick=\"location.href=\'/auth\';\" value="Login\" />'
        res.send(toSend);
      }
    )
}

function reqGoogleUnread () {
  return new Promise (
    function (resolve, reject) {
      gmail.users.messages.list(
        {
          userId: 'me',
          labelIds: 'UNREAD',
          auth: oauth2
        },
        function(err, response) {
          var extract = [];
          for (var i = 0; i < response.messages.length; i++) {
            extract[i] = response.messages[i].id
          }
          // console.log(response);
          resolve(response);
        }
      );
    }
  )
}





// *** WEATHER *** //

function getWeather(req, res) {
  reqWeather(postcode)
    .then(function(w) {
      res.send(w)
    })
}

function reqWeather(pCode) {
  return new Promise(
    function (resolve, reject) {
      weather.find({search: pCode, degreeType: degType}, function(err, result) {
        if(err) console.log(err);
        resolve(result);
      });
    }
  )
}


function retrieveWeatherVars(req, res) {
  postcode = req.body.postcode;
  degType = req.body.degrees;
  console.log("var POSTCODE changed: " + postcode);
  console.log("var DEGTYPE changed: " + degType);
  // res.send("var POSTCODE changed: " + postcode);
  res.redirect('/');
}





// *** NEWS *** //

function getNewsSources(req, res) {
  reqNewsSources()
    .then(
      function(sources) {
        res.send(sources)
      }
    )
}


function reqNewsSources(){
  return new Promise (
    function (resolve, reject){
      requestify.get('https://newsapi.org/v1/sources?language=en')
        .then(
          function(response) {
            resolve(response.body)
          }
        )
    }
  )
}


function getNews1(req, res) {
  reqNews1(newsFeed1)
    .then(function(news) {
      res.send(news)
    })
}

function reqNews1(url) {
  return new Promise(
    function (resolve, reject) {
      requestify.get(url).then(function(response) {
        resolve(response.body);
      });
    }
  )
}

function postNews1(req, res) {
  newsSrc1 = req.body.src1;
  newsFeed1 = 'https://newsapi.org/v1/articles?source='+newsSrc1+'&sortBy=top&apiKey='+newsKey;
  console.log(newsSrc1);
  console.log(newsFeed1);
  res.redirect('/setup.html');
}
// INSERT NEWS #2

function getNews2(req, res) {
  reqNews2(newsFeed2)
    .then(function(news) {
      res.send(news)
    })
}

function reqNews2(url) {
  return new Promise(
    function (resolve, reject) {
      requestify.get(url).then(function(response) {
        resolve(response.body);
      });
    }
  )
}

function postNews2(req, res) {
  newsSrc2 = req.body.src2;
  newsFeed2 = 'https://newsapi.org/v1/articles?source='+newsSrc2+'&sortBy=top&apiKey='+newsKey;
  console.log(newsSrc2);
  console.log(newsFeed2);
  res.redirect('/setup.html');
}




// *** ESTIMATED TIME OF ARRIVAL (ETA) *** //

function getEta(req, res) {
  var depart = Date.now()
  var matrixQuery = {
    'origins': origin,
    'destinations': destination,
    'mode': 'driving',
    'departure_time': depart,
    'traffic_model': 'pessimistic'
  };

  gMaps.distanceMatrix(matrixQuery, function(err, response) {
    if (!err) {
      var output = new Array(2);
      output[0] = response;
      output[1] = {h: arriveH, m: arriveM};
      console.log(output);
      res.send(output);
    }
  });

}

function retrieveEtaVars(req, res) {
  origin = req.body.home;
  destination = req.body.work;
  arriveH = parseInt(req.body.hour);
  arriveM = parseInt(req.body.minute);
  console.log("var POSTCODE changed: " + postcode);
  console.log("var DEGTYPE changed: " + degType);
  console.log("var arriveH changed: " + arriveH);
  console.log("var arriveM changed: " + arriveM);
  res.redirect('/');
}
