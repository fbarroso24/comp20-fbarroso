function parse() {
	// Step 1: create instance of object
	request = new XMLHttpRequest();
	
	// Step 2: create or "open" HTTP request
	request.open("GET", "data.json", true);
	
	// Step 3: Set up way to manage response -- to a function
	request.onreadystatechange = parseData;
	
	// Step 4: Execute the request
	request.send();
}

function parseData() {
	// console.log("The ready state is" + request.readyState);
	if (request.readyState == 4 && request.status == 200) {
		messagesDiv = document.getElementById("messages");
		converted = JSON.parse(request.responseText);
		
		for (key in converted) {
			// console.log(converted[key]['content']);
			messagesDiv.innerHTML += "<p class='message'>" +converted[key]['content'] + " - " + converted[key]['username'];
		}
	} 
	/* For Debugging Purposes Only
	else if (request.readyState == 4 && requrest.status == 304){
		console.log("Nothing changed, move along");
	} else if (request.readyState == 4 && request.status != 200) {
		alert("Hacked by the Chinese");
	} else {
		console.log("Not done yet...");
	} 
	*/
}