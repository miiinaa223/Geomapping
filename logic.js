var earthquake = new L.LayerGroup();

var API = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// longtude, latitude setting and mapping 
d3.json(API, function (test) {
    L.geoJSON(test.features, {
        pointToLayer: function (json, mapping) {
            return L.circleMarker(mapping, { radius: markerSize(json.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 0.5,
                weight: 0.1,

            }
        },

    }).addTo(earthquake);
    createMap(earthquake);
});


function createMap() {
// map with mapbox
    var street = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWlpaW5hYTIyMyIsImEiOiJjandyMTM2Y3IxZWQ3NGNwcjdrb3pqcWZ0In0.nGjmJLteYgP4CGi3cZ6LiQ'
    });

    var mymap = L.map('mymap', {
        center: [40, -99], // United States
        zoom: 4.3,

        layers: [street, earthquake]
    });

    L.control.addTo(mymap);

}




// Magnitude visualization setting 
function markerSize(magnitude) {
    return magnitude * 3;
};

function Color(magnitude) {
    if (magnitude > 5) {
        return 'red'
    } else if (magnitude > 4) {
        return 'orange'
    } else if (magnitude > 3) {
        return 'yellow'
    } else if (magnitude > 2) {
        return 'darkgreen'
    } else if (magnitude > 1) {
        return 'lightgreen'
    } else {
        return 'white'
    }
};

