window.onload = function() {
	var input = document.getElementById('xmlFile');
	var display = document.getElementById('xmlDisplay');
	
	input.addEventListener('change', function(e){
		// Clear div content with id display.
		$('#element').empty();
		
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
				console.log("state = 4 and status = 200!!!!!");
				appendToFrontEnd(xhttp);
			}
		};
		
		xhttp.open("GET", fakeFileURL, true);
		xhttp.send();
		
		function appendToFrontEnd(xml) {
			//var dcRegex = /<(dc[^>]*)>/gm;
			var termNames = /:[^>]*/gm; //Includes duplicate matches (look at console log)
			var fieldValues = />[^<]*\w+/gm; // field values between > <
			var checkForSimpleDarwinFormat = /SimpleDarwinRecordSet/gm;
			
			var termMatches = xml.responseText.match(termNames);
			var fieldMatches = xml.responseText.match(fieldValues);
			var formatMatch = xml.responseText.match(checkForSimpleDarwinFormat);
			
			//Remove duplicate elements
			var uniqueTerms = termMatches.filter(function(elem, pos){
			  return termMatches.indexOf(elem) == pos;
			});
			
			console.log(uniqueTerms);
			console.log(fieldMatches);
			
			$(".alert-danger").remove();
			
			if(formatMatch === null){
				$(".alert-info").after("<div class='alert alert-danger' role='alert'>The file you uploaded is not of Dublin Core format.</div>");
				return; //terminate javascript
			}
			/*if(termMatches != null){
				//Show buttons
				document.getElementById("lock").style.display = "inline";
				document.getElementById("refresh").style.display = "inline";
				document.getElementById("reset").style.display = "inline";
			}*/
			
			var i;
			var j;
			
			// Did not include tooltips but could easily do so.
			for(i=0; i < uniqueTerms.length; i++){
				$("#element").append("" +
					"<div class='form-group'>" +
						"<label class='col-sm-2 control-label'>"+ uniqueTerms[i].slice(1) +"</label>" +
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