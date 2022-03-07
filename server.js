// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let date = req.params;

  // VALIDATORS
  const dateUnix = /\d{13}/;
  const dateGmt = /^(?:[0-9]{4})-(?:[(1-12)])-(?:[1-31]{2})$/;

  //CONVERTER
  try {
    if (date === dateUnix) {
      //unix a utc
      const ccDate = new Date(date*1000)
      //convertir de milisegundos a segundos
      const cDate = ccDate.getUTCString();
      res.send({ unix: date, utc: cDate });
    }
    if (date === dateGmt) {
      //utc a unix
      const uDate = date.parse()/1000;
      res.send({ unix: uDate, utc: date });
    }
    if (date == null || date == undefined) {
      const unix = new Date.getTime();
      const gmt = new Date.getUTCString();
      res.send({ unix: unix, utc: gmt });
    if (date !== dateUnix && date !== dateGmt) {
      res.send({ message: "Invalid Date" })
    }
    
    }
  }
  catch (err) {
    res.json(err);
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
