var imgs = ["1_50_090810.jpg", "2.jpg", "3.jpg","4.jpg", "5.jpg", "6.jpg"];

var arrImgs = [];
for (var i = 0; i < imgs.length; i++) {
    arrImgs.push({
        src: 'fotoudara/' +imgs[i],
        thumb: 'fotoudara/' +imgs[i]
    });
}



function galleryUpdate(){
    for(i = 0; i < imgs.length; i++)
    {
        document.getElementById("fotoudara").innerHTML +=   "<a class='col-md-3' href='fotoudara/" + imgs[i] + "'>"+ "<img src='fotoudara/" + imgs[i] + "' class='img-responsive'/img></a>";
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