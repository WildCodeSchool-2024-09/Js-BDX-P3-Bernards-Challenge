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
    if (!admin) {
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
      email: req.body.email,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      hashed_password: req.body.hashed_password,
      password: req.body.password,
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
      email: req.body.email,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      password: req.body.password,
      hashed_password: req.body.hashed_password,
    };
    const success = await adminRepository.update(updatedAdmin);
    if (success) {
      res.sendStatus(204);
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
