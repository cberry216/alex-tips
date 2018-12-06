// import * as dataChart from './charts.js';
import { createGraphs } from './charts.js';

function randomDate(startDate, endDate) {
	return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

var addresses = [
	'22 Curt Street, Seekonk, MA, USA',
	'12 Holmes Street, Rehoboth, MA, USA',
	'6 Fuller Street, Rehoboth, MA, USA',
	'5 River St, Rehoboth, MA, USA',
	'12 Newman Avenue, Seekonk, MA, USA',
	'14 Curt Street, Seekonk, MA, USA',
	'453 Holmes Street, Rehoboth, MA, USA',
	'23 Fuller Street, Rehoboth, MA, USA',
	'2 River St, Rehoboth, MA, USA',
	'8 Newman Avenue, Seekonk, MA, USA'
];

var genders = ['Male', 'Female'];
var ages = ['lt20', '20-30', '30-40', '40-50', '50pl'];

var data = [];
for (var i = 0; i < 12; i++) {
	var total = ((Math.random() * 5000) / 100).toFixed(2);
	data.push({
		total: +total,
		tip: +(total * (Math.random() * 0.5)).toFixed(2),
		address: addresses[Math.floor(Math.random() * addresses.length)],
		gender: Math.random() < 0.5 ? 'Male' : 'Female',
		age: ages[Math.floor(Math.random() * ages.length)],
		distance: Math.random() * 15,
		date: new Date(),
		latitude: Math.random() * (41.88257 - 41.777102) + 41.777102,
		longitude: -1 * (Math.random() * (71.369446 - 71.126535) + 71.126535)
	});
}

var dataAllTime = data.slice();
for (var i = 0; i < 100; i++) {
	total = ((Math.random() * 5000) / 100).toFixed(2);
	dataAllTime.push({
		total: +total,
		tip: +(total * (Math.random() * 0.5)).toFixed(2),
		address: addresses[Math.floor(Math.random() * addresses.length)],
		gender: Math.random() < 0.5 ? 'Male' : 'Female',
		age: ages[Math.floor(Math.random() * ages.length)],
		distance: Math.random() * 15,
		date: randomDate(
			new Date(2018, 12 - 1 - Math.floor(i / 8.333), Math.ceil(Math.random() * 28)),
			new Date(2018, 12 - Math.floor(i / 8.333), Math.ceil(Math.random() * 28))
		),
		latitude: Math.random() * (41.88257 - 41.777102) + 41.777102,
		longitude: -1 * (Math.random() * (71.369446 - 71.126535) + 71.126535)
	});
}

dataAllTime.push({
	total: 35.0,
	tip: 5.0,
	address: addresses[0],
	gender: 'Male',
	age: ages[3],
	distance: 4,
	date: new Date(2018, 11, 3)
});

function setDailyTotalTips() {
	var sum = 0;
	for (var i = 0; i < data.length; i++) sum += data[i].tip;
	sum = sum.toFixed(2);
	document.getElementById('total-daily-tips').innerHTML = '$' + sum;
}

function setDollarPerMile() {
	var sum = 0;
	var dist = 0;
	for (var i = 0; i < data.length; i++) {
		sum += data[i].tip;
		dist += data[i].distance;
	}
	var dollarPerMile = (sum / dist).toFixed(2);
	document.getElementById('total-dollar-per-mile').innerHTML = '$' + dollarPerMile;
}

function setTipMax() {
	var tipMax = d3.max(data, d => d.tip).toFixed(2);
	var allMax = d3.max(dataAllTime, d => d.tip).toFixed(2);
	document.getElementById('max-daily-tip').innerHTML = '$' + tipMax;
	document.getElementById('max-all-tip').innerHTML = '$' + allMax;
}

function setTotalMax() {
	var totalMax = d3.max(data, d => d.total).toFixed(2);
	var allMax = d3.max(dataAllTime, d => d.total).toFixed(2);
	document.getElementById('max-daily-total').innerHTML = '$' + totalMax;
	document.getElementById('max-all-total').innerHTML = '$' + allMax;
}

function setDistanceMax() {
	var distMax = d3.max(data, d => d.distance).toFixed(1);
	var allMax = d3.max(dataAllTime, d => d.total).toFixed(1);
	document.getElementById('max-daily-dist').innerHTML = distMax + ' mi';
	document.getElementById('max-all-dist').innerHTML = allMax + ' mi';
}

// default time-period
var timePeriod = 'today';

function run() {
	setDailyTotalTips();
	setDollarPerMile();
	setTipMax();
	setTotalMax();
	setDistanceMax();
	createGraphs(dataAllTime, timePeriod);
}

function resizeChartsHandler() {
	createGraphs(dataAllTime, timePeriod);
}

window.onload = run;
window.addEventListener('resize', resizeChartsHandler);

var timeButtons = Array.from(document.getElementsByClassName('data-settings-button'));
timeButtons.forEach(button => {
	if (button.innerText == 'Today') {
		button.addEventListener('click', () => {
			timePeriod = 'today';
			resizeChartsHandler();
		});
	}
	if (button.innerText == 'This Week') {
		button.addEventListener('click', () => {
			timePeriod = 'week';
			resizeChartsHandler();
		});
	}
	if (button.innerText == 'This Month') {
		button.addEventListener('click', () => {
			timePeriod = 'month';
			resizeChartsHandler();
		});
	}
	if (button.innerText == 'This Year') {
		button.addEventListener('click', () => {
			timePeriod = 'year';
			resizeChartsHandler();
		});
	}
	if (button.innerText == 'All Time') {
		button.addEventListener('click', () => {
			timePeriod = 'all-time';
			resizeChartsHandler();
		});
	}
});
