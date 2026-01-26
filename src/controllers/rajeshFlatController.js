import RajeshFlatModel from "../models/rajeshFlatModel.js";

export const createRajeshFlat = async (req, res) => {
    try {
        const { clientId, uniqueId, username, userRole, bankName } = req.body;

        ("[createRajeshFlat] Request received:", {
            uniqueId,
            username,
            bankName,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });
        
        ("[createRajeshFlat] Full request body keys:", Object.keys(req.body));

        // Validate required fields
        if (!clientId) {
            console.error("[createRajeshFlat] Missing clientId");
            return res.status(400).json({
                success: false,
                message: "Missing clientId - Client identification required"
            });
        }

        if (!clientId || !uniqueId || !username) {
            console.error("[createRajeshFlat] Missing required fields");
            return res.status(400).json({
                success: false,
                message: "Missing required fields: clientId, uniqueId, username"
            });
        }

        // Check for duplicate
        const existingForm = await RajeshFlatModel.findOne({
            clientId,
            uniqueId
        });

        if (existingForm) {
            ("[createRajeshFlat] Duplicate submission prevented");
            return res.status(200).json({
                success: true,
                message: "Rajesh Flat form already exists (duplicate submission prevented)",
                data: existingForm,
                isDuplicate: true
            });
        }

        // Create new Rajesh Flat form
         const newRajeshFlatForm = new RajeshFlatModel({
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

         const savedRajeshFlatForm = await newRajeshFlatForm.save();

        ("[createRajeshFlat] Success - Form saved to database:", {
             uniqueId,
             status: savedRajeshFlatForm.status,
             _id: savedRajeshFlatForm._id,
            collectionName: "bof_maharastras"
        });

        res.status(201).json({
            success: true,
            message: "Rajesh Flat form created successfully",
            data: savedRajeshFlatForm
        });
    } catch (error) {
        console.error("[createRajeshFlat] Unexpected error:", error);
         res.status(500).json({
             success: false,
             message: "Failed to create Rajesh Flat form",
            error: error.message
        });
    }
};

// GET BOF MAHARASHTRA FORM BY ID
export const getRajeshFlatById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[getRajeshFlatById] Request received:", {
            id,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[getRajeshFlatById] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Fetch form from Rajesh Flat collection by _id first, then by uniqueId
         let rajeshFlatForm;
         try {
             // Try direct _id lookup first
                 try {
                     rajeshFlatForm = await RajeshFlatModel.findById(id).lean();
                     if (rajeshFlatForm) {
                         ("[getRajeshFlatById] Found by _id");
                     }
                 } catch (idError) {
                     ("[getRajeshFlatById] Not a valid ObjectId, trying uniqueId");
                 }

                 // Fallback: try by uniqueId
                 if (!rajeshFlatForm) {
                     rajeshFlatForm = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
                     if (rajeshFlatForm) {
                         ("[getRajeshFlatById] Found by uniqueId");
                     }
                 }
         } catch (dbError) {
             console.error("[getRajeshFlatById] Database query error:", dbError.message);
             return res.status(400).json({
                 success: false,
                 message: "Invalid request parameters"
             });
         }

         if (!rajeshFlatForm) {
             console.error("[getRajeshFlatById] Form not found:", id);
             return res.status(404).json({
                 success: false,
                 message: "Rajesh RowHouse form not found"
             });
         }

        // CLIENT ISOLATION - CRITICAL
         if (rajeshFlatForm.clientId !== clientId) {
             console.error("[getRajeshFlatById] Client isolation violation:", {
                 recordClient: rajeshFlatForm.clientId,
                 requestClient: clientId
             });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Permission check
        if (userRole !== "manager" && userRole !== "admin" && rajeshFlatForm.username !== username) {
            console.error("[getRajeshFlatById] Unauthorized access attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to this form"
            });
        }

        ("[getRajeshFlatById] Success");

        res.status(200).json({
            success: true,
            data: rajeshFlatForm
        });
    } catch (error) {
        console.error("[getRajeshFlatById] Unexpected error:", error);
         res.status(500).json({
             success: false,
             message: "Failed to fetch Rajesh Flat form",
            error: error.message
        });
    }
};

// GET ALL BOF MAHARASHTRA FORMS
export const getAllRajeshFlat = async (req, res) => {
    try {
        const { username, userRole, clientId, status, city, bankName, page = 1, limit = 10 } = req.query;

        ("[getAllRajeshFlat] Request received:", {
            userRole,
            status,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate clientId
        if (!clientId) {
            console.error("[getAllRajeshFlat] Missing clientId");
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

        const forms = await RajeshFlatModel.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
            .lean();

        const total = await RajeshFlatModel.countDocuments(filter);

        ("[getAllRajeshFlat] Success:", {
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
        console.error("[getAllRajeshFlat] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Rajesh Flat forms",
            error: error.message
        });
    }
};

// UPDATE RAJESH FLAT FORM
export const updateRajeshFlat = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        ("[updateRajeshFlat] Request received:", {
            id,
            username,
            userRole,
            action: "save changes",
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Validate ID format
        if (!id || typeof id !== 'string') {
            console.error("[updateRajeshFlat] Invalid ID format:", id);
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        // Validate required query parameters
        if (!username || !userRole || !clientId) {
            console.error("[updateRajeshFlat] Missing required parameters");
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
                form = await RajeshFlatModel.findById(id).lean();
                if (form) {
                    ("[updateRajeshFlat] Found by _id");
                    }
                    } catch (idError) {
                    ("[updateRajeshFlat] Not a valid ObjectId, trying uniqueId");
                    }

                    // Fallback: try by uniqueId
                    if (!form) {
                    form = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
                    if (form) {
                     ("[updateRajeshFlat] Found by uniqueId");
                }
            }
        } catch (dbError) {
            console.error("[updateRajeshFlat] Database query error:", dbError.message);
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters"
            });
        }

        if (!form) {
             ("[updateRajeshFlat] Form not found, creating new form with uniqueId:", id);
             // Create new form if it doesn't exist (handles case where user clicks edit on new form)
             try {
                 const newForm = new RajeshFlatModel({
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
                 ("[updateRajeshFlat] ✅ New form created with _id:", form._id, "uniqueId:", form.uniqueId);
             } catch (createError) {
                 console.error("[updateRajeshFlat] ❌ Failed to create form:", createError.message);
                 if (createError.code === 11000) {
                     console.error("[updateRajeshFlat] Duplicate key error - form may already exist");
                     // Try one more time to fetch the form
                     form = await RajeshFlatModel.findOne({ clientId, uniqueId: String(id) }).lean();
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
            console.error("[updateRajeshFlat] Client isolation violation:", {
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
            console.error("[updateRajeshFlat] Unauthorized update attempt");
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this form"
            });
        }

        // Status validation: Regular users cannot edit certain statuses
        if (userRole !== "manager" && userRole !== "admin") {
            if (!["pending", "rejected", "rework"].includes(form.status)) {
                console.error("[updateRajeshFlat] User cannot edit status:", form.status);
                return res.status(400).json({
                    success: false,
                    message: `Cannot edit form with status: ${form.status}`
                });
            }
        }

        ("[updateRajeshFlat] Permission check passed. Previous status:", form.status);

        // Log incoming pdfDetails for debugging
        ("[updateRajeshFlat] Incoming pdfDetails keys:", req.body.pdfDetails ? Object.keys(req.body.pdfDetails) : "none");

        // Prepare update data - flatten nested objects for proper Mongoose handling
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

        // Use direct assignment for nested objects (no $set operator) to preserve complex structures
        const updatedForm = await RajeshFlatModel.findByIdAndUpdate(
            form._id,
            updateData,
            { new: true, runValidators: true, overwrite: false }
        );

        if (!updatedForm) {
            console.error("[updateRajeshFlat] Failed to update form:", id);
             return res.status(500).json({
                 success: false,
                 message: "Failed to update Rajesh Flat form"
             });
        }

        ("[updateRajeshFlat] Success:", {
            formId: id,
            newStatus: updatedForm.status,
            updatedAt: updatedForm.lastUpdatedAt,
            hasPdfDetails: !!updatedForm.pdfDetails,
            pdfDetailsKeys: updatedForm.pdfDetails ? Object.keys(updatedForm.pdfDetails) : "none"
        });

        res.status(200).json({
            success: true,
            message: "Rajesh Flat form updated successfully",
            data: updatedForm
        });
    } catch (error) {
        console.error("[updateRajeshFlat] Unexpected error:", error);
         res.status(500).json({
             success: false,
             message: "Failed to update Rajesh Flat form",
            error: error.message
        });
    }
};

// MANAGER SUBMIT (APPROVE/REJECT)
export const managerSubmitRajeshFlat = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id || typeof id !== 'string') {
            console.error("[managerSubmitRajeshFlat] Invalid ID format:", id);
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

        ("[managerSubmitRajeshFlat] Request received:", {
            id,
            action,
            username,
            userRole,
            clientId: clientId ? clientId.substring(0, 8) + "..." : "missing"
        });

        // Verify manager/admin role
        if (req.user.role !== "manager" && req.user.role !== "admin") {
            console.error("[managerSubmitRajeshFlat] Unauthorized role:", req.user.role);
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can perform this action"
            });
        }

        // Validate action
        if (!["approved", "rejected"].includes(action)) {
            console.error("[managerSubmitRajeshFlat] Invalid action:", action);
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
                form = await RajeshFlatModel.findById(id).lean();
                if (form) {
                    ("[managerSubmitRajeshFlat] Found by _id");
                }
            } catch (idError) {
                ("[managerSubmitRajeshFlat] Not a valid ObjectId, trying uniqueId");
            }

            // Fallback: try by uniqueId
            if (!form) {
                form = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
                if (form) {
                    ("[managerSubmitRajeshFlat] Found by uniqueId");
                }
            }
        } catch (dbError) {
            console.error("[managerSubmitRajeshFlat] Database query error:", dbError.message);
            return res.status(400).json({
                success: false,
                message: "Invalid request parameters"
            });
        }

        if (!form) {
            console.error("[managerSubmitRajeshFlat] Form not found:", id);
            return res.status(404).json({
                success: false,
                message: "Rajesh RowHouse form not found"
            });
        }

        // CLIENT ISOLATION - CRITICAL
        if (form.clientId !== clientId) {
            console.error("[managerSubmitRajeshFlat] Client isolation violation:", {
                recordClient: form.clientId,
                requestClient: clientId
            });
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        ("[managerSubmitRajeshFlat] Performing action:", {
            action,
            formId: id,
            previousStatus: form.status,
            hashedFeedback: feedback ? feedback.substring(0, 20) + "..." : "(empty)"
        });

        // Update form
        const updatedForm = await RajeshFlatModel.findByIdAndUpdate(
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
            console.error("[managerSubmitRajeshFlat] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update Rajesh RowHouse form"
            });
        }

        ("[managerSubmitRajeshFlat] Success:", {
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
        console.error("[managerSubmitRajeshFlat] Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit Rajesh RowHouse form",
            error: error.message
        });
    }
};

// REQUEST REWORK
export const requestReworkRajeshFlat = async (req, res) => {
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

        ("[requestReworkRajeshFlat] Request:", { id, username, userRole, clientId: clientId?.substring(0, 8) });

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
            form = await RajeshFlatModel.findById(id).lean();
            if (form) {
                ("[requestReworkRajeshFlat] Found by _id");
            }
        } catch (idError) {
            ("[requestReworkRajeshFlat] Not a valid ObjectId, trying uniqueId");
        }

        // Fallback: try by uniqueId
        if (!form) {
            form = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
            if (form) {
                ("[requestReworkRajeshFlat] Found by uniqueId");
            }
        }

        ("[requestReworkRajeshFlat] Found form:", form ? form._id : "not found");

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
            updatedForm = await RajeshFlatModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (idError) {
            ("[requestReworkRajeshFlat] Not a valid ObjectId, trying uniqueId for update");
            // Fallback: try by uniqueId
            updatedForm = await RajeshFlatModel.findOneAndUpdate(
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
        console.error("[requestReworkRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to request rework",
            error: error.message
        });
    }
};

export const deleteRajeshFlat = async (req, res) => {
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
            deletedForm = await RajeshFlatModel.findByIdAndDelete(id);
        } catch (idError) {
            deletedForm = await RajeshFlatModel.findOneAndDelete({ uniqueId: String(id) });
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

        (`[deleteRajeshFlat] Deleted by ${username}:`, { id, clientId: clientId.substring(0, 8) + "..." });

        res.status(200).json({
            success: true,
            message: "Rajesh RowHouse form deleted successfully",
            data: deletedForm
        });
    } catch (error) {
        console.error("[deleteRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Rajesh RowHouse form",
            error: error.message
        });
    }
};

export const deleteMultipleRajeshFlat = async (req, res) => {
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
         const result = await RajeshFlatModel.deleteMany({
             $or: [
                 { _id: { $in: ids } },
                 { uniqueId: { $in: ids.map(String) } }
             ],
             clientId: clientId
         });

         (`[deleteMultipleRajeshFlat] Deleted by ${username}:`, { count: result.deletedCount, clientId: clientId.substring(0, 8) + "..." });

         res.status(200).json({
             success: true,
             message: `Deleted ${result.deletedCount} Rajesh RowHouse record(s)`,
             deletedCount: result.deletedCount
         });
     } catch (error) {
         console.error("[deleteMultipleRajeshFlat] Error:", error);
         res.status(500).json({
             success: false,
             message: "Failed to delete Rajesh RowHouse forms",
             error: error.message
         });
     }
};

export const getLastSubmittedRajeshFlat = async (req, res) => {
    try {
        const { username, clientId } = req.query;

        if (!username || !clientId) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters: username and clientId"
            });
        }

        // Get the most recent submitted form for this user
        const lastForm = await RajeshFlatModel.findOne({
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
        console.error("[getLastSubmittedRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch last submitted form",
            error: error.message
        });
    }
};
