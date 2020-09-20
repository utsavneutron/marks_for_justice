"use strict"
const MAP_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180
};

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// Put locations here
let locations = [
    {title: "Muslim Concentration Camps", lat: 34.128627, lng: 105.766435},
    {title: "USPS Crisis", lat: 39.970170, lng: -102.108303},
    {title: "Humanitarian Crisis", lat: 15.852868, lng:  47.422535},
    {title: "Anti-Government Protests", lat: 22.321631, lng: 114.175968},
    {title: "Pro-Democracy Protests", lat: 53.172411, lng: 28.361114},
    {title: "Humanitarian Crisis-Political and Economic Turmoil", lat: 7.029530, lng: -66.254809},
    {title: "Displacement and Food Insecurity", lat: 7.519221, lng: 29.999696},
    {title: "Syria Refugee Crisis", lat: 33.816001, lng: 65.080268}
];

let map;
let markers;
let markerClusterer;
let newMarker;

let infowindow, contentString;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        restriction: {
            latLngBounds: MAP_BOUNDS,
            strictBounds: true
        },
        zoom: 3,
        center: {lat: -28.024, lng: 140.887},
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        styles: styles["injustice"]
    });

    // Add controls to the map, allowing users to hide/show features.
    const styleControl = document.getElementById("style-selector-control");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(styleControl);

    // Default map settings
    // map.setOptions({ styles: styles["injustice"] });
    // map.setOptions({ streetViewControl: false });

    // Apply new JSON when the user chooses to hide/show features.
    document.getElementById("injustice-view").addEventListener("click", () => {
        map.setOptions({ styles: styles["injustice"] });
        map.setOptions({ streetViewControl: false });
        showMarkers();
        initMarkerClusterer();
    });
    document.getElementById("default-view").addEventListener("click", () => {
        map.setOptions({ styles: styles["default"] });
        map.setOptions({ streetViewControl: true });
        setMapOnAll(null);
    });

    initMarkerClusterer();
}

function initMarkerClusterer() {
    // Create an array of alphabetical characters used to label the markers.
    //var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    markers = locations.map(function(location, i) {
        const marker = new google.maps.Marker({
        title: location.title,
        //label: location.label,
        map: map,
        position: new google.maps.LatLng(location.lat, location.lng),
        animation: google.maps.Animation.DROP,
        //link: location.link
        });
        // Function when marker is clicked
        marker.addListener("click", () => {
            var description;
            // Get description given marker title
            for (let i = 0; i < locations.length; i++) {
                if (locations[i].title === marker.getTitle()) {
                    description = locations[i].description;
                }
            }

            contentString = 
                '<div id="content">' +
                '<div id="site-notice">' +
                '</div>' +
                '<h1 id="first-heading" class="first-heading">' + marker.getTitle() + '</h1>' +
                '<div id="body-content">' +
                description +
                '</div>' +
                '</div>';

            infowindow.setPosition(marker.getPosition());
            infowindow.setContent(contentString);
            infowindow.open(map);
        })
        return marker;
    });

    infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // Add a marker clusterer to manage the markers.
    markerClusterer = new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        zoomOnClick: false
    });

    // Function when marker clusterer is clicked
    google.maps.event.addListener(markerClusterer, "click", function(c) {              
        var m = c.getMarkers();
        var p = [];
        for (var i = 0; i < m.length; i++) {
            var markerPos = m[i].getPosition().lat() + ", " + m[i].getPosition().lng();
            p.push('<div onclick="panToPosition(' + markerPos + ')" class="content-string">' + m[i].getTitle() + "</div>");
        }

        contentString = 
        '<div id="content">' +
        '<div id="site-notice">' +
        '</div>' +
        '<h1 id="first-heading" class="first-heading">Injustices</h1>' +
        '<div id="body-content">' +
        p.join("<br>") +
        '</div>' +
        '</div>';

        infowindow.setPosition(c.getCenter());
        infowindow.setContent(contentString);
        //infowindow.setContent("Communities in this region facing injustice: <br>" + p.join(", <br>"));
        infowindow.open(map);
    });
}

function panToPosition(lat, lng) {
    infowindow.close();
    map.setCenter(new google.maps.LatLng(lat, lng));
    if (map.getZoom() < 12) {
        smoothZoom(map, 13, map.getZoom());
    }
    else {
        smoothZoom(map, 18, map.getZoom());
    }
}

function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        let z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 128);
    }
}  

function addMarker() {
    if (newMarker != null) {
        map.setCenter(newMarker.getPosition())
        newMarker.setAnimation(google.maps.Animation.BOUNCE);
        return;
    }

    newMarker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        draggable:true,
        animation: google.maps.Animation.BOUNCE
    });
    newMarker.addListener("click", () => {
        if (newMarker.getAnimation() !== null) {
            newMarker.setAnimation(null);
        } else {
            newMarker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });
}


function setMapOnAll(map) {
    markerClusterer.clearMarkers();
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function showMarkers() {
    setMapOnAll(map);
}


function cancelMarker() {
    if (newMarker == null)
        return;
    newMarker.setMap(null);
    newMarker = null;
}


function confirmMarker() {
    var title = document.getElementById("tbox").value
    var description = document.getElementById("text").value
    if (newMarker == null)
        return;

    newMarker.setAnimation(null);
    locations.push({title: title, lat: newMarker.getPosition().lat(), lng: newMarker.getPosition().lng(), description: description});
    newMarker.setMap(null);
    newMarker = null;

    setMapOnAll(null);
    markerClusterer.clearMarkers();
    initMarkerClusterer();
}