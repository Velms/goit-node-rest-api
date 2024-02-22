import express from "express";
import { isValidIdMiddleware } from "#middlewares/index.js";
import { ROUTES } from "#helpers/routes.js";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from "#controllers/contacts.controller.js";

const contactsRouter = express.Router();

contactsRouter.get(ROUTES.CONTACTS.GET_ALL, getAllContacts);

contactsRouter.get(ROUTES.CONTACTS.GET_ONE, isValidIdMiddleware, getOneContact);

contactsRouter.post(ROUTES.CONTACTS.CREATE, createContact);

contactsRouter.put(ROUTES.CONTACTS.UPDATE, isValidIdMiddleware, updateContact);

contactsRouter.patch(
  ROUTES.CONTACTS.UPDATE_STATUS,
  isValidIdMiddleware,
  updateContact,
);

contactsRouter.delete(
  ROUTES.CONTACTS.DELETE,
  isValidIdMiddleware,
  deleteContact,
);

export { contactsRouter };
