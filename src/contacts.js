import path from "path";
import { fileURLToPath } from "url";

import { readFile, updateFile } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await readFile(contactsPath);
  const contacts = JSON.parse(data);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  return contact ? contact : null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  if (!contact) return null;

  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await updateFile(contactsPath, newContacts);

  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  const newContacts = [...contacts, newContact];

  await updateFile(contactsPath, newContacts);

  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
