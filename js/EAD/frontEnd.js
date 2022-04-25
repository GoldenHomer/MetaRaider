$(document).ready(function(){
	var i;
	//var display = $("#display");
	var display = $("#tbody");
	$("#box").keypress(function(e){
		if(e.which == 13){
			document.getElementById("display").style.display = "inline-table";
			//Get the number from Boxes input field
			var boxNumber = parseInt($('#box').val());
			//Clear the display div3
			display.html('');
			
			for(i=1; i <= boxNumber; i++){
				/*$(display).append("" +
					"<div class='form-group' style='background-color:#fcfdfd;'>" +
						"<label class='col-sm-1 control-label'>Box "+ i +"</label>" +
						"<div class='col-sm-2'>" +
							"<input type='text' class='form-control folder' placeholder='Enter # of folders'>" +
							"Include unit title? <input type='checkbox' class='checkbox' style='display:inline;'>" +
						"</div>" +
					"</div><br>"
				);*/
				$(display).append("" +
					"<tr>" +
						"<th scope='row'>"+i+"</th>" +
						"<td><input type='text' class='form-control folder' placeholder='# of folders'></td>" +
						"<td>Include unit title? <input type='checkbox' class='checkbox' style='display:inline;'></td>" +
					"</tr>"
				)
			}
			document.getElementById("generateXML").style.display = "inline-flex";
		}
	});
});