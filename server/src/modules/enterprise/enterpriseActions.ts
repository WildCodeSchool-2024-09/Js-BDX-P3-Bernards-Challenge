import type { RequestHandler } from "express";
import enterpriseRepository from "./enterpriseRepository";

type NewEnterprise = {
  name: string;
  token_slack: string;
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const enterprises = await enterpriseRepository.readAll();
    res.json(enterprises);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const enterpriseId = Number(req.params.id);

    const enterprise = await enterpriseRepository.read(enterpriseId);

    if (!enterprise) {
      res.sendStatus(404);
      return;
    }

    res.json(enterprise);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const enterpriseId = Number(req.params.id);
    const { name, token_slack } = req.body;

    const enterprise = {
      id: enterpriseId, 
      name,
      token_slack,
  };

    const result = await enterpriseRepository.update(enterprise);

    if (!result) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, token_slack } = req.body;

    const newEnterprise: NewEnterprise = {
      name,
      token_slack,
    };

    const insertId = await enterpriseRepository.create(newEnterprise);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const enterpriseId = Number(req.params.id);

    await enterpriseRepository.delete(enterpriseId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, remove };