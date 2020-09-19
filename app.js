"use strict"
const MAP_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180
};

// Put locations here
let locations = [
    {title: "Region1", lat: -31.563910, lng: 147.154312},
    {title: "Region2", lat: -33.718234, lng: 150.363181},
    {title: "Region3", lat: -33.727111, lng: 150.371124},
    {title: "Region4", lat: -33.848588, lng: 151.209834},
    {title: "Region5", lat: -34.671264, lng: 150.863657},
    {title: "Region6", lat: -35.304724, lng: 148.662905},
    {title: "Region7", lat: -36.817685, lng: 175.699196},
    {title: "Region8", lat: -36.828611, lng: 175.790222},
    {title: "Region9", lat: -37.750000, lng: 145.116667},
    {title: "Region10", lat: -37.759859, lng: 145.128708},
    {title: "Region11", lat: -37.765015, lng: 145.133858},
    {title: "Region12", lat: -37.770104, lng: 145.143299},
    {title: "Region13", lat: -37.773700, lng: 145.145187},
    {title: "Region14", lat: -37.774785, lng: 145.137978},
    {title: "Region15", lat: -37.819616, lng: 144.968119},
    {title: "Region16", lat: -38.330766, lng: 144.695692},
    {title: "Region17", lat: -39.927193, lng: 175.053218},
    {title: "Region18", lat: -41.330162, lng: 174.865694},
    {title: "Region19", lat: -42.734358, lng: 147.439506},
    {title: "Region20", lat: -42.734358, lng: 147.501315},
    {title: "Region21", lat: -42.735258, lng: 147.438000},
    {title: "Region22", lat: -43.999792, lng: 170.463352}
];

let map;
let infowindow;

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
    });
    document.getElementById("default-view").addEventListener("click", () => {
        map.setOptions({ styles: styles["default"] });
        map.setOptions({ streetViewControl: true });
    });

    // Create an array of alphabetical characters used to label the markers.
    //var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        var m = new google.maps.Marker({
        title: location.title,
        label: location.label,
        map: map,
        position: new google.maps.LatLng(location.lat, location.lng),
        animation: google.maps.Animation.DROP,
        //link: location.link
        });
        // Function when marker is clicked
        m.addListener("click", () => {
            console.log("Marker name: " + m.getTitle());
        })
        return m;
    });

    var contentString;

    infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        zoomOnClick: false
    });

    // Function when marker clusterer is clicked
    google.maps.event.addListener(markerCluster, "click", function(c) {              
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
        '<h1 id="first-heading" class="first-heading">Injustice in this region</h1>' +
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
    smoothZoom(map, 12, map.getZoom());
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