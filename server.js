
// ********************************
// ******** Dependencies **********
// ********************************

var express = require('express');
var app = express();
var weather = require('weather-js');
var requestify = require('requestify');
var fetch = require('node-fetch');

var gMaps = require('@google/maps').createClient({
  key: 'AIzaSyC5Y-uxgxcZggLssNse89lo7Pw6--0Bv-0'
});



// ********************************
// ******** Variables *************
// ********************************
var weather;
var home = 'po40jd';

var newsKey = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=1e7fd484a32e4f86bc4db5042c76b194';
var degType = 'C';

var googleKey = 'AIzaSyC5Y-uxgxcZggLssNse89lo7Pw6--0Bv-0'
var sampleTraffic = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=po40jd&destinations=po15lg&mode=drive&departure_time=1490385902&traffic_model=pessimistic&key=AIzaSyC5Y-uxgxcZggLssNse89lo7Pw6--0Bv-0"



// ********************************
// ******* Serve Static ***********
// ********************************

app.use(express.static('modules'));
app.use(express.static('webpages'));
app.listen(3000, function() { console.log('listening on port 3000')});



// ********************************
// ******* Testing section ********
// ********************************
//
// weather.find({search: 'po40jd', degreeType: 'C'}, function(err, result) {
//   if(err) console.log(err);
//
//   // weather = JSON.stringify(result, null, 2);
//   weather = result;
// });



// ********************************
// ************ API ***************
// ********************************

// [x]   GET         /api/weather
// [ ]   GET         /api/agenda
// [ ]   POST        /api/agenda/reminder?id
// [x]   GET         /api/news
// [ ]   GET         /api/social
// [x]   GET         /api/eta



// ********************************
// ********* API Calls ************
// ********************************

app.get('/api/weather', getWeather);
app.get('/api/news', getNews);
app.get('/api/eta', getEta);

// ********************************
// ********* API Functions ********
// ********************************

function getWeather(req, res) {
  reqWeather(home)
    .then(function(w) {
      // coords.lat = w[0].location.lat;
      // console.log(coords.lat);
      // coords.long = w[0].location.long;
      // console.log(coords.long);
      res.send(w)
      // console.log(w[0].location);
    })
}

function reqWeather(pCode) {
  return new Promise(
    function (resolve, reject) {
      weather.find({search: pCode, degreeType: degType}, function(err, result) {
        if(err) console.log(err);

        // resolve( JSON.stringify(result, null, 2) );
        resolve(result);
      });
    }
  )
}


function getNews(req, res) {
  reqNews(newsKey)
    .then(function(news) {
      res.send(news)
    })
}

function reqNews(url) {
  return new Promise(
    function (resolve, reject) {
      requestify.get(url).then(function(response) {
        resolve(response.body);
      });
    }
  )
}


function getEta(req, res) {
  var home = 'po40jd';
  var destination = 'po15lg';
  var depart = Date.now()
  var matrixQuery = {
    'origins': home,
    'destinations': destination,
    'mode': 'driving',
    'departure_time': depart,
    'traffic_model': 'pessimistic'
  };

  gMaps.distanceMatrix(matrixQuery, function(err, response) {
    if (!err) {
      var output = response;
      console.log(output.json);
      res.send(output.json);
    }
  });

}
