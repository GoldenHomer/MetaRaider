$(function () {
  $('#DownloadButton').click(update);
});

//This function saves the input value and adds that attribute to the download prompt when the "save file name" button is clicked.
function saveFileName (){
	var fileName = $('#fileName').val();
	$('#DownloadLink').attr('download', fileName + '.xml');
}

function update() {
  
  // Get the input values that user entered
  var values = {
    //Elements
    Contributor: $('#contributor').val(),
    Coverage: $('#coverage').val(),
    Creator: $('#creator').val(),
    date: $('#date').val(),
    Description: $('#description').val(),
    Format: $('#format').val(),
    Identifier: $('#identifier').val(),
    Language: $('#language').val(),
    Publisher: $('#publisher').val(),
    Relation: $('#relation').val(),
    Rights: $('#rights').val(),
    Source: $('#source').val(),
    Subject: $('#subject').val(),
    Title: $('#title').val(),
    Type: $('#type').val(),
  };
  
  // This function returns a string value dependent on whether the record is a term or element and whether the input value is empty or not.
  // The replace function is to replace some term strings that contain the word Term in them. This is because there are 15 elements that are shared with terms, but still need to be differentiated.
  function stringified(name){

	if(values[name])
		return "<dc:"+ name.toLowerCase() +">"+ values[name] +"</dc:"+ name.toLowerCase() +">";
	return;
  }
  
  // Template is the array of strings that are shown to the user.
  var template = [
  '<?xml version="1.0"?>',
  '<metadata>',
  //Elements
  stringified('Contributor'),
  stringified('Coverage'),
  stringified('Creator'),
  stringified('date'),
  stringified('Description'),
  stringified('Format'),
  stringified('Identifier'),
  stringified('Language'),
  stringified('Publisher'),
  stringified('Relation'),
  stringified('Rights'),
  stringified('Source'),
  stringified('Subject'),
  stringified('Title'),
  stringified('Type')
  ].join('\r\n').replace(/^\s*[\r\n]/gm,""); //This replace function takes out empty lines since a record that doesn't contain a input value would return a line with whitespace.
  
  var termName = [];
  var termValue = [];
  
  $(".add").each(function(){
	termName.push($(this).attr("name"));
	termValue.push($(this).val());
  });
  
  var j;
  for(j=0; j < termName.length; j++) {
	template = template.concat("\n<dc:"+ termName[j] +">"+ termValue[j] +"</dc:"+ termName[j] +">");
  }

  var newXml = template.concat('\n</metadata>');
  
// Allow browser to download. Source: https://developers.google.com/web/updates/2011/08/Downloading-resources-in-HTML5-a-download 
  $('#ResultXml').val(newXml);
  $('#DownloadLink')
    .attr('href', 'data:text/xml;base64,' + btoa(newXml))
  $('#generated').show();
}

// You won't need to modify below. 
// Can't believe the URL doesn't work. This is how long I've been working on MetaRaider. Like end of 2015 to now, May 2018.
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