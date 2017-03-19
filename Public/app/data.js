
      var datahasil;
      var Header,Waktu,Ketinggian,Temperature,Kelembaban,Tekanan,ArahAngin,KecAngin,Roll,Pitch,Yaw;
      var totalPoints = 300;
      var res = [],
          TempRes = [],
          KecRes = [],
          TekananRes = [],
          path = [];


     var stage = Sprite3D.stage(document.querySelector("#sikap"));

     var box = Sprite3D.box(200,50,100, ".box1");
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
       // Waktu = parseInt(data.datahasil[1]);
        Ketinggian = parseInt(data.datahasil[1]);
        Temperature = parseInt(data.datahasil[2]);
        Kelembaban = parseInt(data.datahasil[3]);
        Tekanan = parseInt(data.datahasil[4]);
        ArahAngin = parseInt(data.datahasil[5]);
        KecAngin = parseInt(data.datahasil[6]);
        Lintang = parseFloat(data.datahasil[7]);
        Bujur = parseFloat(data.datahasil[8]);
        co2 = parseInt(data.datahasil[9]);
        Roll = parseInt(data.datahasil[10]);
        Pitch = parseInt(data.datahasil[11]);
        Yaw = parseInt(data.datahasil[12]);



          //Tampil ke id class
        $("#header").html(Header);
        $("#waktu").html(Waktu);
        $("#temperature").html(Temperature);
        $("#kelembaban").html(Kelembaban);
        $("#ketinggian").html(Ketinggian);
        $("#tekanan").html(Tekanan);
        $("#arahangin").html(ArahAngin);
        $("#KecAngin").html(KecAngin);
        $("#lintang").html(Lintang);
        $("#bujur").html(Bujur);
        $("#ppm").html(co2);        


        box.rotation(Roll, Pitch, Yaw).update();

        });

        
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





    