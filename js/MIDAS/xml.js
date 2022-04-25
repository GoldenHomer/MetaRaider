$(function () {
  $('#DownloadButton').click(update);
});

function saveFileName (){
	var fileName = $('#fileName').val();
	$('#DownloadLink').attr('download', fileName + '.xml');
}

function update() {
  $('#DownloadLink').attr('download', 'default.xml');
  
  var template = [
  '<?xml version="1.0" encoding="ISO-8859-1"?>',
  '<monuments xmlns:ns="http://www.heritage-standards.org/midas/schema/1.0">',
  '<monument>'
  ];
  //.join('\r\n');
  //.replace(/^\s*[\r\n]/gm, "") //This replace function takes out empty lines since a record that doesn't contain a input value would return a line with whitespace.
  
  var termName = [];
  var termValue = [];
  var idNum = [];

  $('.add').each(function(){
	termName.push($(this).attr('name'));
	termValue.push($(this).val());
	idNum.push($(this).attr('id'));
  });
  
  console.log(termName);
  console.log(termValue);
  console.log(idNum);
  
  var appellation = [];
  var description = [];
  var actor = [];
  var designation = [];
  
  var address = [];
  var namedplace = [];
  var place = [];
  
  var quickpoint = [];
  var spatial = [];
  
  var display = [];
  var start = [];
  var end = [];
  var type = [];
  
  var type2 = [];
  
  var appellation2 = [];
  var contacts = [];
  var address2 = [];
  var reference = [];
  
  var characters = [];
  
  var j;
  
  for(j=0; j < termName.length; j++) {
	if(typeof termValue !== 'undefined' && termValue.length > 0) {
		
		switch(idNum[j]){
				case '0':
					appellation.push("<identifier type='Despositor ID' namespace='ADS'>"+ termValue[j] +"</identifier>");
					break;
				case '1':
					appellation.push("<identifier type='Import RCN' namespace='ADS'>"+ termValue[j] +"</identifier>");
					break
				case '2':
					var nameTypeValue = $(".nametype").children(':selected').text();
					var preferredNameValue = $('.preferredname').children(':selected').text();
					appellation.push("<name type='"+ nameTypeValue + "' preferred='"+ preferredNameValue + "'></name>");
					break;
		}

		if(idNum[j] == 3){
			description.push("<full>" + termValue[j] +"</full>");
		}
		
		if(idNum[j] > 3 && idNum[j] < 7){
			switch(idNum[j]){
				case '4':
					designation.push("<status>" + termValue[j] + "</status>");
					break;
				case '5':
					designation.push("<grade>" + termValue[j] + "</grade>");
					break
				case '6':
					designation.push("<date>" + termValue[j] + "</date>");
					break;
			}
		}
			
		
		if(idNum[j] > 6 && idNum[j] < 23){
			
			switch(idNum[j]){
				case '7':
					address.push("<streetaddress>"+ termValue[j] +"</streetaddress>");
					break;
				case '8':
					address.push("<city>"+ termValue[j] +"</city>");
					break
				case '9':
					address.push("<county>"+ termValue[j] +"</county>");
					break;
				case '10':
					address.push("<postcode>"+ termValue[j] +"</postcode>");
					break;
				case '11':
					var locationTypeValue = $("#locationType").children(':selected').text();
					console.log(locationTypeValue);
					namedplace.push("<location type='"+ locationTypeValue +"'>"+ termValue[j] +"</location>");
					break;
				case '12':
					place.push("<directions>"+ termValue[j] +"</directions>");
					break;
				case '13':
					place.push("<gridref namespace='OSGB36'>"+ termValue[j] +"</gridref>");
					break;
				case '14':
					quickpoint.push("<x>"+ termValue[j] +"</x>");
					break;
				case '15':
					quickpoint.push("<y>"+ termValue[j] +"</y>");
					break;
				case '16':
					quickpoint.push("<capturemethod>"+ termValue[j] +"</capturemethod>");
					break
				case '17':
					type.push("<monumenttype namespace='EH_TMT2'>"+ termValue[j] +"</monumenttype>");
					break;
				case '18':
					type2.push("<material type='Main'>"+ termValue[j] +"</material>");
					break;
				case '19':
					type2.push("<material type='Covering'>"+ termValue[j] +"</material>");
					break;
				case '20':
					display.push("<appellation>"+ termValue[j] +"</appellation>");
					break;
				case '21':
					start.push("<appellation type='Min Date'>"+ termValue[j] +"</appellation>");
					break;
				case '22':
					end.push("<appellation type='Max Date'>"+ termValue[j] +"</appellation>");
					break;
			}
		}
		
		if(idNum[j] > 22 && idNum[j] < 31){
			//testing to see if switch statement will work - it does.
			switch(idNum[j]){
				case '23':
					actor.unshift("<role type='Role'>"+ termValue[j] +"</role>");
					break;
				case '24':
					appellation2.push("<name preferred='true' type='current'>"+ termValue[j] +"</name>");
					break
				case '25':
					appellation2.push("<identifier type='Publisher ID' namespace='ADS'>"+ termValue[j] +"</identifier>");
					break;
				case '26':
					contacts.push("<organisation>"+ termValue[j] +"</organisation>");
					break;
				case '27':
					address2.push("<streetaddress>"+ termValue[j] +"</streetaddress>");
					break;
				case '28':
					address2.push("<adminarea>"+ termValue[j] +"</adminarea>");
					break;
				case '29':
					address2.push("<postcode>"+ termValue[j] +"</postcode>");
					break;
				case '30':
					address2.push("<country>"+ termValue[j] +"</country>");
					break;
			}
		}
		
		if(idNum[j] == 31){
			reference.push("<full>"+ termValue[j] +"</full>");
		}
	}
  }
	
  if(typeof appellation !== 'undefined' && appellation.length > 0){
	  appellation.unshift('<appellation>');
	  appellation.push('</appellation>');
  }
  
  if(typeof description !== 'undefined' && description.length > 0){
	  description.unshift('<description source="List Entry" preferred="True">');
	  description.push('</description>');
  }
  
  if(typeof designation !== 'undefined' && designation.length > 0){
	  designation.unshift('<designation>');
	  designation.push('</designation>');
	  designation.unshift('<designations>');
	  designation.push('</designations>');
  }
  
  if(typeof address !== 'undefined' && address.length > 0){
	  address.unshift('<address>');
	  address.push('</address>');
  }
  
  if(typeof namedplace !== 'undefined' && namedplace.length > 0){
	  namedplace.unshift('<namedplace>');
	  namedplace.push('</namedplace>');
  }
  
  if(typeof place !== 'undefined' && place.length > 0){
	place = place.concat(address, namedplace);
	place.unshift('<place>');
	place.push('</place>');
  }
  
  if(typeof quickpoint !== 'undefined' && quickpoint.length > 0){
	  quickpoint.unshift('<srs>EPSG:27700</srs>');
	  quickpoint.unshift('<quickpoint>');
	  quickpoint.push('</quickpoint>');
	  quickpoint.unshift('<spatialappellation>');
	  quickpoint.push('</spatialappellation>');
	  quickpoint.unshift('<geometry>');
	  quickpoint.push('</geometry>');
  }
  
  if(spatial.length == 0){
	  spatial = spatial.concat(place, quickpoint);

	  if(spatial.length > 0){
		spatial.unshift('<spatial>');
		spatial.push('</spatial>');
	  }
  }
  
  if(typeof display !== 'undefined' && display.length > 0){
	  display.unshift('<display>');
	  display.push('</display>');
  }
  
  if(typeof start !== 'undefined' && start.length > 0){
	  start.unshift('<start>');
	  start.push('</start>');
  }
  
  if(typeof end !== 'undefined' && end.length > 0){
	  end.unshift('<end>');
	  end.push('</end>');
  }
  
  if(typeof type !== 'undefined' && type.length > 0){
	  type = type.concat(display, start, end);
	  console.log(type);
	  type.unshift('<span>');
	  type.push('</span>');
	  type.unshift('<temporal>');
	  type.push('</temporal>');
	  type.unshift('<type>');
	  type.push('</type>');
  }
  
  if(typeof type2 !== 'undefined' && type2.length > 0){
	  type2.unshift('<materials>');
	  type2.push('</materials>');
	  type2.unshift('<type>');
	  type2.push('</type>');
  }
  
  if(typeof appellation2 !== 'undefined' && appellation2.length > 0){
	  appellation2.unshift('<appellation>');
	  appellation2.push('</appellation>');
  }
  
  console.log(appellation2);
  
  if(typeof address2 !== 'undefined' && address2.length > 0){
	  address2.unshift('<address>');
	  address2.push('</address>');
  }

  console.log(address2);
  
  if(typeof contacts !== 'undefined' && contacts.length > 0){
	  contacts = contacts.concat(address2);
	  contacts.unshift('<contact>');
	  contacts.push('</contact>');
	  contacts.unshift('<contacts>');
	  contacts.push('</contacts>');
  }
  
  console.log(contacts);
  
  if(typeof actor !== 'undefined' && actor.length > 0){
	  actor = actor.concat(appellation2, contacts);
	  actor.unshift('<actor type="organisation">');
	  actor.push('</actor>');
	  actor.unshift('<actors>');
	  actor.push('</actors>');
  }
  
  console.log(actor);
  
  if(typeof reference !== 'undefined' && reference.length > 0){
	  reference.unshift('<description>');
	  reference.push('</description>');
	  reference.unshift('<reference>');
	  reference.push('</reference>');
	  reference.unshift('<references xmlns:ns="http://www.heritage-standards.org/midas/schema/1.0">');
	  reference.push('</references>');
  }
  
  if(typeof characters !== 'undefined' && characters.length > 0){
	  characters = characters.concat(spatial, type, type2);
	  console.log(characters);
	  characters.unshift('<character>');
	  characters.push('</character>');
	  characters.unshift('<characters>');
	  characters.push('</characters>');
  }
  
  var newXml = template.concat(appellation, description, actor, designation, characters, reference, ['</monument>', '</monuments>']).join('\r\n').replace(/,/g, "");

// Allow browser to download. Source: https://developers.google.com/web/updates/2011/08/Downloading-resources-in-HTML5-a-download 
  $('#ResultXml').val(newXml);
  $('#DownloadLink')
    .attr('href', 'data:text/xml;base64,' + btoa(newXml))
  $('#generated').show();
}

if (!window.btoa) {
  // Source: http://www.koders.com/javascript/fid78168FE1380F7420FB7B7CD8BAEAE58929523C17.aspx
  btoa = function (input) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    
    var result = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    
    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } 
      else if (isNaN(chr3)) {
        enc4 = 64;
      }
      
      result += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
    } while (i < input.length);
      
    return result;
  };
}