addresses = [
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

ages = ['<20', '20-30', '30-40', '40-50', '50+'];

data = [];
for (var i = 0; i < 10; i++) {
	total = ((Math.random() * 5000) / 100).toFixed(2);
	data.push({
		total: +total,
		tip: +(total * (Math.random() * 0.5)).toFixed(2),
		address: addresses[Math.floor(Math.random() * addresses.length)],
		gender: Math.random() < 0.5 ? 'male' : 'female',
		age: ages[Math.floor(Math.random() * ages.length)],
		distance: Math.random() * 15
	});
}

dataAllTime = [
	{
		total: 650,
		tip: 250,
		address: '5 Pine Manor Mile, Chestnut Hill, MA, USA',
		gender: 'male',
		age: '30-40',
		distance: 10
	}
];

// Set dimensions
var margin = { top: 10, right: 10, bottom: 10, left: 10 };
var width = 450 - margin.left - margin.right,
	height = 450 - margin.top - margin.bottom;

function setDailyTotalTips() {
	sum = 0;
	for (var i = 0; i < data.length; i++) sum += data[i].tip;
	sum = sum.toFixed(2);
	document.getElementById('total-daily-tips').innerHTML = '$' + sum;
}

function setDollarPerMile() {
	sum = 0;
	dist = 0;
	for (var i = 0; i < data.length; i++) {
		sum += data[i].tip;
		dist += data[i].distance;
	}
	dollarPerMile = (sum / dist).toFixed(2);
	document.getElementById('total-dollar-per-mile').innerHTML =
		'$' + dollarPerMile;
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

function averageTipVsGender() {
	var svg = d3
		.select('#average-tip-vs-gender')
		.append('svg')
		.attr('height', height + margin.top + margin.bottom)
		.attr('width', width + margin.left + margin.right);
}

function createGraphs() {}

function run() {
	setDailyTotalTips();
	setDollarPerMile();
	setTipMax();
	setTotalMax();
	setDistanceMax();
	createGraphs();
	// console.log(data);
}

window.onload = run;
