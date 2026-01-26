import RajeshRowHouseModel from "../models/rajeshRowHouseModel.js";

export const createRajeshRowHouse = async (req, res) => {
    try {
        const { clientId, uniqueId, username, userRole, bankName } = req.body;

        ("[createBofMaharashtra] Request received:", {
            uniqueId,
            username,
            bankName,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });
        
        ("[createBofMaharashtra] Full request body keys:", Object.keys(req.body));

        // Validate required fields
        if (!clientId) {
            console.error("[createBofMaharashtra] Missing clientId");
            return res.status(400).json({
                success: false,
                message: "Missing clientId - Client identification required"
            });
        }

        if (!clientId || !uniqueId || !username) {
            console.error("[createBofMaharashtra] Missing required fields");
            return res.status(400).json({
                success: false,
                message: "Missing required fields: clientId, uniqueId, username"
            });
        }

        // Check for duplicate
        const existingForm = await RajeshRowHouseModel.findOne({
            clientId,
            uniqueId
        });

        if (existingForm) {
            ("[createBofMaharashtra] Duplicate submission prevented");
            return res.status(200).json({
                success: true,
                message: "BOF Maharashtra form already exists (duplicate submission prevented)",
                data: existingForm,
                isDuplicate: true
            });
        }

        // Create new BOF Maharashtra form
        const newBofMaharashtraForm = new RajeshRowHouseModel({
            clientId,
            uniqueId,
            username,
            lastUpdatedBy: username,
            lastUpdatedByRole: userRole || "user",
            status: "pending",
            dateTime: new Date().toLocaleString(),
            day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
            ...req.body
        });

        const savedBofMaharashtraForm = await newBofMaharashtraForm.save();

        ("[createBofMaharashtra] Success - Form saved to database:", {
            uniqueId,
            status: savedBofMaharashtraForm.status,
            _id: savedBofMaharashtraForm._id,
            collectionName: "bof_maharastras"
        });

        res.status(201).json({
            success: true,
            message: "BOF Maharashtra form created successfully",
            data: savedBofMaharashtraForm
        });
    } catch (error) {
        console.error("[createBofMaharashtra] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create BOF Maharashtra form",
            error: error.message
        });
    }
};

// GET BOF MAHARASHTRA FORM BY ID
export const getRajeshRowHouseById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[getBofMaharastraById] Request received:", {
            id,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[getBofMaharastraById] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Fetch form from BOM Flat collection by _id first, then by uniqueId
         let bofMaharashtraForm;
         try {
             // Try direct _id lookup first
                 try {
                     bofMaharashtraForm = await RajeshRowHouseModel.findById(id).lean();
                     if (bofMaharashtraForm) {
                         ("[getBofMaharastraById] Found by _id");
                     }
                 } catch (idError) {
                     ("[getBofMaharastraById] Not a valid ObjectId, trying uniqueId");
                 }

                 // Fallback: try by uniqueId
                 if (!bofMaharashtraForm) {
                     bofMaharashtraForm = await RajeshRowHouseModel.findOne({ uniqueId: String(id) }).lean();
                     if (bofMaharashtraForm) {
                         ("[getBofMaharastraById] Found by uniqueId");
                     }
                 }
         } catch (dbError) {
             console.error("[getBofMaharastraById] Database query error:", dbError.message);
             return res.status(400).json({
                 success: false,
                 message: "Invalid request parameters"
             });
         }

         if (!bofMaharashtraForm) {
             console.error("[getRajeshRowHouseById] Form not found:", id);
             return res.status(404).json({
                 success: false,
                 message: "Rajesh RowHouse form not found"
             });
         }

        // CLIENT ISOLATION - CRITICAL
        if (bofMaharashtraForm.clientId !== clientId) {
            console.error("[getBofMaharastraById] Client isolation violation:", {
                recordClient: bofMaharashtraForm.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Permission check
        if (userRole !== "manager" && userRole !== "admin" && bofMaharashtraForm.username !== username) {
            console.error("[getBofMaharastraById] Unauthorized access attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to this form"
            });
        }

        ("[getBofMaharastraById] Success");

        res.status(200).json({
            success: true,
            data: bofMaharashtraForm
        });
    } catch (error) {
        console.error("[getBofMaharastraById] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch BOF Maharashtra form",
            error: error.message
        });
    }
};

// GET ALL BOF MAHARASHTRA FORMS
export const getAllRajeshRowHouse = async (req, res) => {
    try {
        const { username, userRole, clientId, status, city, bankName, page = 1, limit = 10 } = req.query;

        ("[getAllBofMaharashtra] Request received:", {
            userRole,
            status,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate clientId
        if (!clientId) {
            console.error("[getAllBofMaharashtra] Missing clientId");
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

        const forms = await RajeshRowHouseModel.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
            .lean();

        const total = await RajeshRowHouseModel.countDocuments(filter);

        ("[getAllBofMaharashtra] Success:", {
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
        console.error("[getAllBofMaharashtra] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch BOF Maharashtra forms",
            error: error.message
        });
    }
};

// UPDATE BOF MAHARASHTRA FORM
export const updateRajeshRowHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[updateBofMaharashtra] Request received:", {
            id,
            username,
            userRole,
            action: "save changes",
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[updateBofMaharashtra] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Validate required query parameters
        if (!username || !userRole || !clientId) {
            console.error("[updateBofMaharashtra] Missing required parameters");
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
                form = await RajeshRowHouseModel.findById(id).lean();
                if (form) {
                    ("[updateBofMaharashtra] Found by _id");
                }
            } catch (idError) {
                ("[updateBofMaharashtra] Not a valid ObjectId, trying uniqueId");
            }

            // Fallback: try by uniqueId
            if (!form) {
                form = await RajeshRowHouseModel.findOne({ uniqueId: String(id) }).lean();
                if (form) {
                    ("[updateBofMaharashtra] Found by uniqueId");
                }
            }
        } catch (dbError) {
            console.error("[updateBofMaharashtra] Database query error:", dbError.message);
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters"
            });
        }

        if (!form) {
             ("[updateRajeshRowHouse] Form not found, creating new form with uniqueId:", id);
             // Create new form if it doesn't exist (handles case where user clicks edit on new form)
             try {
                 const newForm = new RajeshRowHouseModel({
                     clientId,
                     uniqueId: String(id),
                     username,
                     lastUpdatedBy: username,
                     lastUpdatedByRole: userRole,
                     status: "pending",
                     dateTime: new Date().toLocaleString(),
                     day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
                     ...req.body
                 });
                 form = await newForm.save();
                 ("[updateRajeshRowHouse] ✅ New form created with _id:", form._id, "uniqueId:", form.uniqueId);
             } catch (createError) {
                 console.error("[updateRajeshRowHouse] ❌ Failed to create form:", createError.message);
                 if (createError.code === 11000) {
                     console.error("[updateRajeshRowHouse] Duplicate key error - form may already exist");
                     // Try one more time to fetch the form
                     form = await RajeshRowHouseModel.findOne({ clientId, uniqueId: String(id) }).lean();
                     if (!form) {
                         return res.status(400).json({
                             success: false,
                             message: "Duplicate form entry - unable to create or update"
                         });
                     }
                 } else {
                     return res.status(400).json({
                         success: false,
                         message: "Failed to create form: " + createError.message
                     });
                 }
             }
        }

        // CLIENT ISOLATION - CRITICAL
        if (form.clientId !== clientId) {
            console.error("[updateBofMaharashtra] Client isolation violation:", {
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
            console.error("[updateBofMaharashtra] Unauthorized update attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this form"
            });
        }

        // Status validation: Regular users cannot edit certain statuses
        if (userRole !== "manager" && userRole !== "admin") {
            if (!["pending", "rejected", "rework"].includes(form.status)) {
                console.error("[updateBofMaharashtra] User cannot edit status:", form.status);
                return res.status(400).json({
                    success: false,
                    message: `Cannot edit form with status: ${form.status}`
                });
            }
        }

        ("[updateBofMaharashtra] Permission check passed. Previous status:", form.status);

        // Prepare update data
        const updateData = {
            ...req.body,
            status: "on-progress",
            lastUpdatedBy: username,
            lastUpdatedByRole: userRole,
            lastUpdatedAt: new Date(),
            updatedAt: new Date()
        };

        // Remove sensitive fields if user is not admin
        if (userRole !== "admin") {
            delete updateData.managerFeedback;
            delete updateData.submittedByManager;
        }

        const updatedForm = await RajeshRowHouseModel.findByIdAndUpdate(
            form._id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedForm) {
            console.error("[updateBofMaharashtra] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update BOF Maharashtra form"
            });
        }

        ("[updateBofMaharashtra] Success:", {
            formId: id,
            newStatus: updatedForm.status,
            updatedAt: updatedForm.lastUpdatedAt
        });

        res.status(200).json({
            success: true,
            message: "BOF Maharashtra form updated successfully",
            data: updatedForm
        });
    } catch (error) {
        console.error("[updateBofMaharashtra] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update BOF Maharashtra form",
            error: error.message
        });
    }
};

// MANAGER SUBMIT (APPROVE/REJECT)
export const managerSubmitRajeshRowHouse = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id || typeof id !== 'string') {
            console.error("[managerSubmitRajeshRowHouse] Invalid ID format:", id);
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

        ("[managerSubmitRajeshRowHouse] Request received:", {
            id,
            action,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Verify manager/admin role
        if (req.user.role !== "manager" && req.user.role !== "admin") {
            console.error("[managerSubmitRajeshRowHouse] Unauthorized role:", req.user.role);
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can perform this action"
            });
        }

        // Validate action
        if (!["approved", "rejected"].includes(action)) {
            console.error("[managerSubmitRajeshRowHouse] Invalid action:", action);
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
                form = await RajeshRowHouseModel.findById(id).lean();
                if (form) {
                    ("[managerSubmitRajeshRowHouse] Found by _id");
                }
            } catch (idError) {
                ("[managerSubmitRajeshRowHouse] Not a valid ObjectId, trying uniqueId");
            }

            // Fallback: try by uniqueId
            if (!form) {
                form = await RajeshRowHouseModel.findOne({ uniqueId: String(id) }).lean();
                if (form) {
                    ("[managerSubmitRajeshRowHouse] Found by uniqueId");
                }
            }
        } catch (dbError) {
            console.error("[managerSubmitRajeshRowHouse] Database query error:", dbError.message);
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters"
            });
        }

        if (!form) {
            console.error("[managerSubmitRajeshRowHouse] Form not found:", id);
            return res.status(404).json({
                success: false,
                message: "Rajesh RowHouse form not found"
            });
        }

        // CLIENT ISOLATION - CRITICAL
        if (form.clientId !== clientId) {
            console.error("[managerSubmitRajeshRowHouse] Client isolation violation:", {
                recordClient: form.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        ("[managerSubmitRajeshRowHouse] Performing action:", {
            action,
            formId: id,
            previousStatus: form.status,
            hashedFeedback: feedback ? feedback.substring(0, 20) + "..." : "(empty)"
        });

        // Update form
        const updatedForm = await RajeshRowHouseModel.findByIdAndUpdate(
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
            console.error("[managerSubmitRajeshRowHouse] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update Rajesh RowHouse form"
            });
        }

        ("[managerSubmitRajeshRowHouse] Success:", {
            action,
            newStatus: updatedForm.status,
            updatedAt: updatedForm.lastUpdatedAt
        });

        res.status(200).json({
            success: true,
            message: `Rajesh RowHouse form ${action} successfully`,
            data: updatedForm
        });
    } catch (error) {
        console.error("[managerSubmitRajeshRowHouse] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit Rajesh RowHouse form",
            error: error.message
        });
    }
};

// REQUEST REWORK
export const requestReworkRajeshRowHouse = async (req, res) => {
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

        ("[requestReworkRajeshRowHouse] Request:", { id, username, userRole, clientId: clientId?.substring(0, 8) });

        // Verify manager/admin role (check from middleware-provided user data)
        if (req.user.role !== "manager" && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can request rework"
            });
        }

        // Find Rajesh RowHouse form by _id (direct lookup first) or uniqueId (fallback)
        let form;
        // Try direct _id lookup first (regardless of format)
        try {
            form = await RajeshRowHouseModel.findById(id).lean();
            if (form) {
                ("[requestReworkRajeshRowHouse] Found by _id");
            }
        } catch (idError) {
            ("[requestReworkRajeshRowHouse] Not a valid ObjectId, trying uniqueId");
        }

        // Fallback: try by uniqueId
        if (!form) {
            form = await RajeshRowHouseModel.findOne({ uniqueId: String(id) }).lean();
            if (form) {
                ("[requestReworkRajeshRowHouse] Found by uniqueId");
            }
        }

        ("[requestReworkRajeshRowHouse] Found form:", form ? form._id : "not found");

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Rajesh RowHouse form not found"
            });
        }

        // CLIENT ISOLATION - CRITICAL: Verify record belongs to requesting client
        if (form.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Update Rajesh RowHouse form for rework - try _id first, then uniqueId
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
            updatedForm = await RajeshRowHouseModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (idError) {
            ("[requestReworkRajeshRowHouse] Not a valid ObjectId, trying uniqueId for update");
            // Fallback: try by uniqueId
            updatedForm = await RajeshRowHouseModel.findOneAndUpdate(
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
        console.error("[requestReworkRajeshRowHouse] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to request rework",
            error: error.message
        });
    }
};

export const deleteRajeshRowHouse = async (req, res) => {
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
            deletedForm = await RajeshRowHouseModel.findByIdAndDelete(id);
        } catch (idError) {
            deletedForm = await RajeshRowHouseModel.findOneAndDelete({ uniqueId: String(id) });
        }

        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Rajesh RowHouse form not found"
            });
        }

        // CLIENT ISOLATION - Verify record belonged to requesting client
        if (deletedForm.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        (`[deleteRajeshRowHouse] Deleted by ${username}:`, { id, clientId: clientId.substring(0, 8) + "..." });

        res.status(200).json({
            success: true,
            message: "Rajesh RowHouse form deleted successfully",
            data: deletedForm
        });
    } catch (error) {
        console.error("[deleteRajeshRowHouse] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Rajesh RowHouse form",
            error: error.message
        });
    }
};

export const deleteMultipleRajeshRowHouse = async (req, res) => {
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
        const result = await RajeshRowHouseModel.deleteMany({
            $or: [
                { _id: { $in: ids } },
                { uniqueId: { $in: ids.map(String) } }
            ],
            clientId: clientId
        });

        (`[deleteMultipleRajeshRowHouse] Deleted by ${username}:`, { count: result.deletedCount, clientId: clientId.substring(0, 8) + "..." });

        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} Rajesh RowHouse record(s)`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error("[deleteMultipleRajeshRowHouse] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Rajesh RowHouse forms",
            error: error.message
        });
    }
};
export const getLastSubmittedRajeshRowHouse = async (req, res) => {
    try {
        const { username, clientId } = req.query;

        if (!username || !clientId) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters: username and clientId"
            });
        }

        // Get the most recent submitted form for this user
        const lastForm = await RajeshRowHouseModel.findOne({
            username,
            clientId
        })
        .sort({ createdAt: -1 })
        .lean();

        if (!lastForm) {
            return res.status(404).json({
                success: false,
                message: "No previous form found for autofill"
            });
        }

        res.status(200).json({
            success: true,
            data: lastForm
        });
    } catch (error) {
        console.error("[getLastSubmittedRajeshRowHouse] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch last submitted form",
            error: error.message
        });
    }
};