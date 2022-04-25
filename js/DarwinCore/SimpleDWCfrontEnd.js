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
				$(display).append("" +
				"<div class='form-group'>" +
					"<label for='"+ value +"' class='col-sm-3 control-label'>"+ htmlString +"<img src='img/help.png' title='"+ description +"' height='20' width='20' style='margin-left: 5%'></img></label>" +
					"<div class='col-sm-6'>" +
						"<input type='text' class='form-control add' name='"+ htmlString +"' id='"+ value +"'>" +
					"</div>" +
					"<a href='#' class='remove_field'>Remove</a>" +
				"</div>");
			}
		}
	});
	
	//Remove functionality
	$(display).on("click", ".remove_field", function(e){
		e.preventDefault();
		$(this).parent("div").remove();
		i--;
	});
	
	
	$(".dropdown-menu > li > a.trigger").on("click",function(e){
		var current=$(this).next();
		var grandparent=$(this).parent().parent();
		if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".sub-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});
	
	$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root=$(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		root.find('.sub-menu:visible').hide();
	});
	
	// Clear Fields button
	$("#reset").click(function(){
		$(".add").val('');
	});
});
