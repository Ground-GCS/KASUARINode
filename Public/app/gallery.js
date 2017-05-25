var imgs ;

var dir = "fotoudara/";
var fileextension = ".jpeg"
$.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: 'listGambar',
    success: function (data) {
        //imgs
        //console.log(data.data[0]);
        //imgs.push(data.data);
        imgs = data.data;
        galleryUpdate();
        //console.log(imgs);
        //Lsit all png file names in the page
        // $(data).find("a:contains(" + fileextension + ")").each(function () {
        //     var filename = this.href.replace(window.location.host, "").replace("http:///", "");
        //     console.log(filename);
        //     $("body").append($("<img src=" + dir + filename + "></img>"));
        // });
    }
});





    var arrImgs = [];


function galleryUpdate(){
    // var socket = io.connect();
    // // socket.on('pathGambar' , function(data){
    // //     //console.log(data);
    // //     //imgs.push(data.data[0]);
    // //     imgs = data.data[0];
    // //     console.log(imgs);
    // // });


    for(i = 0; i < imgs.length; i++)
    {
        document.getElementById("fotoudara").innerHTML +=   "<a class='col-md-3' href='fotoudara/" + imgs[i] + "'>"+ "<img src='fotoudara/" + imgs[i] + "' class='img-responsive'/img></a>";
    }
    
    for (var i = 0; i < imgs.length; i++) {
        arrImgs.push({
            src: 'fotoudara/' +imgs[i],
            thumb: 'fotoudara/' +imgs[i]
        });
    }

    $('#gallery').on('click', function(){ 
        $(this).lightGallery({
            thumbnail:true,
            dynamic: true,
            mode: 'lg-fade',
            dynamicEl: arrImgs
            // [{
            //     "src": 'fotoudara/1_50_090810.jpg',
            //     'thumb': 'fotoudara/1_50_090810.jpg',
            // }, {
            //     'src': 'fotoudara/1_50_090810.jpg',
            //     'thumb': 'fotoudara/1_50_090810.jpg',
            // }, {
            //     'src': 'fotoudara/1_50_090810.jpg',
            //     'thumb': 'fotoudara/1_50_090810.jpg',
            // }]
        })
    });
 
}

function startCapture() {
    var socket = io.connect();
    socket.emit('takePict' , 2);
}