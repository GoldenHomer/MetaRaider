$(document).ready(function(){
	var display = $("#display");
	var j;
	
	// Get all titles of terms. Considered by browser as an HTMLCollection
	var titles = document.getElementsByClassName("term");
	var titleArray = [];
	var description;
	
	// In the for loop, push each title into an array.
	for(j=0; j < titles.length; j++){
		titleArray.push(titles[j].getAttribute('title'));
	}
	
	$("li").click(function(e){
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
		
		//e.preventDefault();
		
		if (typeof value != 'undefined'){
			$(display).append("" +
			"<div class='form-group'>" +
				"<label class='col-sm-3 control-label'>"+ htmlString +"<img src='img/help.png' title='"+ description +"' height='20' width='20' style='margin-left: 5%'></img></label>" +
				"<div class='col-sm-4'>" +
					"<input type='text' class='form-control add' name='"+ htmlString +"' placeholder='Corresponding name of "+ value +" field'>" +
				"</div>" +
				"<div class='col-sm-4'>" +
					"<input type='text' class='form-control value' placeholder='Value of field'>" +
				"</div>" +
				"<a href='#' class='copy'>Copy</a>&nbsp;&nbsp;" +
				"<a href='#' class='remove_field'>Remove</a>" +
			"</div>");
			document.getElementById("lock").style.display = "inline";
			document.getElementById("refresh").style.display = "inline";
			document.getElementById("reset").style.display = "inline";
		}
	});
	
	//Remove functionality
	$(display).on("click", ".remove_field", function(e){
		e.preventDefault();
		$(this).parent("div").remove();
	});
	
	//Copy functionality
	$(display).on("click", ".copy", function(e){
		e.preventDefault();
		//clone the div that was copy was clicked on and put it directly after the div.
		$(this).parent("div").after($(this).parent("div").clone());
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
});

function lock (){
	$("div > .copy").attr("disabled", "disabled").on("click", function() {
		return false; 
	});
	
	$("div > .remove_field").attr("disabled", "disabled").on("click", function() {
		return false; 
	});
	
	$(".add").prop("disabled", true);
	$(".value").prop("disabled", true);
	$("#reset").prop("disabled", true);
	$("#refresh").prop("disabled", true);
	document.getElementById("lock").style.display = "none";
	document.getElementById("unlock").style.display = "inline";
}

function unlock (){
	$("input").prop("disabled", false);
	$("div > a").removeAttr("disabled").off("click");
	$("#reset").prop("disabled", false);
	$("#refresh").prop("disabled", false);
	document.getElementById("lock").style.display = "inline";
	document.getElementById("unlock").style.display = "none";
}

function reset (){
	$(".add").val('');
	$(".value").val('');
}