function initMap() {
        // Wyświetla mape na stronie
    const map = new google.maps.Map(document.getElementById('map'), 
    { zoom: 15, center: {lat: 50.021, lng: 19.938}, } );   // Nie wiem po co przecinek po 140.887}

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [ google.maps.drawing.OverlayType.POLYGON, ],
        },
    });

    drawingManager.setMap(map);
}

window.initMap = initMap;   // Nie wiem o co chodzi