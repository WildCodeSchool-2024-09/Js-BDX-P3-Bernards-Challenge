import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import managerActions from "./modules/manager/managerActions";

router.get("/api/readallmanagers", managerActions.browse);
router.get("/api/readmanager/:id", managerActions.read);
router.post("/api/addmanager", managerActions.add);
router.patch("/api/updatemanager/:id", managerActions.update);
router.delete("/api/deletemanager/:id", managerActions.destroy);

/* ************************************************************************* */

export default router;
