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

function updateAgeRangeOutput(value) {
	// switch (value) {
	// 	case '20':
	// 		ageRange = '<20';
	// 		break;
	// 	case '30':
	// 		ageRange = '20 - 30';
	// 		break;
	// 	case '40':
	// 		ageRange = '30 - 40';
	// 		break;
	// 	case '50':
	// 		ageRange = '40 - 50';
	// 		break;
	// 	case '60':
	// 		ageRange = '50+';
	// 		break;
	// }
	if (value <= '20') ageRange = '<20';
	if (value > '20' && value <= '30') ageRange = '20 - 30';
	if (value > '30' && value <= '40') ageRange = '30 - 40';
	if (value > '40' && value <= '50') ageRange = '40 - 50';
	if (value > '50') ageRange = '50+';
	document.getElementById('age-range-output').innerHTML = ageRange;
}

window.onload = run;
