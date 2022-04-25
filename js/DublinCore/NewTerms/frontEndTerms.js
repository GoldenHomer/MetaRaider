$(document).ready(function(){
	var max_fields = 10;
	var term_wrapper = $("#term")
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
		var htmlString = $('a', this).html();
		var value = $(this).attr('value'); // type string
		var id = $(this).attr('id'); //Grab the unique id number of the term clicked.
		
		// Match the id of the term with the index of the description array so that the correct description appears with the right term. 
		for(j=0; j < titleArray.length; j++){
			if(id == j){
				description = titleArray[j];
			}
		}
		
		e.preventDefault();
		
		if(i < max_fields){
			i++;
			
			$(term_wrapper).append("" +
			"<div class='form-group term'>" +
				"<label for='"+ value +"' class='col-sm-2 control-label'>"+ htmlString +"<img src='img/help.png' title='"+ description +"' height='20' width='20' style='margin-left: 5%'></img></label>" +
				"<div class='col-sm-6'>" +
					"<input type='text' class='form-control add' name='"+ value +"'>" +
				"</div>" +
				"<a href='#' class='remove_field'>Remove</a>" +
			"</div>");
			
		}
	});
	
	//Remove functionality
	$(term_wrapper).on("click", ".remove_field", function(e){
		e.preventDefault();
		$(this).parent("div").remove();
		i--;
	});
	
	$(".form-group").on("click", ".remove_field", function(e){
		e.preventDefault();
		$(this).parent("div").remove();
	});
	
	// Toggle on and off all terms
	$("#termsBtn").click(function(){
		$("#terms").toggle();
	});
	
	// Clear Fields button
	$("#reset").click(function(){
		$(".add").val('');
		$(".all").val('');
	});
});