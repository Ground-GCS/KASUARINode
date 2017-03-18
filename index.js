var SerialPort = require('serialport'); //serialport for connecting to Arduino
var express = require('express'); // webframework on node.js
var bodyParser = require('body-parser'); //using body parser to easy parsing
var app = express(); //run express on app;
//var php = require('php-node'); //using php on node.js
var path = require('path'); //path directory lib
var fs = require('fs'); //manage file.

var moment = require('moment-timezone'); //config timezone
moment().tz("Asia/Bangkok").format();

var waktu = require('moment');

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

//variable declare
var datahasil , 
  RAWData , 
  jumlahClient = 0 ,
  dcClient = 0 ,
  hidup = false ,
  temp ,
  save = false;
  
var param = {
  nama : 'KASUARI',
  ketinggian : 0 ,
  temperature : 0, 
  kelembaban : 0,
  tekanan : 0,
  arahAngin : 0,
  kecAngin : 0,
  latitude : 0.0,
  longitude : 0.0,
  co2 :0,
  graph : {
        ketinggian : [],
        temperature : [],
        kelembaban : [],
        tekanan : [],
        arahAngin : [],
        kecAngin : [],
        co2 : []
  },
  data : function(){
    var getData = this.nama + "\t" 
                  + moment().format("HH:mm:ss") + "\t"
                  + this.ketinggian + "\t" 
                  + this.temperature + "\t" 
                  + this.kelembaban + "\t" 
                  + this.tekanan + "\t" 
                  + this.arahAngin + "\t" 
                  + this.kecAngin + "\t" 
                  + this.latitude + "\t"
                  + this.longitude + "\t"
                  + this.co2 ;
    return getData;
  } ,
  logFile : function() {
    if (this.ketinggian >= 50 && this.ketinggian < 9500) {
      if ((this.ketinggian % 50 == 0) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      } else if ((this.ketinggian % 50 == 1) && (save == false)){
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      } else if ((this.ketinggian % 50 == 2) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }else if ((this.ketinggian % 50 == 3) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }else if ((this.ketinggian % 50 == 4) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }else if ((this.ketinggian % 50 == 5) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }else if ((this.ketinggian % 50 == 6) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }else if ((this.ketinggian % 50 == 7) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }else if ((this.ketinggian % 50 == 8) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }else if ((this.ketinggian % 50 == 9) && (save == false)) {
        this.dataAdd();
        logger.write(this.data() + '\r\n'); //save log
        console.log("Save data to log.txt on " + this.ketinggian + " meter" );
        save = true;
      }
    }
  } , 
  dataAdd : function(){
        this.graph.ketinggian.push(this.ketinggian);
        this.graph.temperature.push(this.temperature);
        this.graph.kelembaban.push(this.kelembaban);
        this.graph.tekanan.push(this.tekanan);
        this.graph.arahAngin.push(this.arahAngin);
        this.graph.kecAngin.push(this.kecAngin);
        this.graph.co2.push(this.co2);
  }
};

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

app.get('/data' , function(req , res) {
  res.json({data : param.graph});
});

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
logger.write("ID \t Waktu \t Ketinggian   Suhu  Humid  Tekanan  Arah-Angin  Kec-Angin  Lintang  Bujur  CO2" + "\r\n");
logger.write("[=============================================================================================]" + "\r\n");

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
          if (datahasil[0] == "OK" ) { //header
            socket.emit('kirim', {datahasil:datahasil});  //send to html with tag kirim
            param.ketinggian  = datahasil[1];
            param.temperature = datahasil[2]; 
            param.kelembaban  = datahasil[3];
            param.tekanan     = datahasil[4];
            param.arahAngin   = datahasil[5];
            param.kecAngin    = datahasil[6];
            param.latitude    = datahasil[7];
            param.longitude   = datahasil[8];
            param.co2         = datahasil[9];   

            socket.emit('dataGraph', {  
              data : [ param.ketinggian,
              param.temperature,
              param.kelembaban,
              param.tekanan,
              param.arahAngin,
              param.kecAngin,
              param.co2]
            });

            socket.emit('dataGauge', {  
              data : [ param.ketinggian,
              param.temperature,
              param.kelembaban,
              param.tekanan,
              param.arahAngin,
              param.kecAngin,
              param.co2]
            });
 

            if (param.ketinggian % 50 > 10){
              save = false;
            }

            param.logFile();
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