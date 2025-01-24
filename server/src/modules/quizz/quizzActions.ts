import { type RequestHandler, application } from "express";
// Import access to data
import quizzRepository from "./quizzRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all quizzs
    const quizzs = await quizzRepository.readAll();

    // Respond with the quizzs in JSON format
    res.json(quizzs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific quizz based on the provided ID
    const quizzId = Number(req.params.id);
    const quizz = await quizzRepository.read(quizzId);

    // If the quizz is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the quizz in JSON format
    if (quizz == null) {
      res.sendStatus(404);
    } else {
      res.json(quizz);
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
    const newquizz = {
      question_id: req.body.question_id,
      name: req.body.name,
    };

    // Create the quizz
    const insertId = await quizzRepository.create(newquizz);

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
    const quizzId = Number(req.params.id);
    const updatedquizz = {
      id: quizzId,
      name: req.body.name,
      question_id: req.body.question_id,
    };

    // Update the quizz
    await quizzRepository.update(updatedquizz);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const quizzId = Number(req.params.id);
    const succes = await quizzRepository.delete(quizzId);
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
