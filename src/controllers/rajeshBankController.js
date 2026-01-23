import RajeshBankModel from "../models/rajeshBankModel.js";

export const createRajeshBank = async (req, res) => {
    try {
        const { clientId, uniqueId, username, userRole, bankName } = req.body;

        ("[createRajeshBank] Request received:", {
            uniqueId,
            username,
            bankName,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        ("[createRajeshBank] Full request body keys:", Object.keys(req.body));

        // Validate required fields
        if (!clientId) {
            console.error("[createRajeshBank] Missing clientId");
            return res.status(400).json({
                success: false,
                message: "Missing clientId - Client identification required"
            });
        }

        if (!clientId || !uniqueId || !username) {
            console.error("[createRajeshBank] Missing required fields");
            return res.status(400).json({
                success: false,
                message: "Missing required fields: clientId, uniqueId, username"
            });
        }

        // Check for duplicate
        const existingForm = await RajeshBankModel.findOne({
            clientId,
            uniqueId
        });

        if (existingForm) {
            ("[createRajeshBank] Duplicate submission prevented");
            return res.status(200).json({
                success: true,
                message: "Rajesh Bank form already exists (duplicate submission prevented)",
                data: existingForm,
                isDuplicate: true
            });
        }

        // Create new Rajesh Bank form
        const newRajeshBankForm = new RajeshBankModel({
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

        const savedRajeshBankForm = await newRajeshBankForm.save();

        ("[createRajeshBank] Success - Form saved to database:", {
            uniqueId,
            status: savedRajeshBankForm.status,
            _id: savedRajeshBankForm._id,
            collectionName: "rajesh_Banks"
        });

        res.status(201).json({
            success: true,
            message: "Rajesh Bank form created successfully",
            data: savedRajeshBankForm
        });
    } catch (error) {
        console.error("[createRajeshBank] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create Rajesh Bank form",
            error: error.message
        });
    }
};

// GET RAJESH Bank FORM BY ID
export const getRajeshBankById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[getRajeshBankById] Request received:", {
            id,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[getRajeshBankById] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Fetch form from Rajesh Bank collection by _id first, then by uniqueId
        let rajeshBankForm;
        try {
            // Try direct _id lookup first
            try {
                rajeshBankForm = await RajeshBankModel.findById(id).lean();
                if (rajeshBankForm) {
                    ("[getRajeshBankById] Found by _id");
                }
            } catch (idError) {
                ("[getRajeshBankById] Not a valid ObjectId, trying uniqueId");
            }

            // Fallback: try by uniqueId
            if (!rajeshBankForm) {
                rajeshBankForm = await RajeshBankModel.findOne({ uniqueId: String(id) }).lean();
                if (rajeshBankForm) {
                    ("[getRajeshBankById] Found by uniqueId");
                }
            }
        } catch (dbError) {
            console.error("[getRajeshBankById] Database query error:", dbError.message);
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters"
            });
        }

        if (!rajeshBankForm) {
            console.error("[getRajeshBankById] Form not found:", id);
            return res.status(404).json({
                success: false,
                message: "Rajesh Bank form not found"
            });
        }

        // CLIENT ISOLATION - CRITICAL
        if (rajeshBankForm.clientId !== clientId) {
            console.error("[getRajeshBankById] Client isolation violation:", {
                recordClient: rajeshBankForm.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Permission check
        if (userRole !== "manager" && userRole !== "admin" && rajeshBankForm.username !== username) {
            console.error("[getRajeshBankById] Unauthorized access attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to this form"
            });
        }

        ("[getRajeshBankById] Success");

        res.status(200).json({
            success: true,
            data: rajeshBankForm
        });
    } catch (error) {
        console.error("[getRajeshBankById] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Rajesh Bank form",
            error: error.message
        });
    }
};

// GET ALL RAJESH Bank FORMS
export const getAllRajeshBank = async (req, res) => {
    try {
        const { username, userRole, clientId, status, city, bankName, page = 1, limit = 10 } = req.query;

        ("[getAllRajeshBank] Request received:", {
            userRole,
            status,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate clientId
        if (!clientId) {
            console.error("[getAllRajeshBank] Missing clientId");
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

        const forms = await RajeshBankModel.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
            .lean();

        const total = await RajeshBankModel.countDocuments(filter);

        ("[getAllRajeshBank] Success:", {
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
        console.error("[getAllRajeshBank] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Rajesh Bank forms",
            error: error.message
        });
    }
};

// UPDATE RAJESH Bank FORM
export const updateRajeshBank = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[updateRajeshBank] Request received:", {
            id,
            username,
            userRole,
            action: "save changes",
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[updateRajeshBank] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Validate required query parameters
        if (!username || !userRole || !clientId) {
            console.error("[updateRajeshBank] Missing required parameters");
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
                form = await RajeshBankModel.findById(id).lean();
                if (form) {
                    ("[updateRajeshBank] Found by _id");
                }
            } catch (idError) {
                ("[updateRajeshBank] Not a valid ObjectId, trying uniqueId");
            }

            // Fallback: try by uniqueId
            if (!form) {
                form = await RajeshBankModel.findOne({ uniqueId: String(id) }).lean();
                if (form) {
                    ("[updateRajeshBank] Found by uniqueId");
                }
            }
        } catch (dbError) {
            console.error("[updateRajeshBank] Database query error:", dbError.message);
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters"
            });
        }

        if (!form) {
            ("[updateRajeshBank] Form not found, creating new form with uniqueId:", id);
            // Create new form if it doesn't exist (handles case where user clicks edit on new form)
            try {
                const newForm = new RajeshBankModel({
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
                ("[updateRajeshBank] ✅ New form created with _id:", form._id, "uniqueId:", form.uniqueId);
            } catch (createError) {
                console.error("[updateRajeshBank] ❌ Failed to create form:", createError.message);
                if (createError.code === 11000) {
                    console.error("[updateRajeshBank] Duplicate key error - form may already exist");
                    // Try one more time to fetch the form
                    form = await RajeshBankModel.findOne({ clientId, uniqueId: String(id) }).lean();
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
            console.error("[updateRajeshBank] Client isolation violation:", {
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
            console.error("[updateRajeshBank] Unauthorized update attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this form"
            });
        }

        // Status validation: Regular users cannot edit certain statuses
        if (userRole !== "manager" && userRole !== "admin") {
            if (!["pending", "rejected", "rework"].includes(form.status)) {
                console.error("[updateRajeshBank] User cannot edit status:", form.status);
                return res.status(400).json({
                    success: false,
                    message: `Cannot edit form with status: ${form.status}`
                });
            }
        }

        ("[updateRajeshBank] Permission check passed. Previous status:", form.status);

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

        const updatedForm = await RajeshBankModel.findByIdAndUpdate(
            form._id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedForm) {
            console.error("[updateRajeshBank] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update Rajesh Bank form"
            });
        }

        ("[updateRajeshBank] Success:", {
            formId: id,
            newStatus: updatedForm.status,
            updatedAt: updatedForm.lastUpdatedAt
        });

        res.status(200).json({
            success: true,
            message: "Rajesh Bank form updated successfully",
            data: updatedForm
        });
    } catch (error) {
        console.error("[updateRajeshBank] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update Rajesh Bank form",
            error: error.message
        });
    }
};

// MANAGER SUBMIT (APPROVE/REJECT)
export const managerSubmitRajeshBank = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id || typeof id !== 'string') {
            console.error("[managerSubmitRajeshBank] Invalid ID format:", id);
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

        ("[managerSubmitRajeshBank] Request received:", {
            id,
            action,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Verify manager/admin role
        if (req.user.role !== "manager" && req.user.role !== "admin") {
            console.error("[managerSubmitRajeshBank] Unauthorized role:", req.user.role);
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can perform this action"
            });
        }

        // Validate action
        if (!["approved", "rejected"].includes(action)) {
            console.error("[managerSubmitRajeshBank] Invalid action:", action);
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
                form = await RajeshBankModel.findById(id).lean();
                if (form) {
                    ("[managerSubmitRajeshBank] Found by _id");
                }
            } catch (idError) {
                ("[managerSubmitRajeshBank] Not a valid ObjectId, trying uniqueId");
            }

            // Fallback: try by uniqueId
            if (!form) {
                form = await RajeshBankModel.findOne({ uniqueId: String(id) }).lean();
                if (form) {
                    ("[managerSubmitRajeshBank] Found by uniqueId");
                }
            }
        } catch (dbError) {
            console.error("[managerSubmitRajeshBank] Database query error:", dbError.message);
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters"
            });
        }

        if (!form) {
            console.error("[managerSubmitRajeshBank] Form not found:", id);
            return res.status(404).json({
                success: false,
                message: "Rajesh Bank form not found"
            });
        }

        // CLIENT ISOLATION - CRITICAL
        if (form.clientId !== clientId) {
            console.error("[managerSubmitRajeshBank] Client isolation violation:", {
                recordClient: form.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        ("[managerSubmitRajeshBank] Performing action:", {
            action,
            formId: id,
            previousStatus: form.status,
            hashedFeedback: feedback ? feedback.substring(0, 20) + "..." : "(empty)"
        });

        // Update form
        const updatedForm = await RajeshBankModel.findByIdAndUpdate(
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
            console.error("[managerSubmitRajeshBank] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update Rajesh Bank form"
            });
        }

        ("[managerSubmitRajeshBank] Success:", {
            action,
            newStatus: updatedForm.status,
            updatedAt: updatedForm.lastUpdatedAt
        });

        res.status(200).json({
            success: true,
            message: `Rajesh Bank form ${action} successfully`,
            data: updatedForm
        });
    } catch (error) {
        console.error("[managerSubmitRajeshBank] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit Rajesh Bank form",
            error: error.message
        });
    }
};

// REQUEST REWORK
export const requestReworkRajeshBank = async (req, res) => {
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

        ("[requestReworkRajeshBank] Request:", { id, username, userRole, clientId: clientId?.substring(0, 8) });

        // Verify manager/admin role (check from middleware-provided user data)
        if (req.user.role !== "manager" && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can request rework"
            });
        }

        // Find Rajesh Bank form by _id (direct lookup first) or uniqueId (fallback)
        let form;
        // Try direct _id lookup first (regardless of format)
        try {
            form = await RajeshBankModel.findById(id).lean();
            if (form) {
                ("[requestReworkRajeshBank] Found by _id");
            }
        } catch (idError) {
            ("[requestReworkRajeshBank] Not a valid ObjectId, trying uniqueId");
        }

        // Fallback: try by uniqueId
        if (!form) {
            form = await RajeshBankModel.findOne({ uniqueId: String(id) }).lean();
            if (form) {
                ("[requestReworkRajeshBank] Found by uniqueId");
            }
        }

        ("[requestReworkRajeshBank] Found form:", form ? form._id : "not found");

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Rajesh Bank form not found"
            });
        }

        // CLIENT ISOLATION - CRITICAL: Verify record belongs to requesting client
        if (form.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Update Rajesh Bank form for rework - try _id first, then uniqueId
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
            updatedForm = await RajeshBankModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (idError) {
            ("[requestReworkRajeshBank] Not a valid ObjectId, trying uniqueId for update");
            // Fallback: try by uniqueId
            updatedForm = await RajeshBankModel.findOneAndUpdate(
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
        console.error("[requestReworkRajeshBank] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to request rework",
            error: error.message
        });
    }
};

export const deleteRajeshBank = async (req, res) => {
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
            deletedForm = await RajeshBankModel.findByIdAndDelete(id);
        } catch (idError) {
            deletedForm = await RajeshBankModel.findOneAndDelete({ uniqueId: String(id) });
        }

        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Rajesh Bank form not found"
            });
        }

        // CLIENT ISOLATION - Verify record belonged to requesting client
        if (deletedForm.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        (`[deleteRajeshBank] Deleted by ${username}:`, { id, clientId: clientId.substring(0, 8) + "..." });

        res.status(200).json({
            success: true,
            message: "Rajesh Bank form deleted successfully",
            data: deletedForm
        });
    } catch (error) {
        console.error("[deleteRajeshBank] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Rajesh Bank form",
            error: error.message
        });
    }
};

export const deleteMultipleRajeshBank = async (req, res) => {
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
        const result = await RajeshBankModel.deleteMany({
            $or: [
                { _id: { $in: ids } },
                { uniqueId: { $in: ids.map(String) } }
            ],
            clientId: clientId
        });

        (`[deleteMultipleRajeshBank] Deleted by ${username}:`, { count: result.deletedCount, clientId: clientId.substring(0, 8) + "..." });

        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} Rajesh Bank record(s)`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error("[deleteMultipleRajeshBank] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Rajesh Bank forms",
            error: error.message
        });
    }
};
