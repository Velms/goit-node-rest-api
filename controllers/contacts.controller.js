import * as contactsService from "#services/contacts.service.js";
import * as logService from "#services/log.seevice.js";
import { HttpStatus } from "#helpers/http-status.js";
import {
  NotFoundException,
  ServerErrorException,
} from "#helpers/exceptions.js";
const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = false } =req.query;
  const options = {
    page,
    limit,
    favorite,
  };

  try {
    const contacts = await contactsService.listContacts(owner, options);

    res.json(contacts);
  } catch (error) {
    logService.error(error);
    ServerErrorException(res, error.message);
  }
};

const getOneContact = async (req, res) => {
  try{
    const { _id: owner } = req.user;
    const { id } =req.params;

    const contact = await contactsService.getContactById(owner, id);

    if (!contact) return NotFoundException(res);

    res.json(contact);
  } catch (error) {
    logService.error(error);
    ServerErrorException(res);
  }
};

const deleteContact = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const contact = await contactsService.removeContact(owner, id);
    
    if (!contact) return NotFoundException(res);

    res.json(contact);
  } catch (error) {
    logService.error(error);
    ServerErrorException(res);
  }
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;

  try{
    const contact = await contactsService.addContact({
      ...req.body,
      owner,
    });

    res.status(HttpStatus.CREATED).json(contact);
  } catch(error) {
    logService.error(error);
    ServerErrorException(res);
  }
};



const updateContact = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const contact = await contactsService.updateContact(owner, id, req.body);

    if (!contact) return NotFoundException(res);

    res.json(contact);
  } catch (error) {
    logService.error(error);
    ServerErrorException(res);
  }
};

export {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
