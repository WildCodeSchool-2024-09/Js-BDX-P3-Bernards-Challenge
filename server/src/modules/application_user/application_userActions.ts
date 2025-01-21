// import type { RequestHandler } from "express";

// // Import access to data
// import application_userRepository from "./application_userRepository";

// // The B of BREAD - Browse (Read All) operation
// const browse: RequestHandler = async (req, res, next) => {
//   try {
//     // Fetch all users
//     const application_users = await application_userRepository.readAll();

//     // Respond with the users in JSON format
//     res.json(application_users);
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The R of BREAD - Read operation
// const read: RequestHandler = async (req, res, next) => {
//   try {
//     // Fetch a specific user based on the provided ID
//     const application_userId = Number(req.params.id);
//     const application_user =
//       await application_userRepository.read(application_userId);

//     // If the user is not found, respond with HTTP 404 (Not Found)
//     // Otherwise, respond with the user in JSON format
//     if (application_user == null) {
//       res.sendStatus(404);
//     } else {
//       res.json(application_user);
//     }
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The A of BREAD - Add (Create) operation
// const add: RequestHandler = async (req, res, next) => {
//   try {
//     // Extract the user data from the request body
//     const newApplication_user = {
//       email: req.body.email,
//       hashed_password: req.body.hashed_password,
//     };

//     // Create the user
//     const insertId =
//       await application_userRepository.create(newApplication_user);

//     // Respond with HTTP 201 (Created) and the ID of the newly inserted user
//     res.status(201).json({ insertId });
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// export default { browse, read, add };
