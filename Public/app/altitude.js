
function gabungArray(array1 , array2){
    //array1 ketinggian
    //array2 parameter lain
    var hasil = [];
    for (var i = 0 ; i < array1.length; i++){
        hasil.push([parseFloat(array1[i]) , parseFloat(array2[i])]);
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
    
runAllChart();
//        console.log(param.graph.kelembaban);
function runAllChart() {
Highcharts.chart('chartTemp', {
    chart: {
        type: 'spline',
        inverted: true,
    },
    title: {
        text: ''
    },
    credits : false,
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Ketinggian'
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
        pointFormat: '{point.x} m: {point.y}°C'
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
    }],
    exporting: {
        chartOptions: { // specific options for the exported image
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
    }
});


Highcharts.chart('chartKelem', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: ''
    },
    credits : false,
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Ketinggian'
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
            text: 'Kelembaban'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} m: {point.y}%'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Kelembaban',
        color : '#F44336',
        data: param.graph.kelembaban
    }],
    exporting: {
        chartOptions: { // specific options for the exported image
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
    }
});

Highcharts.chart('chartTekan', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: ''
    },
    credits: false,
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Ketinggian'
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
            text: 'Tekanan'
        },
        labels: {
            formatter: function () {
                return this.value + 'mbar';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} m: {point.y}mbar'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Tekanan',
        color : '#CDDC39',
        data: param.graph.tekanan
    }],
    exporting: {
        chartOptions: { // specific options for the exported image
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
    }
});

Highcharts.chart('chartArah', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: ''
    },
    credits : false,
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Ketinggian'
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
            text: 'Arah'
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
        pointFormat: '{point.x} m: {point.y}°'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Arah Angin',
        color : '#8BC34A',
        data: param.graph.arahAngin
    }],
    exporting: {
        chartOptions: { // specific options for the exported image
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
    }
});

Highcharts.chart('chartKece', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: ''
    },
    credits : false,
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Ketinggian'
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
            text: 'Kecepatan Angin'
        },
        labels: {
            formatter: function () {
                return this.value + 'm/s';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} m: {point.y}m/s'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Kecepatan Angin',
        color : '#795548',
        data: param.graph.kecAngin
    }],
    exporting: {
        chartOptions: { // specific options for the exported image
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
    }
});

Highcharts.chart('chartCo2', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: ''
    },
    credits : false,
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: 'Ketinggian'
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
            text: 'Carbon Dioxide'
        },
        labels: {
            formatter: function () {
                return this.value + 'ppm';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}ppm'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'CO2',
        color : '#673AB7',
        data: param.graph.co2
    }],
    exporting: {
        chartOptions: { // specific options for the exported image
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
    }
});
}
//});