// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})
//Creo la funcion geoLocation que tiene las dos callback
function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}
//Llamas a las funciones callback por separado
function geoCallback(position){
    console.log(position);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    document.getElementById('position').innerHTML = "Latitude:" + lat + "<br> Longitud:" + lon;
}

function onError(message){
    console.log(message);
}
function initMap() {
    var cct = {lat: 53.346, lng: -6.2588};
    var anotherplace = {lat: 53.3458, lng: -6.2575};

    var map = new
   google.maps.Map(document.getElementById('map'),
   { zoom: 18,
    center: cct
    }
    );
    
     
    var marker = new google.maps.Marker({
    position: cct,
    map: map
    });
    
    var marker2 = new google.maps.Marker({
        position: anotherplace,
        map: map
        });
}

//Open Cage API

function OpenCage (){
    var http = new XMLHttpRequest();
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.346+-6.2588LNG&key=3f583365eb344190995625c2a6e06fec';
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(responseJSON);
        var city = responseJSON.results[0].components.city;
        var country = responseJSON.results[0].components.country;
        var county = responseJSON.results[0].components.county;
        var currency = responseJSON.results[0].annotations.currency.name;

        var opencage = "city :" + city + "<br/> country: " + country + "<br/> county: " + county +"<br/> currency: " + currency;

        document.getElementById('opencage').innerHTML = opencage;
    }
    }
