var SerialPort = require('serialport'); //serialport for connecting to Arduino
var express = require('express'); // webframework on node.js
var bodyParser = require('body-parser'); //using body parser to easy parsing
var app = express(); //run express on app;
//var php = require('php-node'); //using php on node.js
var path = require('path'); //path directory lib
var fs = require('fs'); //manage file.

var moment = require('moment-timezone'); //config timezone
moment().tz("Asia/Bangkok").format();
process.env.TZ = 'Asia/Bangkok'; 

require('events').EventEmitter.defaultMaxListeners = Infinity; //socket.io infinity users
var server = require('http').createServer(app); //create server from express config
var io = require('socket.io').listen(server); //create io.socket to run in server

//config express for using json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 4); //tidy the json code

var portNumber = 3030;
server.listen(portNumber); //start http-server on port

var portName = process.argv[2]; //get port number on command

//create MySQL connection 
// var mysql = require('mysql');
// var zeroDB = mysql.createConnection({
//   host : 'localhost',
//   user : 'root',
//   password : 'noczero',
//   database : 'zeroWeather'
// });

// check MySQL connection 
// zeroDB.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('Success, Database connected... \n connected as id ' + zeroDB.threadId);
// });

//get query from mysql for humidity
app.get('/humid', function(req ,res){
  zeroDB.query('SELECT nilai, UNIX_TIMESTAMP(waktu) as waktu FROM humidity' , function(error, results , fields){
    if (error) throw error;
    res.json({ data : results}); //kirim json data hasil query
  });
});

//get query from mysql for temperature
app.get('/temp', function(req , res ) {
  zeroDB.query('SELECT nilai , UNIX_TIMESTAMP(waktu) as waktu FROM temperature ', function(error , results , fields){
    if (error) throw error;
    res.json({data : results}); //kirim json data hasil query
  });
});

//variable declare
var datahasil , 
  RAWData , 
  jumlahClient = 0 ,
  dcClient = 0 ,
  hidup = false ,
  temp;

// configure Serial Port to connect to Arduino
var zeroPort = new SerialPort(
  portName,
  {
    baudRate : 57600,
    databits : 8,
    parity : 'none',
    parser : SerialPort.parsers.readline('\r\n')
  });


//post humidity data
function insertHumid(data){
  zeroDB.query('INSERT INTO humidity SET nilai=? ' , data ,function(err, result) { 
    if(err){
      console.log(err);
    } 
  });
}

//post temperature data
function insertTemp(data){
  zeroDB.query('INSERT INTO temperature SET nilai=? ' , data ,function(err, result) { 
    if(err){
      console.log(err);
    } 
  });
}

//Bad use
function savedataToFile(data){
    //save log to file txt
  fs.appendFile('log.txt' , data , function (err){
    if (err) {
      console.log(err);
    }
  });
}

// log data to txt (good use)
var logger = fs.createWriteStream('log.txt' , {
  flags : 'a'
});

zeroPort.on('open', function() {
  console.log('ZeroSystem-IoT Started');
  console.log('======================');
  console.log('Port Open, Server on port ' + portNumber);

  var delayMillis = 3000; //3 second
  setTimeout(function() {
    //your code to be executed after 3 second
    zeroPort.write('1', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Started....');
    });
  }, delayMillis);

  //post data to mysql every 20 minutes
  // setInterval(function(){
  //   if (datahasil[0] != null){
  //     insertHumid(datahasil[1]);
  //     insertTemp(datahasil[2]);
  //     console.log('Insert into Database every 20 minutes');
  //   } else {
  //     console.log('404:datahasil not found');
  //   }
  // }, 1200000);

  //io.socket main communication
  io.on('connection' , function(socket){
      jumlahClient++;
      console.log('Number of Client : ' + jumlahClient);

      //get data from arduino
      zeroPort.on('data', function(data) {
         RAWData = data.toString();
          RAWData = RAWData.replace(/(\r\n|\n|\r)/gm,""); //word replacer to simply parsing
          datahasil = RAWData.split(','); //split the data with ,

          //send event in web server
          if (datahasil[0] == "OK" ) {
            socket.emit('kirim', {datahasil:datahasil}); 
            //logger.write(datahasil + '\r\n'); //save log
          }

          socket.emit('button', hidup ); //just button to LEDon
          socket.emit('tempDB',  temp); //wtf
          //savedataToFile(datahasil); //baduse
        });
         
      //handle disconnect users
      socket.on('disconnect' , function() {
          dcClient++;
          console.log('1 client disconnected , Total : ' + dcClient);
          jumlahClient--;
          console.log('Number of Client : ' + jumlahClient);
      });

      //receive socket emit from browser
      socket.on('stop' , function(data) {
          zeroPort.write('0'); //send 0 to arduino
      });

      socket.on('startAgain', function(data){
        zeroPort.write('1');
      });
    
      socket.on('LedON' , function(data){
        zeroPort.write('2');
        hidup = true;
      });

      socket.on('LedOff', function(data){
        zeroPort.write('3');
        hidup = false;
      });

      socket.on('water', function(data){
        zeroPort.write('4');
      });

    });
});