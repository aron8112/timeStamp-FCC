// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var fromUnixTime = require('date-fns/fromUnixTime')

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

app.get('/api', (req, res) => {
  const date = new Date();
  res.send({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get('/api/:date', (req, res) => {
    
    // parametro ingresado en req
    const date = req.params.date;
    // parametro para satisfacer la opcion  
    // new Date(date_string)=> resultado en formato: 2011-10-05T00:00:00.000Z
    const date0 = new Date(date);
    // etapas para conversion de fecha YY-MM-DD a formato UTC
    const time = new Date(date).toString();
    const utcTime = new Date(time).toUTCString();
    // formato fecha YY-MM-DD a UNIX
    // no se usaron las opciones .parse o getTime
    const unixTime = new Date(date).valueOf();
    // formato UNIX a fecha (1)
    const convertion = fromUnixTime(date/1000).toString();
    // formato fecha a UTC (2)
    const utcFinale = new Date(convertion).toUTCString()
    // registro de variables
    console.log(date)
    console.log(time)
    console.log(utcTime)
    console.log(unixTime)
    console.log(convertion)
    
     if (/\d{13}/.test(date)) {
       // si el ingreso es un numero UNIX
        res.send({
          unix: date,
          utc: utcFinale
        })
    } else if (/^\d{4}.\d{2}.\d{2}$/.test(date)) {
       // se ingresa una fecha de formato YY-MM-DD
        res.send({
          unix: unixTime,
          utc: utcTime
        })
      } else if (/\d{4}.\d{2}.0[0-9]\w[0-9]{2}.\d{2}.\d{2}.\d{3}[A-Z]/.test(date0)) {
        //fecha formato new Date(date_string)
        res.send({
          unix: unixTime,
          utc: utcTime
        })
      } else {
       //formatos invalidos
        res.json({
          error: "Invalid Date"
        })
      }
  })
  

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
