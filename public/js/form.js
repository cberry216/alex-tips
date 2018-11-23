/* global google */

var autoMap;

// var currPosition;

function initMap() {
	autoMap = new google.maps.Map(document.getElementById('auto-map'));
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

function run() {
	initMap();
	initAutocomplete();
}

window.onload = run;
