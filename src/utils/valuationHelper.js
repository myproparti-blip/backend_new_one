/**
 * Ensures that a valuation document has all required nested schema structures
 * @param {Object} doc - The document to process
 * @returns {Object} The document with complete nested structures
 */
export function ensureCompleteValuation(doc) {
    if (!doc) return doc;

    // Initialize pdfDetails if not present
    if (!doc.pdfDetails) {
        doc.pdfDetails = {};
    }

    // Initialize other nested schemas if needed
    if (!doc.buildingConstruction) {
        doc.buildingConstruction = {};
    }
    if (!doc.facilities) {
        doc.facilities = {};
    }
    if (!doc.unitSpecifications) {
        doc.unitSpecifications = {};
    }
    if (!doc.unitTax) {
        doc.unitTax = {};
    }
    if (!doc.electricityService) {
        doc.electricityService = {};
    }
    if (!doc.unitMaintenance) {
        doc.unitMaintenance = {};
    }
    if (!doc.agreementForSale) {
        doc.agreementForSale = {};
    }
    if (!doc.unitAreaDetails) {
        doc.unitAreaDetails = {};
    }
    if (!doc.unitClassification) {
        doc.unitClassification = {};
    }
    if (!doc.documentInformation) {
        doc.documentInformation = {};
    }
    if (!doc.ownerDetails) {
        doc.ownerDetails = {};
    }
    if (!doc.locationOfProperty) {
        doc.locationOfProperty = {};
    }
    if (!doc.postalAddress) {
        doc.postalAddress = {};
    }
    if (!doc.cityAreaType) {
        doc.cityAreaType = {};
    }
    if (!doc.areaClassification) {
        doc.areaClassification = {};
    }
    if (!doc.propertyBoundaries) {
        doc.propertyBoundaries = {};
    }
    if (!doc.propertyDimensions) {
        doc.propertyDimensions = {};
    }
    if (!doc.rateValuation) {
        doc.rateValuation = {};
    }
    if (!doc.compositeRateDepreciation) {
        doc.compositeRateDepreciation = {};
    }
    if (!doc.valuationResults) {
        doc.valuationResults = {};
    }
    if (!doc.additionalFlatDetails) {
        doc.additionalFlatDetails = {};
    }
    if (!doc.signatureReport) {
        doc.signatureReport = {};
    }
    if (!doc.apartmentLocation) {
        doc.apartmentLocation = {};
    }
    if (!doc.monthlyRent) {
        doc.monthlyRent = {};
    }
    if (!doc.marketability) {
        doc.marketability = {};
    }
    if (!doc.valuationDetailsTable) {
        doc.valuationDetailsTable = {};
    }
    if (!doc.guidelineRate) {
        doc.guidelineRate = {};
    }
    if (!doc.documentsProduced) {
        doc.documentsProduced = {};
    }
    if (!doc.photos) {
        doc.photos = {};
    }
    if (!doc.directions) {
        doc.directions = {};
    }
    if (!doc.coordinates) {
        doc.coordinates = {};
    }

    return doc;
}
