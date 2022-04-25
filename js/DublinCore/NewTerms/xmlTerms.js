$(function () {
  $('#XMLButton').click(update);
});

//This function saves the input value and adds that attribute to the download prompt when the "save file name" button is clicked.
function saveFileName (){
	var fileName = $('#fileName').val();
	$('#DownloadLink').attr('download', fileName + '.xml');
}

function update() {
  // Get the input value
  var values = {
    Abstract: $('#abstract').val(),
    AccessRights: $('#accessRights').val(),
    AccrualMethod: $('#accrualMethod').val(),
	AccrualPeriodicity: $('#accrualPeriodicity').val(),
	AccrualPolicy: $('#accrualPolicy').val(),
	Alternative: $('#alternative').val(),
	Audience: $('#audience').val(),
	Available: $('#available').val(),
	BibliographicCitation: $('#bibliographicCitation').val(),
	ConformsTo: $('#conformsTo').val(),
	ContributorTerm: $('#contributorTerm').val(),
	CoverageTerm: $('#coverageTerm').val(),
	Created: $('#created').val(),
	CreatorTerm: $('#creatorTerm').val(),
	DateTerm: $('#dateTerm').val(),
	DateAccepted: $('#dateAccepted').val(),
	DateCopyrighted: $('#dateCopyrighted').val(),
	DateSubmitted: $('#dateSubmitted').val(),
	DescriptionTerm: $('#descriptionTerm').val(),
	EducationLevel: $('#educationLevel').val(),
	Extent: $('#extent').val(),
	FormatTerm: $('#formatTerm').val(),
	HasFormat: $('#hasFormat').val(),
	HasPart: $('#hasPart').val(),
	HasVersion: $('#hasVersion').val(),
	IdentifierTerm: $('#identifierTerm').val(),
	InstructionMethod: $('#instructionMethod').val(),
	IsFormatOf: $('#isFormatOf').val(),
	IsPartOf: $('#isPartOf').val(),
	IsReferencedBy: $('#isReferencedBy').val(),
	IsReplacedBy: $('#isReplacedBy').val(),
	IsRequiredBy: $('#isRequiredBy').val(),
	Issued: $('#issued').val(),
	IsVersionOf: $('#isVersionOf').val(),
	LanguageTerm: $('#languageTerm').val(),
	License: $('#license').val(),
	Mediator: $('#mediator').val(),
	Medium: $('#medium').val(),
	Modified: $('#modified').val(),
	Provenance: $('#provenance').val(),
	PublisherTerm: $('#publisherTerm').val(),
	References: $('#references').val(),
	RelationTerm: $('#relationTerm').val(),
	Replaces: $('#replaces').val(),
	Requires: $('#requires').val(),
	RightsTerm: $('#rightsTerm').val(),
	RightsHolders: $('#rightsHolders').val(),
	SourceTerm: $('#sourceTerm').val(),
	Spatial: $('#spatial').val(),
	SubjectTerm: $('#subjectTerm').val(),
	TableOfContents: $('#tableOfContents').val(),
	Temporal: $('#temporal').val(),
	TitleTerm: $('#titleTerm').val(),
	TypeTerm: $('#typeTerm').val(),
	Valid: $('#valid').val()
  };
  
  // This function returns a string value dependent on whether the record is a term or element and whether the input value is empty or not.
  // The replace function is to replace some term strings that contain the word Term in them. This is because there are 15 elements that are shared with terms, but still need to be differentiated.
  function stringified(name){
	if(values[name]) {
		return "<dcterms:"+ name.toLowerCase().replace(/term/,"") +">"+ values[name] +"</dcterms:"+ name.toLowerCase().replace(/term/,"") +">";
	}
  }
  
  // Template is the array of strings that are shown to the user in the preview.
  template = [
  '<?xml version="1.0"?>',
  '<metadata>',
  //Terms 
  stringified('Abstract'),
  stringified('AccessRights'),
  stringified('AccrualMethod'),
  stringified('AccrualPeriodicity'),
  stringified('AccrualPolicy'),
  stringified('Alternative'),
  stringified('Audience'),
  stringified('Available'),
  stringified('BibliographicCitation'),
  stringified('ConformsTo'),
  stringified('ContributorTerm'),
  stringified('CoverageTerm'),
  stringified('Created'),
  stringified('CreatorTerm'),
  stringified('DateTerm'),
  stringified('DateAccepted'),
  stringified('DateCopyrighted'),
  stringified('DateSubmitted'),
  stringified('DescriptionTerm'),
  stringified('EducationLevel'),
  stringified('Extent'),
  stringified('FormatTerm'),
  stringified('HasFormat'),
  stringified('HasPart'),
  stringified('HasVersion'),
  stringified('IdentifierTerm'),
  stringified('InstructionMethod'),
  stringified('IsFormatOf'),
  stringified('IsPartOf'),
  stringified('IsReferencedBy'),
  stringified('IsReplacedBy'),
  stringified('IsRequiredBy'),
  stringified('Issued'),
  stringified('IsVersionOf'),
  stringified('LanguageTermv'),
  stringified('License'),
  stringified('Mediator'),
  stringified('Medium'),
  stringified('Modified'),
  stringified('Provenance'),
  stringified('PublisherTerm'),
  stringified('References'),
  stringified('RelationTerm'),
  stringified('Replaces'),
  stringified('Requires'),
  stringified('RightsTerm'),
  stringified('RightsHolders'),
  stringified('SourceTerm'),
  stringified('Spatial'),
  stringified('SubjectTerm'),
  stringified('TableOfContents'),
  stringified('Temporal'),
  stringified('TitleTerm'),
  stringified('TypeTerm'),
  stringified('Valid'),
  ].join('\r\n').replace(/^\s*[\r\n]/gm,""); //This replace function takes out empty lines since a record that doesn't contain a input value would return a whitespace line.
  
  var termName = [];
  var termValue = [];
  
  $(".add").each(function(){
	termName.push($(this).attr("name"));
	termValue.push($(this).val());
  });
  
  var j;
  
  for(j=0; j < termName.length; j++) {
	/*if((typeof termName !== 'undefined' && termName.length > 0) && (typeof termValue !== 'undefined' && termValue.length > 0)) {
		template.concat("\n<dcterms:"+ termName[j] +">"+ termValue[j] +"</dcterms:"+ termName[j] +">");
	}*/
	template = template.concat("\n<dcterms:"+ termName[j] +">"+ termValue[j] +"</dcterms:"+ termName[j] +">");
  }

  var newXml = template.concat('\n</metadata>');
  
// Allow browser to download. Source: https://developers.google.com/web/updates/2011/08/Downloading-resources-in-HTML5-a-download 
  $('#ResultXml').val(newXml);
  $('#DownloadLink')
    .attr('href', 'data:text/xml;base64,' + btoa(newXml))
	//.attr('download', fileName.value + '.xml');
  $('#generated').show();
}

if (!window.btoa) {
  // Source: http://www.koders.com/javascript/fid78168FE1380F7420FB7B7CD8BAEAE58929523C17.aspx
  // I just noticed the URL no longer works but you shouldn't need to modify this part anyway.
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