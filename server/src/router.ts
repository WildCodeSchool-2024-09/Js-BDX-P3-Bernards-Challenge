import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authMiddleware from "./middleware/authMiddleware";
import authActions from "./modules/auth/authActions";
import managerActions from "./modules/manager/managerActions";

router.post("/api/login", authActions.login);
router.use(authActions.verifyToken);

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

/* ************************************************************************* */

export default router;
