window.onload = function() {
	var input = document.getElementById('xmlFile');
	var display = document.getElementById('xmlDisplay');
	
	input.addEventListener('change', function(e){
		// Clear div content with id display.
		$('#term').empty();
		
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
			var dcRegex = /<(dc[^>]*)>/gm;
			var comment = /- [^f]* /gm;
			
			var matches = xml.responseText.match(dcRegex);
			var commentMatches = xml.responseText.match(comment);
			console.log(matches);
			console.log(commentMatches);
			
			$(".alert-danger").remove();
			
			if(matches === null){
				$(".alert-info").after("<div class='alert alert-danger' role='alert'>The file you uploaded is not of Dublin Core format.</div>");
			}
			if(matches != null){
				//Show buttons
				document.getElementById("lock").style.display = "inline";
				document.getElementById("refresh").style.display = "inline";
				document.getElementById("reset").style.display = "inline";
			}
			
			var i;
			
			// Did not include tooltips but could easily do so.
			for(i=0; i < matches.length; i++){
				$("#term").append("" +
					"<div class='form-group'>" +
						"<label class='col-sm-2 control-label'>"+ matches[i].slice(9, (matches[i].length-1)) +"</label>" +
						"<div class='col-sm-3'>" +
							"<input type='text' class='form-control add' name='"+ matches[i].slice(9, (matches[i].length-1)) +"' placeholder='Name of "+ matches[i].slice(1, (matches[i].length-1)) +" field' value='"+ commentMatches[i].slice(2, commentMatches[i].length - 1) +"'>" +
						"</div>" +
						"<div class='col-sm-3'>" +
							"<input type='text' class='form-control value' placeholder='Value of field'>" +
						"</div>" +
						"<a href='#' class='copy'>Copy</a>&nbsp;&nbsp;" +
						"<a href='#' class='remove_field'>Remove</a>" +
					"</div>"
				);
			}
		}
	});
}