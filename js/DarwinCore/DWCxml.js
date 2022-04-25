$(function () {
  $('#DownloadButton').click(update);
});

function saveFileName (){
	var fileName = $('#fileName').val();
	$('#DownloadLink').attr('download', fileName + '.xml');
}

function update() {
  // if user doesn't specify a file name, use this...
  $('#DownloadLink').attr('download', 'myDarwinCore.xml');
  
  // Template is the array of strings that are shown to the user.
  var template = [
  '<?xml version="1.0" encoding="UTF-8" ?>',
  '<dwr:DarwinRecordSet>',
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
  
  var event = [];
  var location = [];
  var occurrence = [];
  var identification = [];
  var taxon = [];
  var organism = [];
  var materialSample = [];
  var geologicalContext = [];
  var resourceRelationship = [];
  var measurementOrFact = [];
  
  var j;
  
  for(j=0; j < termName.length; j++) {
	if(typeof termValue !== 'undefined' && termValue.length > 0) {
		
		if(idNum[j] < 40){
			if(idNum[j] < 8){
				occurrence.push("<dcterms:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dcterms:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
			}
			else{
				occurrence.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
			}
		}
		
		if(idNum[j] > 39 && idNum[j] < 47){
			organism.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
		if(idNum[j] == 47){
			materialSample.push("<dwc:materialSampleID"> + termValue[j] + "</dwc:materialSampleID>");
		}
		
		if(idNum[j] > 47 && idNum[j] < 66){
			event.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
		if(idNum[j] > 65 && idNum[j] < 109){
			location.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
		if(idNum[j] > 109 && idNum[j] < 127) {
			geologicalContext.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
		if(idNum[j] > 126 && idNum[j] < 135) {
			identification.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
		if(idNum[j] > 134 && idNum[j] < 168) {
			taxon.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
		if(idNum[j] > 167 && idNum[j] < 178) {
			measurementOrFact.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
		if(idNum[j] > 177 && idNum[j] < 186) {
			resourceRelationship.push("<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		
	}
  }
	
  if(typeof event !== 'undefined' && event.length > 0){
	  event.unshift('<dwc:Event>');
	  event.push('</dwc:Event>');
  }
  
  if(typeof location !== 'undefined' && location.length > 0){
	  location.unshift('<dcterms:Location>');
	  location.push('</dcterms:Location>');
  }
  
  if(typeof occurrence !== 'undefined' && occurrence.length > 0){
	  occurrence.unshift('<dwc:Occurence>');
	  occurrence.push('</dwc:Occurence>');
  }
  
  if(typeof identification !== 'undefined' && identification.length > 0){
	  identification.unshift('<dwc:Identification>');
	  identification.push('</dwc:Identification>');
  }
  
  if(typeof taxon !== 'undefined' && taxon.length > 0){
	  taxon.unshift('<dwc:Taxon>');
	  taxon.push('</dwc:Taxon>');
  }
  
  if(typeof organism !== 'undefined' && organism.length > 0){
	  organism.unshift('<dwc:Organism>');
	  organism.push('</dwc:Organism>');
  }
  
  if(typeof materialSample !== 'undefined' && materialSample.length > 0){
	  materialSample.unshift('<dwc:MaterialSample>');
	  materialSample.push('</dwc:MaterialSample>');
  }
  
  if(typeof geologicalContext !== 'undefined' && geologicalContext.length > 0){
	  geologicalContext.unshift('<dwc:GeologicalContext>');
	  geologicalContext.push('</dwc:GeologicalContext>');
  }
  
  if(typeof resourceRelationship !== 'undefined' && resourceRelationship.length > 0){
	  resourceRelationship.unshift('<dwc:ResourceRelationship>');
	  resourceRelationship.push('</dwc:ResourceRelationship>');
  }
  
  if(typeof measurementOrFact !== 'undefined' && measurementOrFact.length > 0){
	  measurementOrFact.unshift('<dwc:MeasurementOrFact>');
	  measurementOrFact.push('</dwc:MeasurementOrFact>');
  }
  
  var newXml = template.concat(occurrence, event, location, organism, identification, taxon, materialSample, resourceRelationship, measurementOrFact, '</dwr:DarwinRecordSet>').join('\r\n').replace(/,/g, "");

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