$(function () {
  $('#generateXML').click(update);
});

function saveFileName (){
	var fileName = $('#fileName').val();
	$('#DownloadLink').attr('download', fileName + '.xml');
}

function update() {
  $('#DownloadLink').attr('download', 'default.xml');
  
  var template = [];
  var i;
  var j;
  var k;
  
  var boxNumber = parseInt($('#box').val());
  var folders = document.getElementsByClassName("folder"); // Gather all folder numbers for each box
  var checkbox = document.getElementsByClassName("checkbox"); //Gather all boolean values of checkboxes

  var folderArr = [];
  var checkArr = [];
  
  for(i=0; i < folders.length; i++){
		folderArr.push(folders[i].value);
  }
  console.log(folderArr);
  
  for(i=0; i < checkbox.length; i++){
		checkArr.push(checkbox[i].checked);
  }
  console.log(checkArr);
  
  for(j=1; j <= boxNumber; j++) {
	for(k=1; k <= folderArr[j-1]; k++){
		template.push(" <c02>");
		template.push("    <did>");
		template.push("       <container type='box'>"+ j +"</container>");
		template.push("       <container type='folder'>"+ k +"</container>");
		
		if(checkArr[j-1]){
			template.push("       <unittitle><extref href='' show='new' actuate='onrequest'><unitdate era='ce' calendar='gregorian'></unitdate></extref></unittitle>");
		}
		
		template.push("    </did>");
		template.push(" </c02>");
	}
  }
  
  template.unshift("<c01>");
  template.push("</c01>");
  
  var newXml = template.join('\r\n').replace(/,/g, "");

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