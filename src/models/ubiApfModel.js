import mongoose from "mongoose";


const ubiApfDirectionSchema = new mongoose.Schema({
    north1: { type: String, default: "" },
    east1: { type: String, default: "" },
    south1: { type: String, default: "" },
    west1: { type: String, default: "" },
    north2: { type: String, default: "" },
    east2: { type: String, default: "" },
    south2: { type: String, default: "" },
    west2: { type: String, default: "" }
}, { _id: false });

const ubiApfCoordinateSchema = new mongoose.Schema({
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" }
}, { _id: false });

const ubiApfPhotoSchema = new mongoose.Schema({
    elevationImages: [String],
    siteImages: [String]
}, { _id: false });

const ubiApfPdfDetailsSchema = new mongoose.Schema({

    // PAGE 1 - COST OF CONSTRUCTION AS PER ACTUAL MEASUREMENT
    subArea: { type: String, default: "" },
    basementFloor: { type: String, default: "" },
    groundArea: { type: String, default: "" },
    socketFloor: { type: String, default: "" },
    terraceArea: { type: String, default: "" },
    firstFloorConstruction: { type: String, default: "" },
    secondFloorConstruction: { type: String, default: "" },
    thirdFloorConstruction: { type: String, default: "" },
    fourthFloorConstruction: { type: String, default: "" },
    fifthFloorConstruction: { type: String, default: "" },
    sixthFloorConstruction: { type: String, default: "" },
    glassHouseFloor: { type: String, default: "" },
    totalAreaAmount: { type: String, default: "" },
    valueCostAmount: { type: String, default: "" },
    ratePerSqftAmount: { type: String, default: "" },

    // PAGE 2 - TOTAL ABSTRACT OF THE ENTIRE PROPERTY (OWNED)
    partA: { type: String, default: "" },
    partB: { type: String, default: "" },
    partC: { type: String, default: "" },
    partD: { type: String, default: "" },
    partE: { type: String, default: "" },
    partF: { type: String, default: "" },

    // PAGE 3 - GENERAL INFORMATION
    theMarketValueOfAbovePropertyIs: { type: String, default: "" },
    theRealisableValueOfAbovePropertyIs: { type: String, default: "" },
    theInsurableValueOfAbovePropertyIs: { type: String, default: "" },
    place: { type: String, default: "" },
    date: { type: String, default: "" },
    signatureOfBranchManagerWithOfficeSeal: { type: String, default: "" },
    shashilantRDhumalSignatureOfApprover: { type: String, default: "" },
    theUndersignedHasInspectedThePropertyDetailedInTheValuationReportCrossVerifyTheFollowingDetailsAndFoundToBeAccurate: { type: String, default: "" },
    thePropertyIsReasonablyMarketValueOn: { type: String, default: "" },
    theUndersignedHasInspectedAndSatisfiedThatTheFairAndReasonableMarketValueOn: { type: String, default: "" },

    // PAGE 4 - TOTAL ABSTRACT OF ENTIRE PROPERTY
    abstractLand: { type: String, default: "" },
    abstractBuilding: { type: String, default: "" },
    abstractExtraItems: { type: String, default: "" },
    abstractAmenities: { type: String, default: "" },
    abstractMiscellaneous: { type: String, default: "" },
    abstractServices: { type: String, default: "" },
    abstractTotalValue: { type: String, default: "" },
    abstractRoundedValue: { type: String, default: "" },

    // TOTAL ABSTRACT OF ENTIRE PROPERTY (AS PER REQUIREMENT OF OWNER)
    ownerAbstractLand: { type: String, default: "" },
    ownerAbstractBuilding: { type: String, default: "" },
    ownerAbstractExtraItems: { type: String, default: "" },
    ownerAbstractAmenities: { type: String, default: "" },
    ownerAbstractMiscellaneous: { type: String, default: "" },
    ownerAbstractServices: { type: String, default: "" },
    ownerAbstractTotalValue: { type: String, default: "" },
    ownerAbstractRoundedValue: { type: String, default: "" },

    asAResultOfMyAppraisalAndAnalysisItIsMyConsideredOpinionThatThePresentFairMarketValue: { type: String, default: "" },
    valueOfTheAbovePropertyAsOnTheValuationDateIs: { type: String, default: "" },
    preValuationRatePercentageWithDeductionWithRespectToTheAgreementValuePropertyDeed: { type: String, default: "" },

    // PAGE 5 - PART A - SERVICES
    srNo: { type: String, default: "" },
    description1: { type: String, default: "" },
    amountInRupees1: { type: String, default: "" },

    // PAGE 5 - PART A - CONTINUED (12 rows with Sr. No., Description, Amount in Rupees)
    part1SrNo1: { type: String, default: "" },
    part1Description1: { type: String, default: "" },
    part1Amount1: { type: String, default: "" },
    part1SrNo2: { type: String, default: "" },
    part1Description2: { type: String, default: "" },
    part1Amount2: { type: String, default: "" },
    part1SrNo3: { type: String, default: "" },
    part1Description3: { type: String, default: "" },
    part1Amount3: { type: String, default: "" },
    part1SrNo4: { type: String, default: "" },
    part1Description4: { type: String, default: "" },
    part1Amount4: { type: String, default: "" },
    part1SrNo5: { type: String, default: "" },
    part1Description5: { type: String, default: "" },
    part1Amount5: { type: String, default: "" },

    // PAGE 6 - PART A - AMENITIES (with Description and Amount in Rupees for 9 items)
    part2SrNo: { type: String, default: "" },
    part2Description: { type: String, default: "" },
    part2Workbeds: { type: String, default: "" },
    part2Item1Description: { type: String, default: "" },
    part2Item1Amount: { type: String, default: "" },
    part2Item2Description: { type: String, default: "" },
    part2Item2Amount: { type: String, default: "" },
    part2Item3Description: { type: String, default: "" },
    part2Item3Amount: { type: String, default: "" },
    part2Item4Description: { type: String, default: "" },
    part2Item4Amount: { type: String, default: "" },
    part2Item5Description: { type: String, default: "" },
    part2Item5Amount: { type: String, default: "" },
    part2Item6Description: { type: String, default: "" },
    part2Item6Amount: { type: String, default: "" },
    part2Item7Description: { type: String, default: "" },
    part2Item7Amount: { type: String, default: "" },
    part2Item8Description: { type: String, default: "" },
    part2Item8Amount: { type: String, default: "" },
    part2Item9Description: { type: String, default: "" },
    part2Item9Amount: { type: String, default: "" },
    part2Total: { type: String, default: "" },

    // PAGE 7 - PART C - MISCELLANEOUS
    part3SrNo: { type: String, default: "" },
    part3Description: { type: String, default: "" },
    part3Item1Description: { type: String, default: "" },
    part3Item1Amount: { type: String, default: "" },
    part3Item2Description: { type: String, default: "" },
    part3Item2Amount: { type: String, default: "" },
    part3Item3Description: { type: String, default: "" },
    part3Item3Amount: { type: String, default: "" },
    part3Item4Description: { type: String, default: "" },
    part3Item4Amount: { type: String, default: "" },
    part3Item5Description: { type: String, default: "" },
    part3Item5Amount: { type: String, default: "" },
    part3Total: { type: String, default: "" },

    // PAGE 8 - VALUATION OF BUILDING - FLOOR AREAS (SQM & SQFT)
    basementFloorSqm: { type: String, default: "" },
    basementFloorSqft: { type: String, default: "" },
    groundFloorSqm: { type: String, default: "" },
    groundFloorSqft: { type: String, default: "" },
    entranceCanopyAreaSqm: { type: String, default: "" },
    entranceCanopyAreaSqft: { type: String, default: "" },
    serviceFloorSqm: { type: String, default: "" },
    serviceFloorSqft: { type: String, default: "" },
    terraceAreaAboveCanopySqm: { type: String, default: "" },
    terraceAreaAboveCanopySqft: { type: String, default: "" },
    firstFloorSqm: { type: String, default: "" },
    firstFloorSqft: { type: String, default: "" },
    secondFloorSqm: { type: String, default: "" },
    secondFloorSqft: { type: String, default: "" },
    thirdFloorSqm: { type: String, default: "" },
    thirdFloorSqft: { type: String, default: "" },
    forthFloorSqm: { type: String, default: "" },
    forthFloorSqft: { type: String, default: "" },
    fifthFloorSqm: { type: String, default: "" },
    fifthFloorSqft: { type: String, default: "" },
    sixthFloorSqm: { type: String, default: "" },
    sixthFloorSqft: { type: String, default: "" },
    terraceFloorSqm: { type: String, default: "" },
    terraceFloorSqft: { type: String, default: "" },
    glassHouseFloorSqm: { type: String, default: "" },
    glassHouseFloorSqft: { type: String, default: "" },
    helipadFloorSqm: { type: String, default: "" },
    helipadFloorSqft: { type: String, default: "" },
    totalAreaSqm: { type: String, default: "" },
    totalAreaSqft: { type: String, default: "" },
    
    // Additional Floor Area Fields (Extent of Site & Occupancy)
    totalBuiltUpSqm: { type: String, default: "" },
    totalBuiltUpSqft: { type: String, default: "" },
    groundCoverageAreaSqm: { type: String, default: "" },
    groundCoverageAreaSqft: { type: String, default: "" },
    basementFloorAreaSqm: { type: String, default: "" },
    basementFloorAreaSqft: { type: String, default: "" },
    canopyAreaSqm: { type: String, default: "" },
    canopyAreaSqft: { type: String, default: "" },
    totalFloorAreaBalconySqm: { type: String, default: "" },
    totalFloorAreaBalconySqft: { type: String, default: "" },

    // SPECIFICATIONS OF CONSTRUCTION (FLOOR-WISE)
    constructionFoundation: { type: String, default: "" },
    constructionBasement: { type: String, default: "" },
    constructionSuperstructure: { type: String, default: "" },
    constructionEntranceDoor: { type: String, default: "" },
    constructionOtherDoor: { type: String, default: "" },
    constructionWindows: { type: String, default: "" },
    constructionFlooring: { type: String, default: "" },
    constructionSpecialFinish: { type: String, default: "" },
    constructionRoofing: { type: String, default: "" },
    constructionDrainage: { type: String, default: "" },

    // COMPOUND WALL & UTILITIES SPECIFICATIONS
    compoundWall: { type: String, default: "" },
    height: { type: String, default: "" },
    length: { type: String, default: "" },
    typeOfConstruction: { type: String, default: "" },
    electricalInstallation: { type: String, default: "" },
    typeOfWiring: { type: String, default: "" },
    classOfFittings: { type: String, default: "" },
    numberOfLightPoints: { type: String, default: "" },
    farPlugs: { type: String, default: "" },
    sparePlug: { type: String, default: "" },
    anyOtherElectricalItem: { type: String, default: "" },
    plumbingInstallation: { type: String, default: "" },
    numberOfWaterClassAndTaps: { type: String, default: "" },
    noWashBasins: { type: String, default: "" },
    noUrinals: { type: String, default: "" },
    noOfBathtubs: { type: String, default: "" },
    waterMeterTapsEtc: { type: String, default: "" },
    anyOtherPlumbingFixture: { type: String, default: "" },

    // ESTIMATED REPLACEMENT COST OF CONSTRUCTION
    replacementCostGround: { type: String, default: "" },
    replacementCostUpperFloors: { type: String, default: "" },
    replacementCostService: { type: String, default: "" },
    replacementCostBasement: { type: String, default: "" },

    // BUILDING PARAMETERS
    yearOfConstruction: { type: String, default: "" },
    buildingAge: { type: String, default: "" },
    buildingLifeEstimated: { type: String, default: "" },
    depreciationPercentage: { type: String, default: "" },
    depreciatedBuildingRate: { type: String, default: "" },

    // COST OF CONSTRUCTION OF AS PER ACTUAL MEASUREMENT - FLOOR-WISE
    basementFloorCostSqft: { type: String, default: "" },
    basementFloorCostRate: { type: String, default: "" },
    basementFloorCostValue: { type: String, default: "" },
    groundFloorCostSqft: { type: String, default: "" },
    groundFloorCostRate: { type: String, default: "" },
    groundFloorCostValue: { type: String, default: "" },
    firstFloorCostSqft: { type: String, default: "" },
    firstFloorCostRate: { type: String, default: "" },
    firstFloorCostValue: { type: String, default: "" },

    // RATE OF BUILT-UP AREA TABLE
    groundFloorBuiltUpSqft: { type: String, default: "" },
    groundFloorRateConstruction: { type: String, default: "" },
    groundFloorValueConstruction: { type: String, default: "" },
    serviceFloorBuiltUpSqft: { type: String, default: "" },
    serviceFloorRateConstruction: { type: String, default: "" },
    serviceFloorValueConstruction: { type: String, default: "" },
    firstFloorBuiltUpSqft: { type: String, default: "" },
    firstFloorRateConstruction: { type: String, default: "" },
    firstFloorValueConstruction: { type: String, default: "" },
    secondFloorBuiltUpSqft: { type: String, default: "" },
    secondFloorRateConstruction: { type: String, default: "" },
    secondFloorValueConstruction: { type: String, default: "" },
    thirdFloorBuiltUpSqft: { type: String, default: "" },
    thirdFloorRateConstruction: { type: String, default: "" },
    thirdFloorValueConstruction: { type: String, default: "" },
    fourthFloorBuiltUpSqft: { type: String, default: "" },
    fourthFloorRateConstruction: { type: String, default: "" },
    fourthFloorValueConstruction: { type: String, default: "" },
    fifthFloorBuiltUpSqft: { type: String, default: "" },
    fifthFloorRateConstruction: { type: String, default: "" },
    fifthFloorValueConstruction: { type: String, default: "" },
    sixthFloorBuiltUpSqft: { type: String, default: "" },
    sixthFloorRateConstruction: { type: String, default: "" },
    sixthFloorValueConstruction: { type: String, default: "" },
    basementInteriorBuiltUpSqft: { type: String, default: "" },
    basementInteriorRateConstruction: { type: String, default: "" },
    basementInteriorValueConstruction: { type: String, default: "" },
    canopyAreaBuiltUpSqft: { type: String, default: "" },
    canopyAreaRateConstruction: { type: String, default: "" },
    canopyAreaValueConstruction: { type: String, default: "" },
    totalBuiltUpSqft: { type: String, default: "" },
    totalValueConstruction: { type: String, default: "" },

    // PAGE 9 - DETAILS OF VALUATION OF BUILDING
    ornamentalFloor: { type: String, default: "" },
    ornamentalFloorAmount: { type: String, default: "" },
    stuccoVeranda: { type: String, default: "" },
    stuccoVerandaAmount: { type: String, default: "" },
    sheetGrills: { type: String, default: "" },
    sheetGrillsAmount: { type: String, default: "" },
    overheadWaterTank: { type: String, default: "" },
    overheadWaterTankAmount: { type: String, default: "" },
    extraShedPossibleGates: { type: String, default: "" },
    extraShedPossibleGatesAmount: { type: String, default: "" },

    // PAGE 10 - PART F - SERVICES
    partFSrNo: { type: String, default: "" },
    partFDescription: { type: String, default: "" },
    partFPortico: { type: String, default: "" },
    partFItem1Description: { type: String, default: "" },
    partFItem1Amount: { type: String, default: "" },
    partFItem2Description: { type: String, default: "" },
    partFItem2Amount: { type: String, default: "" },
    partFItem3Description: { type: String, default: "" },
    partFItem3Amount: { type: String, default: "" },
    partFItem4Description: { type: String, default: "" },
    partFItem4Amount: { type: String, default: "" },
    partFItem5Description: { type: String, default: "" },
    partFItem5Amount: { type: String, default: "" },
    partFItem6Description: { type: String, default: "" },
    partFItem6Amount: { type: String, default: "" },
    partFTotal: { type: String, default: "" },

    // PAGE 11 - PART C EXTRA ITEMS
    partCExtraSrNo: { type: String, default: "" },
    partCExtraDescription: { type: String, default: "" },
    partCExtraWorksItems: { type: String, default: "" },
    partCExtraItem1Description: { type: String, default: "" },
    partCExtraItem1Amount: { type: String, default: "" },
    partCExtraItem2Description: { type: String, default: "" },
    partCExtraItem2Amount: { type: String, default: "" },
    partCExtraItem3Description: { type: String, default: "" },
    partCExtraItem3Amount: { type: String, default: "" },
    partCExtraItem4Description: { type: String, default: "" },
    partCExtraItem4Amount: { type: String, default: "" },
    partCExtraItem5Description: { type: String, default: "" },
    partCExtraItem5Amount: { type: String, default: "" },
    partCExtraTotal: { type: String, default: "" },

    // PAGE 12 - PART E - MISCELLANEOUS (Revised)
    partESrNo: { type: String, default: "" },
    partEDescription: { type: String, default: "" },
    partEItem1Description: { type: String, default: "" },
    partEItem1Amount: { type: String, default: "" },
    partEItem2Description: { type: String, default: "" },
    partEItem2Amount: { type: String, default: "" },
    partEItem3Description: { type: String, default: "" },
    partEItem3Amount: { type: String, default: "" },
    partEItem4Description: { type: String, default: "" },
    partEItem4Amount: { type: String, default: "" },
    partETotal: { type: String, default: "" },

    // VALUE OF FLAT - SECTION C
    fairMarketValue: { type: String, default: "" },
    realizableValue: { type: String, default: "" },
    distressValue: { type: String, default: "" },
    saleDeedValue: { type: String, default: "" },
    agreementCircleRate: { type: String, default: "" },
    agreementValue: { type: String, default: "" },
    valueCircleRate: { type: String, default: "" },
    insurableValue: { type: String, default: "" },
    totalJantriValue: { type: String, default: "" },

    // FLAT SPECIFICATIONS EXTENDED
    areaUsage: { type: String, default: "" },
    carpetAreaFlat: { type: String, default: "" },

    // MONTHLY RENT
    ownerOccupancyStatus: { type: String, default: "" },
    monthlyRent: { type: String, default: "" },

    // MARKETABILITY SECTION
    marketability: { type: String, default: "" },
    favoringFactors: { type: String, default: "" },
    negativeFactors: { type: String, default: "" },

    // RATE SECTION
    comparableRate: { type: String, default: "" },
    adoptedBasicCompositeRate: { type: String, default: "" },
    buildingServicesRate: { type: String, default: "" },
    landOthersRate: { type: String, default: "" },
    guidelineRate: { type: String, default: "" },

    // COMPOSITE RATE AFTER DEPRECIATION
    replacementCostServices: { type: String, default: "" },
    buildingLife: { type: String, default: "" },
    deprecatedRatio: { type: String, default: "" },

    // MARKET RATE ANALYSIS
    marketabilityDescription: { type: String, default: "" },
    smallFlatDescription: { type: String, default: "" },
    newConstructionArea: { type: String, default: "" },
    rateAdjustments: { type: String, default: "" },

    // BREAK-UP FOR THE ABOVE RATE
    goodwillRate: { type: String, default: "" },

    // COMPOSITE RATE AFTER DEPRECIATION (LEGACY)
    depreciationBuildingDate: { type: String, default: "" },
    depreciationStorage: { type: String, default: "" },

    // TOTAL COMPOSITE RATE
    totalCompositeRate: { type: String, default: "" },
    rateForLandOther: { type: String, default: "" },

    // VALUATION DETAILS - Items (Qty, Rate, Value rows)
    presentValueQty: { type: String, default: "" },
    presentValueRate: { type: String, default: "" },
    presentValue: { type: String, default: "" },
    wardrobesQty: { type: String, default: "" },
    wardrobesRate: { type: String, default: "" },
    wardrobes: { type: String, default: "" },
    showcasesQty: { type: String, default: "" },
    showcasesRate: { type: String, default: "" },
    showcases: { type: String, default: "" },
    kitchenArrangementsQty: { type: String, default: "" },
    kitchenArrangementsRate: { type: String, default: "" },
    kitchenArrangements: { type: String, default: "" },
    superfineFinishQty: { type: String, default: "" },
    superfineFinishRate: { type: String, default: "" },
    superfineFinish: { type: String, default: "" },
    interiorDecorationsQty: { type: String, default: "" },
    interiorDecorationsRate: { type: String, default: "" },
    interiorDecorations: { type: String, default: "" },
    electricityDepositsQty: { type: String, default: "" },
    electricityDepositsRate: { type: String, default: "" },
    electricityDeposits: { type: String, default: "" },
    collapsibleGatesQty: { type: String, default: "" },
    collapsibleGatesRate: { type: String, default: "" },
    collapsibleGates: { type: String, default: "" },
    potentialValueQty: { type: String, default: "" },
    potentialValueRate: { type: String, default: "" },
    potentialValue: { type: String, default: "" },
    otherItemsQty: { type: String, default: "" },
    otherItemsRate: { type: String, default: "" },
    otherItems: { type: String, default: "" },
    totalValuationItems: { type: String, default: "" },

    // PAGE 13 - BUILDING CONSTRUCTION - FLOOR WISE DETAILS
    buildingConstructionSrNo: { type: String, default: "" },
    buildingConstructionDescription: { type: String, default: "" },
    builtUpArea: { type: String, default: "" },
    groundFloor: { type: String, default: "" },
    groundFloorRate: { type: String, default: "" },
    groundFloorValue: { type: String, default: "" },
    firstFloor: { type: String, default: "" },
    firstFloorRate: { type: String, default: "" },
    firstFloorValue: { type: String, default: "" },
    secondFloor: { type: String, default: "" },
    secondFloorRate: { type: String, default: "" },
    secondFloorValue: { type: String, default: "" },
    thirdFloor: { type: String, default: "" },
    thirdFloorRate: { type: String, default: "" },
    thirdFloorValue: { type: String, default: "" },
    fourthFloor: { type: String, default: "" },
    fourthFloorRate: { type: String, default: "" },
    fourthFloorValue: { type: String, default: "" },
    fifthFloor: { type: String, default: "" },
    fifthFloorRate: { type: String, default: "" },
    fifthFloorValue: { type: String, default: "" },
    sixthFloor: { type: String, default: "" },
    sixthFloorRate: { type: String, default: "" },
    sixthFloorValue: { type: String, default: "" },
    basementFloor: { type: String, default: "" },
    basementFloorRate: { type: String, default: "" },
    basementFloorValue: { type: String, default: "" },
    glassHouse: { type: String, default: "" },
    glassHouseRate: { type: String, default: "" },
    totalAreaBuilding: { type: String, default: "" },

    // PAGE 13 - MEASUREMENT CARPET AREA
    carpetAreaSqft: { type: String, default: "" },
    basementFloorSqft: { type: String, default: "" },
    groundFloorSqftMeasure: { type: String, default: "" },
    groundFloorAmountInRupees: { type: String, default: "" },
    serviceFloorCarpetArea: { type: String, default: "" },
    traceAreaCarpetArea: { type: String, default: "" },
    firstFloorCarpetArea: { type: String, default: "" },
    serviceFloor: { type: String, default: "" },
    serviceFloorRate: { type: String, default: "" },
    serviceFloorValue: { type: String, default: "" },

    // PAGE 14 - PLOT AREA & BUILT UP AREA
    west: { type: String, default: "" },
    extentAreaAndBuildUpArea: { type: String, default: "" },
    plotAreaAsPerSketchedPlan: { type: String, default: "" },
    plotAreaInBuildUpAreaInSqft: { type: String, default: "" },
    plotAreaInSqft: { type: String, default: "" },
    buildUpAreaAsPerSketchedPlan: { type: String, default: "" },
    buildingSpecificationsPlotLayout: { type: String, default: "" },
    floorAreaSqft: { type: String, default: "" },
    rateOfConstructionPerSqft: { type: String, default: "" },
    valueOfConstruction: { type: String, default: "" },
    rateOfConstructionValues: { type: String, default: "" },
    buildingSpecificationsPlotLayoutSqfRateValue: { type: String, default: "" },
    deedBuiltUpAreaSqft: { type: String, default: "" },
    estimatedRepairCostOfConstruction: { type: String, default: "" },
    floorAreaSqftLand: { type: String, default: "" },
    ratePerSqftLand: { type: String, default: "" },
    interior0PercentLand: { type: String, default: "" },
    entranceCanopyArea: { type: String, default: "" },

    // PAGE 15 - PROPERTY DETAILS SECTION
    locationOfProperty: { type: String, default: "" },
    plotNo: { type: String, default: "" },
    surveyNo: { type: String, default: "" },
    doorNo: { type: String, default: "" },
    taluka: { type: String, default: "" },
    mandal: { type: String, default: "" },
    district: { type: String, default: "" },
    briefDescriptionOfProperty: { type: String, default: "" },
    cityTown: { type: String, default: "" },
    residentialArea: { type: String, default: "" },
    commercialArea: { type: String, default: "" },
    industrialArea: { type: String, default: "" },
    classificationOfArea: { type: String, default: "" },
    urbanRural: { type: String, default: "" },
    mileSemUrban: { type: String, default: "" },
    municipalCorporationAsPer: { type: String, default: "" },

    // BOUNDARIES OF PROPERTY
    boundariesOfTheProperty: { type: String, default: "" },
    northBoundary: { type: String, default: "" },
    southBoundary: { type: String, default: "" },
    eastBoundary: { type: String, default: "" },
    westBoundary: { type: String, default: "" },

    // PAGE 16 - APARTMENT BUILDING & NATURE
    classificationOfLocality: { type: String, default: "" },
    developmentOfSurroundingAreas: { type: String, default: "" },
    possibilityOfFutureHousingMixing: { type: String, default: "" },
    feasibilityOf1To2Kms: { type: String, default: "" },
    typeOfStructureMaterial: { type: String, default: "" },
    shareOfLand: { type: String, default: "" },
    typeOfUseToWhichItCanBePut: { type: String, default: "" },
    anyUsageRestriction: { type: String, default: "" },
    isPlotInTownPlanning: { type: String, default: "" },
    cornerPlotOrInteriorFacilities: { type: String, default: "" },
    yearOfRoadAvailability: { type: String, default: "" },
    waterRoadAvailableBelowOrAbove: { type: String, default: "" },
    isALandArea: { type: String, default: "" },
    waterSewerageSystem: { type: String, default: "" },
    apartmentNature: { type: String, default: "" },
    apartmentLocation: { type: String, default: "" },
    apartmentCTSNo: { type: String, default: "" },
    apartmentSectorNo: { type: String, default: "" },
    apartmentBlockNo: { type: String, default: "" },
    apartmentWardNo: { type: String, default: "" },
    apartmentVillageMunicipalityCounty: { type: String, default: "" },
    apartmentDoorNoStreetRoad: { type: String, default: "" },
    apartmentPinCode: { type: String, default: "" },
    descriptionOfLocalityResidentialCommercialMixed: { type: String, default: "" },
    numberOfDwellingUnitsInBuilding: { type: String, default: "" },

    // PAGE 17 - APPROVAL & AUTHORIZATION
    constructionAsPer: { type: String, default: "" },
    panchayatMunicipalitySearchReport: { type: String, default: "" },
    watercoveredUnderSaleDeeds: { type: String, default: "" },
    governmentEnctmentsOrUtilitiesScheduledArea: { type: String, default: "" },
    dateIssueAndValidityOfApprovedPlan: { type: String, default: "" },
    whetherGenerousOnAuthority: { type: String, default: "" },
    anyOtherCommentsOrAuthorityApprovedPlan: { type: String, default: "" },
    purposeForValuation: { type: String, default: "" },
    dateOfInspection: { type: String, default: "" },
    dateOnWhichValuationIsMade: { type: String, default: "" },
    listOfDocumentsProducedForPerusal: { type: String, default: "" },
    protocolDocuments: { type: String, default: "" },
    sanctionedPlanStatus: { type: String, default: "" },
    certificateNumber: { type: String, default: "" },
    buildingCompletionCertificate: { type: String, default: "" },
    completionCertificateNo: { type: String, default: "" },
    ownerAddressJointOwners: { type: String, default: "" },
    jointOwnersDeDetailsOfJointOwnership: { type: String, default: "" },

    // SECTION 3: FLAT/UNIT SPECIFICATIONS
    unitFloor: { type: String, default: "" },
    unitDoorNo: { type: String, default: "" },
    unitRoof: { type: String, default: "" },
    unitFlooring: { type: String, default: "" },
    unitDoors: { type: String, default: "" },
    unitBathAndWC: { type: String, default: "" },
    unitElectricalWiring: { type: String, default: "" },
    unitSpecification: { type: String, default: "" },
    unitFittings: { type: String, default: "" },
    unitFinishing: { type: String, default: "" },
    unitWindows: { type: String, default: "" },

    // SECTION 4: UNIT TAX/ASSESSMENT
    assessmentNo: { type: String, default: "" },
    taxPaidName: { type: String, default: "" },
    taxAmount: { type: String, default: "" },

    // SECTION 5: ELECTRICITY SERVICE
    electricityServiceNo: { type: String, default: "" },
    meterCardName: { type: String, default: "" },

    // SECTION 6: UNIT MAINTENANCE
    unitMaintenance: { type: String, default: "" },

    // SECTION 7: AGREEMENT FOR SALE
    agreementSaleExecutedName: { type: String, default: "" },

    // SECTION 8 & 9: UNIT AREA DETAILS
    undividedAreaLand: { type: String, default: "" },
    plinthArea: { type: String, default: "" },
    carpetArea: { type: String, default: "" },

    // SECTION 10-14: UNIT CLASSIFICATION
    classificationPosh: { type: String, default: "" },
    classificationUsage: { type: String, default: "" },
    classificationOwnership: { type: String, default: "" },

    // SIGNATURE & REPORT DETAILS
    signatureDate: { type: String, default: "" },
    signerName: { type: String, default: "" },
    reportDate: { type: String, default: "" },
    fairMarketValueWords: { type: String, default: "" },

    // FACILITIES AVAILABLE
    liftAvailable: { type: String, default: "" },
    protectedWaterSupply: { type: String, default: "" },
    undergroundSewerage: { type: String, default: "" },
    carParkingOpenCovered: { type: String, default: "" },
    isCompoundWallExisting: { type: String, default: "" },
    isPavementLaidAroundBuilding: { type: String, default: "" },
    othersFacility: { type: String, default: "" },

    // DECLARATIONS
    declarationB: { type: String, default: "" },
    declarationD: { type: String, default: "" },
    declarationE: { type: String, default: "" },
    declarationI: { type: String, default: "" },
    declarationJ: { type: String, default: "" },

    // VALUATION INFORMATION DETAILS
    assetBackgroundInfo: { type: String, default: "" },
    valuationPurposeAuthority: { type: String, default: "" },
    valuersIdentity: { type: String, default: "" },
    valuersConflictDisclosure: { type: String, default: "" },
    dateOfAppointment: { type: String, default: "" },
    inspectionsUndertaken: { type: String, default: "" },
    informationSources: { type: String, default: "" },
    valuationProcedures: { type: String, default: "" },
    reportRestrictions: { type: String, default: "" },
    majorFactors: { type: String, default: "" },
    additionalFactors: { type: String, default: "" },
    caveatsLimitations: { type: String, default: "" },
    
    // ADDITIONAL MISSING FIELDS
    ownerOccupiedOrLetOut: { type: String, default: "" },
    electricityServiceConnectionNo: { type: String, default: "" },
    valuationPlace: { type: String, default: "" },
    valuationMadeDate: { type: String, default: "" },
    valuersName: { type: String, default: "" },
    residentialOrCommercial: { type: String, default: "" },
    facilityOthers: { type: String, default: "" },
    doorsAndWindows: { type: String, default: "" },

    // BUILDING TYPE & CONSTRUCTION DETAILS (VALUATION OF BUILDING)
    buildingType: { type: String, default: "" },
    ageOfProperty: { type: String, default: "" },
    residualLifeBuilding: { type: String, default: "" },
    numberOfFloors: { type: String, default: "" },
    buildingCondition: { type: String, default: "" },
    exteriorCondition: { type: String, default: "" },
    interiorCondition: { type: String, default: "" },
    layoutApprovalDetails: { type: String, default: "" },
    approvedMapAuthorityBuilding: { type: String, default: "" },
    authenticityOfApprovedPlan: { type: String, default: "" },
    otherCommentsOnApprovedPlan: { type: String, default: "" },

    // PROPERTY DETAILS
    surveyNo: { type: String, default: "" },
    doorNo: { type: String, default: "" },
    apartmentVillageMunicipalityCounty: { type: String, default: "" },
    taluka: { type: String, default: "" },
    mandal: { type: String, default: "" },
    district: { type: String, default: "" },
    layoutPlanIssueDate: { type: String, default: "" },
    approvedMapAuthority: { type: String, default: "" },
    authenticityVerified: { type: String, default: "" },
    valuerCommentOnAuthenticity: { type: String, default: "" },
    otherApprovedPlanDetails: { type: String, default: "" },
    valuesApprovedPlan: { type: String, default: "" },
    postalAddress: { type: String, default: "" },
    cityTown: { type: String, default: "" },
    residentialArea: { type: Boolean, default: false },
    commercialArea: { type: Boolean, default: false },
    industrialArea: { type: Boolean, default: false },
    locationOfProperty: { type: String, default: "" },

    // INDUSTRIAL AREA DETAILS - Section 9
    areaClassification: { type: String, default: "" },
    urbanClassification: { type: String, default: "" },
    governmentType: { type: String, default: "" },
    govtEnactmentsCovered: { type: String, default: "" },

    // BOUNDARIES OF PROPERTY - Section 12
    northBoundary: { type: String, default: "" },
    southBoundary: { type: String, default: "" },
    eastBoundary: { type: String, default: "" },
    westBoundary: { type: String, default: "" },
    boundariesShopNorthDeed: { type: String, default: "" },
    boundariesShopNorthActual: { type: String, default: "" },
    boundariesShopSouthDeed: { type: String, default: "" },
    boundariesShopSouthActual: { type: String, default: "" },
    boundariesShopEastDeed: { type: String, default: "" },
    boundariesShopEastActual: { type: String, default: "" },
    boundariesShopWestDeed: { type: String, default: "" },
    boundariesShopWestActual: { type: String, default: "" },
    
    // Location Property Additional Fields
    plotSurveyNo: { type: String, default: "" },
    tpVillage: { type: String, default: "" },
    wardTaluka: { type: String, default: "" },
    mandalDistrict: { type: String, default: "" },

    // BOUNDARIES OF PROPERTY - PLOT (As per Deed & Actual)
    boundariesPlotNorthDeed: { type: String, default: "" },
    boundariesPlotNorthActual: { type: String, default: "" },
    boundariesPlotSouthDeed: { type: String, default: "" },
    boundariesPlotSouthActual: { type: String, default: "" },
    boundariesPlotEastDeed: { type: String, default: "" },
    boundariesPlotEastActual: { type: String, default: "" },
    boundariesPlotWestDeed: { type: String, default: "" },
    boundariesPlotWestActual: { type: String, default: "" },

    // DIMENSIONS OF THE UNIT - Section 13
    dimensionsDeed: { type: String, default: "" },
    dimensionsActual: { type: String, default: "" },

    // EXTENT OF THE UNIT - Section 14
    extentOfUnit: { type: String, default: "" },
    latitudeLongitude: { type: String, default: "" },
    floorSpaceIndex: { type: String, default: "" },

    // EXTENT OF SITE CONSIDERED FOR VALUATION - Section 15
    extentOfSiteValuation: { type: String, default: "" },

    // SECTION 16 - OCCUPANCY
    rentReceivedPerMonth: { type: String, default: "" },

    // APARTMENT BUILDING DETAILS - Section II
    apartmentNature: { type: String, default: "" },
    apartmentLocation: { type: String, default: "" },
    apartmentCTSNo: { type: String, default: "" },
    apartmentSectorNo: { type: String, default: "" },
    apartmentBlockNo: { type: String, default: "" },
    apartmentWardNo: { type: String, default: "" },
    apartmentDoorNoStreetRoad: { type: String, default: "" },
    apartmentPinCode: { type: String, default: "" },

    // APARTMENT BUILDING SUBSECTIONS
    descriptionOfLocalityResidentialCommercialMixed: { type: String, default: "" },
    typeOfStructure: { type: String, default: "" },
    numberOfDwellingUnitsInBuilding: { type: String, default: "" },
    qualityOfConstruction: { type: String, default: "" },
    appearanceOfBuilding: { type: String, default: "" },
    maintenanceOfBuilding: { type: String, default: "" },

    // APARTMENT BUILDING DETAILS - From Table II
    classificationOfLocality: { type: String, default: "" },
    developmentOfSurroundingAreas: { type: String, default: "" },
    possibilityOfFrequentFlooding: { type: String, default: "" },
    feasibilityToCivicAmenities: { type: String, default: "" },
    levelOfLandWithTopographicalConditions: { type: String, default: "" },
    shapeOfLand: { type: String, default: "" },
    typeOfUseToWhichItCanBePut: { type: String, default: "" },
    anyUsageRestriction: { type: String, default: "" },
    isPlotInTownPlanningApprovedLayout: { type: String, default: "" },
    cornerPlotOrIntermittentPlot: { type: String, default: "" },
    roadFacilities: { type: String, default: "" },
    typeOfRoadAvailableAtPresent: { type: String, default: "" },
    widthOfRoad: { type: String, default: "" },
    isItALandLockedLand: { type: String, default: "" },
    waterPotentiality: { type: String, default: "" },
    undergroundSewerageSystem: { type: String, default: "" },
    isPowerSupplyAvailableAtSite: { type: String, default: "" },
    advantageOfSite: { type: String, default: "" },
    specialRemarksIfAnyThreatOfAcquisition: { type: String, default: "" },

    // VALUATION OF LAND - Part A
    sizeOfLandNorthSouth: { type: String, default: "" },
    sizeOfLandEastWest: { type: String, default: "" },
    plotAreaSqm: { type: String, default: "" },
    plotAreaSqft: { type: String, default: "" },
    totalExtentOfLand: { type: String, default: "" },
    totalExtentOfLandSqm: { type: String, default: "" },
    totalExtentOfLandSqft: { type: String, default: "" },
    prevailingMarketRate: { type: String, default: "" },
    prevailingMarketRatePerAcre: { type: String, default: "" },
    guidelineRatePerSqm: { type: String, default: "" },
    assessedAdoptedRate: { type: String, default: "" },
    assessedAdoptedRatePerSqft: { type: String, default: "" },
    estimatedValueOfLand: { type: String, default: "" },
    estimatedValueOfLandAmount: { type: String, default: "" },

    // DOCUMENTS AND PHOTOCOPY
    documentsPhotocopy: { type: String, default: "" },
    
    // FLOOR AREA INCLUDING BALCONY & TERRACE (SQM & SQFT)
    basementFloorBalconySqm: { type: String, default: "" },
    basementFloorBalconySqft: { type: String, default: "" },
    groundFloorBalconySqm: { type: String, default: "" },
    groundFloorBalconySqft: { type: String, default: "" },
    canopyAreaBalconySqm: { type: String, default: "" },
    canopyAreaBalconySqft: { type: String, default: "" },
    serviceFloorBalconySqm: { type: String, default: "" },
    serviceFloorBalconySqft: { type: String, default: "" },
    terraceAreaAboveCanopyBalconySqm: { type: String, default: "" },
    terraceAreaAboveCanopyBalconySqft: { type: String, default: "" }, 
    firstFloorBalconySqm: { type: String, default: "" },
    firstFloorBalconySqft: { type: String, default: "" },
    secondFloorBalconySqm: { type: String, default: "" },
    secondFloorBalconySqft: { type: String, default: "" },
    thirdFloorBalconySqm: { type: String, default: "" },
    thirdFloorBalconySqft: { type: String, default: "" },
    fourthFloorBalconySqm: { type: String, default: "" },
    fourthFloorBalconySqft: { type: String, default: "" },
    fifthFloorBalconySqm: { type: String, default: "" },
    fifthFloorBalconySqft: { type: String, default: "" },
    sixthFloorBalconySqm: { type: String, default: "" },
    sixthFloorBalconySqft: { type: String, default: "" },
    
    // FORMID DETAILS
    formId: { type: String, default: "" },
    branch: { type: String, default: "" },
    valuationPurpose: { type: String, default: "" },
    dateOfInspection: { type: String, default: "" },
    refNo: { type: String, default: "" },
    dateOfAppointment: { type: String, default: "" },

    dateOnWhichValuationIsMade: { type: String, default: "" },
    purposeForValuation: { type: String, default: "" },
    briefDescriptionOfProperty: { type: String, default: "" },
    sanctionedPlanStatus: { type: String, default: "" },
    buildingCompletionCertificate: { type: String, default: "" },
    ownerAddressJointOwners: { type: String, default: "" },
    ownerName: { type: String, default: "" },
    
    // CUSTOM DYNAMIC TABLE FIELDS
    customCarpetAreaFields: [{ type: Object, default: () => ({}) }],
    customBuiltUpAreaFields: [{ type: Object, default: () => ({}) }],
    customCostOfConstructionFields: [{ type: Object, default: () => ({}) }]
   
    }, { _id: false });

const customFieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

const customExtentOfSiteFieldSchema = new mongoose.Schema({
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    sqm: { type: String, default: "" },
    sqft: { type: String, default: "" }
}, { _id: false });

const customFloorAreaBalconyFieldSchema = new mongoose.Schema({
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    sqm: { type: String, default: "" },
    sqft: { type: String, default: "" }
}, { _id: false });

const customCarpetAreaFieldSchema = new mongoose.Schema({
    id: { type: String, default: "" },
    floorName: { type: String, default: "" },
    sqm: { type: String, default: "" },
    sqft: { type: String, default: "" }
}, { _id: false });

const customBuiltUpAreaFieldSchema = new mongoose.Schema({
    id: { type: String, default: "" },
    floorName: { type: String, default: "" },
    sqft: { type: String, default: "" },
    rateConstruction: { type: String, default: "" },
    valueConstruction: { type: String, default: "" }
}, { _id: false });

const customCostOfConstructionFieldSchema = new mongoose.Schema({
    id: { type: String, default: "" },
    slabArea: { type: String, default: "" },
    sqft: { type: String, default: "" },
    rate: { type: String, default: "" },
    value: { type: String, default: "" }
}, { _id: false });



const ubiApfSchema = new mongoose.Schema({
    // BASIC INFO
    clientId: { type: String, required: true, index: true },
    uniqueId: { type: String, required: true, sparse: true },
    username: { type: String, required: true },
    dateTime: { type: String, required: true },
    day: { type: String, required: true },

    // BANK & CITY
    bankName: { type: String, required: true },
    city: { type: String, required: true },
    customBankName: { type: String, default: "" },
    customCity: { type: String, default: "" },

    // CLIENT DETAILS
    clientName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },

    // PAYMENT
    payment: { type: String, required: true },
    collectedBy: { type: String, default: "" },

    // DSA & ENGINEER
    dsa: { type: String, required: true },
    customDsa: { type: String, default: "" },
    engineerName: { type: String, required: true, default: "" },
    customEngineerName: { type: String, default: "" },
    // NOTES
    notes: { type: String, default: "" },
    selectedForm: { type: String, default: null },

    // PROPERTY BASIC DETAILS
    elevation: { type: String, default: "" },

    directions: { type: ubiApfDirectionSchema, default: () => ({}) },
    coordinates: { type: ubiApfCoordinateSchema, default: () => ({}) },

    propertyImages: [mongoose.Schema.Types.Mixed],
    locationImages: [mongoose.Schema.Types.Mixed],
    documentPreviews: [mongoose.Schema.Types.Mixed],
     areaImages: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    
    photos: { type: ubiApfPhotoSchema, default: () => ({}) },
    status: {
        type: String,
        enum: ["pending", "on-progress", "approved", "rejected", "rework"],
        default: "pending"
    },
    managerFeedback: { type: String, default: "" },
    submittedByManager: { type: Boolean, default: false },
    lastUpdatedBy: { type: String, default: "" },
    lastUpdatedByRole: { type: String, default: "" },
    reworkComments: { type: String, default: "" },
    reworkRequestedBy: { type: String, default: "" },
    reworkRequestedAt: { type: Date, default: null },
    reworkRequestedByRole: { type: String, default: "" },
    pdfDetails: { type: ubiApfPdfDetailsSchema, default: () => ({}) },
    lastUpdatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    customFields: {
        type: [customFieldSchema],
        default: []
    },
    customExtentOfSiteFields: {
        type: [customExtentOfSiteFieldSchema],
        default: []
    },
    customFloorAreaBalconyFields: {
        type: [customFloorAreaBalconyFieldSchema],
        default: []
    }

});
ubiApfSchema.index({ clientId: 1, uniqueId: 1 }, { unique: true, sparse: true });

ubiApfSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const ubiApfModel = mongoose.model("ubiApf", ubiApfSchema, "ubi_Apf");
export default ubiApfModel;