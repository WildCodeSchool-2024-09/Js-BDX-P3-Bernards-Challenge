
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

import enterpriseActions from "./modules/enterprise/enterpriseActions";

router.get("/api/enterprises", enterpriseActions.browse);
router.get("/api/enterprises/:id", enterpriseActions.read);
router.post("/api/enterprises", enterpriseActions.add);

//enterprise : quizz, manager, enterprise
/* ************************************************************************* */

export default router;
