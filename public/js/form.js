/* global google */

var map, autoMap, infoWindow;

var currPosition = { coords: { latitude: 41.864995, longitude: -71.274469 } };

function initMap() {
	options = {
		center: { lat: 41.866254, lng: -71.249101 },
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	autoMap = new google.maps.Map(document.getElementById('auto-map'));
	map = new google.maps.Map(document.getElementById('map'), options);
	infoWindow = new google.maps.InfoWindow();
}

function initAutocomplete() {
	var defaultBounds = google.maps.LatLngBounds(
		new google.maps.LatLng(41.783075, -71.369124),
		new google.maps.LatLng(41.949433, -71.129077)
	);

	var options = { bounds: defaultBounds };

	// Get the HTML input element for the autocomplete search box
	var input = document.getElementById('tip-address');
	autoMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Create the autocomplete object
	var autocomplete = new google.maps.places.Autocomplete(input, options);
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			position => {
				currPosition = position;
			},
			() => {
				console.log('location not found.');
			}
		);
	} else {
		console.log('geolocation not enabled.');
	}
}

function run() {
	initMap();
	initAutocomplete();
	getLocation();
}

function addMap() {
	pos = {
		lat: currPosition.coords.latitude,
		lng: currPosition.coords.longitude
	};
	console.log(pos);
	infoWindow.setPosition(pos);
	infoWindow.setContent('6 Fuller Street, Rehoboth, MA, 02769');
	infoWindow.open(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
			? 'Error: The Geolocation service failed.'
			: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}

// TODO: implement geocodeLatLng for reverse geocoding
// function geocodeLatLng(geocoder, map, infoWindow) {}

window.onload = run;

document.getElementById('find-address').onclick = addMap;
