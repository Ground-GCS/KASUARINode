
      var datahasil;
      var Header,Waktu,Ketinggian,Temperature,Kelembaban,Tekanan,ArahAngin,KecAngin,Lintang,Bujur,Roll,Pitch,Yaw;
      var totalPoints = 300;
      var res = [],
          TempRes = [],
          KecRes = [],
          TekananRes = [],
          path = [];

      var parameter = {
        head : '001',
        Ketinggian : 0 ,
        Temperature : 0, 
        Kelembaban : 0,
        Tekanan : 0,
        ArahAngin : 0,
        KecAngin : 0,
        latitude : 0.0,
        longitude : 0.0,
        co2 :0
      };

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
        var plot = $.plot("#graph", [ 
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
        Waktu = parseInt(data.datahasil[1]);
        Ketinggian = parseInt(data.datahasil[2]);
        Temperature = parseInt(data.datahasil[3]);
        Kelembaban = parseInt(data.datahasil[4]);
        Tekanan = parseInt(data.datahasil[5]);
        ArahAngin = parseInt(data.datahasil[6]);
        KecAngin = parseInt(data.datahasil[7]);
        Lintang = parseInt(data.datahasil[8]);
        Bujur = parseInt(data.datahasil[9]);
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
        $("#Xaxis").html(Roll);
        $("#Yaxis").html(Pitch);
        $("#Zaxis").html(Yaw);
        
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
      });
      /*End Maps Data*/

      /*Start SIkap Data*/
     var stage = Sprite3D.stage(document.querySelector("#sikap"));

     var box = Sprite3D.box(200,50,100, ".box1");
     box.rotation(0,0,0)
     box.update();
    // stage.setInnerHTML("sikap")
     stage.appendChild(box);
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

     //Temperature
    var gaugetemp = new Gauge({
            renderTo    : 'gaugetemp',
            width       : 200,
            height      : 200,
            glow        : false,
            units       : '°C',
            title       : 'Temperature',
            minValue    : -50,
            maxValue    : 50,
            majorTicks  : ['-50','-40','-30','-20','-10','0','10','20','30','40','50'],
            minorTicks  : 10,
            strokeTicks : false,
            highlights  : [
                { from : -50, to : 0, color : 'rgba(0,   0, 255, .3)' },
                { from : 0, to : 50, color : 'rgba(255, 0, 0, .3)' }
            ],
            colors: {
          plate: '#ffffff',
          majorTicks: '#f1c40f',
          minorTicks: ' #c0392b',
          title: '#000000',
          units: '#000000',
          numbers: '#000000',
          needle: {
              start: 'rgba(200, 50, 50, .75)',
              end: 'rgba(200, 50, 50, .75)',
              circle: {
                  outerStart: 'rgba(200, 200, 200, 1)',
                  outerEnd: 'rgba(200, 200, 200, 1)'
              },
              shadowUp: true,
              shadowDown: false
          },
          circle: {
              shadow: false,
              outerStart: '#34495e',
              outerEnd: '#34495e',
              middleStart: '#34495e',
              middleEnd: '#34495e',
              innerStart: '#34495e',
              innerEnd: '#34495e'
          },
          valueBox: {
              rectStart: '#34495e',
              rectEnd: '#34495e',
              background: '#ffffff',
              shadow: '#34495e'
          }
      },
      valueBox: {
          visible: true
      },
      valueText: {
          visible: true
      },
      needle: {
          type: 'arrow',
          width: 2,
          end: 72,
          circle: {
              size: 7,
              inner: false,
              outer: true
          }
      },
      animation: {
          delay: 10,
          duration: 1500,
          fn: 'linear'
      },
      updateValueOnAnimation: true
    });

    gaugetemp.onready = function() {
      setInterval( function() {
        gaugetemp.setValue(Temperature);
      }, 1500);
    };

    gaugetemp.draw();

    //Kelembanban
    var gaugekel = new Gauge({
      renderTo  : 'gaugekel',
      height: 200,
      glow: false,
      units: '%',
      title: 'Kelembaban',
      minValue: 0,
      maxValue: 220,
      majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'],
      minorTicks: 2,
      strokeTicks: true,
      highlights: [{from: 160, to: 220, color: 'rgba(200, 50, 50, .75)'}],
      colors: {
          plate: '#ffffff',
          majorTicks: '#f1c40f',
          minorTicks: ' #c0392b',
          title: '#000000',
          units: '#000000',
          numbers: '#000000',
          needle: {
              start: 'rgba(200, 50, 50, .75)',
              end: 'rgba(200, 50, 50, .75)',
              circle: {
                  outerStart: 'rgba(200, 200, 200, 1)',
                  outerEnd: 'rgba(200, 200, 200, 1)'
              },
              shadowUp: true,
              shadowDown: false
          },
          circle: {
              shadow: false,
              outerStart: '#34495e',
              outerEnd: '#34495e',
              middleStart: '#34495e',
              middleEnd: '#34495e',
              innerStart: '#34495e',
              innerEnd: '#34495e'
          },
          valueBox: {
              rectStart: '#34495e',
              rectEnd: '#34495e',
              background: '#ffffff',
              shadow: '#34495e'
          }
      },
      valueBox: {
          visible: true
      },
      valueText: {
          visible: true
      },
      needle: {
          type: 'arrow',
          width: 2,
          end: 72,
          circle: {
              size: 7,
              inner: false,
              outer: true
          }
      },
      animation: {
          delay: 10,
          duration: 1500,
          fn: 'linear'
      },
      updateValueOnAnimation: true
    });

    gaugekel.onready = function() {
      setInterval( function() {
        gaugekel.setValue(Kelembaban);
      }, 1000);
    };

    gaugekel.draw();


    //Tekanan
    var gaugetek = new Gauge({
      renderTo   : 'gaugetek',
      width: 200,
      height: 200,
      glow: false,
      units: 'Pa',
      title: 'Tekanan',
      minValue: 0,
      maxValue: 220,
      majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'],
      minorTicks: 2,
      strokeTicks: true,
      highlights: [{from: 160, to: 220, color: 'rgba(200, 50, 50, .75)'}],
      colors: {
          plate: '#ffffff',
          majorTicks: '#f1c40f',
          minorTicks: ' #c0392b',
          title: '#000000',
          units: '#000000',
          numbers: '#000000',
          needle: {
              start: 'rgba(200, 50, 50, .75)',
              end: 'rgba(200, 50, 50, .75)',
              circle: {
                  outerStart: 'rgba(200, 200, 200, 1)',
                  outerEnd: 'rgba(200, 200, 200, 1)'
              },
              shadowUp: true,
              shadowDown: false
          },
          circle: {
              shadow: false,
              outerStart: '#34495e',
              outerEnd: '#34495e',
              middleStart: '#34495e',
              middleEnd: '#34495e',
              innerStart: '#34495e',
              innerEnd: '#34495e'
          },
          valueBox: {
              rectStart: '#34495e',
              rectEnd: '#34495e',
              background: '#ffffff',
              shadow: '#34495e'
          }
      },
      valueBox: {
          visible: true
      },
      valueText: {
          visible: true
      },
      needle: {
          type: 'arrow',
          width: 2,
          end: 72,
          circle: {
              size: 7,
              inner: false,
              outer: true
          }
      },
      animation: {
          delay: 10,
          duration: 1500,
          fn: 'linear'
      },
      updateValueOnAnimation: true
    });

    gaugetek.onready = function() {
      setInterval( function() {
        gaugetek.setValue(Tekanan);
      }, 1000);
    };
    gaugetek.draw();


    //Kecepatan
     var gaugekec = new Gauge({
       renderTo: 'gaugekec',
            width: 200,
            height: 200,
            glow: false,
            units: 'Km/h',
            title: 'Kecepatan',
            minValue: 0,
            maxValue: 220,
            majorTicks: ['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220'],
            minorTicks: 2,
            strokeTicks: true,
            highlights: [{from: 160, to: 220, color: 'rgba(200, 50, 50, .75)'}],
            colors: {
                plate: '#ffffff',
                majorTicks: '#f1c40f',
                minorTicks: ' #c0392b',
                title: '#000000',
                units: '#000000',
                numbers: '#000000',
                needle: {
                    start: 'rgba(200, 50, 50, .75)',
                    end: 'rgba(200, 50, 50, .75)',
                    circle: {
                        outerStart: 'rgba(200, 200, 200, 1)',
                        outerEnd: 'rgba(200, 200, 200, 1)'
                    },
                    shadowUp: true,
                    shadowDown: false
                },
                circle: {
                    shadow: false,
                    outerStart: '#34495e',
                    outerEnd: '#34495e',
                    middleStart: '#34495e',
                    middleEnd: '#34495e',
                    innerStart: '#34495e',
                    innerEnd: '#34495e'
                },
                valueBox: {
                    rectStart: '#34495e',
                    rectEnd: '#34495e',
                    background: '#ffffff',
                    shadow: '#34495e'
                }
            },
            valueBox: {
                visible: true
            },
            valueText: {
                visible: true
            },
            needle: {
                type: 'arrow',
                width: 2,
                end: 72,
                circle: {
                    size: 7,
                    inner: false,
                    outer: true
                }
            },
            animation: {
                delay: 10,
                duration: 1500,
                fn: 'linear'
            },
            updateValueOnAnimation: true
    });

    gaugekec.onready = function() {
      setInterval( function() {
        gaugekec.setValue(KecAngin);
      }, 1000);
    };
    gaugekec.draw();


    //Arah
    var gaugearah = new Gauge({
           renderTo: 'gaugearah',
            width: 200,
            height: 200,
            glow: false,
            units: false,
            title: false,
            minValue: 0,
            maxValue: 360,
            majorTicks: ['S', 'SW', 'W', 'NW', 'N', 'NE', 'E', 'SE', 'S'],
            minorTicks: 22,
            ticksAngle: 360,
            startAngle: 0,
            strokeTicks: false,
            highlights: false,
            colors: {
                plate: '#222',
                majorTicks: '#f5f5f5',
                minorTicks: '#ddd',
                title: '#fff',
                units: '#ccc',
                numbers: '#eee',
                needle: {
                    start: 'rgba(240, 128, 128, 1)',
                    end: 'rgba(255, 160, 122, .9)',
                    circle: {
                        outerStart: '#ccc',
                        outerEnd: '#ccc',
                        innerStart: '#222',
                        innerEnd: '#222'
                    },
                    shadowUp: false,
                    shadowDown: false
                },
                valueBox: {
                    rectStart: '#888',
                    rectEnd: '#666',
                    background: '#babab2',
                    shadow: 'rgba(0, 0, 0, 1)'
                },
                valueText: {
                    foreground: '#444',
                    shadow: 'rgba(0, 0, 0, 0.3)'
                },
                 circle: {
              shadow: false,
              outerStart: '#34495e',
              outerEnd: '#34495e',
              middleStart: '#34495e',
              middleEnd: '#34495e',
              innerStart: '#34495e',
              innerEnd: '#34495e'
                }
            },
            circle: {
              shadow: false,
              outerStart: '#34495e',
              outerEnd: '#34495e',
              middleStart: '#34495e',
              middleEnd: '#34495e',
              innerStart: '#34495e',
              innerEnd: '#34495e'
            },
            needle: {
                type: 'line',
                end: 89,
                start: 65,
                width: 3,
                circle: {
                    size: 15,
                    inner: false,
                    outer: true
                }
            },
            valueBox: {
                visible: false
            },
            valueText: {
                visible: false
            },
            animation: {
                delay: 10,
                duration: 1000,
                fn: 'linear'
            }
    });

    gaugearah.onready = function() {
      setInterval( function() {
        gaugearah.setValue(ArahAngin);
      }, 1500);
    };

    gaugearah.draw();

    // TInggi
    var gaugetinggi = new Gauge({
      renderTo:'gaugetinggi',
     width: 200,
            height: 200,
            glow: false,
            units: 'Mdpl',
            title: 'Tinggi',
            minValue: 0,
            maxValue: 10000,
            majorTicks: ['0', '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000'],
            minorTicks: 2,
            strokeTicks: true,
            highlights: [{from: 5000, to: 10000, color: 'rgba(200, 50, 50, .75)'}],
            colors: {
                plate: '#ffffff',
                majorTicks: '#f1c40f',
                minorTicks: ' #c0392b',
                title: '#000000',
                units: '#000000',
                numbers: '#000000',
                needle: {
                    start: 'rgba(200, 50, 50, .75)',
                    end: 'rgba(200, 50, 50, .75)',
                    circle: {
                        outerStart: 'rgba(200, 200, 200, 1)',
                        outerEnd: 'rgba(200, 200, 200, 1)'
                    },
                    shadowUp: true,
                    shadowDown: false
                },
                circle: {
                    shadow: false,
                    outerStart: '#34495e',
                    outerEnd: '#34495e',
                    middleStart: '#34495e',
                    middleEnd: '#34495e',
                    innerStart: '#34495e',
                    innerEnd: '#34495e'
                },
                valueBox: {
                    rectStart: '#34495e',
                    rectEnd: '#34495e',
                    background: '#ffffff',
                    shadow: '#34495e'
                }
            },
            valueBox: {
                visible: true
            },
            valueText: {
                visible: true
            },
            needle: {
                type: 'arrow',
                width: 2,
                end: 72,
                circle: {
                    size: 7,
                    inner: false,
                    outer: true
                }
            },
            animation: {
                delay: 10,
                duration: 1500,
                fn: 'linear'
            },
            updateValueOnAnimation: true
    });

    gaugetinggi.onready = function() {
      setInterval( function() {
        gaugetinggi.setValue(Waktu);
      }, 1500);
    };

    gaugetinggi.draw();


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

    