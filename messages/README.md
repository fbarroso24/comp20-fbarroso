Filipe Barroso <br>
Comp 20: Web Engineering <br>
Lab 6: Messaging<p>>

--
1) Identify what aspects of the work have been correctly implemented and what have not.<br/>

	Navigating to <a href=http://tuftsdev.github.io/comp20-fbarroso/messages/>http://tuftsdev.github.io/comp20-fbarroso/messages</a> 
	will parse the json data located in data.json and add each message object to the messages section in the order 
	in which they appear in data.json.

	Alternatively, I was also able to test it locally by running the following command.
	<code>python -m SimpleHTTPHeader</code>  from the root of my comp20-fbarroso dir. 

--
2) Identify anyone with whom you have collaborated or discussed the assignment.

--
3) Say approximately how many hours you have spent completing the assignment.<br/>
	3 Hours

--
4) Is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) 
or from your local machine (from file:///) from using XMLHttpRequest? Why or why not?<br/>

	By default it is not possibly due to the browser's Same Origin Policy.  This policy dictates 
	that the only XMLHttpRequests that will succeed to the host are the ones that come from the host
	that served up the original web page.

	One way to get around it is by using the Cross-Origin Resource Sharing.  This standard
	extends HTTP with a new Origin requrest header and a new 'Access-Control-Allow-Origin'
	response header.  The latter header can be set on the server to explicitly allow
	a list of origins that may requrest a file from the server.
