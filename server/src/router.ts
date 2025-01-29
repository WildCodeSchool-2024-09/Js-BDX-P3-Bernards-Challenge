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

import quizzActions from "./modules/quizz/quizzActions";

router.get("/api/quizz", quizzActions.browse);
router.get("/api/quizz/:id", quizzActions.read);
router.post("/api/quizz", quizzActions.add);
router.put("/api/quizz/:id", quizzActions.update);
router.delete("/api/quizz/:id", quizzActions.destroy);

/* ************************************************************************* */

import resultAction from "./modules/results/resultAction";

router.get("api/result", resultAction.browse);
router.get("api/result/:id", resultAction.read);

export default router;
