Filipe Barroso <br>
Comp 20: Web Engineering <br>
Assignment 2: Marauder's Map<br>

--
1) Identify what aspects of the work have been correctly implemented and what have not.<br/>

	1. An HTML file named index.html, containing JavaScript, was created in a folder named mmap.
	2. A CSS file named mmap.css was created to decorate the map's div & html/body tags.
	3. The JavaScript 'navigator.geolocation' object was used to retrieve a user's geolocation
		information (i.e latitude and longitude).
	4. A JavaScript XMLHttpRequest object was used to send geolocation data and manage the response
		data.  This was sent to (https://secret-about-box.herokuapp.com/sendLocation) and leveraged
		Ming's datastore API.  The POST request takes 3 parameters (login, lat, & lng) and returns
		a JSON object that looks like:
		[{"_id":"54e95ff46cca2a030048cf14","login":"mchow","lat":40.67693,"lng":117.23193,"created_at":"2015-02-22T05:12:24.596Z"},...
	5. The user's location is displayed on the map and identified by a unique marker (i.e flag icon).
		Additionally, an info window is created that displays their username & geolocation.  This was
		all done using Google Maps API. A tutorial can be found 
		[here](https://developers.google.com/maps/documentation/javascript/tutorial)
	6. A marker is added to the map for every user that is returned from Ming's datastore API.
		Additionally, an info window is created that displays the person's login and distance away from you.
		The distance was calculated using the Haversine Formula (i.e the distance between two geo points).
		(http://www.movable-type.co.uk/scripts/latlong.html)
--
2) Identify anyone with whom you have collaborated or discussed the assignment. <br/>

	I spoke with a TA regarding the best way to debug it w/o having to use gh-pages.
	The answer was to use 'python -m SimpleHTTPServer' to test it out in my locatl environment.
--
3) Say approximately how many hours you have spent completing the assignment.<br/>

	10 Hours

4) How do you test it? <br/>

	To test it out, please navigate to (http://tuftsdev.github.io/comp20-fbarroso/mmap/).  When prompted,
	please allow the browser to retrieve your geolocation.  Otherwise, it will not be able to position
	your marker on the map and therefore cannot calculate the distances from other people to you.
