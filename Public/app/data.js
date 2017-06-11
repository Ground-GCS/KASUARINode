
      var datahasil;
      var Header,Waktu,Ketinggian,Temperature,Kelembaban,Tekanan,ArahAngin,KecAngin,Roll,Pitch,Yaw;
      var totalPoints = 300;
      var res = [],
          TempRes = [],
          KecRes = [],
          TekananRes = [],
          path = [];
      var imgs;

     var stage = Sprite3D.stage(document.querySelector("#sikap"));

     var box = Sprite3D.box(100,200,100, ".box1");
     box.rotation(0,0,0)
     box.update();
    // stage.setInnerHTML("sikap")
     stage.appendChild(box);

  

      //Mulai
function update() {
        // body...
        var socket = io.connect();

        socket.on('kirim', function(data){
          //Deklarasi Variabe
          //ke ID


        Header = data.datahasil[0];
       // Waktu = parseFloat(data.datahasil[1]);
        Ketinggian = parseFloat(data.datahasil[1]);
        Temperature = parseFloat(data.datahasil[2]);
        Kelembaban = parseFloat(data.datahasil[3]);
        Tekanan = parseFloat(data.datahasil[4]);
       // ArahAngin = parseFloat(data.datahasil[5]);
        //KecAngin = parseFloat(data.datahasil[6]);
        Lintang = parseFloat(data.datahasil[7]);
        Bujur = parseFloat(data.datahasil[8]);
        co2 = parseFloat(data.datahasil[9]);
        Pitch = parseFloat(data.datahasil[10]); 
        Roll = parseFloat(data.datahasil[11]);
        Yaw = parseFloat(data.datahasil[12]);


        if (Ketinggian < 0) {
          Ketinggian = 0;
        }


          //Tampil ke id class
        $("#header").html(Header);
        $("#waktu").html(Waktu);
        $("#temperature").html(Temperature);
        $("#kelembaban").html(Kelembaban);
        $("#ketinggian").html(Ketinggian);
        $("#tekanan").html(Tekanan);
        //$("#arahangin").html(ArahAngin);
        //$("#KecAngin").html(KecAngin);
        $("#lintang").html(Lintang);
        $("#bujur").html(Bujur);
        $("#ppm").html(co2);        

       // console.log((360.00-Pitch) + ' ' +  (360.00-Yaw) + ' ' + (360.00-Roll));
        //console.log((Pitch) + ' ' +  (Yaw) + ' ' + (Roll));
        //box.rotation((360.00-Pitch), (360.00-Yaw), (360.00-Roll)).update();
        box.rotation((Pitch), (Yaw), (Roll)).update();

        });

        socket.on('pathGambar' , function(data){
        //console.log(data);
        //imgs.push(data.data[0]);
          imgs = data.data;
          // /console.log(imgs);
          document.getElementById("realtimeFoto").src="fotoudara/"+imgs;

        });

        socket.on('angin' , function(data) {
          //console.log(data);
          $("#arahangin").html(parseFloat(data.data[0]).toFixed(2));
          $("#KecAngin").html(data.data[1]);
        })

        
}



var param = {
  graph : {
                ketinggian : [],
                temperature : [],
                kelembaban : [],
                tekanan : [],
                arahAngin : [],
                kecAngin : [],
                co2 : []
  },
  getDataTemperature : function(){
    return this.temperature;
  },
   getDataKelembaban: function(){
    return this.kelembaban;
  },
   getDataTekanan : function(){
    return this.tekanan;
  },
   getDataArahAngin : function(){
    return this.arahAngin;
  },
   getDataKecAngin : function(){
    return this.kecAngin;
  },
   getDataCo2 : function(){
    return this.co2;
   }
};





    