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
            this.ketinggian = parseInt(data);
        },
        setTemperature : function(data){
            this.temperature = parseInt(data);
        },
        setKelembaban : function(data){
            this.kelembaban = parseInt(data);
        },
        setTekanan : function(data){
            this.tekanan = parseInt(data);
        },
        setArahAngin : function(data){
            this.arahAngin = parseInt(data);
        },
        setKecAngin : function(data){
            this.kecAngin = parseInt(data);
        },
        setCo2 : function(data){
            this.co2 = parseInt(data);
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
var socket1 = io.connect();

    socket1.on('dataGraph' , function(data){
        //console.log(data.data[0]); //getfirstelement
        param1.setKetinggian(data.data[0]);
        param1.setTemperature(data.data[1]);
        param1.setKelembaban(data.data[2]);
        param1.setTekanan(data.data[3]);
        param1.setArahAngin(data.data[4]);
        param1.setKecAngin(data.data[5]);
        param1.setCo2(data.data[6]);
        ketinggian = parseInt(data.data[0]);
        temperature = parseInt(data.data[1]);
        kelembaban = parseInt(data.data[2]);
        tekanan = parseInt(data.data[3]);
        arahAngin = parseInt(data.data[4]);
        kecAngin = parseInt(data.data[5]);
        co2 = parseInt(data.data[6]);
    });

$(document).ready(function() { 
 

    Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'zeroGraph',
            defaultSeriesType: 'spline',
            events: {
                load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0] ,
                            shift = series.data.length > 50;
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                //y = temperature;
                                y = param1.getTemperature();
                            series.addPoint([x, y], true, true);
                        }, 1000);

                        var series1 = this.series[1] ,
                        shift = series1.data.length > 50;
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param1.getKelembaban();
                            series1.addPoint([x, y], true, true);
                        }, 1000);

                        var series2 = this.series[2],
                        shift = series2.data.length > 50;
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param1.getTekanan();
                            series2.addPoint([x, y], true, true);
                        }, 1000);

                        var series3 = this.series[3],
                        shift = series3.data.length > 50;
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param1.getArahAngin();
                            series3.addPoint([x, y], true, true);
                        }, 1000);

                        var series4 = this.series[4],
                        shift = series4.data.length > 50;
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param1.getKecAngin();
                            series4.addPoint([x, y], true, true);
                        }, 1000);

                        // var series5 = this.series[5],
                        // shift = series5.data.length > 50;
                        // setInterval(function () {
                        //     var x = (new Date()).getTime(), // current time
                        //         y = param1.getCo2();
                        //     series5.addPoint([x, y], true, true);
                        // }, 1000);
                    }
            }
        },
        title: {
            text: 'Parameter Atmosfir terhadap Waktu'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            crosshair : true,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            crosshair : true,
            title: {
                text: 'Value',
                margin: 5
            }
        },
        series: [{
            name: 'Temperature',
            data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y : param1.getTemperature()
                        });
                    }
                    return data;
                }())
        }
        ,
        {
            name: 'Kelembaban',
            data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: param1.getKelembaban()
                        });
                    }
                    return data;
                }())
        },
        {
            name: 'Tekanan',
            data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: param1.getTekanan()
                        });
                    }
                    return data;
                }())
        },
        {
            name: 'Arah Angin',
            data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: param1.getArahAngin()
                        });
                    }
                    return data;
                }())
        },
        {
            name: 'Kecepatan Angin',
            data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: param1.getKecAngin()
                        });
                    }
                    return data;
                }())
        }
        // {
        //     name: 'Carbon Dioxide',
        //     data: (function () {
        //             var data = [],
        //                 time = (new Date()).getTime(),
        //                 i;

        //             for (i = -19; i <= 0; i += 1) {
        //                 data.push({
        //                     x: time + i * 1000,
        //                     y: param1.getCo2()
        //                 });
        //             }
        //             return data;
        //         }())
        // }
        ]
    });

});