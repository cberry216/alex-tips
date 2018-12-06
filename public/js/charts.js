var genders = ['Male', 'Female'];
var ages = ['lt20', '20-30', '30-40', '40-50', '50pl'];

var margin, width, height, hGtW;
margin = { top: 40, right: 0, bottom: 0, left: 0 };

// Set dimensions
function setDimensions(elemWidth, elemHeight) {
	resetMargins(40, 0, 0, 0);

	// Set hGtW to whether the height is greater than the width
	hGtW = elemHeight > elemWidth;

	// Get smallest dimension with margin included
	var minDim = Math.min(
		elemWidth - margin.left - margin.right,
		elemHeight - margin.top - margin.bottom
	);

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

function resetMargins(top, right, bottom, left) {
	margin.top = top;
	margin.right = right;
	margin.bottom = bottom;
	margin.left = left;
}

function dullEveryOtherArc(field, arcName) {
	if (field == 'gender') {
		var other = arcName == 'Male' ? 'Female' : 'Male';
		d3.select('#arc-gender-' + other).style('opacity', 0.25);
		d3.selectAll('.gender-label-' + other).style('fill-opacity', 0.1);
	} else if ((field = 'age')) {
		var others = ages.filter(age => age != arcName);
		others.forEach(age => {
			d3.select('#arc-age-' + age).style('opacity', 0.25);
			d3.selectAll('.age-label-' + age).style('fill-opacity', 0.1);
		});
	}
}

function brightenEveryOtherArc(field, arcName) {
	if (field == 'gender') {
		var other = arcName == 'Male' ? 'Female' : 'Male';
		d3.select('#arc-gender-' + other).style('opacity', 1);
		d3.select('#label-gender-' + other).style('fill-opacity', 0.7);
		d3.select('#label-averageTip-' + other).style('fill-opacity', 0.5);
		d3.select('#label-percentage-' + other).style('fill-opacity', 0.5);
	} else if (field == 'age') {
		var others = ages.filter(age => age != arcName);
		others.forEach(age => {
			d3.select('#arc-age-' + age).style('opacity', 1);
			d3.select('#label-age-' + age).style('fill-opacity', 0.7);
			d3.select('#label-averageTip-' + age).style('fill-opacity', 0.5);
			d3.select('#label-percentage-' + age).style('fill-opacity', 0.5);
		});
	}
}

function generateTipVsGenderCompositeData(data) {
	// var compData = [{ gender: 'Male' }, { gender: 'Female' }];

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

	var compData = [];
	var currentDataIndex = 0;
	if (maleCount) {
		currentDataIndex++;
		compData.push({
			gender: 'Male',
			averageTip: (maleSum / (maleCount == 0 ? 1 : maleCount)).toFixed(2)
		});
	}
	if (femaleCount) {
		compData.push({
			gender: 'Female',
			averageTip: (femaleSum / (femaleCount == 0 ? 1 : femaleCount)).toFixed(2)
		});
	}

	var totalSum = 0;
	for (var i = 0; i < compData.length; i++) {
		totalSum += +compData[i].averageTip;
	}

	for (var i = 0; i < compData.length; i++) {
		// prettier-ignore
		compData[i].percentage = ((+compData[i].averageTip / totalSum) * 100).toFixed(2);
	}

	return compData;
}

function generateTipVsAgeCompositeData(data) {
	var sumLt20 = 0;
	var countLt20 = 0;
	var sum2030 = 0;
	var count2030 = 0;
	var sum3040 = 0;
	var count3040 = 0;
	var sum4050 = 0;
	var count4050 = 0;
	var sum50pl = 0;
	var count50pl = 0;

	for (var i = 0; i < data.length; i++) {
		if (data[i].age == 'lt20') {
			sumLt20 += data[i].tip;
			countLt20++;
		}
		if (data[i].age == '20-30') {
			sum2030 += data[i].tip;
			count2030++;
		}
		if (data[i].age == '30-40') {
			sum3040 += data[i].tip;
			count3040++;
		}
		if (data[i].age == '40-50') {
			sum4050 += data[i].tip;
			count4050++;
		}
		if (data[i].age == '50pl') {
			sum50pl += data[i].tip;
			count50pl++;
		}
	}

	var compData = [];

	var totalSum = sumLt20 + sum2030 + sum3040 + sum4050 + sum50pl;

	if (countLt20) {
		compData.push({
			age: 'lt20',
			averageTip: (sumLt20 / countLt20).toFixed(2)
		});
	}
	if (count2030) {
		compData.push({
			age: '20-30',
			averageTip: (sum2030 / count2030).toFixed(2)
		});
	}
	if (count3040) {
		compData.push({
			age: '30-40',
			averageTip: (sum3040 / count3040).toFixed(2)
		});
	}
	if (count4050) {
		compData.push({
			age: '40-50',
			averageTip: (sum4050 / count4050).toFixed(2)
		});
	}
	if (count50pl) {
		compData.push({
			age: '50pl',
			averageTip: (sum50pl / count50pl).toFixed(2)
		});
	}

	var avgSum = 0;

	for (var i = 0; i < compData.length; i++) avgSum += +compData[i].averageTip;

	for (var i = 0; i < compData.length; i++)
		compData[i].percentage = ((+compData[i].averageTip / avgSum) * 100).toFixed(
			2
		);

	return compData;
}

// Create average tips vs. gender pie chart
function averageTipVsGender(compData) {
	// Color mapping to gender for main chart
	var genderColor = d3
		.scaleOrdinal()
		.domain(['Male', 'Female'])
		.range(['#5b63fe', '#fe5bde']);

	// Color mapping to gender for hovering
	var genderArcColor = d3
		.scaleOrdinal()
		.domain(['Male', 'Female'])
		.range(['#767cfb', '#ff7ce5']);

	// Get width and height of the given div the chart will go in
	var chartWidth = document.getElementById('average-tip-vs-gender').offsetWidth;
	var chartHeight = document.getElementById('average-tip-vs-gender')
		.offsetHeight;
	var radius = setDimensions(chartWidth, chartHeight) / 2;

	// Get composite data for tips based on gender
	// var compData = generateTipVsGenderCompositeData();

	// Create angle generator for doughnut chart
	var pie = d3
		.pie()
		.value(d => d.averageTip)
		.sort(d => d.gender)
		.padAngle(0.015);

	// Create arc generator for doughnut chart
	var arc = d3
		.arc()
		.innerRadius(radius * 0.75)
		.outerRadius(radius);

	// Create arc generator for text for doughnut chart
	var arcLabel = d3
		.arc()
		.innerRadius(radius * 0.4)
		.outerRadius(radius * 0.4);

	// Add SVG to div and center it within div
	var svg = d3
		.select('#average-tip-vs-gender')
		.append('svg')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('text-anchor', 'middle');

	// If height > width
	if (hGtW) {
		// Set the height without margins, and the width with margins
		// Make the font slightly smaller
		svg
			.attr('height', height)
			.attr('width', width + margin.left + margin.right)
			.style('font', '14px sans-serif');
	} else {
		// Set the height with margin, and the width without margins
		svg
			.attr('height', height + margin.top + margin.bottom)
			.attr('width', width)
			.style('font', '16px sans-serif');
	}

	// Add a group and center it within the SVG
	var g = svg
		.append('g')
		.attr('transform', 'translate(' + radius + ',' + radius + ')');

	// Draw the graph
	g.selectAll('path')
		.data(pie(compData))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', d => {
			return genderColor(d.data.gender);
		})
		.attr('stroke', 'white')
		.attr('id', d => 'arc-gender-' + d.data.gender)
		.attr('class', 'd3-gender-arc')
		.on('mouseover', (d, i) => {
			// On mouseover, highlight the arc and increase the font-size
			dullEveryOtherArc('gender', d.data.gender);
			d3.select('#arc-gender-' + d.data.gender).style(
				'fill',
				genderArcColor(d.data.gender)
			);
			d3.selectAll('.gender-label-' + d.data.gender).style('font-size', '18px');
		})
		.on('mouseout', (d, i) => {
			// On mouseout, dehighlight the arc and decrease the font-size
			brightenEveryOtherArc('gender', d.data.gender);
			d3.select('#arc-gender-' + d.data.gender).style(
				'fill',
				genderColor(d.data.gender)
			);
			d3.selectAll('.gender-label-' + d.data.gender).style('font-size', '16px');
		})
		.append('title')
		.text(d => d.data.gender);

	// Add text to the arcs
	var text = g
		.selectAll('text')
		.data(pie(compData))
		.enter()
		.append('text')
		.attr('transform', d => {
			// Position the label based on the arc size
			return 'translate(' + arcLabel.centroid(d) + ')';
		})
		.attr('dy', '0.35em');

	// Add gender label
	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '-0.7em')
		.attr('fill-opacity', 0.7)
		.attr('class', d => 'd3-data-label gender-label-' + d.data.gender)
		.attr('id', d => 'label-gender-' + d.data.gender)
		.text(d => d.data.gender);

	// Add amount label
	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '0.7em')
		.attr('fill-opacity', 0.5)
		.attr('class', d => 'd3-data-gender-label gender-label-' + d.data.gender)
		.attr('id', d => 'label-averageTip-' + d.data.gender)
		.attr('fill', '#014b00')
		.text(d => '$' + d.data.averageTip);

	// Add percentage label
	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '1.6em')
		.attr('fill-opacity', 0.5)
		.attr('class', d => 'd3-data-gender-label gender-label-' + d.data.gender)
		.attr('id', d => 'label-percentage-' + d.data.gender)
		.text(d => d.data.percentage + '%');
}

function averageTipVsAge(compData) {
	// Color mapping to gender for main chart
	var ageColor = d3
		.scaleOrdinal()
		.domain(['lt20', '20-30', '30-40', '40-50', '50pl'])
		.range(['#6897bb', '#99ff99', '#ffff99', '#ffcc99', '#ecb8a5']);

	// Color mapping to gender for hovering
	var ageArcColor = d3
		.scaleOrdinal()
		.domain(['lt20', '20-30', '30-40', '40-50', '50pl'])
		.range(['#87acc7', '#c4fbc4', '#ffffd8', '#fbdfc4', '#f4cdbf']);

	// Get width and height of the given div the chart will go in
	var chartWidth = document.getElementById('average-tip-vs-age').offsetWidth;
	var chartHeight = document.getElementById('average-tip-vs-age').offsetHeight;
	var radius = setDimensions(chartWidth, chartHeight) / 2;

	// Get composite data for tips based on age
	// var compData = generateTipVsAgeCompositeData();

	// Create angle generator for doughnut chart
	var pie = d3
		.pie()
		.value(d => d.averageTip)
		.sort(d => d.gender)
		.padAngle(0.025);

	// Create arc generator for doughnut chart
	var arc = d3
		.arc()
		.innerRadius(radius * 0.75)
		.outerRadius(radius);

	// Create arc generator for text for doughnut chart
	var arcLabel = d3
		.arc()
		.innerRadius(radius * 0.4)
		.outerRadius(radius * 0.4);

	// Add SVG to div and center it within div
	var svg = d3
		.select('#average-tip-vs-age')
		.append('svg')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('text-anchor', 'middle');

	// If height > width
	if (hGtW) {
		// Set the height without margins, and the width with margins
		// Make the font slightly smaller
		svg
			.attr('height', height)
			.attr('width', width + margin.left + margin.right)
			.style('font', '10px sans-serif');
	} else {
		// Set the height with margin, and the width without margins
		svg
			.attr('height', height + margin.top + margin.bottom)
			.attr('width', width)
			.style('font', '12px sans-serif');
	}

	// Add a group and center it within the SVG
	var g = svg
		.append('g')
		.attr('transform', 'translate(' + radius + ',' + radius + ')');

	// Draw the graph
	g.selectAll('path')
		.data(pie(compData))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', d => {
			return ageColor(d.data.age);
		})
		.attr('stroke', 'white')
		.attr('id', d => 'arc-age-' + d.data.age)
		.attr('class', 'd3-age-arc')
		.on('mouseover', (d, i) => {
			// On mouseover, highlight the arc and increase the font-size
			dullEveryOtherArc('age', d.data.age);
			d3.select('#arc-age-' + d.data.age).style(
				'fill',
				ageArcColor(d.data.age)
			);
			d3.selectAll('.age-label-' + d.data.age).style('font-size', '18px');
		})
		.on('mouseout', (d, i) => {
			// On mouseout, dehighlight the arc and decrease the font-size
			brightenEveryOtherArc('age', d.data.age);
			d3.select('#arc-age-' + d.data.age).style('fill', ageColor(d.data.age));
			d3.selectAll('.age-label-' + d.data.age).style('font-size', '12px');
		})
		.append('title')
		.text(d => d.data.age);

	// Add text to the arcs
	var text = g
		.selectAll('text')
		.data(pie(compData))
		.enter()
		.append('text')
		.attr('transform', d => {
			// Position the label based on the arc size
			return 'translate(' + arcLabel.centroid(d) + ')';
		})
		.attr('dy', '0.35em');

	// Add gender label
	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '-0.7em')
		.attr('fill-opacity', 0.7)
		.attr('class', d => 'd3-data-age-label age-label-' + d.data.age)
		.attr('id', d => 'label-age-' + d.data.age)
		.text(d => {
			if (d.data.age == 'lt20') return '<20';
			if (d.data.age == '50pl') return '50+';
			return d.data.age;
		});

	// Add amount label
	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '0.7em')
		.attr('fill-opacity', 0.5)
		.attr('class', d => 'd3-data-age-label age-label-' + d.data.age)
		.attr('id', d => 'label-averageTip-' + d.data.age)
		.attr('fill', '#014b00')
		.text(d => '$' + d.data.averageTip);

	// Add percentage label
	text
		.append('tspan')
		.attr('x', 0)
		.attr('y', '1.6em')
		.attr('fill-opacity', 0.5)
		.attr('class', d => 'd3-data-age-label age-label-' + d.data.age)
		.attr('id', d => 'label-percentage-' + d.data.age)
		.text(d => d.data.percentage + '%');
}

function createGraphs(data) {
	d3.selectAll('svg').remove();
	averageTipVsGender(generateTipVsGenderCompositeData(data));
	averageTipVsAge(generateTipVsAgeCompositeData(data));
}

export { createGraphs };
