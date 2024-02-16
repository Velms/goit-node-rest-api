import { Contact } from "#models/contact.model.js";

const listContacts = async (owner, options) => {
  const { limit, page, favorite } = options;
  const skip = (page - 1) * limit;

  const contacts = favorite
    ? await Contact.find({ owner, favorite })
    : await Contact.find({ owner }).limit(+limit).skip(skip);
  return contacts;
};

const getContactById = async (owner, contactId) => {
  const contact = await Contact.find({ owner }).findOne({ _id: contactId });
  return contact;
};

const removeContact = async (owner, contactId) => {
  const contact = await Contact.find({ owner }).findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

const addContact = async ({ name, email, phone, owner }) => {
  const contact = await Contact.create({ name, email, phone, owner });
  return contact;
};

const updateContact = async (owner, contactId, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    body,
    {
      new: true,
    },
  );
  return contact;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
