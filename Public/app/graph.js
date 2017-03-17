var chart;
$(document).ready(function() { 

    var param = {
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
            this.ketinggian = data;
        },
        setTemperature : function(data){
            this.temperature = data;
        },
        setKelembaban : function(data){
            this.kelembaban = data;
        },
        setTekanan : function(data){
            this.tekanan = data;
        },
        setArahAngin : function(data){
            this.arahAngin = data;
        },
        setKecAngin : function(data){
            this.kecAngin = data;
        },
        setCo2 : function(data){
            this.co2 = data;
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


    var socket = io.connect();

    socket.on('dataGraph' , function(data){
        //console.log(data.data[0]); //getfirstelement
        param.setKetinggian(data.data[0]);
        param.setKelembaban(data.data[1]);
        param.setKelembaban(data.data[2]);
        param.setTekanan(data.data[3]);
        param.setArahAngin(data.data[4]);
        param.setKecAngin(data.data[5]);
        param.setCo2(data.data[6]);
    });

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
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param.temperature;
                            series.addPoint([x, y], true, true);
                        }, 1000);

                        var series1 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param.kelembaban;
                            series1.addPoint([x, y], true, true);
                        }, 1000);

                        var series2 = this.series[2];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param.tekanan;
                            series2.addPoint([x, y], true, true);
                        }, 1000);

                        var series3 = this.series[3];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param.arahAngin;
                            series3.addPoint([x, y], true, true);
                        }, 1000);

                        var series4 = this.series[4];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param.kecAngin;
                            series4.addPoint([x, y], true, true);
                        }, 1000);

                        var series5 = this.series[5];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = param.co2;
                            series5.addPoint([x, y], true, true);
                        }, 1000);
                    }
            }
        },
        title: {
            text: 'DHT11 Sensor'
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
                            y: param.temperature
                        });
                    }
                    return data;
                }())
        },
        {
            name: 'Kelembaban',
            data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: param.kelembaban
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
                            y: param.tekanan
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
                            y: param.arahAngin
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
                            y: param.kecAngin
                        });
                    }
                    return data;
                }())
        },
        {
            name: 'Carbon Dioxide',
            data: (function () {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: param.co2
                        });
                    }
                    return data;
                }())
        }
        ]
    });
});