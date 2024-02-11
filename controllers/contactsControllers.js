import * as contactsService from "../services/contactsServices.js";
import * as logService from "../services/logService.js";

export const getAllContacts = async (_, res) => {
  try {
    const contacts = await contactsService.listContacts();

    res.json(contacts);
  } catch (error) {
    logService.error(error);
    res.status(400).send({ message: "Bad request" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    logService.error(error);
    res.status(400).send({ message: "Bad request" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactsService.removeContact(id);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    logService.error(error);
    res.status(400).send({ message: "Bad request" });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await contactsService.addContact(name, email, phone);

    res.status(201).json(contact);
  } catch (error) {
    logService.error(error);
    res.status(400).send({ message: "Bad request" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.updateContact(id, req.body);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    logService.error(error);
    res.status(400).send({ message: "Bad request" });
  }
};

export const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.updateStatusContact(id, req.body);

    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    }

    res.json(contact);
  } catch (error) {
    logService.error(error);
    res.status(400).send({ message: "Bad request" });
  }
};
