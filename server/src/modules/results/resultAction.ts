import { type RequestHandler, application } from "express";
import resultRepository from "./resultRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const results = await resultRepository.readAll();

    res.json(results);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const managerId = Number(req.params.id);
    const result = await resultRepository.read(managerId);

    if (result == null) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
