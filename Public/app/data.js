
      var datahasil;
      var Header,Waktu,Ketinggian,Temperature,Kelembaban,Tekanan,ArahAngin,KecAngin,Roll,Pitch,Yaw;
      var totalPoints = 300;
      var res = [],
          TempRes = [],
          KecRes = [],
          TekananRes = [],
          path = [];

       var Lintang = -6.9147439; //latitude
       var Bujur = 107.609809875; //longitude
      //var Bujur, Lintang;
      var lineCoordinatesArray = [];

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

        redraw(Lintang, Bujur); //call redraw polyline untuk map
        });

        //Make map
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat: Lintang, lng : Bujur, alt: 0}
        });

        //make marker
        map_marker = new google.maps.Marker({position: {lat: Lintang, lng: Bujur}, map: map});
        map_marker.setMap(map);
     

        function redraw(Lintang, Bujur) {
          map.setCenter({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah
          map_marker.setPosition({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah

          pushCoordToArray(Lintang, Bujur); //masukin nilai lintan dan bujur ke array coordinates

          var lineCoordinatesPath = new google.maps.Polyline({
              path: lineCoordinatesArray,
              geodesic: true,
              strokeColor: '#ffeb3b',
              strokeOpacity: 1.0,
              strokeWeight: 2
            });

            lineCoordinatesPath.setMap(map); 
        }

        function pushCoordToArray(latIn, lngIn) {
          lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
        }
}

    