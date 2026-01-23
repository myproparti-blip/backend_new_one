import mongoose from "mongoose";

const directionSchema = new mongoose.Schema({
    north1: { type: String, default: "" },
    east1: { type: String, default: "" },
    south1: { type: String, default: "" },
    west1: { type: String, default: "" },
    north2: { type: String, default: "" },
    east2: { type: String, default: "" },
    south2: { type: String, default: "" },
    west2: { type: String, default: "" }
}, { _id: false });

const coordinateSchema = new mongoose.Schema({
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" }
}, { _id: false });

const photoSchema = new mongoose.Schema({
    elevationImages: [String],
    siteImages: [String]
}, { _id: false });


const qrCodeSchema = new mongoose.Schema({
    url: { type: String, default: "" }
}, { _id: false });

// PDF Details Sub-Schemas
const basicInfoSchema = new mongoose.Schema({
    borrowerName: { type: String, default: "" },
    ownerName: { type: String, default: "" },
    propertyDetails: { type: String, default: "" },
    propertyAddress: { type: String, default: "" },
    client: { type: String, default: "" },
    applicant: { type: String, default: "" },
    valuationDoneBy: { type: String, default: "" }
}, { _id: false });

const valutionPurposeSchema = new mongoose.Schema({
    purposeOfValuation: { type: String, default: "" },
    purposeForValuation: { type: String, default: "" },
    dateOfValuation: { type: String, default: "" },
    dateOfInspection: { type: String, default: "" },
    dateValuationMade: { type: String, default: "" },
    dateOfReport: { type: String, default: "" },
    dateOfVisit: { type: String, default: "" }
}, { _id: false });

const ownershipDocumentsSubSchema = new mongoose.Schema({
    engagementLetter: { type: String, default: "" },
    ownershipDocuments: { type: String, default: "" },
    conveyanceDeed: { type: String, default: "" },
    saleCertificate: { type: String, default: "" }
}, { _id: false });

const propertyRecordsSubSchema = new mongoose.Schema({
    advTcrLsr: { type: String, default: "" },
    agreementForSale: { type: String, default: "" },
    propertyCard: { type: String, default: "" },
    mortgageDeed: { type: String, default: "" },
    leaseDeed: { type: String, default: "" },
    index: { type: String, default: "" },
    vf712Land: { type: String, default: "" },
    naOrder: { type: String, default: "" },
    naLatter: { type: String, default: "" }
}, { _id: false });

const permissionsSubSchema = new mongoose.Schema({
    approvedLayoutPlan: { type: String, default: "" },
    commencementLetter: { type: String, default: "" },
    buPermission: { type: String, default: "" },
    healthSafetyPlan: { type: String, default: "" }
}, { _id: false });

const utilitiesSubSchema = new mongoose.Schema({
    eleMeterPhoto: { type: String, default: "" },
    lightBill: { type: String, default: "" },
    muniTaxBill: { type: String, default: "" }
}, { _id: false });

const propertyStatusSubSchema = new mongoose.Schema({
    numberingDetails: { type: String, default: "" },
    boundariesDemarcation: { type: String, default: "" },
    mergedProperty: { type: String, default: "" },
    premiseSeparationDetails: { type: String, default: "" },
    landLocked: { type: String, default: "" },
    propertyRented: { type: String, default: "" },
    rentAgreement: { type: String, default: "" }
}, { _id: false });

const inspectionPhotosSubSchema = new mongoose.Schema({
    siteVisitPhotos: { type: String, default: "" },
    selfieWithOwner: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    dataSheet: { type: String, default: "" }
}, { _id: false });

const valuationSubSchema = new mongoose.Schema({
    tentativeRate: { type: String, default: "" },
    saleInstanceLocalInquiry: { type: String, default: "" },
    brokerRecording: { type: String, default: "" },
    pastValuationRate: { type: String, default: "" }
}, { _id: false });
const landValuationSchema = new mongoose.Schema({
    // Part A: Market Value Analysis of Land
    plotDescription: { type: String, default: "" },
    areaSqYd: { type: String, default: "" },
    rate: { type: String, default: "" },
    totalValue: { type: String, default: "" },
    sayRO: { type: String, default: "" },  // Say. R/O - Rounded figure of total value
    // Additional land valuation details
    sizeOfPlot: {
        northSouth: { type: String, default: "" },
        eastWest: { type: String, default: "" },
        total: { type: String, default: "" }
    },
    marketRate: {
        prevailingRate: { type: String, default: "" },
        landBuildingAreaRateMethod: { type: String, default: "" }
    },
    guidelineRate: {
        fromRegistrar: { type: String, default: "" },
        adoptedRate: { type: String, default: "" }
    },
    jantriRate: {
        rate: { type: String, default: "" },
        landValue: { type: String, default: "" },
        buildingValue: { type: String, default: "" },
        totalValue: { type: String, default: "" }
    },
    estimatedValueOfLand: { type: String, default: "" },
    variationClause: { type: String, default: "" }
}, { _id: false });

const documentsSchema = new mongoose.Schema({
    ownershipDocuments: { type: ownershipDocumentsSubSchema, default: () => ({}) },
    propertyRecords: { type: propertyRecordsSubSchema, default: () => ({}) },
    permissions: { type: permissionsSubSchema, default: () => ({}) },
    utilities: { type: utilitiesSubSchema, default: () => ({}) },
    propertyStatus: { type: propertyStatusSubSchema, default: () => ({}) },
    inspectionPhotos: { type: inspectionPhotosSubSchema, default: () => ({}) },
    valuation: { type: valuationSubSchema, default: () => ({}) }
}, { _id: false });

const ownerDetailsSchema = new mongoose.Schema({
    nameOfOwners: { type: String, default: "" },
    ownerNameAddress: { type: String, default: "" },
    ownerPhoneNo: { type: String, default: "" },
    shareDetails: { type: String, default: "" },
    ownerPhoneShare: { type: String, default: "" },
    addressOfProperty: { type: String, default: "" }
}, { _id: false });

const propertyLocationSchema = new mongoose.Schema({
    plotNumber: { type: String, default: "" },
    doorNumber: { type: String, default: "" },
    tsNumber: { type: String, default: "" },
    village: { type: String, default: "" },
    ward: { type: String, default: "" },
    taluka: { type: String, default: "" },
    mandal: { type: String, default: "" },
    district: { type: String, default: "" },
    postalAddress: { type: String, default: "" }
}, { _id: false });

const areaClassificationSchema = new mongoose.Schema({
    cityTown: { type: String, default: "" },
    residentialArea: { type: String, default: "" },
    commercialArea: { type: String, default: "" },
    industrialArea: { type: String, default: "" },
    areaClassification: { type: String, default: "" },
    highMiddlePoor: { type: String, default: "" },
    urbanSemiUrbanRural: { type: String, default: "" },
    corporationLimitVillage: { type: String, default: "" },
    governmentEnactments: { type: String, default: "" },
    agriculturalLandConversion: { type: String, default: "" }
}, { _id: false });

const boundaryDetailsSchema = new mongoose.Schema({
    east: {
        deed: { type: String, default: "" },
        visit: { type: String, default: "" }
    },
    west: {
        deed: { type: String, default: "" },
        visit: { type: String, default: "" }
    },
    north: {
        deed: { type: String, default: "" },
        visit: { type: String, default: "" }
    },
    south: {
        deed: { type: String, default: "" },
        visit: { type: String, default: "" }
    }
}, { _id: false });

const dimensionsSchema = new mongoose.Schema({
    north: {
        deed: { type: String, default: "" },
        actual: { type: String, default: "" }
    },
    south: {
        deed: { type: String, default: "" },
        actual: { type: String, default: "" }
    },
    east: {
        deed: { type: String, default: "" },
        actual: { type: String, default: "" }
    },
    west: {
        deed: { type: String, default: "" },
        actual: { type: String, default: "" }
    }
}, { _id: false });

const extentSchema = new mongoose.Schema({
    extentOfSite: { type: String, default: "" },
    extentConsideredForValuation: { type: String, default: "" }
}, { _id: false });

const occupationStatusSchema = new mongoose.Schema({
    occupiedByOwnerTenant: { type: String, default: "" },
    tenancyDuration: { type: String, default: "" },
    rentReceivedPerMonth: { type: String, default: "" }
}, { _id: false });

const siteCharacteristicsSchema = new mongoose.Schema({
    classificationOfLocality: { type: String, default: "" },
    developmentSurroundingArea: { type: String, default: "" },
    frequentFloodingSubmerging: { type: String, default: "" },
    feasibilityCivicAmenities: { type: String, default: "" },
    levelOfLandTopographical: { type: String, default: "" },
    shapeOfLand: { type: String, default: "" },
    typeOfUse: { type: String, default: "" },
    usageRestriction: { type: String, default: "" },
    townPlanningApprovedLayout: { type: String, default: "" },
    cornerPlotIntermittentPlot: { type: String, default: "" },
    roadFacilities: { type: String, default: "" },
    typeOfRoadAvailable: { type: String, default: "" },
    widthOfRoad: { type: String, default: "" },
    lockedLand: { type: String, default: "" },
    waterPotentiality: { type: String, default: "" },
    undergroundSewerageSystem: { type: String, default: "" },
    powerSupplyAtSite: { type: String, default: "" },
    advantageOfSite1: { type: String, default: "" },
    advantageOfSite2: { type: String, default: "" },
    specialRemarks1: { type: String, default: "" },
    specialRemarks2: { type: String, default: "" }
}, { _id: false });

const briefDescriptionSchema = new mongoose.Schema({
    briefDescription: { type: String, default: "" },
    revenueDetails: { type: String, default: "" },
    areaOfLand: { type: String, default: "" },
    valueOfLand: { type: String, default: "" },
    areaOfConstruction: { type: String, default: "" },
    valueOfConstruction: { type: String, default: "" },
    totalMarketValue: { type: String, default: "" },
    insurableValue: { type: String, default: "" }
}, { _id: false });

const buildingValuationSchema = new mongoose.Schema({
    typeOfBuilding: { type: String, default: "" },
    typeOfConstruction: { type: String, default: "" },
    yearOfConstruction: { type: String, default: "" },
    numberOfFloors: { type: String, default: "" },
    plinthAreaFloorWise: { type: String, default: "" },
    conditionOfBuilding: { type: String, default: "" },
    exteriorCondition: { type: String, default: "" },
    interiorCondition: { type: String, default: "" },
    dateOfIssueValidity: { type: String, default: "" },
    approvedMapAuthority: { type: String, default: "" },
    genuinessAuthenticity: { type: String, default: "" },
    otherComments: { type: String, default: "" }
}, { _id: false });

const landValuationDetailsSchema = new mongoose.Schema({
    plot: { type: String, default: "Land Area" },
    areaSqYd: { type: String, default: "" },
    rate: { type: String, default: "" },
    total: { type: String, default: "" }
}, { _id: false });



const buildingDetailsSchema = new mongoose.Schema({
    typeOfBuilding: { type: String, default: "" },
    typeOfConstruction: { type: String, default: "" },
    yearOfConstruction: { type: String, default: "" },
    numberOfFloorsHeight: { type: String, default: "" },
    plinthAreaFloorWise: { type: String, default: "" },
    condition: {
        exterior: { type: String, default: "" },
        interior: { type: String, default: "" }
    },
    approvedMap: {
        dateValidity: { type: String, default: "" },
        issuingAuthority: { type: String, default: "" },
        genuinessVerified: { type: String, default: "" }
    },
    otherCommentsOnApprovedPlan: { type: String, default: "" }
}, { _id: false });

const constructionAreaSchema = new mongoose.Schema({
    areaDetails: { type: String, default: "" },
    areaSMT: { type: String, default: "" },
    areaSYD: { type: String, default: "" },
    ratePerSYD: { type: String, default: "" },
    value: { type: String, default: "" }
}, { _id: false });

const constructionCostAnalysisSchema = new mongoose.Schema({
    securityRoom: { type: constructionAreaSchema, default: () => ({}) },
    laboursQuarter: { type: constructionAreaSchema, default: () => ({}) },
    storeRoom: { type: constructionAreaSchema, default: () => ({}) },
    galleryRoom: { type: constructionAreaSchema, default: () => ({}) },
    ffLaboursQuarter: { type: constructionAreaSchema, default: () => ({}) },
    gfRoom: { type: constructionAreaSchema, default: () => ({}) },
    gfWashRoom: { type: constructionAreaSchema, default: () => ({}) },
    office1: { type: constructionAreaSchema, default: () => ({}) },
    washRoom: { type: constructionAreaSchema, default: () => ({}) },
    shed: { type: constructionAreaSchema, default: () => ({}) },
    office2: { type: constructionAreaSchema, default: () => ({}) },
    shed1: { type: constructionAreaSchema, default: () => ({}) },
    shed2Unit1: { type: constructionAreaSchema, default: () => ({}) },
    shed2Unit2: { type: constructionAreaSchema, default: () => ({}) },
    openShed: { type: constructionAreaSchema, default: () => ({}) },
    godown: { type: constructionAreaSchema, default: () => ({}) },
    shed3Unit1: { type: constructionAreaSchema, default: () => ({}) },
    shed3Unit2: { type: constructionAreaSchema, default: () => ({}) },
    shed3Unit3: { type: constructionAreaSchema, default: () => ({}) },
    total: {
        areaSMT: { type: String, default: "" },
        areaSYD: { type: String, default: "" },
        totalValue: { type: String, default: "" }
    }
}, { _id: false });

const extraItemsSchema = new mongoose.Schema({
    portico: { type: String, default: "" },
    ornamentalFrontDoor: { type: String, default: "" },
    sitOutVeranda: { type: String, default: "" },
    overheadWaterTank: { type: String, default: "" },
    extraSteelGates: { type: String, default: "" },
    total: { type: String, default: "" }
}, { _id: false });

const amenitiesSchema = new mongoose.Schema({
    wardrobes: { type: String, default: "" },
    glazedTiles: { type: String, default: "" },
    extraSinksBathTub: { type: String, default: "" },
    marbleFlooring: { type: String, default: "" },
    interiorDecorations: { type: String, default: "" },
    architecturalElevation: { type: String, default: "" },
    panellingWorks: { type: String, default: "" },
    aluminiumWorks: { type: String, default: "" },
    aluminiumHandRails: { type: String, default: "" },
    falseCeiling: { type: String, default: "" },
    total: { type: String, default: "" }
}, { _id: false });

const miscellaneousSchema = new mongoose.Schema({
    separateToiletRoom: { type: String, default: "" },
    separateLumberRoom: { type: String, default: "" },
    separateWaterTankSump: { type: String, default: "" },
    treesGardening: { type: String, default: "" },
    total: { type: String, default: "" }
}, { _id: false });

const servicesSchema = new mongoose.Schema({
    waterSupplyArrangements: { type: String, default: "" },
    drainageArrangements: { type: String, default: "" },
    compoundWall: { type: String, default: "" },
    cbDepositsFittings: { type: String, default: "" },
    pavement: { type: String, default: "" },
    total: { type: String, default: "" }
}, { _id: false });

const totalAbstractSchema = new mongoose.Schema({
    partA: {
        description: { type: String, default: "Land" },
        value: { type: String, default: "" }
    },
    partB: {
        description: { type: String, default: "Building" },
        value: { type: String, default: "" }
    },
    partC: {
        description: { type: String, default: "Fixed Furniture" },
        value: { type: String, default: "" }
    },
    partD: {
        description: { type: String, default: "Amenities" },
        value: { type: String, default: "" }
    },
    partE: {
        description: { type: String, default: "Miscellaneous" },
        value: { type: String, default: "" }
    },
    partF: {
        description: { type: String, default: "Services" },
        value: { type: String, default: "" }
    },
    totalValue: { type: String, default: "" },
    sayValue: { type: String, default: "" }
}, { _id: false });

const valuationSummarySchema = new mongoose.Schema({
    presentMarketValue: {
        amount: { type: String, default: "" },
        words: { type: String, default: "" },
        inWords: { type: String, default: "" }
    },
    realisableValue: {
        percentage: { type: String, default: "85%" },
        amount: { type: String, default: "" },
        words: { type: String, default: "" },
        inWords: { type: String, default: "" }
    },
    distressValue: {
        percentage: { type: String, default: "70%" },
        amount: { type: String, default: "" },
        words: { type: String, default: "" },
        inWords: { type: String, default: "" }
    },
    jantriValue: {
        amount: { type: String, default: "" },
        words: { type: String, default: "" },
        inWords: { type: String, default: "" }
    },
    fairMarketValue: {
        amount: { type: String, default: "" },
        words: { type: String, default: "" },
        inWords: { type: String, default: "" }
    },
    appraisalOpinion: { type: String, default: "" },
    inspectionDetails: { type: String, default: "" }
}, { _id: false });

const signatureDetailsSchema = new mongoose.Schema({
    valuer: {
        name: { type: String, default: "" },
        designation: { type: String, default: "" },
        date: { type: String, default: "" },
        place: { type: String, default: "" }
    },
    branchManager: {
        name: { type: String, default: "" },
        designation: { type: String, default: "" },
        date: { type: String, default: "" },
        place: { type: String, default: "" }
    }
}, { _id: false });

const coordinatesDataSchema = new mongoose.Schema({
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" }
}, { _id: false });

const checklistOfDocumentsSchema = new mongoose.Schema({
    engagementLetterConfirmation: { type: String, default: "" },
    ownershipDocumentsSaleDeed: { type: String, default: "" },
    advTcrLsr: { type: String, default: "" },
    agreementForSaleBanaKhat: { type: String, default: "" },
    propertyCard: { type: String, default: "" },
    mortgageDeed: { type: String, default: "" },
    leaseDeed: { type: String, default: "" },
    index2: { type: String, default: "" },
    vf712InCaseOfLand: { type: String, default: "" },
    naOrder: { type: String, default: "" },
    approvedLayoutPlan: { type: String, default: "" },
    commencementLetter: { type: String, default: "" },
    buPermission: { type: String, default: "" },
    eleMeterPhoto: { type: String, default: "" },
    lightBill: { type: String, default: "" },
    muniTaxBill: { type: String, default: "" },
    numberingFlatBungalowPlotNo: { type: String, default: "" },
    boundariesOfPropertyProperDemarcation: { type: String, default: "" },
    mergedProperty: { type: String, default: "" },
    premiseCanBeSeparatedEntranceDoor: { type: String, default: "" },
    landIsLocked: { type: String, default: "" },
    propertyIsRentedToOtherParty: { type: String, default: "" },
    ifRentedRentAgreementIsProvided: { type: String, default: "" },
    siteVisitPhotos: { type: String, default: "" },
    selfieWithOwnerIdentifier: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    dataSheet: { type: String, default: "" },
    tentativeRate: { type: String, default: "" },
    saleInstanceLocalInquiryVerbalSurvey: { type: String, default: "" },
    brokerRecording: { type: String, default: "" },
    pastValuationRate: { type: String, default: "" }
}, { _id: false });
const customFieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

const pdfDetailsSchema = new mongoose.Schema({
    basicInfo: { type: basicInfoSchema, default: () => ({}) },
    valuationPurpose: { type: valutionPurposeSchema, default: () => ({}) },
    documents: { type: documentsSchema, default: () => ({}) },
    checklistOfDocuments: { type: checklistOfDocumentsSchema, default: () => ({}) },
    ownerDetails: { type: ownerDetailsSchema, default: () => ({}) },
    propertyLocation: { type: propertyLocationSchema, default: () => ({}) },
    areaClassification: { type: areaClassificationSchema, default: () => ({}) },
    boundaryDetails: { type: boundaryDetailsSchema, default: () => ({}) },
    dimensions: { type: dimensionsSchema, default: () => ({}) },
    coordinates: { type: coordinatesDataSchema, default: () => ({}) },
    extent: { type: extentSchema, default: () => ({}) },
    occupationStatus: { type: occupationStatusSchema, default: () => ({}) },
    siteCharacteristics: { type: siteCharacteristicsSchema, default: () => ({}) },
    briefDescription: { type: briefDescriptionSchema, default: () => ({}) },
    landValuation: { type: landValuationSchema, default: () => ({}) },
    buildingDetails: { type: buildingDetailsSchema, default: () => ({}) },
    constructionCostAnalysis: { type: constructionCostAnalysisSchema, default: () => ({}) },
    extraItems: { type: extraItemsSchema, default: () => ({}) },
    amenities: { type: amenitiesSchema, default: () => ({}) },
    miscellaneous: { type: miscellaneousSchema, default: () => ({}) },
    services: { type: servicesSchema, default: () => ({}) },
    totalAbstract: { type: totalAbstractSchema, default: () => ({}) },
    valuationSummary: { type: valuationSummarySchema, default: () => ({}) },
    signatureDetails: { type: signatureDetailsSchema, default: () => ({}) },
    qrCode: { type: qrCodeSchema, default: () => ({}) }
}, { _id: false });
const rajeshHouseSchema = new mongoose.Schema({
    clientId: { type: String, required: true, index: true },
    uniqueId: { type: String, required: true, sparse: true },
    username: { type: String, required: true },
    dateTime: { type: String, required: true },
    day: { type: String, required: true },
    bankName: { type: String, required: true },
    city: { type: String, required: true },
    clientName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
    collectedBy: { type: String, default: "" },
    dsa: { type: String, required: true },
    customDsa: { type: String, default: "" },
    engineerName: { type: String, required: true, default: "" },
    customEngineerName: { type: String, default: "" },
    notes: { type: String, default: "" },
    selectedForm: { type: String, default: null },
    elevation: { type: String, default: "" },
    directions: { type: directionSchema, default: () => ({}) },
    coordinates: { type: coordinateSchema, default: () => ({}) },
    propertyImages: [mongoose.Schema.Types.Mixed],
    locationImages: [mongoose.Schema.Types.Mixed],
    documentPreviews: [mongoose.Schema.Types.Mixed],
    areaImages: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    photos: { type: photoSchema, default: () => ({}) },
    bankImage: {
        url: { type: String, default: "" },
        fileName: { type: String, default: "" },
        size: { type: Number, default: 0 },
        path: { type: String, default: "" }
    },
    status: {
        type: String,
        enum: ["pending", "on-progress", "approved", "rejected", "rework"],
        default: "pending"
    },
    managerFeedback: { type: String, default: "" },
    submittedByManager: { type: Boolean, default: false },
    lastUpdatedBy: { type: String, default: "" },
    lastUpdatedByRole: { type: String, default: "" },
    pdfDetails: { type: pdfDetailsSchema, default: () => ({}) },
    customBankName: { type: String, default: "" },
    customCity: { type: String, default: "" },
    reworkComments: { type: String, default: "" },
    reworkRequestedBy: { type: String, default: "" },
    reworkRequestedAt: { type: Date, default: null },
    reworkRequestedByRole: { type: String, default: "" },
    lastUpdatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    customFields: [{ type: customFieldSchema, default: () => ({}) }],
    customConstructionCostFields: [{
        name: { type: String, default: "" },
        areaSMT: { type: String, default: "" },
        areaSYD: { type: String, default: "" },
        ratePerSYD: { type: String, default: "" },
        value: { type: String, default: "" }
    }],
    constructionCostAnalysis: { type: mongoose.Schema.Types.Mixed, default: () => ({}) }

});
rajeshHouseSchema.index({ clientId: 1, uniqueId: 1 }, { unique: true, sparse: true });
const RajeshHouseModel = mongoose.model("RajeshHouse", rajeshHouseSchema);
export default RajeshHouseModel;