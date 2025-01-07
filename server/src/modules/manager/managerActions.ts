import type { RequestHandler } from "express";

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
      application_user_id: req.body.application_user_id,
      enterprise_id: req.body.enterprise_id,
    };

    // Create the manager
    const insertId = await managerRepository.create; //(newManager//);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {};
export default { browse, read, add, destroy };
