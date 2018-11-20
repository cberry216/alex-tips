function run() {
	var map = new google.maps.Map(document.getElementById('map-canvas'));

	// function initialize() {
	// 	map = new google.maps.Map(document.getElementById('map-canvas'));
	// }

	// google.maps.event.addDomListener(window, 'load', initialize);

	var defaultBounds = google.maps.LatLngBounds(
		new google.maps.LatLng(41.783075, -71.369124),
		new google.maps.LatLng(41.949433, -71.129077)
	);

	var options = {
		bounds: defaultBounds
	};

	// Get the HTML input element for the autocomplete search box
	var input = document.getElementById('tip-address');
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Create the autocomplete object
	var autocomplete = new google.maps.places.Autocomplete(input, options);
}

window.onload = run;
