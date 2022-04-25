$(document).ready(function(){
	var max_fields = 25;
	var display = $("#display");
	var i = 0;
	
	var titles = document.getElementsByClassName("term"); // Get all titles of terms. Considered by browser as an HTMLCollection
	var titleArray = [];
	var j;
	var description;
	
	// In the for loop, push each title into an array.
	for(j=0; j < titles.length; j++){
		titleArray.push(titles[j].getAttribute('title'));
	}
	
	$("li").click(function(e){ //click on element or term to add an input field
		var htmlString = $('.term', this).html();
		var value = $(this).attr('value');
		var id = $(this).attr('id'); //Grab the unique id number of the term clicked.
		
		// Match the id of the term with the index of the description array so that the correct description appears with the right term. 
		for(j=0; j < titleArray.length; j++){
			if(id === j.toString()){
				description = titleArray[j];
			}
		}
		
		console.log(value);
		console.log(id);
		
		e.preventDefault();
		
		if(i < max_fields){
			i++;
			if (typeof value != 'undefined'){
				if(id == 2){
					$(display).append("" +
					"<div class='form-group'>" +
						"<label for='"+ value +"' class='col-sm-2 control-label'>"+ htmlString +"<img src='img/help.png' title='"+ description +"' height='20' width='20' style='margin-left: 5%'></img></label>" +
						"<div class='col-sm-3'>" +
							"<select name='type' class='form-control add nametype' id='2'>" +
								"<option disabled selected>Name Type</option>" +
								"<option>Current</option>" +
								"<option>Former</option>" +
								"<option>Alternate</option>" +
							"</select>" +
						"</div>" +
						"<div class='col-sm-3'>" +
							"<select name='preferred' class='form-control add preferredname'>" +
								"<option disabled selected>Preferred Name</option>" +
								"<option>True</option>" +
								"<option>False</option>" +
							"</select>" +
						"</div>" +
						"<a href='#' class='remove_field'>Remove</a>" +
					"</div>");
				}
				
				else if(id == 3){
					$(display).append("" +
					"<div class='form-group'>" +
						"<label for='"+ value +"' class='col-sm-2 control-label'>"+ htmlString +"<img src='img/help.png' title='"+ description +"' height='20' width='20' style='margin-left: 5%'></img></label>" +
						"<div class='col-sm-6'>" +
							"<textarea type='text' class='form-control add' name='"+ htmlString +"' id='"+ id +"'></textarea>" + // Used to be value
						"</div>" +
						"<a href='#' class='remove_field'>Remove</a>" +
					"</div>");
				}
				
				else if(id == 11){
					$(display).append("" +
					"<div class='form-group'>" +
						"<label for='' class='col-sm-2 control-label'>Location</label>" +
						"<div class='col-sm-2'>" +
							"<input type='text' class='form-control add' name='location' id='"+ id +"'>" + // Used to be value
						"</div>" +
						"<label for='"+ value +"' class='col-sm-2 control-label'>Location Type</label>" +
						"<div class='col-sm-3'>" +
							"<select name='type' class='form-control add' id='locationType'>" +
								"<option disabled selected>Location Type</option>" +
								"<option value='Admin County'>Admin County</option>" +
								"<option value='Ceremonial County'>Ceremonial County</option>" +
								"<option value='Community'>Community</option>" +
								"<option value='Council Area'>Council Area</option>" +
								"<option value='District'>District</option>" +
								"<option value='District Council Area'>District Council Area </option>" +
								"<option value='Locality'>Locality</option>" +
								"<option value='Named Location'>Named Location</option>" +
								"<option value='National Park'>National Park</option>" +
								"<option value='Non Parish Area'>Non Parish Area</option>" +
								"<option value='Townland'>Townland</option>" +
								"<option value='Unitary Authority'>Unitary Authority</option>" +
								"<option value='Ward'>Ward</option>" +
								"<option value='World Heritage Site'>World Heritage Site</option>" +
							"</select>" +
						"</div>" +
						"<a href='#' class='remove_field'>Remove</a>" +
					"</div>");
				}
				
				else {
					$(display).append("" +
					"<div class='form-group'>" +
						"<label for='"+ value +"' class='col-sm-2 control-label'>"+ htmlString +"<img src='img/help.png' title='"+ description +"' height='20' width='20' style='margin-left: 5%'></img></label>" +
						"<div class='col-sm-3'>" +
							"<input type='text' class='form-control add' name='"+ htmlString +"' id='"+ id +"'>" + // Used to be value
						"</div>" +
						"<a href='#' class='remove_field'>Remove</a>" +
					"</div>");
				}
			}
		}
	});
	
	//Remove functionality
	$(display).on("click", ".remove_field", function(e){
		e.preventDefault();
		$(this).parent("div").remove();
		i--;
	});
});