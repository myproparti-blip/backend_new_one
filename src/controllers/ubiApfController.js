import UbiApfModel from "../models/ubiApfModel.js";

export const createUbiApfForm = async (req, res) => {
    try {
        const { clientId, uniqueId, username, userRole, bankName } = req.body;

        ("[createUbiApf] Request received:", {
            uniqueId,
            username,
            bankName,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });
        
        ("[createUbiApf] Full request body keys:", Object.keys(req.body));

        // Validate required fields
        if (!clientId) {
            console.error("[createUbiApf] Missing clientId");
            return res.status(400).json({
                success: false,
                message: "Missing clientId - Client identification required"
            });
        }

        if (!clientId || !uniqueId || !username) {
            console.error("[createUbiApf] Missing required fields");
            return res.status(400).json({
                success: false,
                message: "Missing required fields: clientId, uniqueId, username"
            });
        }

        // Check for duplicate
        const existingForm = await UbiApfModel.findOne({
            clientId,
            uniqueId
        });

        if (existingForm) {
            ("[createUbiApf] Duplicate submission prevented");
            return res.status(200).json({
                success: true,
                message: "UBI APF form already exists (duplicate submission prevented)",
                data: existingForm,
                isDuplicate: true
            });
        }

        // Create new UBI APF form
        const newForm = new UbiApfModel({
            clientId,
            uniqueId,
            username,
            lastUpdatedBy: username,
            lastUpdatedByRole: userRole || "user",
            status: "pending",
            dateTime: new Date().toLocaleString(),
            day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
            customFields: [],
            customExtentOfSiteFields: [],
            customFloorAreaBalconyFields: [],
            ...req.body
        });

        const savedForm = await newForm.save();

        ("[createUbiApf] Success - Form saved to database:", {
            uniqueId,
            status: savedForm.status,
            _id: savedForm._id,
            collectionName: "ubi_apf"
        });

        res.status(201).json({
            success: true,
            message: "UBI APF form created successfully",
            data: savedForm
        });
    } catch (error) {
        console.error("[createUbiApf] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create UBI APF form",
            error: error.message
        });
    }
};

// GET UBI APF FORM BY ID
export const getUbiApfFormById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[getUbiApfById] Request received:", {
            id,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[getUbiApfById] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Fetch form from UBI APF collection by _id first, then by uniqueId
         let form;
         try {
             // Try direct _id lookup first
             try {
                 form = await UbiApfModel.findById(id).lean();
                 if (form) {
                     ("[getUbiApfById] Found by _id");
                 }
             } catch (idError) {
                 ("[getUbiApfById] Not a valid ObjectId, trying uniqueId");
             }

             // Fallback: try by uniqueId
             if (!form) {
                 form = await UbiApfModel.findOne({ uniqueId: String(id) }).lean();
                 if (form) {
                     ("[getUbiApfById] Found by uniqueId");
                 }
             }
         } catch (dbError) {
             console.error("[getUbiApfById] Database query error:", dbError.message);
             return res.status(400).json({
                 success: false,
                 message: "Invalid request parameters"
             });
         }

         if (!form) {
             console.error("[getUbiApfById] Form not found:", id);
             return res.status(404).json({
                 success: false,
                 message: "UBI APF form not found"
             });
         }

        // CLIENT ISOLATION - CRITICAL
        if (form.clientId !== clientId) {
            console.error("[getUbiApfById] Client isolation violation:", {
                recordClient: form.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Permission check
        if (userRole !== "manager" && userRole !== "admin" && form.username !== username) {
            console.error("[getUbiApfById] Unauthorized access attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to this form"
            });
        }

        ("[getUbiApfById] Success");

        res.status(200).json({
            success: true,
            data: form
        });
    } catch (error) {
        console.error("[getUbiApfById] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch UBI APF form",
            error: error.message
        });
    }
};

// GET ALL UBI APF FORMS
export const getAllUbiApfForms = async (req, res) => {
    try {
        const { username, userRole, clientId, status, city, bankName, page = 1, limit = 10 } = req.query;

        ("[getAllUbiApf] Request received:", {
            userRole,
            status,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate clientId
        if (!clientId) {
            console.error("[getAllUbiApf] Missing clientId");
            return res.status(400).json({
                success: false,
                message: "Missing clientId - Client identification required"
            });
        }

        // Build filter
        const filter = { clientId };

        // Users only see their own forms
        if (userRole !== "manager" && userRole !== "admin") {
            filter.username = username;
        }

        // Apply optional filters
        if (status) filter.status = status;
        if (city) filter.city = city;
        if (bankName) filter.bankName = bankName;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const forms = await UbiApfModel.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
            .lean();

        const total = await UbiApfModel.countDocuments(filter);

        ("[getAllUbiApf] Success:", {
            total,
            returned: forms.length,
            page
        });

        res.status(200).json({
            success: true,
            data: forms,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error("[getAllUbiApf] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch UBI APF forms",
            error: error.message
        });
    }
};

// UPDATE UBI APF FORM
export const updateUbiApfForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[updateUbiApf] Request received:", {
            id,
            username,
            userRole,
            action: "save changes",
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[updateUbiApf] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Validate required query parameters
        if (!username || !userRole || !clientId) {
            console.error("[updateUbiApf] Missing required parameters");
            return res.status(400).json({
                success: false,
                message: "Missing required user information"
            });
        }

        // Fetch existing form by _id first, then by uniqueId
         let form;
         try {
             // Try direct _id lookup first
             try {
                 form = await UbiApfModel.findById(id).lean();
                 if (form) {
                     ("[updateUbiApf] Found by _id");
                 }
             } catch (idError) {
                 ("[updateUbiApf] Not a valid ObjectId, trying uniqueId");
             }

             // Fallback: try by uniqueId
             if (!form) {
                 form = await UbiApfModel.findOne({ uniqueId: String(id) }).lean();
                 if (form) {
                     ("[updateUbiApf] Found by uniqueId");
                 }
             }
         } catch (dbError) {
             console.error("[updateUbiApf] Database query error:", dbError.message);
             return res.status(400).json({
                 success: false,
                 message: "Invalid request parameters"
             });
         }

         if (!form) {
             console.error("[updateUbiApf] Form not found:", id);
             return res.status(404).json({
                 success: false,
                 message: "UBI APF form not found"
             });
         }

        // CLIENT ISOLATION - CRITICAL
        if (form.clientId !== clientId) {
            console.error("[updateUbiApf] Client isolation violation:", {
                recordClient: form.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Permission check
        if (userRole !== "manager" && userRole !== "admin" && form.username !== username) {
            console.error("[updateUbiApf] Unauthorized update attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this form"
            });
        }

        // Status validation: Regular users cannot edit certain statuses
        if (userRole !== "manager" && userRole !== "admin") {
            if (!["pending", "rejected", "rework"].includes(form.status)) {
                console.error("[updateUbiApf] User cannot edit status:", form.status);
                return res.status(400).json({
                    success: false,
                    message: `Cannot edit form with status: ${form.status}`
                });
            }
        }

        ("[updateUbiApf] Permission check passed. Previous status:", form.status);

        // Debug: Check if custom fields are in the request
        ("[updateUbiApf] REQUEST BODY KEYS:", Object.keys(req.body));
        ("[updateUbiApf] Request body custom fields:", {
            customExtentOfSiteFields: req.body.customExtentOfSiteFields?.length || "undefined",
            customFloorAreaBalconyFields: req.body.customFloorAreaBalconyFields?.length || "undefined",
            customFields: req.body.customFields?.length || "undefined"
        });
        
        // Detailed logging of the actual received data
        ("[updateUbiApf] DETAILED CUSTOM FIELDS RECEIVED:");
        ("   customExtentOfSiteFields type:", typeof req.body.customExtentOfSiteFields);
        ("   customExtentOfSiteFields is array?:", Array.isArray(req.body.customExtentOfSiteFields));
        ("   customExtentOfSiteFields value:", req.body.customExtentOfSiteFields);
        ("   customExtentOfSiteFields JSON:", JSON.stringify(req.body.customExtentOfSiteFields));
        ("   customFloorAreaBalconyFields type:", typeof req.body.customFloorAreaBalconyFields);
        ("   customFloorAreaBalconyFields value:", JSON.stringify(req.body.customFloorAreaBalconyFields));
        
        if (Array.isArray(req.body.customExtentOfSiteFields)) {
            ("[updateUbiApf] customExtentOfSiteFields array details:");
            req.body.customExtentOfSiteFields.forEach((item, i) => {
                (`      Item [${i}]:`, JSON.stringify(item));
            });
        } else {
            ("[updateUbiApf] customExtentOfSiteFields is NOT an array");
        }
        
        if (Array.isArray(req.body.customFloorAreaBalconyFields)) {
            ("[updateUbiApf] customFloorAreaBalconyFields array details:");
            req.body.customFloorAreaBalconyFields.forEach((item, i) => {
                (`      Item [${i}]:`, JSON.stringify(item));
            });
        } else {
            ("[updateUbiApf] customFloorAreaBalconyFields is NOT an array");
        }

        // Prepare update data - Exclude array fields (will handle them separately)
        const arrayFields = ['customFields', 'customExtentOfSiteFields', 'customFloorAreaBalconyFields', 'propertyImages', 'locationImages', 'documentPreviews'];
        
        // Nested array fields inside pdfDetails that need special handling
        const nestedArrayFields = ['customCarpetAreaFields', 'customBuiltUpAreaFields', 'customCostOfConstructionFields'];
        const updateData = {};
        
        // Copy only non-array fields from request body
        Object.keys(req.body).forEach(key => {
            if (!arrayFields.includes(key)) {
                updateData[key] = req.body[key];
            }
        });
        
        // Add required fields
        updateData.status = "on-progress";
        updateData.lastUpdatedBy = username;
        updateData.lastUpdatedByRole = userRole;
        updateData.lastUpdatedAt = new Date();
        updateData.updatedAt = new Date();

        // Remove sensitive fields if user is not admin
        if (userRole !== "admin") {
            delete updateData.managerFeedback;
            delete updateData.submittedByManager;
        }

        // CRITICAL FIX: Use .save() instead of findByIdAndUpdate for proper array handling
        // findByIdAndUpdate with $set doesn't properly handle Mongoose arrays
        
        ("[updateUbiApf] FETCHING DOCUMENT FOR DIRECT UPDATE:");
        ("   Form ID:", form._id);
        
        // Fetch the full document (not lean) so we get Mongoose methods
        const docToUpdate = await UbiApfModel.findById(form._id);
        
        if (!docToUpdate) {
            console.error("[updateUbiApf] Could not fetch document for update");
            return res.status(404).json({
                success: false,
                message: "Document not found for update"
            });
        }
        
        ("[updateUbiApf] Document fetched successfully");
        
        // CRITICAL: Ensure arrays exist and are Mongoose arrays
        if (!Array.isArray(docToUpdate.customExtentOfSiteFields)) {
            docToUpdate.customExtentOfSiteFields = [];
            ("[updateUbiApf] Initialized customExtentOfSiteFields as array");
        }
        if (!Array.isArray(docToUpdate.customFloorAreaBalconyFields)) {
            docToUpdate.customFloorAreaBalconyFields = [];
            ("[updateUbiApf] Initialized customFloorAreaBalconyFields as array");
        }
        if (!Array.isArray(docToUpdate.customFields)) {
            docToUpdate.customFields = [];
            ("[updateUbiApf] Initialized customFields as array");
        }
        
        // Initialize nested pdfDetails arrays
        if (!docToUpdate.pdfDetails) {
            docToUpdate.pdfDetails = {};
        }
        if (!Array.isArray(docToUpdate.pdfDetails.customCarpetAreaFields)) {
            docToUpdate.pdfDetails.customCarpetAreaFields = [];
            ("[updateUbiApf] Initialized customCarpetAreaFields as array");
        }
        if (!Array.isArray(docToUpdate.pdfDetails.customBuiltUpAreaFields)) {
            docToUpdate.pdfDetails.customBuiltUpAreaFields = [];
            ("[updateUbiApf] Initialized customBuiltUpAreaFields as array");
        }
        if (!Array.isArray(docToUpdate.pdfDetails.customCostOfConstructionFields)) {
            docToUpdate.pdfDetails.customCostOfConstructionFields = [];
            ("[updateUbiApf] Initialized customCostOfConstructionFields as array");
        }
        
        ("[updateUbiApf] Pre-update array state:");
        ("   customExtentOfSiteFields before:", JSON.stringify(docToUpdate.customExtentOfSiteFields));
        ("   customFloorAreaBalconyFields before:", JSON.stringify(docToUpdate.customFloorAreaBalconyFields));
        ("   customFields before:", JSON.stringify(docToUpdate.customFields));
        
        // Update all non-array fields from request body
        Object.keys(updateData).forEach(key => {
            // Skip: _id, createdAt, and array fields (handle arrays separately)
            if (key !== '_id' && key !== 'createdAt' && !arrayFields.includes(key)) {
                docToUpdate[key] = updateData[key];
            }
        });
        
        // Explicitly set status and timestamps
        docToUpdate.status = "on-progress";
        docToUpdate.lastUpdatedBy = username;
        docToUpdate.lastUpdatedByRole = userRole;
        docToUpdate.lastUpdatedAt = new Date();
        docToUpdate.updatedAt = new Date();
        
       
        
        // CRITICAL: Ensure custom arrays are properly set on document
        ("[updateUbiApf] PRE-SAVE - Setting custom arrays:");
        ("   customExtentOfSiteFields from request:", Array.isArray(req.body.customExtentOfSiteFields) ? `${req.body.customExtentOfSiteFields.length} items` : "not array");
        ("   customFloorAreaBalconyFields from request:", Array.isArray(req.body.customFloorAreaBalconyFields) ? `${req.body.customFloorAreaBalconyFields.length} items` : "not array");
        ("   customFields from request:", Array.isArray(req.body.customFields) ? `${req.body.customFields.length} items` : "not array");
        
        // Get fresh arrays from request - Always treat as array if field exists in request
        const extentArray = Array.isArray(req.body.customExtentOfSiteFields) ? req.body.customExtentOfSiteFields : [];
        const balconyArray = Array.isArray(req.body.customFloorAreaBalconyFields) ? req.body.customFloorAreaBalconyFields : [];
        const fieldsArray = Array.isArray(req.body.customFields) ? req.body.customFields : [];
        
        // Check if fields were explicitly sent in the request
        const hasExtentField = 'customExtentOfSiteFields' in req.body;
        const hasBalconyField = 'customFloorAreaBalconyFields' in req.body;
        const hasCustomField = 'customFields' in req.body;
        
        ("[updateUbiApf] Field presence check:", { hasExtentField, hasBalconyField, hasCustomField });
        
        // Update customExtentOfSiteFields if field was sent (even if empty)
        if (hasExtentField) {
            docToUpdate.customExtentOfSiteFields.splice(0, docToUpdate.customExtentOfSiteFields.length);
            docToUpdate.customExtentOfSiteFields.push(...extentArray);
            docToUpdate.markModified('customExtentOfSiteFields');
            ("[updateUbiApf] Updated customExtentOfSiteFields with", extentArray.length, 'items:', JSON.stringify(extentArray));
        } else {
            ("[updateUbiApf] customExtentOfSiteFields NOT in request body - NOT updating");
        }
        
        // Update customFloorAreaBalconyFields if field was sent (even if empty)
        if (hasBalconyField) {
            docToUpdate.customFloorAreaBalconyFields.splice(0, docToUpdate.customFloorAreaBalconyFields.length);
            docToUpdate.customFloorAreaBalconyFields.push(...balconyArray);
            docToUpdate.markModified('customFloorAreaBalconyFields');
            ("[updateUbiApf] Updated customFloorAreaBalconyFields with", balconyArray.length, 'items:', JSON.stringify(balconyArray));
        } else {
            ("[updateUbiApf] customFloorAreaBalconyFields NOT in request body - NOT updating");
        }
        
        // Update customFields if field was sent (even if empty)
        if (hasCustomField) {
            docToUpdate.customFields.splice(0, docToUpdate.customFields.length);
            docToUpdate.customFields.push(...fieldsArray);
            docToUpdate.markModified('customFields');
            ("[updateUbiApf] Updated customFields with", fieldsArray.length, 'items:', JSON.stringify(fieldsArray));
        } else {
            ("[updateUbiApf] customFields NOT in request body - NOT updating");
        }
        
        // CRITICAL: Handle image and document arrays
        ("[updateUbiApf] Checking for image/document arrays");
        
        // Handle propertyImages
        if ('propertyImages' in req.body && Array.isArray(req.body.propertyImages)) {
            docToUpdate.propertyImages = req.body.propertyImages;
            docToUpdate.markModified('propertyImages');
            ("[updateUbiApf] Updated propertyImages with", req.body.propertyImages.length, 'items');
        }
        
        // Handle locationImages
        if ('locationImages' in req.body && Array.isArray(req.body.locationImages)) {
            docToUpdate.locationImages = req.body.locationImages;
            docToUpdate.markModified('locationImages');
            ("[updateUbiApf] Updated locationImages with", req.body.locationImages.length, 'items');
        }
        
        // Handle documentPreviews (supporting documents)
        if ('documentPreviews' in req.body && Array.isArray(req.body.documentPreviews)) {
            docToUpdate.documentPreviews = req.body.documentPreviews;
            docToUpdate.markModified('documentPreviews');
            ("[updateUbiApf] Updated documentPreviews with", req.body.documentPreviews.length, 'items');
        }
        
        // Handle supportingDocuments (alternative field name, maps to documentPreviews)
        if ('supportingDocuments' in req.body && Array.isArray(req.body.supportingDocuments)) {
            docToUpdate.documentPreviews = req.body.supportingDocuments;
            docToUpdate.markModified('documentPreviews');
            ("[updateUbiApf] Updated documentPreviews (from supportingDocuments) with", req.body.supportingDocuments.length, 'items');
        }
        
        // Handle areaImages
        if ('areaImages' in req.body && typeof req.body.areaImages === 'object') {
            docToUpdate.areaImages = req.body.areaImages;
            docToUpdate.markModified('areaImages');
            ("[updateUbiApf] Updated areaImages");
        }
        
        // Handle nested array fields inside pdfDetails
        ("[updateUbiApf] Checking for nested array fields in pdfDetails");
        if (req.body.pdfDetails) {
            const pdfDetails = req.body.pdfDetails;
            
            // Handle customCarpetAreaFields
            if ('customCarpetAreaFields' in pdfDetails && Array.isArray(pdfDetails.customCarpetAreaFields)) {
                ("[updateUbiApf] Found customCarpetAreaFields in pdfDetails:", pdfDetails.customCarpetAreaFields.length, 'items');
                docToUpdate.pdfDetails.customCarpetAreaFields.splice(0, docToUpdate.pdfDetails.customCarpetAreaFields.length);
                docToUpdate.pdfDetails.customCarpetAreaFields.push(...pdfDetails.customCarpetAreaFields);
                docToUpdate.markModified('pdfDetails.customCarpetAreaFields');
                ("[updateUbiApf] Updated customCarpetAreaFields with", pdfDetails.customCarpetAreaFields.length, 'items');
            }
            
            // Handle customBuiltUpAreaFields
            if ('customBuiltUpAreaFields' in pdfDetails && Array.isArray(pdfDetails.customBuiltUpAreaFields)) {
                ("[updateUbiApf] Found customBuiltUpAreaFields in pdfDetails:", pdfDetails.customBuiltUpAreaFields.length, 'items');
                docToUpdate.pdfDetails.customBuiltUpAreaFields.splice(0, docToUpdate.pdfDetails.customBuiltUpAreaFields.length);
                docToUpdate.pdfDetails.customBuiltUpAreaFields.push(...pdfDetails.customBuiltUpAreaFields);
                docToUpdate.markModified('pdfDetails.customBuiltUpAreaFields');
                ("[updateUbiApf] Updated customBuiltUpAreaFields with", pdfDetails.customBuiltUpAreaFields.length, 'items');
            }
            
            // Handle customCostOfConstructionFields
            if ('customCostOfConstructionFields' in pdfDetails && Array.isArray(pdfDetails.customCostOfConstructionFields)) {
                ("[updateUbiApf] Found customCostOfConstructionFields in pdfDetails:", pdfDetails.customCostOfConstructionFields.length, 'items');
                docToUpdate.pdfDetails.customCostOfConstructionFields.splice(0, docToUpdate.pdfDetails.customCostOfConstructionFields.length);
                docToUpdate.pdfDetails.customCostOfConstructionFields.push(...pdfDetails.customCostOfConstructionFields);
                docToUpdate.markModified('pdfDetails.customCostOfConstructionFields');
                ("[updateUbiApf] Updated customCostOfConstructionFields with", pdfDetails.customCostOfConstructionFields.length, 'items');
            }
        }
        
        ("[updateUbiApf] Arrays set on document:");
        ("   customExtentOfSiteFields length:", docToUpdate.customExtentOfSiteFields?.length);
        ("   customExtentOfSiteFields data:", JSON.stringify(docToUpdate.customExtentOfSiteFields));
        ("   customFloorAreaBalconyFields length:", docToUpdate.customFloorAreaBalconyFields?.length);
        ("   customFloorAreaBalconyFields data:", JSON.stringify(docToUpdate.customFloorAreaBalconyFields));
        ("   customFields length:", docToUpdate.customFields?.length);
        ("   customFields data:", JSON.stringify(docToUpdate.customFields));
        ("   propertyImages length:", docToUpdate.propertyImages?.length);
        ("   locationImages length:", docToUpdate.locationImages?.length);
        ("   documentPreviews length:", docToUpdate.documentPreviews?.length);
        ("   areaImages keys:", Object.keys(docToUpdate.areaImages || {}));
        
        // Use .save() instead of findByIdAndUpdate - this properly handles Mongoose arrays
        const updatedForm = await docToUpdate.save();
        
        // Verify arrays were actually saved
        ("[updateUbiApf] AFTER SAVE - Verifying arrays persisted:");
        ("   customExtentOfSiteFields:", JSON.stringify(updatedForm.customExtentOfSiteFields));
        ("   customFloorAreaBalconyFields:", JSON.stringify(updatedForm.customFloorAreaBalconyFields));
        ("   customFields:", JSON.stringify(updatedForm.customFields));
        ("   propertyImages:", JSON.stringify(updatedForm.propertyImages?.slice(0, 2))); // Log first 2 only
        ("   locationImages:", JSON.stringify(updatedForm.locationImages?.slice(0, 2))); // Log first 2 only
        ("   documentPreviews:", JSON.stringify(updatedForm.documentPreviews?.slice(0, 2))); // Log first 2 only
        ("   customCarpetAreaFields:", JSON.stringify(updatedForm.pdfDetails?.customCarpetAreaFields));
        ("   customBuiltUpAreaFields:", JSON.stringify(updatedForm.pdfDetails?.customBuiltUpAreaFields));
        ("   customCostOfConstructionFields:", JSON.stringify(updatedForm.pdfDetails?.customCostOfConstructionFields));
        
        // Verify total fields were saved
        ("[updateUbiApf] AFTER SAVE - Verifying total fields persisted:");
        ("   totalBuiltUpSqm:", updatedForm.pdfDetails?.totalBuiltUpSqm);
        ("   totalBuiltUpSqft:", updatedForm.pdfDetails?.totalBuiltUpSqft);
        ("   totalFloorAreaBalconySqm:", updatedForm.pdfDetails?.totalFloorAreaBalconySqm);
        ("   totalFloorAreaBalconySqft:", updatedForm.pdfDetails?.totalFloorAreaBalconySqft);

        if (!updatedForm) {
            console.error("[updateUbiApf] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update UBI APF form"
            });
        }

        ("[updateUbiApf] Success:", {
            formId: id,
            newStatus: updatedForm.status,
            updatedAt: updatedForm.lastUpdatedAt,
            customExtentCount: updatedForm.customExtentOfSiteFields?.length || 0,
            customBalconyCount: updatedForm.customFloorAreaBalconyFields?.length || 0,
            customFieldsCount: updatedForm.customFields?.length || 0
        });
        
        // Debug: Log the actual saved arrays
        ("[updateUbiApf] Saved custom arrays:", {
            customExtentOfSiteFields: updatedForm.customExtentOfSiteFields,
            customFloorAreaBalconyFields: updatedForm.customFloorAreaBalconyFields,
            customFields: updatedForm.customFields
        });
        
        // Verify MongoDB actually stored the data
        ("[updateUbiApf] FINAL VERIFICATION FROM DB:");
        ("   Stored customExtentOfSiteFields:", updatedForm.customExtentOfSiteFields);
        ("   Stored customExtentOfSiteFields JSON:", JSON.stringify(updatedForm.customExtentOfSiteFields));
        ("   Stored customExtentOfSiteFields length:", updatedForm.customExtentOfSiteFields?.length);
        
        if (Array.isArray(updatedForm.customExtentOfSiteFields)) {
            updatedForm.customExtentOfSiteFields.forEach((item, i) => {
                (`      Stored Item [${i}]:`, item);
            });
        }
        
        // CRITICAL: Check what we're actually sending back to client
        ("[updateUbiApf] RESPONSE DATA - About to send:");
        ("   updatedForm.customExtentOfSiteFields:", updatedForm.customExtentOfSiteFields);
        ("   Type:", typeof updatedForm.customExtentOfSiteFields);
        ("   Is Array:", Array.isArray(updatedForm.customExtentOfSiteFields));
        ("   Length:", updatedForm.customExtentOfSiteFields?.length);
        ("   JSON:", JSON.stringify(updatedForm.customExtentOfSiteFields));

        res.status(200).json({
            success: true,
            message: "UBI APF form updated successfully",
            data: updatedForm
        });
    } catch (error) {
        console.error("[updateUbiApf] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update UBI APF form",
            error: error.message
        });
    }
};

// MANAGER SUBMIT (APPROVE/REJECT)
export const managerSubmitUbiApfForm = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id || typeof id !== 'string') {
            console.error("[managerSubmitUbiApf] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const action = req.body.action || req.body.status;
        const feedback = req.body.feedback || req.body.managerFeedback || "";
        const username = req.body.username || req.user.username;
        const userRole = req.body.userRole || req.user.role;
        const clientId = req.body.clientId || req.user.clientId;

        ("[managerSubmitUbiApf] Request received:", {
            id,
            action,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Verify manager/admin role
        if (req.user.role !== "manager" && req.user.role !== "admin") {
            console.error("[managerSubmitUbiApf] Unauthorized role:", req.user.role);
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can perform this action"
            });
        }

        // Validate action
        if (!["approved", "rejected"].includes(action)) {
            console.error("[managerSubmitUbiApf] Invalid action:", action);
            return res.status(400).json({
                success: false,
                message: "Invalid action. Must be 'approved' or 'rejected'"
            });
        }

        // Find form by _id first, then by uniqueId
         let form;
         try {
             // Try direct _id lookup first
             try {
                 form = await UbiApfModel.findById(id).lean();
                 if (form) {
                     ("[managerSubmitUbiApf] Found by _id");
                 }
             } catch (idError) {
                 ("[managerSubmitUbiApf] Not a valid ObjectId, trying uniqueId");
             }

             // Fallback: try by uniqueId
             if (!form) {
                 form = await UbiApfModel.findOne({ uniqueId: String(id) }).lean();
                 if (form) {
                     ("[managerSubmitUbiApf] Found by uniqueId");
                 }
             }
         } catch (dbError) {
             console.error("[managerSubmitUbiApf] Database query error:", dbError.message);
             return res.status(400).json({
                 success: false,
                 message: "Invalid request parameters"
             });
         }

         if (!form) {
             console.error("[managerSubmitUbiApf] Form not found:", id);
             return res.status(404).json({
                 success: false,
                 message: "UBI APF form not found"
             });
         }

        // CLIENT ISOLATION - CRITICAL
        if (form.clientId !== clientId) {
            console.error("[managerSubmitUbiApf] Client isolation violation:", {
                recordClient: form.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        ("[managerSubmitUbiApf] Performing action:", {
            action,
            formId: id,
            previousStatus: form.status,
            hashedFeedback: feedback ? feedback.substring(0, 20) + "..." : "(empty)"
        });

        // Update form
        const updatedForm = await UbiApfModel.findByIdAndUpdate(
            form._id,
            {
                status: action,
                managerFeedback: feedback ? feedback.trim() : "",
                submittedByManager: true,
                lastUpdatedBy: username,
                lastUpdatedByRole: userRole,
                lastUpdatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedForm) {
            console.error("[managerSubmitUbiApf] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update UBI APF form"
            });
        }

        ("[managerSubmitUbiApf] Success:", {
            action,
            newStatus: updatedForm.status,
            updatedAt: updatedForm.lastUpdatedAt
        });

        res.status(200).json({
            success: true,
            message: `UBI APF form ${action} successfully`,
            data: updatedForm
        });
    } catch (error) {
        console.error("[managerSubmitUbiApf] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit UBI APF form",
            error: error.message
        });
    }
};  

// REQUEST REWORK
export const requestReworkUbiApfForm = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Use req.user from middleware (already authenticated), fall back to body if provided
        const comments = req.body.comments || "";
        const username = req.body.username || req.user.username;
        const userRole = req.body.userRole || req.user.role;
        const clientId = req.body.clientId || req.user.clientId;

        ("[requestReworkUbiApf] Request:", { id, username, userRole, clientId: clientId?.substring(0, 8) });

        // Verify manager/admin role (check from middleware-provided user data)
        if (req.user.role !== "manager" && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can request rework"
            });
        }

        // Find UBI APF form by _id (direct lookup first) or uniqueId (fallback)
         let form;
         // Try direct _id lookup first (regardless of format)
         try {
             form = await UbiApfModel.findById(id).lean();
             if (form) {
                 ("[requestReworkUbiApf] Found by _id");
             }
         } catch (idError) {
             ("[requestReworkUbiApf] Not a valid ObjectId, trying uniqueId");
         }

         // Fallback: try by uniqueId
         if (!form) {
             form = await UbiApfModel.findOne({ uniqueId: String(id) }).lean();
             if (form) {
                 ("[requestReworkUbiApf] Found by uniqueId");
             }
         }

         ("[requestReworkUbiApf] Found form:", form ? form._id : "not found");

         if (!form) {
             return res.status(404).json({
                 success: false,
                 message: "UBI APF form not found"
             });
         }

        // CLIENT ISOLATION - CRITICAL: Verify record belongs to requesting client
        if (form.clientId !== clientId) {
             return res.status(403).json({
                 success: false,
                 message: "Unauthorized - Record belongs to different client"
             });
        }

        // Update UBI APF form for rework - try _id first, then uniqueId
         let updatedForm;
         const updateData = {
             status: "rework",
             reworkComments: comments || "",
             reworkRequestedBy: username,
             reworkRequestedAt: new Date(),
             reworkRequestedByRole: userRole,
             lastUpdatedBy: username,
             lastUpdatedByRole: userRole,
             lastUpdatedAt: new Date()
         };

         try {
             updatedForm = await UbiApfModel.findByIdAndUpdate(id, updateData, { new: true });
         } catch (idError) {
             ("[requestReworkUbiApf] Not a valid ObjectId, trying uniqueId for update");
             // Fallback: try by uniqueId
             updatedForm = await UbiApfModel.findOneAndUpdate(
                 { uniqueId: String(id) },
                 updateData,
                 { new: true }
             );
         }

         res.status(200).json({
             success: true,
             message: "Rework requested successfully",
             data: updatedForm
         });
     } catch (error) {
         console.error("[requestReworkUbiApf] Error:", error);
         res.status(500).json({
             success: false,
             message: "Failed to request rework",
             error: error.message
         });
     }
 };

export const deleteUbiApfForm = async (req, res) => {
    try {
        const { id } = req.params;
        const clientId = req.user?.clientId;
        const username = req.user?.username;

        if (!clientId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Missing client information"
            });
        }

        // Find and delete - try _id first, then uniqueId
        let deletedForm;
        try {
            deletedForm = await UbiApfModel.findByIdAndDelete(id);
        } catch (idError) {
            deletedForm = await UbiApfModel.findOneAndDelete({ uniqueId: String(id) });
        }

        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "UBI APF form not found"
            });
        }

        // CLIENT ISOLATION - Verify record belonged to requesting client
        if (deletedForm.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        (`[deleteUbiApfForm] Deleted by ${username}:`, { id, clientId: clientId.substring(0, 8) + "..." });

        res.status(200).json({
            success: true,
            message: "UBI APF form deleted successfully",
            data: deletedForm
        });
    } catch (error) {
        console.error("[deleteUbiApfForm] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete UBI APF form",
            error: error.message
        });
    }
};

export const deleteMultipleUbiApfForms = async (req, res) => {
    try {
        const { ids } = req.body;
        const clientId = req.user?.clientId;
        const username = req.user?.username;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid request - ids must be a non-empty array"
            });
        }

        if (!clientId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Missing client information"
            });
        }

        // Delete multiple records
        const result = await UbiApfModel.deleteMany({
            $or: [
                { _id: { $in: ids } },
                { uniqueId: { $in: ids.map(String) } }
            ],
            clientId: clientId
        });

        (`[deleteMultipleUbiApfForms] Deleted by ${username}:`, { count: result.deletedCount, clientId: clientId.substring(0, 8) + "..." });

        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} UBI APF record(s)`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error("[deleteMultipleUbiApfForms] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete UBI APF forms",
            error: error.message
        });
    }
};