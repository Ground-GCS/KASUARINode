

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
  var path = require('path');
var express = require('express');
var app = express();
var  server = require('http').createServer(app);
var  io = require('socket.io').listen(server);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
  });

var numConexion = 0;

server.listen(3000);

var  portName = process.argv[2];

var myPort = new SerialPort(portName, {
   //Serial Configuration
   baudRate: 57600,
    databits: 8,
    parity: 'none',
    parser : serialport.parsers.readline('\r\n')
   });

 ///////////////////////////////////////////////////////////////////////////////////////
///Abrimos Puerto Serial
myPort.on("open", function (RAWData) {
  console.log('Port Open, Arduino is connecting');
  myPort.write("1");
  ///////////////////////////////////////////////////////////////////////////////////////
  ///Abrimos conexion por sockets
  io.sockets.on('connection', function(socket){
      numConexion += 1; //número de cliente
      console.log("Koneksi sebanyak: ", + numConexion +" pada port 3000"); 
      myPort.write("1");

      myPort.on('data', function(data) {

        var RAWData = data.toString();
        RAWData = RAWData.replace(/(\r\n|\n|\r)/gm,"");
        console.log(RAWData);


        var datahasil = RAWData.split(' ');
       // socket.broadcast.emit("data", datahasil[0] + datahasil[1]);

       socket.broadcast.emit("data", {datahasil:datahasil});

       // var temperatura=data;
     //   console.log(temperatura);  //vemos que llega el dato temperatura

      //  socket.broadcast.emit("data", temperatura); //todos menos a mi
      });
    //cliente desconectado:
    socket.on('disconnect', function(){
        console.log('Client :  ' + numConexion + ' Disconnect');
      numConexion -= 1;
    });

  });
});
