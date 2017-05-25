var chart;
var param1 = {
        ketinggian : 0 ,
        temperature : 0, 
        kelembaban : 0,
        tekanan : 0,
        arahAngin : 0,
        kecAngin : 0,
        co2 : 0 ,
        graph : {
                ketinggian : [],
                temperature : [],
                kelembaban : [],
                tekanan : [],
                arahAngin : [],
                kecAngin : [],
                co2 : []
          },
        setKetinggian : function(data){
            this.ketinggian = parseFloat(data);
        },
        setTemperature : function(data){
            this.temperature = parseFloat(data);
        },
        setKelembaban : function(data){
            this.kelembaban = parseFloat(data);
        },
        setTekanan : function(data){
            this.tekanan = parseFloat(data);
        },
        setArahAngin : function(data){
            this.arahAngin = parseFloat(data);
        },
        setKecAngin : function(data){
            this.kecAngin = parseFloat(data);
        },
        setCo2 : function(data){
            this.co2 = parseFloat(data);
        },
        getKetinggian : function(){
           return this.ketinggian;
        },
        getTemperature : function(){
           return this.temperature  ;
        },
        getKelembaban : function(){
           return this.kelembaban  ;
        },
        getTekanan : function(){
            return   this.tekanan  ;
        },
        getArahAngin : function(){
            return this.arahAngin  ;
        },
        getKecAngin : function(){
            return this.kecAngin  ;
        },
        getCo2 : function(){
            return this.co2  ;
        }
    };


var ketinggian ,temperature, kelembaban , tekanan , arahAngin , kecAngin , co2;


function gaugeUpdate() {

var socket1 = io.connect();

    socket1.on('dataGraph' , function(data){
        //console.log(data.data[0]); //getfirstelement
        if(data.data[0] < 0){
          data.data[0] = 0;
        }

        param1.setKetinggian(data.data[0]);
        param1.setTemperature(data.data[1]);
        param1.setKelembaban(data.data[2]);
        param1.setTekanan(data.data[3]);
        param1.setArahAngin(data.data[4]);
        param1.setKecAngin(data.data[5]);
        param1.setCo2(data.data[6]);
        // ketinggian = parseFloat(data.data[0]);
        // temperature = parseFloat(data.data[1]);
        // kelembaban = parseFloat(data.data[2]);
        // tekanan = parseFloat(data.data[3]);
        // arahAngin = parseFloat(data.data[4]);
        // kecAngin = parseFloat(data.data[5]);
        // co2 = parseFloat(data.data[6]);
    });
}



// Shorthand for $( document ).ready()
$(function() {
    
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
        gaugetemp.setValue(param1.getTemperature());
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
        gaugekel.setValue(param1.getKelembaban());
      }, 1000);
    };

    gaugekel.draw();


    //Tekanan
    var gaugetek = new Gauge({
      renderTo   : 'gaugetek',
      width: 200,
      height: 200,
      glow: false,
      units: 'mbar',
      title: 'Tekanan',
      minValue: 0,
      maxValue: 800,
      majorTicks: ['0', '100', '200', '300', '400', '500', '600', '700', '800'],
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
        gaugetek.setValue(param1.getTekanan());
      }, 1000);
    };
    gaugetek.draw();


    //Kecepatan
     var gaugekec = new Gauge({
       renderTo: 'gaugekec',
            width: 200,
            height: 200,
            glow: false,
            units: 'm/s',
            title: 'Kecepatan Angin',
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
        gaugekec.setValue(param1.getKecAngin());
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
        gaugearah.setValue(param1.getArahAngin());
      }, 1500);
    };

    gaugearah.draw();

    // TInggi
    var gaugetinggi = new Gauge({
      renderTo:'gaugetinggi',
     width: 200,
            height: 200,
            glow: false,
            units: 'meter',
            title: 'Ketinggian',
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
        gaugetinggi.setValue(param1.getKetinggian());
      }, 1500);
    };

    gaugetinggi.draw();



var gaugeco2 = new Gauge({
      renderTo:'gaugeco2',
     width: 200,
            height: 200,
            glow: false,
            units: 'ppm',
            title: 'CO2',
            minValue: 0,
            maxValue: 5000,
            majorTicks: ['0', '1000', '2000', '3000', '4000', '5000'],
            minorTicks: 2,
            strokeTicks: true,
            highlights: [{from: 2000, to: 5000, color: 'rgba(200, 50, 50, .75)'}],
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

    gaugeco2.onready = function() {
      setInterval( function() {
        gaugeco2.setValue(param1.getCo2());
      }, 1500);
    };

    gaugeco2.draw();



});

 