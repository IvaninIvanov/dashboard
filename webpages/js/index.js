var weather;
var postcode = null;
var degType = 'C';
var arriveH;
var arriveM;


window.addEventListener('load', init)

function init () {
  populateWeather();
  populateNews();
  getEta();
  getMail();
}



//     ***   WEATHER   ***   //


// populate weather
function populateWeather() {
  getWeather()
    .then(
      function (w) {
        var loopSrc, loopTarget;
        // console.log(w[0].current.temperature);
        document.querySelector('#loc').innerHTML = w[0].location.name;
        document.querySelector('#temp').innerHTML = w[0].current.temperature + " " +w[0].location.degreetype;
        document.querySelector('#skyText').innerHTML = w[0].current.skytext;
        document.querySelector('#day').innerHTML = w[0].current.day + " " + w[0].current.date;
        // console.log(document.querySelector("#days").children);

        loopTarget = document.querySelector("#days");
        loopSrc = w[0].forecast;
        for (var i = 1; i < loopTarget.children.length; i++) {
          loopTarget.children[i].innerHTML= loopSrc[i].shortday;
        }

        loopTarget = document.querySelector("#max");
        loopSrc = w[0].forecast;
        for (var i = 1; i < loopTarget.children.length; i++) {
          loopTarget.children[i].innerHTML= loopSrc[i].high +w[0].location.degreetype;
        }

        loopTarget = document.querySelector("#min");
        loopSrc = w[0].forecast;
        for (var i = 1; i < loopTarget.children.length; i++) {
          loopTarget.children[i].innerHTML= loopSrc[i].low +w[0].location.degreetype;
        }

        loopTarget = document.querySelector("#precip");
        loopSrc = w[0].forecast;
        for (var i = 1; i < loopTarget.children.length; i++) {
          loopTarget.children[i].innerHTML= loopSrc[i].precip + "%";
        }
      }
    )
}

// get request to server
function getWeather() {
  return new Promise(
    function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/weather', true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          weather = JSON.parse(xhr.response);
          resolve(weather);
        } else {
          reject('error getting weather', xhr.status, xhr.responseText);
        }
      }
      xhr.send();
    }
  )
}




function populateNews() {
  getNews()
    .then(
      function (n) {
        var loopSrc, loopTarget;
        // console.log(n);

        document.querySelector('#n1_newsSource').innerHTML = n.source + (' (1/2)');
        for (var i = 0; i < 5; i++) {
        var selTitle = '#n1_a'+(i+1) + '> a > .title';
        var selDesc = '#n1_a'+(i+1) + '> .desc';
        var selLink = '#n1_a'+(i+1) + '> .newsLink';
        document.querySelector(selTitle).innerHTML = n.articles[i].title;
        document.querySelector(selDesc).innerHTML = "&quot;" + n.articles[i].description + "&quot;";
        document.querySelector(selLink).href = n.articles[i].url;
        }

        setInterval( function() {
          document.querySelector('#n1_newsSource').innerHTML = n.source + (' (2/2)');
          for (var i = 5; i < 10; i++) {
          var selTitle = '#n1_a'+(i+1-5) + '> a > .title';
          var selDesc = '#n1_a'+(i+1-5) + '> .desc';
          var selLink = '#n1_a'+(i+1-5) + '> .newsLink';
          document.querySelector(selTitle).innerHTML = n.articles[i].title;
          document.querySelector(selDesc).innerHTML = "&quot;" + n.articles[i].description + "&quot;";
          document.querySelector(selLink).href = n.articles[i].url;
          }
        }, 20000);

        setTimeout(function() {
          setInterval( function() {
            document.querySelector('#n1_newsSource').innerHTML = n.source + (' (1/2)');
            for (var i = 0; i < 5; i++) {
            var selTitle = '#n1_a'+(i+1) + '> a > .title';
            var selDesc = '#n1_a'+(i+1) + '> .desc';
            var selLink = '#n1_a'+(i+1) + '> .newsLink';
            document.querySelector(selTitle).innerHTML = n.articles[i].title;
            document.querySelector(selDesc).innerHTML = "&quot;" + n.articles[i].description + "&quot;";
            document.querySelector(selLink).href = n.articles[i].url;
            }
          }, 20000);
        },10000);
      }
    )
}

function getNews() {
  return new Promise(
    function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/news', true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          // console.log(xhr.responseText);
          news = JSON.parse(xhr.response);
          resolve(news);
        } else {
          reject('error getting weather', xhr.status, xhr.responseText);
        }
      }
      xhr.send();
    }
  )
}

function populateEta() {
  getEta()
    .then (
      function() {

      }
    )
}

function getEta() {
  fetch('/api/eta')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        var obj = json;
        console.log(obj);
        // console.log(obj.rows[0].elements[0].duration_in_traffic.text);
        document.getElementById('duration').innerHTML = 'ETA(usual): ' + obj[0].json.rows[0].elements[0].duration.text;
        document.getElementById('traffic').innerHTML = 'ETA(traffic): ' + obj[0].json.rows[0].elements[0].duration_in_traffic.text;
        var now = new Date()
        // console.log(now);
        arriveH = obj[1].h;
        arriveM = obj[1].m;
        var arriveAt = now.setHours(arriveH,arriveM,00);
        // console.log(arriveAt);
        var buffer = arriveAt - ((obj[0].json.rows[0].elements[0].duration_in_traffic.value*1000) + 120000);
        // console.log(buffer);
        var unFormated = new Date(buffer);
        var unFormatedH = unFormated.getHours();
        var formatedH;
        var unFormatedM = unFormated.getMinutes();
        var formatedM;
          if (unFormatedM.toString().length < 2) {
            formatedM =  '0' + unFormatedM;
          }
          else {
            formatedM = unFormatedM;
          }


          if (unFormatedH.toString().length < 2) {
            formatedH =  '0' + unFormatedH;
          }
          else {
            formatedH = unFormatedH;
          }

        var leaveAt = formatedH + ':' + formatedM;
        console.log(leaveAt);
        document.getElementById('leave').innerHTML = 'Leave at ' + leaveAt;
        document.getElementById('origin').innerHTML = obj[0].json.destination_addresses[0];
        document.getElementById('destination').innerHTML = obj[0].json.origin_addresses[0];


    });
}


function getMail() {
  fetch('/api/gmail')
    .then(
      function(res) {
        return res.text();
      }
    )
    .then(
      function(json) {
        console.log(json);
        document.getElementById('mailbox').innerHTML = json;
      }
    )
}



document.getElementById('submitWeather').addEventListener('click', postWeatherVars);
document.getElementById('submitETA').addEventListener('click', postETAVars);

function postWeatherVars() {
  alert("Parameters successfully sent.");
}

function postETAVars() {
  alert("Parameters successfully sent.");
  arriveH = parseInt(document.getElementById('hour').value);
  arriveM = parseInt(document.getElementById('minute').value);
}
