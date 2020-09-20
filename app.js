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
    {title: "Muslim Concentration Camps", lat: 34.128627, lng: 105.766435, description:
    "The Chinese government is suppressing Uighur Muslims in Xinjiang China.<br>" +
    "At least 1 million have been affected since 2017.<br>" +
    "And more than 85 concentration camps have been identified.<br><br>" +
    "How to help: <br>" +
    '<a href="https://www.saveuighur.org/">https://www.saveuighur.org</a><br>' +
    '<a href="https://enduyghurforcedlabour.org/">https://enduyghurforcedlabour.org</a><br>'
    },
    {title: "USPS Crisis", lat: 39.970170, lng: -102.108303, description:
    "Has big implications for the election, which is largely reliant on mail-in voting because of COVID.<br>" +
    "There have been allegations that the Trump Administration is depriving the postal service of needed funding.<br>" +
    "Agency warned that it may not be able to meet state deadlines for mail-in ballots, increasing the chances of some not being counted.<br>" +
    "It doesn’t rely on tax dollars, but sales of postage/products and services.<br><br>" +
    "Sign petition: <a href='https://www.change.org/p/save-the-usps'>https://www.change.org/p/save-the-usps</a><br>" +
    "Contact local representatives -> text <strong>“USPS”</strong> to <strong>50409</strong> and a letter will be sent to local reps to support the delivering for america act."
    },
    {title: "Humanitarian Crisis", lat: 15.852868, lng:  47.422535, description:
    "Devastated by Civil war.<br>" +
    "More than 23,000 fatalities reported in 2019.<br>" +
    "Monitoring groups recorded more than 100,000 deaths.<br>" +
    "Donate to the rescue committee: <a href='https://www.rescue.org/country/yemen'>https://www.rescue.org/country/yemen</a><br>" +
    "<a href='https://www.savethechildren.org/us/what-we-do/where-we-work/greater-middle-east-eurasia/yemen'>https://www.savethechildren.org/us/what-we-do/where-we-work/greater-middle-east-eurasia/yemen</a><br>" +
    "<a href='https://www.projecthope.org/crisis-in-yemen/09/2019'>https://www.projecthope.org/crisis-in-yemen/09/2019</a><br>"
    },
    {title: "Anti-Government Protests", lat: 22.321631, lng: 114.175968, description:
    "Started in June against extradition to mainland China.<br>" +
    "The extradition bill which triggered the first protest was introduced in April. It would have allowed for criminal suspects to be extradited to mainland China under certain circumstances.<br>" +
    "An 18yo was shot in the chest as protestors fought off officers.<br>" +
    "How to help: <a href='https://standwithhk.org'>https://standwithhk.org</a><br>" +
    "<a href='https://www.amnesty.org/en/get-involved/take-action/stop-the-hong-kong-extradition-bill'>https://www.amnesty.org/en/get-involved/take-action/stop-the-hong-kong-extradition-bill</a><br>"
    },
    {title: "Pro-Democracy Protests", lat: 53.172411, lng: 28.361114, description:
    "Pro-democracy protests demanding resignation of president alexander lukashenko following a fraudulent election.<br>"+
    "6700+ people arrested since they began, two died in police custody.<br>"+
    "Police brutality increased (responding w tear gas, rubber bullets etc) although most protests are peaceful.<br><br>"+
    "How to help: <br>"+
    '<a href="https://www.usatoday.com/in-depth/news/2020/09/08/water-belarus-demonstrators-borrow-tactics-hong-kong-protests-they-rally-democracy/3437180001/%22%3Ehttps://www.usatoday.com/in-depth/news/2020/09/08/water-belarus-demonstrators-borrow-tactics-hong-kong-protests-they-rally-democracy/3437180001/</a><br>'+
    '<a href="https://www.crisisgroup.org/europe-central-asia/eastern-europe/belarus/how-help-belarus%22%3Ehttps://www.crisisgroup.org/europe-central-asia/eastern-europe/belarus/how-help-belarus%7D</a><br>'
    },
    {title: "Humanitarian Crisis-Political and Economic Turmoil", lat: 7.029530, lng: -66.254809, description:
    "Venezuela is in crisis. The economy has collapsed, and an uprising of political opposition to President Nicolas Maduro has put the country’s leadership in question.<br>"+
    "About 5 million Venezuelan people have left the country seeking food, work, and a better life.<br>"+
    '<a href="https://donate.worldvision.org/give/venezuela-relief-fund?campaign=3100857%22%3Ehttps://donate.worldvision.org/give/venezuela-relief-fund?campaign=3100857</a><br>'
    },
    {title: "Displacement and Food Insecurity", lat: 7.519221, lng: 29.999696, description:
    "More than half the country’s population require humanitarian assistance.<br>"+
    ">600000 displaced.<br>"+
    "Ongoing civil war <br>"+
    "Violence between muslim + christian groups broke out in 2012.<br>"+
    "This led to lack of access to basic thing + education + health care services.<br><br>"+
    "How to help: <br>" +
    '<a href="https://www.rescue.org/country/central-african-republic#what-caused-the-current-crisis-in-car%22%3Ehttps://www.rescue.org/country/central-african-republic#what-caused-the-current-crisis-in-car</a><br>'+
    '<a href="https://www.crisisgroup.org/africa/central-africa/central-african-republic%22%3Ehttps://www.crisisgroup.org/africa/central-africa/central-african-republic</a><br>'
    },
    {title: "Syria Refugee Crisis", lat: 33.816001, lng: 65.080268, description:
    "About 5.6 million Syrians are refugees, and another 6.2 million people are displaced within Syria.<br>"+ 
    "Nearly 12 million people in Syria need humanitarian assistance.<br>" + 
    "At least half of the people affected by the Syrian refugee crisis are children.<br><br>"+
    "How to help: <br>" +
    '<a href="https://donate.worldvision.org/give/refugee-childrens-crisis-fund?campaign=3100858%22%3Ehttps://donate.worldvision.org/give/refugee-childrens-crisis-fund?campaign=3100858</a><br>'
    }
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

    if (title.length <= 0)
        title = "<i>Lorem Ipsum</i>";
    
    if (description === "Usage: <br> for line break (use HTML syntax!)" || description.length <= 0)
        description = LOREM_IPSUM;

    if (newMarker == null)
        return;

    newMarker.setAnimation(null);
    locations.push({title: title, lat: newMarker.getPosition().lat(), lng: newMarker.getPosition().lng(), description: description});
    newMarker.setMap(null);
    newMarker = null;

    setMapOnAll(null);
    markerClusterer.clearMarkers();
    initMarkerClusterer();
    document.getElementById("tbox").value = "";
    document.getElementById("text").value = "";
    
    var audio = new Audio("https://github.com/utsavneutron/marks_for_justice/blob/master/marker_place.mp3");
    audio.type = "audio/mpeg";
    audio.play();
}