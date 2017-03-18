
      var datahasil;
      var Header,Waktu,Ketinggian,Temperature,Kelembaban,Tekanan,ArahAngin,KecAngin,Lintang,Bujur,Roll,Pitch,Yaw;
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

      function getHumidData(){
          for (var i =0; i < totalPoints; ++i){
            res.push([i,0]);
          }
          return res;
        }

      function getTempData(){
        for (var i = 0; i < totalPoints; ++i){
            TempRes.push([i,0]); 
        }
            return TempRes;
      }

      function getKecData(){
        for(var i = 0; i < totalPoints; ++i){
          KecRes.push([i,0]);
        }
            return KecRes;
      }

      function getTekData(){
        for (var i = 0; i < totalPoints; ++i){
          TekananRes.push([i,0]);
        }
            return TekananRes;
      }

        var updateInterval = 30;
        var plot = $.plot("", [ 
          { data : getHumidData() , label : "Kelembaban" },
          { data : getTempData() , label : "Temperature" },
          { data : getKecData() , label : "Kecepatan" },
          { data : getTekData() , label : "Tekanan" }
         ] , {
              series: {
                shadowSize: 0 // Drawing is faster without shadows
              },
              yaxis: {
                min: 0,
                max: 200
              },
              xaxis: {
                show: false
              }
            });


      function updategraph() {

        plot.setData([ 
          {data : res}, 
          {data : TempRes},
          {data : KecRes},
          {data : TekananRes}  ]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(updategraph, updateInterval);
      }

      updategraph();

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
          // Cara Panggil langsung text
        //$("#arah").text(data.datahasil[8]);
        
        //Push new value to Flot Plot
        res.push([totalPoints, Kelembaban]);
        res.shift();

        TempRes.push([totalPoints, Temperature]);
        TempRes.shift();

        KecRes.push([totalPoints, KecAngin]);
        KecRes.shift();

        TekananRes.push([totalPoints, Tekanan]);
        TekananRes.shift();

        //Flot JS Graph
        for (i=0;i<totalPoints; i++) { 
          res[i][0]=i;
          TempRes[i][0]=i;
          KecRes[i][0]=i;
          TekananRes[i][0]=i;
        }
        //plot.SetData([ res ]);
        //plot.draw();

        box.rotation(Roll, Pitch, Yaw).update();

        });
      }

      /* Google Maps Tracking*/
      $(document).ready(function() {
        // If the browser supports the Geolocation API
        if (typeof navigator.geolocation == "undefined") {
          $("#error").text("Your browser doesn't support the Geolocation API");
          return;
        }
        // Save the positions' history
       // var path = [];

        navigator.geolocation.watchPosition(function(position) {
          // Save the current position
          path.push(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

          // Create the map
          var myOptions = {
            zoom : 20,
            center : path[0],
            mapTypeId : google.maps.MapTypeId.ROADMAP
          }
          var map = new google.maps.Map(document.getElementById("map"), myOptions);

          
          //Uncomment this block if you want to set a path

          // Create the polyline's points
          // for(var i = 0; i < 10; i++) {
          //   // Create a random point using the user current position and a random generated number.
          //   // The number will be once positive and once negative using based on the parity of i
          //   // and to reduce the range the number is divided by 10
          //   path.push(
          //     new google.maps.LatLng(
          //       position.coords.latitude + (Math.random() / 10 * ((i % 2) ? 1 : -1)),
          //       position.coords.longitude + (Math.random() / 10 * ((i % 2) ? 1 : -1))
          //     )
          //   );
          // }
          
         path.push(new google.maps.LatLng(position.coords.latitude + Lintang/1000 , position.coords.longitude + Bujur/1000));
          

          // Create the array that will be used to fit the view to the points range and
          // place the markers to the polyline's points
          var latLngBounds = new google.maps.LatLngBounds();

          for(var i = 0; i < path.length; i++) {
            latLngBounds.extend(path[i]);
            // Place the marker
            new google.maps.Marker({
              map: map,
              position: path[i],
              title: "Point " + (i + 1)
            });
          }
          // Creates the polyline object
          var polyline = new google.maps.Polyline({
            map: map,
            path: path,
            strokeColor: '#0000FF',
            strokeOpacity: 0.7,
            strokeWeight: 1
          });
          // Fit the bounds of the generated points
          map.fitBounds(latLngBounds);
        },
        function(positionError){
          $("#error").append("Error: " + positionError.message + "<br />");
        },
        {
          enableHighAccuracy: true,
          timeout: 10 * 100 // 10 seconds
        });
     
      /*Start SIkap Data*/




      });
      /*End Maps Data*/

      // var box = stage.appendChild(
      //     Sprite3D
      //     .box(100, 60, 150, ".box1")
      //     //.rotation(0, -0, 0)
      //     //.seltPosition(10,20,30)
      //     //setInnerHTML('sikap')
      //    // .update()

      // );

     /* End Sikap*/
     /* Gauge Canvas*/
     // var Gauge = new Gauge({renderTo : 'gaugetemp'});
     // gauge.onready = function(){
     //  setInterval( function(){
     //    gauge.setValue(Temperature);
     //  }, 1000);
     // };

     //  gauge.draw();

    

      // var Gauge = new Gauge({ renderTo: 'gaugetemp' });
      // // now handle initial gauge draw with onready event
      // gauge.onready = function() {
      //     // and do update of gauge value each second with the random value
      //     setInterval( function() {
      //         gauge.setValue( Math.random() * 100);
      //     }, 1000);
      // };
      // // draw the gauge
      // gauge.draw();

  

     /* End Gauge Canvas*/

    