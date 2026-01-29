import mongoose from "mongoose";

const directionSchema = new mongoose.Schema(
    {
        north1: { type: String, default: "" },
        east1: { type: String, default: "" },
        south1: { type: String, default: "" },
        west1: { type: String, default: "" },
        north2: { type: String, default: "" },
        east2: { type: String, default: "" },
        south2: { type: String, default: "" },
        west2: { type: String, default: "" }
    },
    { _id: false }
);

const coordinateSchema = new mongoose.Schema(
    {
        latitude: { type: String, default: "" },
        longitude: { type: String, default: "" }
    },
    { _id: false }
);

const photoSchema = new mongoose.Schema(
    {
        elevationImages: [String],
        siteImages: [String]
    },
    { _id: false }
);

const locationDetailsSchema = new mongoose.Schema(
    {
        plotNoSurveyNo: { type: String, default: "" },
        doorNo: { type: String, default: "" },
        tsNoVillage: { type: String, default: "" },
        wardTaluka: { type: String, default: "" },
        mandalDistrict: { type: String, default: "" }
    },
    { _id: false }
);

const boundariesSchema = new mongoose.Schema(
    {
        east: { saleDeed: { type: String, default: "" }, siteVisit: { type: String, default: "" } },
        west: { saleDeed: { type: String, default: "" }, siteVisit: { type: String, default: "" } },
        north: { saleDeed: { type: String, default: "" }, siteVisit: { type: String, default: "" } },
        south: { saleDeed: { type: String, default: "" }, siteVisit: { type: String, default: "" } }
    },
    { _id: false }
);

const dimensionsSchema = new mongoose.Schema(
    {
        east: { deed: { type: String, default: "" }, actual: { type: String, default: "" } },
        west: { deed: { type: String, default: "" }, actual: { type: String, default: "" } },
        north: { deed: { type: String, default: "" }, actual: { type: String, default: "" } },
        south: { deed: { type: String, default: "" }, actual: { type: String, default: "" } }
    },
    { _id: false }
);

const areaClassificationSchema = new mongoose.Schema(
    {
        highMiddlePoor: { type: String, default: "" },
        urbanSemiUrbanRural: { type: String, default: "" }
    },
    { _id: false }
);

const extentOfSiteSchema = new mongoose.Schema(
    {
        saleDeed: { type: String, default: "" },
        approvedPlan: { type: String, default: "" },
        taxBill: { type: String, default: "" }
    },
    { _id: false }
);

const apartmentLocationSchema = new mongoose.Schema(
    {
        tsNo: { type: String, default: "" },
        blockNo: { type: String, default: "" },
        wardNo: { type: String, default: "" },
        villageOrMunicipalityOrCorporation: { type: String, default: "" },
        doorNoStreetOrRoad: { type: String, default: "" },
        pinCode: { type: String, default: "" }
    },
    { _id: false }
);

const facilitiesAvailableSchema = new mongoose.Schema(
    {
        lift: { type: String, default: "" },
        protectedWaterSupply: { type: String, default: "" },
        undergroundSewerage: { type: String, default: "" },
        carParking: { type: String, default: "" },
        compoundWall: { type: String, default: "" },
        pavementAroundBuilding: { type: String, default: "" }
    },
    { _id: false }
);

const flatSpecificationsSchema = new mongoose.Schema(
    {
        roof: { type: String, default: "" },
        flooring: { type: String, default: "" },
        doors: { type: String, default: "" },
        windows: { type: String, default: "" },
        fittings: { type: String, default: "" },
        finishing: { type: String, default: "" }
    },
    { _id: false }
);

const houseTaxSchema = new mongoose.Schema(
    {
        houseTax: { type: String, default: "" },
        assessmentNo: { type: String, default: "" },
        taxPaidInNameOf: { type: String, default: "" },
        taxAmount: { type: String, default: "" }
    },
    { _id: false }
);

const rateBreakupSchema = new mongoose.Schema(
    {
        buildingServices: { type: String, default: "" },
        landOthers: { type: String, default: "" }
    },
    { _id: false }
);

const jantriValueDetailsSchema = new mongoose.Schema(
    {
        jantriValue: { type: String, default: "" },
        guideline: { type: String, default: "" },
        glrMultiplier: { type: String, default: "" },
        calculatedValue: { type: String, default: "" },
        details: { type: String, default: "" }
    },
    { _id: false }
);

const depreciationDetailsSchema = new mongoose.Schema(
    {
        deprecatedBuildingRate: { type: String, default: "" },
        replacementCostOfFlatWithServices: { type: String, default: "" },
        ageOfBuilding: { type: String, default: "" },
        lifeOfBuildingEstimated: { type: String, default: "" },
        depreciationPercentage: { type: String, default: "" },
        depreciatedRatioOfBuilding: { type: String, default: "" },
        totalCompositeRateArrived: { type: String, default: "" },
        deprecatedBuildingRateV1: { type: String, default: "" },
        rateForLandAndOther: { type: String, default: "" },
        totalCompositeRate: { type: String, default: "" }
    },
    { _id: false }
);

const valuationDetailsItemSchema = new mongoose.Schema(
    {
        description: { type: String, default: "" },
        quantity: { type: String, default: "" },
        ratePerUnit: { type: String, default: "" },
        estimatedValue: { type: String, default: "" }
    },
    { _id: false }
);

const valuationSummarySchema = new mongoose.Schema(
    {
        marketValue: { type: String, default: "" },
        marketValueInWords: { type: String, default: "" },
        realisableValue: { type: String, default: "" },
        realisableValueInWords: { type: String, default: "" },
        distressValue: { type: String, default: "" },
        distressValueInWords: { type: String, default: "" },
        insurableValue: { type: String, default: "" },
        insurableValueInWords: { type: String, default: "" },
        jantriValue: { type: String, default: "" },
        jantriValueInWords: { type: String, default: "" }
    },
    { _id: false }
);

const signatureDetailsSchema = new mongoose.Schema(
    {
        valuersName: { type: String, default: "" },
        valuersDesignation: { type: String, default: "" },
        valuersDate: { type: String, default: "" },
        valuersPlace: { type: String, default: "" },
        valuersSignature: { type: String, default: "" },
        branchManagerName: { type: String, default: "" },
        branchManagerDate: { type: String, default: "" },
        branchManagerPlace: { type: String, default: "" },
        branchManagerSignature: { type: String, default: "" }
    },
    { _id: false }
);

const certificationDetailsSchema = new mongoose.Schema(
    {
        inspectionDate: { type: String, default: "" },
        reportDate: { type: String, default: "" },
        certificateStatement: { type: String, default: "" },
        fairMarketValue: { type: String, default: "" },
        fairMarketValueInWords: { type: String, default: "" }
    },
    { _id: false }
);


const appointmentAndDatesSchema = new mongoose.Schema(
    {
        dateOfAppointment: { type: String, default: "" },
        dateOfVisit: { type: String, default: "" },
        dateOfReport: { type: String, default: "" }
    },
    { _id: false }
);

const declarationDetailsSchema = new mongoose.Schema(
    {
        valuationReportDate: { type: String, default: "" },
        informationFurnished: { type: String, default: "" },
        impartialValuation: { type: String, default: "" },
        propertyInspectionDate: { type: String, default: "" },
        subContractingStatement: { type: String, default: "" },
        yearsAfterValuation: { type: String, default: "" }
    },
    { _id: false }
);

const flatDetailsSchema = new mongoose.Schema(
    {
        floorNumber: { type: String, default: "" },
        doorNo: { type: String, default: "" },
        specifications: { type: flatSpecificationsSchema, default: () => ({}) },
        houseTaxDetails: { type: houseTaxSchema, default: () => ({}) },
        electricityServiceConnectionNo: { type: String, default: "" },
        maintenanceOfUnit: { type: String, default: "" },
        conveyanceDeedExecutedInNameOf: { type: String, default: "" },
        undividedAreaOfLand: { type: String, default: "" },
        plinthArea: { type: String, default: "" },
        floorSpaceIndex: { type: String, default: "" },
        carpetArea: { type: String, default: "" },
        classification: { type: String, default: "" },
        purposeOfUse: { type: String, default: "" },
        occupancyType: { type: String, default: "" },
        monthlyRent: { type: String, default: "" }
    },
    { _id: false }
);

const apartmentBuildingSchema = new mongoose.Schema(
    {
        natureOfApartment: { type: String, default: "" },
        location: { type: apartmentLocationSchema, default: () => ({}) },
        descriptionOfLocality: { type: String, default: "" },
        yearOfConstruction: { type: String, default: "" },
        numberOfFloors: { type: String, default: "" },
        typeOfStructure: { type: String, default: "" },
        numberOfDwellingUnits: { type: String, default: "" },
        qualityOfConstruction: { type: String, default: "" },
        appearanceOfBuilding: { type: String, default: "" },
        maintenanceOfBuilding: { type: String, default: "" },
        facilitiesAvailable: { type: facilitiesAvailableSchema, default: () => ({}) }
    },
    { _id: false }
);

const documentsSchema = new mongoose.Schema(
    {
        saleDeed: { type: String, default: "" },
        approvedPlan: { type: String, default: "" },
        buPermission: { type: String, default: "" },
        constructionPermission: { type: String, default: "" },
        naLetter: { type: String, default: "" },
        tcr: { type: String, default: "" },
        taxBill: { type: String, default: "" }
    },
    { _id: false }
);

const valuationHeaderSchema = new mongoose.Schema(
    {
        applicant: { type: String, default: "" },
        valuationDoneBy: { type: String, default: "" },
        purposeForValuation: { type: String, default: "" },
        dateOfInspection: { type: String, default: "" },
        dateOfValuation: { type: String, default: "" }
    },
    { _id: false }
);

const propertyOwnerDetailsSchema = new mongoose.Schema(
    {
        nameOfOwner: { type: String, default: "" },
        ownerAddress: { type: String, default: "" }
    },
    { _id: false }
);

const propertyDescriptionSchema = new mongoose.Schema(
    {
        briefDescriptionOfProperty: { type: String, default: "" },
        locationOfProperty: { type: String, default: "" },
        googleMapCoordinates: { type: String, default: "" },
        otherCommentsByValuers: { type: String, default: "" }
    },
    { _id: false }
);

const approvedMapDetailsSchema = new mongoose.Schema(
    {
        dateOfIssueAndValidity: { type: String, default: "" },
        approvedMapIssuingAuthority: { type: String, default: "" },
        genuinessOfApprovedMap: { type: String, default: "" }
    },
    { _id: false }
);

const areaAndLocationDetailsSchema = new mongoose.Schema(
    {
        postalAddress: { type: String, default: "" },
        cityTown: { type: String, default: "" },
        residentialArea: { type: String, default: "" },
        commercialArea: { type: String, default: "" },
        industrialArea: { type: String, default: "" },
        areaClassification: { type: areaClassificationSchema, default: () => ({}) },
        corporationLimit: { type: String, default: "" },
        stateGovernmentEnactments: { type: String, default: "" }
    },
    { _id: false }
);

const siteDetailsSchema = new mongoose.Schema(
    {
        boundaries: { type: boundariesSchema, default: () => ({}) },
        dimensions: { type: dimensionsSchema, default: () => ({}) },
        extentOfSite: { type: extentOfSiteSchema, default: () => ({}) },
        extentOfSiteForValuation: { type: String, default: "" },
        occupancyStatus: { type: String, default: "" },
        rentReceivedPerMonth: { type: String, default: "" }
    },
    { _id: false }
);

const buildingAndPropertySchema = new mongoose.Schema(
    {
        apartmentBuilding: { type: apartmentBuildingSchema, default: () => ({}) },
        flatDetails: { type: flatDetailsSchema, default: () => ({}) }
    },
    { _id: false }
);

const propertyAnalysisSchema = new mongoose.Schema(
    {
        marketability: { type: String, default: "" },
        extraPotentialValueFactors: { type: String, default: "" },
        negativeFactorsObserved: { type: String, default: "" }
    },
    { _id: false }
);

const rateAnalysisSchema = new mongoose.Schema(
    {
        compositeRateAnalysis: { type: String, default: "" },
        adoptedCompositeRate: { type: String, default: "" },
        rateBreakup: { type: rateBreakupSchema, default: () => ({}) },
        guidelineRate: { type: String, default: "" }
    },
    { _id: false }
);

const valuationComputationSchema = new mongoose.Schema(
    {
        jantriValueDetails: { type: jantriValueDetailsSchema, default: () => ({}) },
        depreciationDetails: { type: depreciationDetailsSchema, default: () => ({}) },
        valuationDetails: [{ type: valuationDetailsItemSchema }],
        totalValueFromValuation: { type: String, default: "" },
        valuationSummary: { type: valuationSummarySchema, default: () => ({}) }
    },
    { _id: false }
);

const documentationSchema = new mongoose.Schema(
    {
        documents: { type: documentsSchema, default: () => ({}) },
        declarationDetails: { type: declarationDetailsSchema, default: () => ({}) }
    },
    { _id: false }
);

const approvalAndCertificationSchema = new mongoose.Schema(
    {
        signatureDetails: { type: signatureDetailsSchema, default: () => ({}) },
        certificationDetails: { type: certificationDetailsSchema, default: () => ({}) }
    },
    { _id: false }
);

const constructionDetailsSchema = new mongoose.Schema(
    {
        constructionArea: { type: String, default: "" },
        constructionAreaValue: { type: String, default: "" },
        revenueDetails: { type: String, default: "" }
    },
    { _id: false }
);

const pdfDetailsSchema = new mongoose.Schema(
    {
        // EXTRA FIELDS FOR FORM UI
        accountName: { type: String, default: "" },
        client: { type: String, default: "" },
        typeOfProperty: { type: String, default: "" },
        propertyDetailsLocation: { type: String, default: "" },
        valuationDoneByApproved: { type: String, default: "" },
        purposeOfValuationIntro: { type: String, default: "" },
        nameOfOwnerValuation: { type: String, default: "" },
        addressPropertyValuation: { type: String, default: "" },
        requisiteDetailsAsPerSaleDeedAuthoritiesDocuments: { type: String, default: "" },
        areaOfLand: { type: String, default: "" },
        valueOfConstruction: { type: String, default: "" },
        totalMarketValueOfTheProperty: { type: String, default: "" },
        realizableValue: { type: String, default: "" },
        dateOfInspectionOfProperty: { type: String, default: "" },
        dateOfValuationReport: { type: String, default: "" },
        docSaleDeed: { type: String, default: "" },
        docBuildingPlanApproval: { type: String, default: "" },
        docPowerOfAttorney: { type: String, default: "" },
        docConstructionPermission: { type: String, default: "" },
        docNALetter: { type: String, default: "" },
        docTCR: { type: String, default: "" },
        docPropertyTax: { type: String, default: "" },
        nameAddressOfManager: { type: String, default: "" },
        plotNoRevenueNo: { type: String, default: "" },
        doorNumber: { type: String, default: "" },
        villageOrTalukSubRegisterBlock: { type: String, default: "" },
        dateOfIssueValidity: { type: String, default: "" },
        approvedMapPlan: { type: String, default: "" },
        approvedMapPlanAuthority: { type: String, default: "" },
        genuinenessVerified: { type: String, default: "" },
        otherComments: { type: String, default: "" },
        cityTown: { type: String, default: "" },
        saleableArea: { type: String, default: "" },
        siteAreaForValuation: { type: String, default: "" },
        constructionType: { type: String, default: "" },
        tsNo: { type: String, default: "" },
        blockNo: { type: String, default: "" },
        wardNo: { type: String, default: "" },
        villageOrMunicipality: { type: String, default: "" },
        doorNoStreetRoadPinCode: { type: String, default: "" },
        localityDescription: { type: String, default: "" },
        buildingAge: { type: String, default: "" },
        structureType: { type: String, default: "" },
        dwellingUnits: { type: String, default: "" },
        constructionQuality: { type: String, default: "" },
        buildingAppearance: { type: String, default: "" },
        maintenanceStatus: { type: String, default: "" },
        hasLift: { type: String, default: "" },
        hasWaterSupply: { type: String, default: "" },
        hasSewerage: { type: String, default: "" },
        hasCarParking: { type: String, default: "" },
        hasCompoundWall: { type: String, default: "" },
        hasPavement: { type: String, default: "" },
        flatLocation: { type: String, default: "" },
        flatDoorNumber: { type: String, default: "" },
        specRoof: { type: String, default: "" },
        specFlooring: { type: String, default: "" },
        specDoors: { type: String, default: "" },
        specWindows: { type: String, default: "" },
        specFittings: { type: String, default: "" },
        specFinishing: { type: String, default: "" },
        taxAssessmentNo: { type: String, default: "" },
        taxPaidName: { type: String, default: "" },
        taxAmount: { type: String, default: "" },
        electricityConnectionNo: { type: String, default: "" },
        unitMaintenance: { type: String, default: "" },
        conveyanceDeedName: { type: String, default: "" },
        undividedLandArea: { type: String, default: "" },
        flatPlinthArea: { type: String, default: "" },
        carpetAreaFlat: { type: String, default: "" },
        flatClass: { type: String, default: "" },
        usagePurpose: { type: String, default: "" },
        marketabilityLocational: { type: String, default: "" },
        marketabilityScarcity: { type: String, default: "" },
        marketabilityDemandSupply: { type: String, default: "" },
        compositeDepreciatedBuildingRate: { type: String, default: "" },
        compositeReplacementCost: { type: String, default: "" },
        compositeAgeOfBuilding: { type: String, default: "" },
        compositeLifeOfBuilding: { type: String, default: "" },
        compositeDepreciationPercentage: { type: String, default: "" },
        compositeDepreciatedRatio: { type: String, default: "" },
        compositeTotalRateForValuation: { type: String, default: "" },
        compositeDepreciatedBuildingRateVI: { type: String, default: "" },
        compositeRateForLand: { type: String, default: "" },
        compositeTotalCompositeRate: { type: String, default: "" },
        presentValueQty: { type: String, default: "" },
        presentValueRate: { type: String, default: "" },
        presentValue: { type: String, default: "" },
        
        // DETAILS OF VALUATION FIELDS
        wardrobes: { type: String, default: "" },
        wardrobesRate: { type: String, default: "" },
        wardrobesValue: { type: String, default: "" },
        showcases: { type: String, default: "" },
        showcasesRate: { type: String, default: "" },
        showcasesValue: { type: String, default: "" },
        kitchenArrangements: { type: String, default: "" },
        kitchenRate: { type: String, default: "" },
        kitchenValue: { type: String, default: "" },
        superfineFinish: { type: String, default: "" },
        finishRate: { type: String, default: "" },
        finishValue: { type: String, default: "" },
        interiorDecorations: { type: String, default: "" },
        decorationRate: { type: String, default: "" },
        decorationValue: { type: String, default: "" },
        electricityDeposits: { type: String, default: "" },
        electricityRate: { type: String, default: "" },
        electricityValue: { type: String, default: "" },
        grillWorks: { type: String, default: "" },
        grillRate: { type: String, default: "" },
        grillValue: { type: String, default: "" },
        potentialValue: { type: String, default: "" },
        potentialRate: { type: String, default: "" },
        potentialValueAmount: { type: String, default: "" },
        valuationTotalValue: { type: String, default: "" },

        // AREA CLASSIFICATION FIELDS
        residentialArea: { type: String, default: "" },
        commercialArea: { type: String, default: "" },
        industrialArea: { type: String, default: "" },
        areaGrade: { type: String, default: "" },
        areaType: { type: String, default: "" },
        areaClassificationHighMiddlePoor: { type: String, default: "" },
        areaClassificationUrbanSemiUrbanRural: { type: String, default: "" },
        governanceType: { type: String, default: "" },
        governmentEnactments: { type: String, default: "" },
        corporationLimit: { type: String, default: "" },
        stateGovernmentEnactments: { type: String, default: "" },

        // LOCATION DETAILS FIELDS
        locationOfProperty: { type: String, default: "" },
        wardTaluka: { type: String, default: "" },
        district: { type: String, default: "" },

        // EXTENT OF SITE FIELDS
        extentOfSiteSaleDeed: { type: String, default: "" },
        extentOfSiteApprovedPlan: { type: String, default: "" },
        extentOfSiteTaxBill: { type: String, default: "" },
        extentOfSiteForValuation: { type: String, default: "" },

        // FLAT OCCUPANCY & DETAILS FIELDS
        floorSpaceIndex: { type: String, default: "" },
        occupancyType: { type: String, default: "" },
        monthlyRent: { type: String, default: "" },

        // MAIN NESTED SCHEMAS
        valuationHeader: { type: valuationHeaderSchema, default: () => ({}) },
        propertyOwnerDetails: { type: propertyOwnerDetailsSchema, default: () => ({}) },
        propertyDescription: { type: propertyDescriptionSchema, default: () => ({}) },
        locationDetails: { type: locationDetailsSchema, default: () => ({}) },
        approvedMapDetails: { type: approvedMapDetailsSchema, default: () => ({}) },
        areaAndLocationDetails: { type: areaAndLocationDetailsSchema, default: () => ({}) },
        siteDetails: { type: siteDetailsSchema, default: () => ({}) },
        buildingAndProperty: { type: buildingAndPropertySchema, default: () => ({}) },
        propertyAnalysis: { type: propertyAnalysisSchema, default: () => ({}) },
        rateAnalysis: { type: rateAnalysisSchema, default: () => ({}) },
        valuationComputation: { type: valuationComputationSchema, default: () => ({}) },
        documentation: { type: documentationSchema, default: () => ({}) },
        approvalAndCertification: { type: approvalAndCertificationSchema, default: () => ({}) },
        constructionDetails: { type: constructionDetailsSchema, default: () => ({}) },
        appointmentAndDates: { type: appointmentAndDatesSchema, default: () => ({}) }
    },
    { _id: false }
);

const rajeshFlatSchema = new mongoose.Schema(
    {
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
        customFields: [{ type: mongoose.Schema.Types.Mixed }],
        customValuationItems: [{ type: mongoose.Schema.Types.Mixed }],
        checklist: {
            engagementLetter: { type: String, default: "" },
            engagementLetterReviewed: { type: String, default: "" },
            saleDeed: { type: String, default: "" },
            saleDeedReviewed: { type: String, default: "" },
            tcrLsr: { type: String, default: "" },
            tcrLsrReviewed: { type: String, default: "" },
            allotmentLetter: { type: String, default: "" },
            allotmentLetterReviewed: { type: String, default: "" },
            kabualatLekh: { type: String, default: "" },
            kabualatLekhReviewed: { type: String, default: "" },
            mortgageDeed: { type: String, default: "" },
            mortgageDeedReviewed: { type: String, default: "" },
            leaseDeed: { type: String, default: "" },
            leaseDeadReviewed: { type: String, default: "" },
            index2: { type: String, default: "" },
            index2Reviewed: { type: String, default: "" },
            vf712: { type: String, default: "" },
            vf712Reviewed: { type: String, default: "" },
            naOrder: { type: String, default: "" },
            naOrderReviewed: { type: String, default: "" },
            approvedPlan: { type: String, default: "" },
            approvedPlanReviewed: { type: String, default: "" },
            commencementLetter: { type: String, default: "" },
            commencementLetterReviewed: { type: String, default: "" },
            buPermission: { type: String, default: "" },
            buPermissionReviewed: { type: String, default: "" },
            eleMeterPhoto: { type: String, default: "" },
            eleMeterPhotoReviewed: { type: String, default: "" },
            lightBill: { type: String, default: "" },
            lightBillReviewed: { type: String, default: "" },
            muniTaxBill: { type: String, default: "" },
            muniTaxBillReviewed: { type: String, default: "" },
            numbering: { type: String, default: "" },
            numberingReviewed: { type: String, default: "" },
            boundaries: { type: String, default: "" },
            boundariesReviewed: { type: String, default: "" },
            mergedProperty: { type: String, default: "" },
            mergedPropertyReviewed: { type: String, default: "" },
            premiseSeparation: { type: String, default: "" },
            premiseSeparationReviewed: { type: String, default: "" },
            landLocked: { type: String, default: "" },
            landLockedReviewed: { type: String, default: "" },
            propertyRented: { type: String, default: "" },
            propertyRentedReviewed: { type: String, default: "" },
            rentAgreement: { type: String, default: "" },
            rentAgreementReviewed: { type: String, default: "" },
            siteVisitPhotos: { type: String, default: "" },
            siteVisitPhotosReviewed: { type: String, default: "" },
            selfieOwner: { type: String, default: "" },
            selfieOwnerReviewed: { type: String, default: "" },
            mobileNo: { type: String, default: "" },
            mobileNoReviewed: { type: String, default: "" },
            dataSheet: { type: String, default: "" },
            dataSheetReviewed: { type: String, default: "" },
            tentativeRate: { type: String, default: "" },
            tentativeRateReviewed: { type: String, default: "" },
            saleInstance: { type: String, default: "" },
            saleInstanceReviewed: { type: String, default: "" },
            brokerRecording: { type: String, default: "" },
            brokerRecordingReviewed: { type: String, default: "" },
            pastValuationRate: { type: String, default: "" },
            pastValuationRateReviewed: { type: String, default: "" }
        }
    }
);

rajeshFlatSchema.index({ clientId: 1, uniqueId: 1 }, { unique: true, sparse: true });

// Indexes for faster queries
rajeshFlatSchema.index({ clientId: 1, username: 1 }); // For user-specific queries
rajeshFlatSchema.index({ clientId: 1, status: 1 }); // For status filtering
rajeshFlatSchema.index({ clientId: 1, createdAt: -1 }); // For sorting by creation date
rajeshFlatSchema.index({ clientId: 1, username: 1, status: 1 }); // For combined filtering

const RajeshFlatModel = mongoose.model("RajeshFlat", rajeshFlatSchema);
export default RajeshFlatModel;