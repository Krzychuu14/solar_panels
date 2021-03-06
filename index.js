var map;
var mapcanvas;

let coordinates = []

function initMap() {
    var location = new google.maps.LatLng(50, 20);
    mapOptions = {
        zoom: 17,
        center: location,
        mapTypeId: google.maps.MapTypeId.RoadMap
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var all_overlays = [];
    var selectedShape;
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [ google.maps.drawing.OverlayType.POLYGON ]
        },
        polygonOptions: {
            clickable: true,
            draggable: false,
            editable: true,
            fillColor: '#ADFF2F',
            fillOpacity: 0.03,
        }
    })

    function checkLocation(coornerS) {
        coorner = [];
        locCenter = [];
            for (let i = 0; i < coornerS.length; i++) {
                coorner.push(coornerS[i].split(','));
            }
            for (let i = 0; i < coorner[0].length; i++) {
                for (let j = 0; j < coorner.length; j++) {
                    coorner[j][i] = parseFloat(coorner[j][i]);
                }
            }
            let n = coorner[0][0];
            let s = coorner[0][0];
            let e = coorner[0][1];
            let w = coorner[0][1];
            for (let i = 1; i < coorner.length; i++) {
                if (n < coorner[i][0]) {
                    n = coorner[i][0];
                }
                if (s > coorner[i][0]) {
                    s = coorner[i][0];    
                }
                if (e < coorner[i][1]) {
                    e = coorner[i][1];
                }
                if (w > coorner[i][1]) {
                    w = coorner[i][1];
                }
            }
            console.log(coornerS);
            console.log(coorner);
            console.log(n, s, e, w);

            let x = e - w;
            let y = n - s;

            s = s + 0.001;
            w = w + 0.002;

            let howOsX = x / 0.004;
            let howOsY = y / 0.002;

            for (let i = 0; i < howOsY; i++) {
                for (let j = 0; j < howOsX; j++) {
                    locCenter.push({lat: s + (0.002 * i), lng: w + (0.004 * j)} );
                }
            }

            for (let i = 0; i < locCenter.length; i++) {
                var marker = new google.maps.Marker({
                    position: locCenter[i]
                });
                marker.setMap(map);
            }

            console.log(x);
            console.log(y);
            console.log(howOsX, howOsY);
            console.log(locCenter);
    }

    function clearSelection() {
        if (selectedShape) {
            selectedShape.setEditable(false);
            selectedShape = null
        }
    }

    function stopDrawing() {
        drawingManager.setMap(null)
    }

    function setSelection(shape) {
        clearSelection();
        stopDrawing()
        selectedShape = shape
        shape.setEditable(true)
    }
        
    function deleteSelectedShape() {
        if (selectedShape) {
            selectedShape.setMap(null);
            drawingManager.setMap(map);
            coordinates.splice(0, coordinates.length)
            document.getElementById('box-locations').innerHTML = ''
        }
    }
       
    function CenterControl(controlDiv, map) {
            // Set CSS for the control border
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.3px)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Select to delete the shape';
        controlDiv.appendChild(controlUI);

            // Set CSS for the control interior
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial, sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Delete Select Area';
        controlUI.appendChild(controlText);

            // Setup click event listener simple set the map to [location]      // Sprawdzone
        controlUI.addEventListener('click', function() {
            deleteSelectedShape();
        });
    }
    drawingManager.setMap(map)
        // Sprawdzone
    var getPolygonCoords = function (newShape) {

        coordinates.splice(0, coordinates.length)   // Usuwa wszystkie elementy z listy 'coordinates' ???
        var len = newShape.getPath().getLength();   // Ze zmiennej 'newShape' pobierz sciezke a nastepnie zwroc ilosc elementow tej tablicy
        for (var i=0; i<len; i++) {
            // Dodajemy wartosc lokalizacji wierzcholka z dokladnoscia do 6 miejsc po przecinku
            coordinates.push(newShape.getPath().getAt(i).toUrlValue(6))
        }
        document.getElementById('box-locations').innerHTML = coordinates
        console.log(coordinates)
        return coordinates;
    };

        // Sprawdzone
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(event) {
        event.getPath().getLength();
        google.maps.event.addListener(event, 'dragend', getPolygonCoords(event));
        google.maps.event.addListener(event.getPath(), 'insert_at', function() {
            coordinates.splice(0, coordinates.length);
            var len = event.getPath().getLength();
            for (var i=0; i<len; i++) {
                document.getElementById('box-locations').innerHTML = coordinates
                coordinates.push(event.getPath().getAt(i).toUrlValue(5))
            }
            document.getElementById('box-locations').innerHTML = coordinates;
            checkLocation(coordinates);
            console.log(coordinates)
        })
            // Sprawdzone
        google.maps.event.addListener(event.getPath(), 'set_at', function() {
            coordinates.splice(0, coordinates.length)
            var len = event.getPath().getLength();
            for (var i=0; i<len; i++) {
                document.getElementById('box-locations').innerHTML = coordinates
                coordinates.push(event.getPath().getAt(i).toUrlValue(5))
            }
            document.getElementById('box-locations').innerHTML = coordinates;
            checkLocation(coordinates);
        })
    })
        // Sprawdzone
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        all_overlays.push(event);
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {    // !==
            drawingManager.setDrawingMode(null);
                // Sprawdzone
            var newShape = event.overlay;
            newShape.type = event.type;
            google.maps.event.addListener(newShape, 'click', function() {
                setSelection(newShape);
            })
            setSelection(newShape);
        }
    })
        // Sprawdzone
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

}

window.initMap = initMap; 

// 0: "50.015071,19.925514"
// 1: "50.013323,19.92553"
// 2: "50.013335,19.929538"
// 3: "50.015102,19.929532"

