/* global google */

var map, infoWindow, currPosition;

function initMap() {
	options = { zoom: 8, mapTypeId: google.maps.MapTypeId.ROADMAP };
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
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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
	// if (navigator.geolocation) {
	// 	console.log('Has Geolocation.');
	// 	navigator.geolocation.getCurrentPosition(
	// 		position => {
	// 			console.log(position.coords);
	// 			var pos = {
	// 				lat: position.coords.latitude,
	// 				lng: position.coords.longitude
	// 			};
	// 			console.log(pos);
	// 			infoWindow.setPosition(pos);
	// 			infoWindow.setContent('Address found');
	// 			infoWindow.open(map);
	// 		},
	// 		() => {
	// 			handleLocationError(true, infoWindow, map.getCenter());
	// 		}
	// 	);
	// } else {
	// 	handleLocationError(false, infoWindow, map.getCenter());
	// }
	pos = {
		lat: currPosition.coords.latitude,
		lng: currPosition.coords.longitude
	};
	console.log(pos);
	infoWindow.setPosition(pos);
	infoWindow.setContent('Address Found');
	infoWindow.open(map);
	// google.maps.event.trigger(map, 'resize');
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
