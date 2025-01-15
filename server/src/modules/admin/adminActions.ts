import type { RequestHandler } from "express";
import adminRepository from "./adminRepository";


const browse: RequestHandler = async (req, res, next) => {
  try {
    const admins = await adminRepository.readAll();
    res.json(admins);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const adminId = Number(req.params.id);
    const admin = await adminRepository.read(adminId);
    if (admin == null) {
      res.sendStatus(404);
    } else {
      res.json(admin);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newAdmin = {
      application_user_id: req.body.application_user_id,
    };
    const insertId = await adminRepository.create(newAdmin);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const updatedAdmin = {
      id: Number(req.params.id),
      application_user_id: req.body.application_user_id,
    };
    const success = await adminRepository.update(updatedAdmin);
    if (success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const adminId = Number(req.params.id);
    const success = await adminRepository.delete(adminId);
    if (success) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, update, remove };
