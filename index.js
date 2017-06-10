var SerialPort = require('serialport'); //serialport for connecting to Arduino
var express = require('express'); // webframework on node.js
var bodyParser = require('body-parser'); //using body parser to easy parsing
var app = express(); //run express on app;
//var php = require('php-node'); //using php on node.js
var path = require('path'); //path directory lib
var fs = require('fs'); //manage file.
var btoa = require('btoa'); //base64


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
  triggerTakePhoto = false ,
  temp ,
  save = false ,
  valid = false,
  stopped = false,
  lanjutkan = false,
  nomorGambar = 0,
  gambar = '',
  count = 0 ,
  oneImagePath = '',
  listGambar = [];

var param = {
  nama : '621',
  ketinggian : 0 ,
  temperature : 0, 
  kelembaban : 0,
  tekanan : 0,
  arahAngin : 0,
  kecAngin : 0,
  latitude : 0.0,
  longitude : 0.0,
  startLatitude : 0.0 ,
  startLongitude : 0.0 ,
  endLatitude : 0.0,
  endLongitude : 0.0,
  co2 :0,
  pitch : 0,
  roll : 0,
  yaw : 0,
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
      }
      else if ((this.ketinggian % 50 == 4) && (save == false)) {
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
  } ,
  savePicture : function() {
   // var delayMillis = 6000; //6 second
   
    // setTimeout(function() {
    //   //your code to be executed after 6 second
    //   if(gambar != null) {
    //     console.log('debug' + this.gambar);
    //     simpanGambar(gambar);
    //     triggerTakePhoto = false;
    //   } else {
    //     console.log('kurang lama.. retry');
    //     param.savePicture();
    //   }
    // }, delayMillis);
    
    //console.log(gambar);
    //simpanGambar(gambar);
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

const testFolder = 'Public/fotoudara/';
app.get('/listGambar' , function(req , res) {
  var files = [];
  fs.readdirSync(testFolder).forEach(file => {
    files.push(file);
  })

  res.json({ data: files});

});

app.get('/data' , function(req , res) {
  res.json({data : param.graph});
});

app.get('/listImage' , function(req , res) {
  res.json({data : listGambar});
});

// configure Serial Port to connect to Arduino
var zeroPort = new SerialPort(
  portName,
  {
    baudRate : 115200,
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

/*===============================
=            Picture            =
===============================*/

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

function simpanGambar(data) {
  console.log(data);
  //console.log('yang mau diconvert');
  var img = "data:image/png;base64," + hexToBase64(data);
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  nomorGambar++;
  var waktuFoto = moment().format("HHmmss");
  listGambar.push(nomorGambar+'_'+param.ketinggian+'_'+waktuFoto+'.jpeg'); //to savve the list
  fs.writeFile('Public/fotoudara/'+nomorGambar+'_'+param.ketinggian+'_'+waktuFoto+'.jpeg', buf);
  oneImagePath = nomorGambar+'_'+param.ketinggian+'_'+waktuFoto+'.jpeg';
}


/*=====  End of Picture  ======*/
    // save gambar with button
 


// log data to txt (good use)
var logger = fs.createWriteStream('log.txt' , {
  flags : 'a'
});
logger.write("ID \t Waktu \t Ketinggian   Suhu  Humid  Tekanan  Arah-Angin  Kec-Angin  Lintang \t Bujur     \t CO2" + "\r\n");
logger.write("[==========================================================================================================]" + "\r\n");

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


  //get data from arduino
  zeroPort.on('data', function(data) {
    RAWData = data.toString();
    RAWData = RAWData.replace(/(\r\n|\n|\r)/gm,""); //word replacer to simply parsing
    datahasil = RAWData.split(','); //split the data with ,
    //console.log(RAWData);
    //console.log(datahasil.length);
    //send event in web server
    if (datahasil.length == 14) {
      if (datahasil[0] == "OK") { //header
      //socket.emit('kirim', {datahasil:datahasil});  //send to html with tag kirim
      valid = true;
      param.ketinggian  = datahasil[1]; 
      param.temperature = datahasil[2]; 
      param.kelembaban  = datahasil[3];
      param.tekanan     = datahasil[4];
      // param.arahAngin   = datahasil[5];
      param.kecAngin    = datahasil[6];

      if (datahasil[7] != "********** ") {
        param.latitude    = datahasil[7];
        param.longitude   = datahasil[8];
      } 

      param.co2         = datahasil[9];
      param.pitch       = datahasil[10];
      param.roll        = datahasil[11];
      param.yaw         = datahasil[12];
      
      
        if ((datahasil[13] != "IMG") && (datahasil[13] != "")){

          // check first img data contains FFD8? 
          if ((datahasil[13].indexOf("FFD8") >= 0) && (count == 0)) {
            lanjutkan = true;
            console.log('setlanjutkantrue');
          }

          // first appear sesuai
          if (lanjutkan == true){
            // tampung gambar
            gambar = gambar + datahasil[13];
          }
          console.log(count);
          count++;


          // check akhir string ada FFD9 (akhir dari JPEG)
          if (datahasil[13].slice(-4) == "FFD9") {
            console.log('Save image ...');
            simpanGambar(gambar);
            lanjutkan = false; //set ke false lanjutkan biar ngcek lagi paspertama
            count = 0;
            gambar = ''; //set ke kosong lagi
          }
          
        } 

        //to convert the pictures 


        if (param.ketinggian % 50 > 10){
          save = false;
        }

        //triggerTakePhoto = false;
        

           // if (triggerTakePhoto == true) {
           //  simpanGambar(gambar);
           //  console.log(gambar);
           //  triggerTakePhoto = false;
           //  }


        // if (param.ketinggian % 50 > 10){
        //   save = false;
        // }


        // // if (param.ketinggian % 5 > 3){
        // //   save = false;
        // // }
        // // if (triggerTakePhoto){
        // //   param.savePicture();
        // // }

        param.logFile(); // command to save the data in log file;
        //logger.write(datahasil + '\r\n'); //save log
        stopped = false;
        //kirimdataplis();

        

      } else if (datahasil[0] != "OK") {
        // do berhet\nti
        stopped = true;
      }
    } else {
      valid = false;
    }

    
  });

  // calculate bearing
  setInterval(
    function() {
      if ((valid == true) && (datahasil[7] != "********** ")) {
        
        setTimeout( function() {
          param.startLatitude = datahasil[7];
          param.startLongitude = datahasil[8];
          console.log('start');

        } , 1000); //delay 1 secodns

        param.endLatitude = datahasil[7];
        param.endLongitude = datahasil[8];
        console.log('end');

        param.arahAngin = getBearing(param.startLatitude , param.startLongitude , param.endLatitude , param.endLongitude);
        param.kecAngin = distance(param.startLatitude , param.startLongitude , param.endLatitude , param.endLongitude , 0 , 0);
        console.log(param.arahAngin);
        console.log(param.kecAngin);
      }
    }
  , 2000);

  //io.socket main communication
  io.on('connection' , function(socket){
      jumlahClient++;
      console.log('Number of Client : ' + jumlahClient);

      // //get data from arduino
      // call again to get event
      zeroPort.on('data', function(data) {
     
          socket.emit('kirim', {datahasil:datahasil});  

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

            socket.emit('dataCoordinate', {  
              data : [ param.latitude,
              param.longitude]
            });

            socket.emit('pathGambar' , {
              data : oneImagePath
            });

            socket.emit('angin' , {
              data : param.arahAngin
            });
 
        });

  
      //handle disconnect users
      socket.on('disconnect' , function() {
          dcClient++;
          console.log('1 client disconnected , Total : ' + dcClient);
          jumlahClient--;
          console.log('Number of Client : ' + jumlahClient);
      });

      //receive socket emit from browser
      // socket.on('stop' , function(data) {
      //     zeroPort.write('0'); //send 0 to arduino
      // });

      // socket.on('startAgain', function(data){
      //   zeroPort.write('1');
      // });
    
      socket.on('takePict' , function(data){
        zeroPort.write('2');
      });
    

    });



});


function radians(n) {
  return n * (Math.PI / 180);
}
function degrees(n) {
  return n * (180 / Math.PI);
}

function getBearing(startLat,startLong,endLat,endLong){
  startLat = parseFloat(startLat);
  startLong = parseFloat(startLong);
  endLat = parseFloat(endLat);
  endLong = parseFloat(endLong);

  startLat = radians(startLat);
  startLong = radians(startLong);
  endLat = radians(endLat);
  endLong = radians(endLong);

  var dLong = endLong - startLong;

  var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
  if (Math.abs(dLong) > Math.PI){
    if (dLong > 0.0)
       dLong = -(2.0 * Math.PI - dLong);
    else
       dLong = (2.0 * Math.PI + dLong);
  }

  return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}

/**
 * Calculate distance between two points in latitude and longitude taking
 * into account height difference. If you are not interested in height
 * difference pass 0.0. Uses Haversine method as its base.
 * 
 * lat1, lon1 Start point lat2, lon2 End point el1 Start altitude in meters
 * el2 End altitude in meters
 * @returns Distance in Meters
 */
function distance(lat1,lon1,lat2,
        lon2, el1,  el2) {

    var R = 6371; // Radius of the earth
    el1 = 0;
    el2 = 0;

    var latDistance = radians(lat2 - lat1);
    var lonDistance = radians(lon2 - lon1);
    var a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
            + Math.cos(radians(lat1)) * Math.cos(radians(lat2))
            * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c * 1000; // convert to meters

    var height = el1 - el2;

    var distance = Math.pow(distance, 2) + Math.pow(height, 2);

    return Math.sqrt(distance).toFixed(2);
    //lat1 = radians(lat1);
    //lat2 = radians(lat2);

}