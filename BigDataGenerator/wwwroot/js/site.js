//RAPID API Settings for fetching data.
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://binubuo.p.rapidapi.com/data/standard/computer/user_list?rows=5&locale=US",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "4076bee23bmshc4fa7508ddad31fp148ebejsnd282411d036d",
		"X-RapidAPI-Host": "binubuo.p.rapidapi.com"
	}
};

//This will be executed when the document (page) is ready.
$(document).ready(function () {
	//We can hook multiple components here, since the document (page) is ready.
	//read YES
	//We will hook this method to our button, so the button can be handled here not by the server.
	//We will pass our button Id, and specify the event 'Click'.
	$("#FetchButton").on('click', e =>
	{
		e.preventDefault();
		console.log("Attempting to make a request to rapid api");

		//Here we will use AJAX for posting a request, it will take all of the data from the settings.
		//The settings will contain the URL, RequestType (POST/GET), HEADERS, etc.
		$.ajax(settings).done(function (response) //.done means when its fully done and finished the request, then we can see the response.
		{
			console.log(response);
			const textAreaComponent = document.getElementById('FetchedDataTextArea'); //Get the TextArea component using the Id.
			textAreaComponent.value = JSON.stringify(response); //This is to parse the response into json.
			console.log("Finished getting the data from rapid api");
		});
	});

	//This will copy the content from the text area component.
	$("#CopyButton").on('click', e => {
		e.preventDefault();

		console.log("Attempting to copy data from text area");

		const textAreaComponent = document.getElementById('FetchedDataTextArea');
		textAreaComponent.select();
		navigator.clipboard.writeText(textAreaComponent.value);

		console.log("Finished copying data");
	});

	//This will clear the content from the text area component for the home page.
	$("#ClearFetchedDataButton").on('click', e => {
		e.preventDefault();

		console.log("Attempting to clear data from text area");

		const textAreaComponent = document.getElementById('FetchedDataTextArea');
		textAreaComponent.value = "";

		console.log("Finished clearing data");
	});

	//This will clear the content from the text area component for the formatter page and will clear the table rows if any found.
	$("#ClearInputDataButton").on('click', e => {
		e.preventDefault();

		console.log("Attempting to clear data from text area");

		const textAreaComponent = document.getElementById('InputDataTextArea');
		textAreaComponent.value = "";

		$("#ResultTable tr").remove();

		console.log("Finished clearing data");
	});


	//This will format the json into tabular form so it can be understandable.
	$("#FormatInputDataButton").on('click', e => {
		e.preventDefault();

		console.log("Attempting to format the json data into tabular form");
		const textAreaComponent = document.getElementById('InputDataTextArea');

		try {
			//So now we store the parsed json in a variable called jsonData.
			const jsonData = JSON.parse(textAreaComponent.value);

			//Now i know the json is an array, so i need to count the length of the array
			//to loop, ok ?
			//So the json is called 'User list' then i count how many keys in it which actually
			//represents the length then i store it in a variable.
			let length = Object.keys(jsonData["User list"]).length;

			//I print the length which is 5, we have 5 users always.
			console.log("Array length: " + length);

			//I loop 5 times, from 0 to 4.
			for (var i = 0; i < length; i++) {
				//Now we need to access each item from the json.
				//Each item is a user that has many fields like username, state, email, etc.
				//Then i will send the item to a function called "InsertIntoTable" to view the user
				//in a understandable way.
				InsertIntoTable(jsonData["User list"][i]);
			}
		}
		catch (error) {
			//Clear the input data for the text area in case of failure.
			textAreaComponent.value = "";
			//Remove the rows if there was any, in case of failure.
			$("#ResultTable tr").remove();

			console.error(error);
		}
		console.log("Finished formatting data");
	});
});

function InsertIntoTable(user) {
	try {
		//Here we can access the user fields like username, email, address1, state, etc.
		$('#ResultTable tbody').append(
			$('<tr>').append(
				$('<td>').text(user["USERNAME"]),
				$('<td>').text(user["EMAIL"]),
				$('<td>').text(user["ADDRESS1"]),
				$('<td>').text(user["STATE"])
			)
		);
	}
	catch (error) {
		console.log(error);
	}
	console.log("User inserted successfully");
}