import { regenerateCompositeData } from './charts.js';

var map, heatmap;

function initMap(data, timePeriod) {
	map = new google.maps.Map(document.getElementById('tip-heat-map'), {
		zoom: 11,
		center: {
			lat: 41.835178,
			lng: -71.242724
		},
		disableDefaultUI: true
	});

	heatmap = new google.maps.visualization.HeatmapLayer({
		data: localizeData(regenerateCompositeData(data, timePeriod)),
		map: map
	});

	var mapLabel = document.createElement('a');
	mapLabel.innerHTML = 'Tip Heatmap';
	mapLabel.classList.add('data-label');
	mapLabel.id = 'tip-heat-map-label';
	mapLabel.href = '#';
	document.getElementById('tip-heat-map').appendChild(mapLabel);

	heatmap.set('radius', 20);
}

function localizeData(data) {
	var compData = data.map(element => new google.maps.LatLng(element.latitude, element.longitude));
	return new google.maps.MVCArray(compData);
}

function updateData(data, timePeriod) {
	var compData = localizeData(regenerateCompositeData(data, timePeriod));
	try {
		heatmap.setData(compData);
	} catch (e) {
		if (e instanceof TypeError) {
		}
	}
}

export { initMap, updateData };
