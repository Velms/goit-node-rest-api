import Contact from "../models/contact.js";

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId });
  return contact;
};

const addContact = async (name, email, phone) => {
  const contact = await Contact.create({ name, email, phone });
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findOneAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findOneAndUpdate({ _id: contactId }, body, {});
  return contact;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};