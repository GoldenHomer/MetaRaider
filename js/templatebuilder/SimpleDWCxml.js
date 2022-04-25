$(function () {
  $('#PreviewButton').click(update);
});

function saveFileName (){
	var fileName = $('#fileName').val();
	$('#DownloadLink').attr('download', fileName + '.xml');
}

function update() {
  //If user does not name file, default name is default.xml
  $('#DownloadLink').attr('download', 'default.xml');
  
  // Template is the array of strings that are shown to the user.
  var template = [
  '<?xml version="1.0" encoding="UTF-8" ?>',
  '<dwr:SimpleDarwinRecordSet>',
  '<dwr:SimpleDarwinRecord>\n',
  ].join('\r\n');
  
  var termName = [];
  var newTermName = [];
  var termValue = [];

  $(".add").each(function(){
	termName.push($(this).attr("name"));
	newTermName.push($(this).val());
  });
  
  $(".value").each(function(){
	termValue.push($(this).val());
  });
  
  console.log(termName);
  console.log(newTermName);
  console.log(termValue);
  
  var j;
  
  for(j=0; j < termName.length; j++) {
	if(newTermName[j]) {
		template = template.concat("\n<!-- "+ newTermName[j] +" field -->\n<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">\n");
	}
	else if(!newTermName[j]){
		template = template.concat("\n<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">\n");
	}
  }
  
  var newXml = template.concat('\n</dwr:SimpleDarwinRecord>'+'\n</dwr:SimpleDarwinRecordSet>');
  
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