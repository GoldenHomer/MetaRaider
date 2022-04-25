window.onload = function() {
	var input = document.getElementById('xmlFile');
	var display = document.getElementById('xmlDisplay');
	
	input.addEventListener('change', function(e){
		// Clear div content with id display.
		$('#display').empty();
		
		var file = input.files[0];
		var reader = new FileReader();
		
		if(input){
			info = "Name: " + file.name + "<br>" +
					"Size: " + (file.size)/1000 + " kb<br>";
			document.getElementById("xmlInfo").innerHTML = info;
		}
		
		reader.onload = function(e) {
			display.innerText = reader.result;
		}
		display.style.display = 'block';
		reader.readAsText(file);
		
		
		var xhttp = new XMLHttpRequest();
	
		//Very important to create a URL for AJAX to work with, even if fake.
		var fakeFileURL = URL.createObjectURL(file);
		console.log(fakeFileURL);
		
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				console.log("state = 4 and status = 200");
				myFunction(xhttp);
			}
		};
		
		xhttp.open("GET", fakeFileURL, true);
		xhttp.send();
		
		function myFunction(xml) {
			var termNames = /:[^>]*/gm; //Includes duplicate matches (look at console log)
			var fieldValues = />[^<]*\w+/gm; // field values between > <
			var checkSimpleDWCformat = /SimpleDarwinRecordSet/gm; // check for simple darwin core format
			
			var termMatches = xml.responseText.match(termNames);
			var fieldMatches = xml.responseText.match(fieldValues);
			var formatMatch = xml.responseText.match(checkSimpleDWCformat);
			console.log(termMatches);
			
			//Remove duplicate elements
			var uniqueTerms = termMatches.filter(function(elem, pos){
			  return termMatches.indexOf(elem) == pos;
			});
			//Don't need first and last elements
			uniqueTerms.shift();
			uniqueTerms.shift();
			
			console.log(uniqueTerms);
			console.log(fieldMatches);
			
			$(".alert-danger").remove();
			
			if(formatMatch === null){
				$(".alert-info").after("<div class='alert alert-danger' role='alert'>The file you uploaded is not of Simple Darwin Core format.</div>");
				return; //terminate javascript
			}
			/*if(matches != null){
				//Show buttons
				document.getElementById("lock").style.display = "inline";
				document.getElementById("refresh").style.display = "inline";
				document.getElementById("reset").style.display = "inline";
			}*/
			
			var i;
			// Did not include tooltips but could easily do so.
			for(i=0; i < uniqueTerms.length; i++){
				$("#display").append("" +
					"<div class='form-group'>" +
						"<label class='col-sm-2 control-label'>"+ uniqueTerms[i].charAt(1).toUpperCase() + uniqueTerms[i].slice(2) +"</label>" +
						"<div class='col-sm-3'>" +
							"<input type='text' class='form-control add' name='"+ uniqueTerms[i].slice(1) +"' value='"+ fieldMatches[i].slice(1) +"'>" +
						"</div>" +
						"<a href='#' class='copy'>Copy</a>&nbsp;&nbsp;" +
						"<a href='#' class='remove_field'>Remove</a>" +
					"</div>"
				);
			}
		}
	});
}