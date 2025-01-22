import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

import adminActions from "./modules/admin/adminActions";

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", adminActions.add);
router.put("/api/admins/:id", adminActions.update);
router.delete("/api/admins/:id", adminActions.remove);

/* ************************************************************************* */

export default router;
