//Create map object
var map;

//Set constants
var myCentreLat = 53.798; 
var myCentreLng = -1.546;
var initialZoom = 14;
var infowindow;

//Create information window function
function infoCallback(infowindow, marker) {
	return function() {
		infowindow.open(map, marker);
	};
}

//Create the marker adding function
function addMarker(myPos,myTitle,myInfo) {
	
	//Apply constants
	var marker = new google.maps.Marker({
		position: myPos,
		map: map,
		title: myTitle,
		icon: 'img_blue_plaque.png'
	});
	
	infowindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(myInfo);
		infowindow.open(map, this);
	});
}

//Initialize the map
function initialize() {
	
	//Apply constants
	var latlng = new google.maps.LatLng(myCentreLat,myCentreLng);
	var myOptions = {
		zoom: initialZoom,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	// Create the map
	map = new google.maps.Map(
		document.getElementById("map_canvas"),myOptions);
	
	//For each area, create a marker
	for (id in os_markers) {
		var info =  "<div class=infowindow><h2>" +
			os_markers[id].title + "</h2><p>Caption: "
			+ os_markers[id].caption +
			"</p></div>";
		 var osPt = new OSRef(
			os_markers[id].easting,os_markers[id].northing);
		 var llPt = osPt.toLatLng(osPt);
		 llPt.OSGB36ToWGS84();
		
		addMarker(
			new google.maps.LatLng(llPt.lat,llPt.lng),
			os_markers[id].title,info);
	}
}