import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authMiddleware from "./middleware/authMiddleware";
import managerActions from "./modules/manager/managerActions";

router.get("/api/managers", managerActions.browse);
router.get("/api/managers/:id", managerActions.read);
router.post("/api/managers", managerActions.add);
router.patch("/api/managers/:id", managerActions.update);
router.delete("/api/managers/:id", managerActions.destroy);
router.post(
  "/api/managers/:id",
  authMiddleware.hashPassword,
  managerActions.add,
);

import enterpriseActions from "./modules/enterprise/enterpriseActions";

router.get("/api/enterprises", enterpriseActions.browse);
router.get("/api/enterprises/:id", enterpriseActions.read);
router.post("/api/enterprises", enterpriseActions.add);
router.put("/api/enterprises/:id", enterpriseActions.edit);
router.delete("/api/enterprises/:id", enterpriseActions.remove);

import adminActions from "./modules/admin/adminActions";

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", adminActions.add);
router.put("/api/admins/:id", adminActions.update);
router.delete("/api/admins/:id", adminActions.remove);

/* ************************************************************************* */

export default router;
