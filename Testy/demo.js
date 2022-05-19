let map;
let markers = [];
let points = [];

function initMap() {
        // Wyświetlamy mape w podanej lokalizacji
    map = new google.maps.Map(document.getElementById('map'), 
    { zoom: 15, center: {lat: 50, lng: 20} } );

        // Wyświetlamy lokalizacjie w konsoli (na stronie -> 'Ctrl + Shift + J')
    map.addListener('click', (event) => {
        let point = JSON.stringify(event.latLng.toJSON(), null, 2);
        document.getElementById('lat-lng').innerHTML += point + '</br>';
        points.push(point);
        console.log(points);

        addMarker(event.latLng);    // Wyświetlamy znacznik
    });

    document.getElementById('delete-markers').addEventListener('click', deleteMarkers);
    document.getElementById('check-button').addEventListener('click', checkPoints);

}
    // Tworzymy funkcje która będzie zaznaczć znaczniki na mapie
function addMarker(position) {
    const marker = new google.maps.Marker({position, map});
    markers.push(marker);
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
    points = [];
}

function checkPoints() {}

window.initMap = initMap;








        // Dodajemy opcje wybierania punktów na mapie oraz możliwość usunięcia wybranych punktów
        // https://developers.google.com/maps/documentation/javascript/examples/marker-remove#maps_marker_remove-javascript

    // map.addListener('click', (event) => {
    //     addMarker(event.latLng);
    // });

    // document.getElementById('delete-markers').addEventListener('click', deleteMarkers);

// }

// Tworzymy funkcje do dodawania, usuwania oraz funkcje pomocniczą (setMapOnAll)
// function addMarker(position) {
//     const marker = new google.maps.Marker({
//         position,
//         map,
//     });
//     markers.push(marker);
// }
// function setMapOnAll(map) {
//     for (let i = 0; i < markers.length; i++) {
//         markers[i].setMap(map);
//     }
// }
// function deleteMarkers() {
//     console.log(markers);
//     setMapOnAll(null);
//     markers = [];
// }