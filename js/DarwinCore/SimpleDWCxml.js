$(function () {
  $('#DownloadButton').click(update);
});

function saveFileName (){
	var fileName = $('#fileName').val();
	$('#DownloadLink').attr('download', fileName + '.xml');
}

function update() {
  //If user does not name file, default name is default.xml
  $('#DownloadLink').attr('download', 'mySimpleDarwinCore.xml');
  
  var classification = {
		//DC terms  
		
		AccessRights: 'dcterm',
		BibliographicCitation: 'dcterm',
		Language: 'dcterm',
		License: 'dcterm',
		Modified: 'dcterm',
		References: 'dcterm',
		RightsHolders: 'dcterm',
		Type: 'dcterm',
		
		//Simple DWC Terms
		InstitutionID: 'term',
		CollectionID: 'term',
		DatasetId: 'term',
		InstitutionCode: 'term',
		CollectionCode: 'term',
		DatasetName: 'term',
		OwnerInstitutionCode: 'term',
		BasisOfRecord: 'term',
		InformationWithheld: 'term',
		DataGeneralizations: 'term',
		DynamicProperties: 'term',
		
		// Occurrence Terms
		OccurrenceID: 'term',
		CatalogNumber: 'term',
		RecordNumber: 'term',
		RecordedBy: 'term',
		IndividualCount: 'term',
		OrganismQuantity: 'term',
		OrganismQuantityType: 'term',
		Sex: 'term',
		LifeStage: 'term',
		ReproductiveCondition: 'term',
		Behavior: 'term',
		EstablishmentMeans: 'term',
		OccurenceStatus: 'term',
		Preparations: 'term',
		Disposition: 'term',
		AssociatedMedia: 'term',
		AssociatedReferences: 'term',
		AssociatedSequences: 'term',
		AssociatedTaxa: 'term',
		OtherCatalogNumbers: 'term',
		OccurrenceRemarks: 'term',
		
		//Organism terms
		OrganismID: 'term',
		OrganismName: 'term',
		OrganismScope: 'term',
		AssociatedOccurrences: 'term',
		AssociatedOrganisms: 'term',
		PreviousIdentifications: 'term',
		OrganismRemarks: 'term',
		
		//Material Sample Terms
		MaterialSampleID: 'term',
		LivingMaterialSampleID: 'term',
		PreservedMaterialSampleID: 'term',
		FossilMaterialSampleID: 'term',
		
		//Event terms
		EventID: 'term',
		ParentEventID: 'term',
		FieldNumber: 'term',
		EventDate: 'term',
		EventTime: 'term',
		StartDayOfYear: 'term',
		EndDayOfYear: 'term',
		Year: 'term',
		Month: 'term',
		Day: 'term',
		VerbatimEventDate: 'term',
		Habitat: 'term',
		SamplingProtocol: 'term',
		SampleSizeValue: 'term',
		SampleSizeUnit: 'term',
		SamplingEffort: 'term',
		FieldNotes: 'term',
		EventRemarks: 'term',
		
		//HumanObservation Terms
		HumanEventID: 'term',
		HumanParentEventID: 'term',
		HumanFieldNumber: 'term',
		HumanEventDate: 'term',
		HumanEventTime: 'term',
		HumanStartDayOfYear: 'term',
		HumanEndDayOfYear: 'term',
		HumanYear: 'term',
		HumanMonth: 'term',
		HumanDay: 'term',
		HumanVerbatimEventDate: 'term',
		HumanHabitat: 'term',
		HumanSamplingProtocol: 'term',
		HumanSampleSizeValue: 'term',
		HumanSampleSizeUnit: 'term',
		HumanSamplingEffort: 'term',
		HumanFieldNotes: 'term',
		HumanEventRemarks: 'term',
		
		//MachineObservation Terms
		MachineEventID: 'term',
		MachineParentEventID: 'term',
		MachineFieldNumber: 'term',
		MachineEventDate: 'term',
		MachineEventTime: 'term',
		MachineStartDayOfYear: 'term',
		MachineEndDayOfYear: 'term',
		MachineYear: 'term',
		MachineMonth: 'term',
		MachineDay: 'term',
		MachineVerbatimEventDate: 'term',
		MachineHabitat: 'term',
		MachineSamplingProtocol: 'term',
		MachineSampleSizeValue: 'term',
		MachineSampleSizeUnit: 'term',
		MachineSamplingEffort: 'term',
		MachineFieldNotes: 'term',
		MachineEventRemarks: 'term',
		
		//Location Terms
		LocationID: 'term',
		HigherGeographyID: 'term',
		HigherGeography: 'term',
		Continent: 'term',
		Waterbody: 'term',
		IslandGroup: 'term',
		Island: 'term',
		Country: 'term',
		CountryCode: 'term',
		StateProvince: 'term',
		County: 'term',
		Mnicipality: 'term',
		Locality: 'term',
		VerbatimLocality: 'term',
		MinimumElevationInMeters: 'term',
		MaximumElevationInMeters: 'term',
		VerbatimElevation: 'term',
		MinimumDepthInMeters: 'term',
		MaximumDepthInMeters: 'term',
		VerbatimDepth: 'term',
		MinimumDistanceAboveSurfaceInMeters: 'term',
		MaximumDistanceAboveSurfaceInMeters: 'term',
		LocationAccordingTo: 'term',
		LocationRemarks: 'term',
		DecimalLatitude: 'term',
		DecimalLongitude: 'term',
		GeodeticDatum: 'term',
		CoordinateUncertaintyInMeters: 'term',
		CoordinatePrecision: 'term',
		PointRadiusSpatialFit: 'term',
		VerbatimCoordinates: 'term',
		VerbatimLatitude: 'term',
		VerbatimCoordinateSystem: 'term',
		VerbatimSRS: 'term',
		FootprintWKT: 'term',
		FootprintSRS: 'term',
		FootprintSpatialFit: 'term',
		GeoReferencedBy: 'term',
		GeoReferencedDate: 'term',
		GeoReferenceProtocol: 'term',
		GeoReferenceSources: 'term',
		GeoReferenceVerificationStatus: 'term',
		GeoReferenceRemarks: 'term',
		
		//GeologicalContext Terms
		GeologicalContextID: 'term',
		EarliestEonOrLowestEonothem: 'term',
		LatestEonOrHighestEonothem: 'term',
		EarliestEraOrLowestErathem: 'term',
		LatestEraOrHighestErathem: 'term',
		EarliestPeriodOrLowestSystem: 'term',
		LatestPeriodOrHighestSystem: 'term',
		EarliestEpochOrLowestSeries: 'term',
		LatestEpochOrHighestSeries: 'term',
		EarliestAgeOrLowestStage: 'term',
		LatestAgeOrHighestStage: 'term',
		LowestBiostratigraphicZone: 'term',
		HighestBiostratigraphicZone: 'term',
		LithostratigraphicTerms: 'term',
		Group: 'term',
		Formation: 'term',
		Member: 'term',
		Bed: 'term',
		
		//Identification Terms
		IdentificationID: 'term',
		IdentificationQualifier: 'term',
		TypeStatus: 'term',
		IdentifiedBy: 'term',
		DateIdentified: 'term',
		IdentificationReferences: 'term',
		IdentificationVerificationStatus: 'term',
		IdentificationRemarks: 'term',
		
		//Taxon Terms
		TaxonID: 'term',
		ScientificNameID: 'term',
		AcceptedNameUsageID: 'term',
		ParentNameUsageID: 'term',
		OriginalNameUsageID: 'term',
		NameAccordingToID: 'term',
		NamePublishedInID: 'term',
		TaxonConceptID: 'term',
		ScientificName: 'term',
		AcceptedNameUsage: 'term',
		ParentNameUsage: 'term',
		OriginalNameUsage: 'term',
		NameAccordingTo: 'term',
		NamePublishedIn: 'term',
		NamePublishedInYear: 'term',
		HigherClassification: 'term',
		Kingdom: 'term',
		Phylum: 'term',
		Class: 'term',
		Order: 'term',
		Family: 'term',
		Genus: 'term',
		Subgenus: 'term',
		SpecificEpithet: 'term',
		InfraspecificEpithet: 'term',
		TaxonRank: 'term',
		VerbatimTaxonRank: 'term',
		ScientificNameAuthorship: 'term',
		VernacularName: 'term',
		NomenclaturalCode: 'term',
		TaxonomicStatus: 'term',
		NomenclaturalStatus: 'term',
		TaxonRemarks: 'term',
  };
  
  // Template is the array of strings that are shown to the user.
  var template = [
  '<?xml version="1.0" encoding="UTF-8" ?>',
  '<dwr:SimpleDarwinRecordSet>',
  '<dwr:SimpleDarwinRecord>',
  ].join('\r\n').replace(/^\s*[\r\n]/gm,""); //This replace function takes out empty lines since a record that doesn't contain a input value would return a line with whitespace.
  
  var termName = [];
  var termValue = [];

  $(".add").each(function(){
	termName.push($(this).attr("name"));
	termValue.push($(this).val());
  });
  
  console.log(termName);
  console.log(termValue);
  
  var j;
  
  for(j=0; j < termName.length; j++) {
	if(termValue[j]) {
		if (classification[termName[j]] == 'term') {
			template = template.concat("\n<dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dwc:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
		else {
			template = template.concat("\n<dcterms:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">"+ termValue[j] +"</dcterms:"+ termName[j].substring(0, 1).toLowerCase() + termName[j].substring(1) +">");
		}
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