import path from "path";
import { fileURLToPath } from "url";

import { readFile, updateFile } from "../helpers/fileOperations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db", "contacts.json");

const listContacts = async () => {
  const data = await readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  return contact ? contact : null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  if (!contact) return null;

  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await updateFile(contactsPath, newContacts);

  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  const newContacts = [...contacts, newContact];

  await updateFile(contactsPath, newContacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  if (!contact) return null;

  const newContacts = contacts.map((contact) =>
    contact.id === contactId ? { ...contact, ...body } : contact
  );

  await updateFile(contactsPath, newContacts);

  return newContacts.find(({ id }) => id === contactId);
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};