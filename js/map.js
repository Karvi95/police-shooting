// Function to draw your map
var drawMap = function() {
// Create map and set view
	var map = L.map('map').setView([40, -100], 5)
// Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	}).addTo(map);
// Execute your function to get data
	getData(map)
}

// Function for getting data
var getData = function(map) {
// Execute an AJAX request to get the data in data/response.js
	var data;
	$.ajax({
		url: 'data/response.json',
		type: "get",
		success:function(dat) {
			data = dat
			customBuild(data, map);
		},
		dataType:"json"
	})

// When your request is successful, call your customBuild function
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	var victimKilled = new L.LayerGroup([]);
	var victimHit = new L.LayerGroup([]);
	var armedMale = 0;
	var unarmedMale = 0;
	var armedFemale = 0;
	var unarmedFemale = 0;
	for(var i = 0; i < data.length; i++) {
		if (data[i]["Hit or Killed?"] === "Killed") {               
			var circle = new L.circleMarker([data[i].lat, data[i].lng], 3, {
				fillColor: 'red',
			});
			circle.addTo(victimKilled);
		}
		else {
			var circle = new L.circleMarker([data[i].lat, data[i].lng], 1, {
				color: '#000000'
			});
			circle.addTo(victimHit);
		}
		
		circle.bindPopup(data[i]["Summary"]);
		
		if (data[i]["Armed or Unarmed?"] == "Armed")  { 
			if (data[i]["Victim's Gender"] == "Male") {
				armedMale += 1;
			}
			else {
				armedFemale += 1;
			}
		}
		else {
			if (data[i]["Victim's Gender"] == "Male") {
				unarmedMale += 1;
			}
			else {
				unarmedFemale += 1;
			}	
		}
	};
	document.getElementById("armedMale").innerHTML = armedMale;
	document.getElementById("armedFemale").innerHTML = armedFemale;
	document.getElementById("unarmedMale").innerHTML = unarmedMale;
	document.getElementById("unarmedFemale").innerHTML = unarmedFemale;

	victimKilled.addTo(map);
	victimHit.addTo(map);
	var layers = {
		"Killed Victim": victimKilled,
		"Hit/Unspecified Victim": victimHit
	};
	
	L.control.layers(null, layers).addTo(map);
}