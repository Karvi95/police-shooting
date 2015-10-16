// assign global variable to data
// go to console to print in global variable

var globalData = "GLOBALDATA";	

// Function to draw your map
var drawMap = function() {
// Create map and set view
	var map = L.map('map').setView([40, -100], 5)
// Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
// Execute your function to get data
	getData(map)
}

// Function for getting data
var getData = function(map) {
// Execute an AJAX request to get the data in data/response.js
	$.get('data/response.json', function(data) {
		console.log(globalData);
		customBuild(data, map);
	});
	console.log("successful AJAX");
// When your request is successful, call your customBuild function
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
// Be sure to add each layer to the map
	var victimArmed = new L.LayerGroup([]);
	var victimUnarmed = new L.LayerGroup([]);
	for(var i = 0; i < data.length; i++) {
	
		if (data[i]["Armed or Unarmed"] == "Armed")  {
			if (data[i]["Hit or Killed"] == "Killed") {
				var circle = new L.circleMarker([data[i].lat, data[i].lng], 'red');
			}
			else {
				var circle = new L.circleMarker([data[i].lat, data[i].lng], 'black');	
			}
			circle.addTo(victimArmed);
		}
		else {  
			if (data[i]["Hit or Killed"] == "Killed") {
				var circle = new L.circleMarker([data[i].lat, data[i].lng], 'red');
			}
			else {
				var circle = new L.circleMarker([data[i].lat, data[i].lng], 'black');	
			}
			circle.addTo(victimUnarmed);
		};
	};

	var layers = {
		"Armed Victim": victimArmed,
		"Unarmed Victim": victimUnarmed
	}
	
	L.control.layers(null, layers).addTo(map);
}