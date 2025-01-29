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

import authActions from "./modules/auth/authActions";

router.post("/api/login", authActions.login);
router.use(authActions.verifyToken);

import adminActions from "./modules/admin/adminActions";

router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.post("/api/admins", adminActions.add);
router.put("/api/admins/:id", adminActions.update);
router.delete("/api/admins/:id", adminActions.remove);


/* ************************************************************************* */

export default router;
