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

// import authActions from "./modules/auth/authActions";

// router.post("/api/login", authActions.login);

// router.post(
//   "/api/users",
//   authActions.hashPassword,
//   application_userActions.add,
// );

/* ************************************************************************* */

export default router;
