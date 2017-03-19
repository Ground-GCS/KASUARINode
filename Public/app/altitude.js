var test = [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
            [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]];
//console.log(test[1]);
test[0][1] = 10;
test[1][1] = 2; //
test[1][0] = 0;
test[2][0] = 0;
console.log(test[0][1]);
console.log(test);

var myArray = [];


function gabungArray(array1 , array2){
    //array1 ketinggian
    //array2 parameter lain
    var hasil = [];
    for (var i = 0 ; i < array1.length; i++){
        hasil.push([parseInt(array1[i]) , parseInt(array2[i])]);
    }
    return hasil;
}

// function (x , y) {

//     for (var i =  0; i < x.length; i++) {
//         myArray[]
//     }
// }

// function requestData() {
//     $.ajax({
//         url: '/data',
//         type: 'GET',
//         async: true,
//         dataType: "json",
//         success: function(point) {
//             var series = chart.series[0],
//                 shift = series.data.length > 20; // shift if the series is 
//                                                  // longer than 20

//             // add the point
//             chart.series[0].addPoint(point, true, shift);
            
//             // call it again after one second
//             setTimeout(requestData, 1000);    
//         },
//         cache: false
//     });
// }



 setInterval(function(){
$.ajax({
        url: '/data',
        type: 'GET',
        dataType: "json",
        success: function (data) {

            param.graph.temperature = gabungArray(data.data.ketinggian, data.data.temperature);
            param.graph.kelembaban  = gabungArray(data.data.ketinggian, data.data.kelembaban);
            param.graph.tekanan     = gabungArray(data.data.ketinggian, data.data.tekanan);
            param.graph.arahAngin   = gabungArray(data.data.ketinggian, data.data.arahAngin);
            param.graph.kecAngin    = gabungArray(data.data.ketinggian, data.data.kecAngin);
            param.graph.co2         = gabungArray(data.data.ketinggian, data.data.co2);
        
            //setTimeout(requestData, 1000);
            runAllChart();
        },
         cache: false
      });
 },10000);
    // function requestData(){
     
    // }



//$(document).ready(function() {



//        console.log(param.graph.kelembaban);
function runAllChart() {
Highcharts.chart('chartTemp', {
    chart: {
        type: 'spline',
        inverted: true,
    },
    title: {
        text: 'Atmosphere Temperature by Altitude'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Altitude'
        },
        labels: {
            formatter: function () {
                return this.value + 'm';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Temperature',
        data: param.graph.temperature
    }]
});

Highcharts.chart('chartKelem', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Atmosphere Humidity by Altitude'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Altitude'
        },
        labels: {
            formatter: function () {
                return this.value + 'm';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Humidity'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Humidity',
        data: param.graph.kelembaban
    }]
});

Highcharts.chart('chartTekan', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Atmosphere Temperature by Altitude'
    },
    subtitle: {
        text: 'According to the Standard Atmosphere Model'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Altitude'
        },
        labels: {
            formatter: function () {
                return this.value + 'km';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Temperature',
        data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
            [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
    }]
});

Highcharts.chart('chartArah', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Atmosphere Temperature by Altitude'
    },
    subtitle: {
        text: 'According to the Standard Atmosphere Model'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Altitude'
        },
        labels: {
            formatter: function () {
                return this.value + 'km';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Temperature',
        data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
            [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
    }]
});

Highcharts.chart('chartKece', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Atmosphere Temperature by Altitude'
    },
    subtitle: {
        text: 'According to the Standard Atmosphere Model'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Altitude'
        },
        labels: {
            formatter: function () {
                return this.value + 'km';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Temperature',
        data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
            [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
    }]
});

Highcharts.chart('chartCo2', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Atmosphere Temperature by Altitude'
    },
    subtitle: {
        text: 'According to the Standard Atmosphere Model'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Altitude'
        },
        labels: {
            formatter: function () {
                return this.value + 'km';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Temperature',
        data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
            [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
    }]
});
}
//});