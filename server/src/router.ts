import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Define item-related routes
import managerActions from "./modules/manager/managerActions";

router.get("/api/managers", itemActions.browse);
router.get("/api/managers/:id", itemActions.read);
router.post("/api/managers", itemActions.add);

/* ************************************************************************* */

export default router;
