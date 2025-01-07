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

router.get("/api/managers", managerActions.browse);
router.get("/api/managers/:id", managerActions.read);
router.post("/api/managers", managerActions.add);
// router.delete("/api/managers/:id", managerActions.delete);
// router.patch("/api/managers/:id", managerActions.update);

/* ************************************************************************* */

export default router;
