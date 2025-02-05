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
