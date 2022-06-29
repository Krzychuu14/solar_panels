let map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), 
    { zoom: 15, center: {lat: 50, lng: 20} } );

}

window.initMap = initMap;