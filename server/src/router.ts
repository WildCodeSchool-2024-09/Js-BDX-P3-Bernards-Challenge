import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import managerActions from "./modules/manager/managerActions";

router.get("/api/managers", managerActions.browse);
router.get("/api/managers/:id", managerActions.read);
router.post("/api/managers", managerActions.add);
router.patch("/api/managers/:id", managerActions.update);
router.delete("/api/managers/:id", managerActions.destroy);

/* ************************************************************************* */

export default router;
