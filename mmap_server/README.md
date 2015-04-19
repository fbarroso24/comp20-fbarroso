Filipe Barroso<br>
April 19, 2015<br>
Assignment 3: Server for Real Marauder's Map<br>
Comp 20: Web Engineering<br>

###Assignment Objectives###

	1. Develop a server-side web application using Heroku, Node.js and the Express
	web framework.
	2. Enable and use Cross-Origin Resource Sharing (CORS)
	3. Read and write data to a MongoDB database.
	4. Build JSON-based APIs.
	
###Assignment Results###

1) Identify what aspects of the work have been correctly implemented and what have not.<br/>

	1. A POST /sendLocation API was created that accepts field names ('login', 'lat, & 'lng).
	When submitted properly, a new entry will be created in the locations collection in Mongo
	and a JSON response will be returned with all the information of all the other checked in 
	users.  
	
	Example JSON response (same as the one seen in the Assignment 2 specification: 
	[{"_id":"54e95ff46cca2a030048cf14","login":"mchow","lat":40.67693,"lng":117.23193,"created_at":"2015-02-22T05:12:24.596Z"},
	{"_id":"54e9619bfd68b4030062ddc2","login":"carmensandiego","lat":-22.951944,"lng":-43.210556,"created_at":"2015-02-22T04:56:59.495Z"},
	{"_id":"54e96122fd96990300d54521","login":"nrnrnr","lat":42.090944,"lng":-71.264344,"created_at":"2015-02-22T04:54:58.589Z"},
	{"_id":"54e960e5fd96990300d54520","login":"kaytea","lat":41.903056,"lng":12.454444,"created_at":"2015-02-22T04:53:57.214Z"}]
	
	If a any of the required fields are missing, the entry is not inserted in the database
	and instead a JSON response is returned in the form of {"error":"whoops, something is 
	wrong with your data!"}. 
	
	If a duplicate login is used, it shall overwrite the previous entry and update the longitude,
	latitude and timestamp rather than creating a new entry for that user.
	
	This can be tested by using the 'Postman' extension for chrome.  To test this:
	1. Select POST HTTP method
	2. Enter in the heroku server, https://secure-brushlands-4105.herokuapp.com/sendLocation
	3. Select 'x-www-form-urlencoded'
	4. Enter in key-value pairs for login, lat, & lng
	   Example:) login: filipe, lat: 42.406, lng: -71.119
	5. Click Send
	
	2. A GET /location.json API was created that returns a JSON string object for a 
	specified login.  The mandatory parameter for this API is login.  If login is 
	empty or no results are found an empty JSON object {} is returned.  Example:
	/location.json?login=kaytea returns {"_id":"54e960e5fd96990300d54520","login":"kaytea",
	"lat":41.903056,"lng":12.454444,"created_at":"2015-02-22T04:53:57.214Z"}
	
	
	3. / - Home, root directory that displays a list of the check-ins for all logins 
	sorted in descending order by timestamp -- the last person who checked-in is displayedIn
	 first.  Login, timestamp, and location (i.e latitude & longitude) are displayed in a 
	 table.  Example: kaytea checked in at 41.903056, 12.454444 on 2015-02-22T04:53:57.214Z
	 
	4. For convenience, I have pushed the code along with the audio to the gh-pages branch.
	It can be viewed and tested here: (http://tuftsdev.github.io/comp20-fbarroso/captainslog/)
	
--
2) Identify anyone with whom you have collaborated or discussed the assignment. <br/>

	No one.
	

--
3) Say approximately how many hours you have spent completing the assignment.<br/>

	15 Hours

	