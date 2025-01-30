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

// import authActions from "./modules/auth/authActions";

// router.post("/api/login", authActions.login);

// router.post(
//   "/api/users",
//   authActions.hashPassword,
//   application_userActions.add,
// );

/* ************************************************************************* */

export default router;
