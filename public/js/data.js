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
		gender: Math.random() < 0.5 ? 'Male' : 'Female',
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

var margin, width, height, hGtW;
margin = { top: 40, right: 0, bottom: 0, left: 0 };

// Set dimensions
function setDimensions(elemWidth, elemHeight) {
	// Set hGtW to whether the height is greater than the width
	hGtW = elemHeight > elemWidth;
	console.log(hGtW);

	// Get smallest dimension with margin included
	var minDim = Math.min(
		elemWidth - margin.left - margin.right,
		elemHeight - margin.top - margin.bottom
	);
	console.log(minDim);

	// Set the width and height to be a square with the margins
	width = minDim - margin.left - margin.right;
	if (hGtW) height = minDim;
	else height = minDim - margin.top - margin.bottom;

	// Set the left and right or top and bottom margin to half of the extra space based on hGtW
	if (hGtW) {
		margin.top = (elemHeight - minDim) / 2;
		margin.bottom = margin.bottom + margin.top;
	} else {
		margin.left = margin.left + (elemWidth - minDim) / 2;
		margin.right = margin.right + margin.left;
	}

	// Return length of the side of the square
	return minDim;
}

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

function generateTipVsGenderCompositeData() {
	var compData = [{ gender: 'Male' }, { gender: 'Female' }];

	var maleSum = 0;
	var maleCount = 0;
	var femaleSum = 0;
	var femaleCount = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].gender == 'Male') {
			maleSum += data[i].tip;
			maleCount++;
		}
		if (data[i].gender == 'Female') {
			femaleSum += data[i].tip;
			femaleCount++;
		}
	}

	compData[0].averageTip = (maleSum / maleCount).toFixed(2);
	compData[1].averageTip = (femaleSum / femaleCount).toFixed(2);

	return compData;
}

// Create average tips vs. gender pie chart
function averageTipVsGender() {
	color = d3.scaleOrdinal().range(['#5b63fe', '#fe5bde']);
	arcColor = d3.scaleOrdinal().range(['#767cfb', '#ff7ce5']);
	labelColor = d3.scaleOrdinal().range(['#9296f4', '#ff9aeb']);

	var chartWidth = document.getElementById('average-tip-vs-gender').offsetWidth;
	var chartHeight = document.getElementById('average-tip-vs-gender')
		.offsetHeight;
	var radius = setDimensions(chartWidth, chartHeight) / 2;

	var compData = generateTipVsGenderCompositeData();

	var pie = d3
		.pie()
		.value(d => d.averageTip)
		.sort(null)
		.padAngle(0.025);

	var arc = d3
		.arc()
		.innerRadius(radius * 0.66)
		.outerRadius(radius);

	var arcLabel = d3
		.arc()
		.innerRadius(radius * 0.4)
		.outerRadius(radius * 0.4);

	var svg = d3
		.select('#average-tip-vs-gender')
		.append('svg')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('text-anchor', 'middle');

	if (hGtW) {
		svg
			.attr('height', height)
			.attr('width', width + margin.left + margin.right)
			.style('font', '14px sans-serif');
	} else {
		svg
			.attr('height', height + margin.top + margin.bottom)
			.attr('width', width)
			.style('font', '16px sans-serif');
	}

	var g = svg
		.append('g')
		.attr('transform', 'translate(' + radius + ',' + radius + ')');

	g.selectAll('path')
		.data(pie(compData))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', d => {
			return color(d.data.gender);
		})
		.attr('stroke', 'white')
		.attr('id', d => 'arc-' + d.data.gender)
		.on('mouseover', (d, i) => {
			d3.select('#arc-' + d.data.gender).style('fill', arcColor(d.data.gender));
			d3.select('#label-' + d.data.gender).style(
				'text-shadow',
				'0 0 2px' + labelColor(d.data.gender)
			);
		})
		.on('mouseout', (d, i) => {
			d3.select('#arc-' + d.data.gender).style('fill', color(d.data.gender));
			d3.select('#label-' + d.data.gender).style(
				'text-shadow',
				'0 0 2px' + labelColor(d.data.gender)
			);
		})
		.append('title')
		.text(d => d.data.gender);

	var text = g
		.selectAll('text')
		.data(pie(compData))
		.enter()
		.append('text')
		.attr('transform', d => {
			console.log(d.data.gender + ': ' + arcLabel.centroid(d));
			return 'translate(' + arcLabel.centroid(d) + ')';
		})
		.attr('id', d => 'label-' + d.data.gender)
		.attr('dy', '0.35em');

	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '-0.7em')
		.attr('fill-opacity', 0.7)
		.text(d => d.data.gender);

	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '0.7em')
		.attr('fill-opacity', 0.5)
		.text(d => '$' + d.data.averageTip);
}

function createGraphs() {
	averageTipVsGender();
}

function run() {
	setDailyTotalTips();
	setDollarPerMile();
	setTipMax();
	setTotalMax();
	setDistanceMax();
	createGraphs();
}

window.onload = run;
