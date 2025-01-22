import { type RequestHandler, application } from "express";
// Import access to data
import managerRepository from "./managerRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all managers
    const managers = await managerRepository.readAll();

    // Respond with the managers in JSON format
    res.json(managers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific manager based on the provided ID
    const managerId = Number(req.params.id);
    const manager = await managerRepository.read(managerId);

    // If the manager is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the manager in JSON format
    if (manager == null) {
      res.sendStatus(404);
    } else {
      res.json(manager);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newManager = {
      user_id: req.body.user_id,
      enterprise_id: req.body.enterprise_id,
      hashed_password: req.body.hashed_password,
    };

    // Create the manager
    const insertId = await managerRepository.create(newManager);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const managerId = Number(req.params.id);
    const updatedManager = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hashed_password: req.body.password,
      email: req.body.email,
      id: managerId,
      enterprise_id: req.body.enterprise_id,
      application_user_id: req.body.application_user_id,
    };

    // Update the manager
    await managerRepository.update(updatedManager);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const managerId = Number(req.params.id);
    const succes = await managerRepository.delete(managerId);
    if (succes === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, destroy, update };
