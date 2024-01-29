import {readFile, writeFile} from 'fs/promises'
import * as path from 'path'
import * as crypto from 'crypto';

const fileName = 'contacts.json'
const dirPath = './db'
const contactsPath = path.join(dirPath, fileName)

export async function listContacts() {
  try {
    return JSON.parse(await readFile(contactsPath, 'utf8'))
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    return contacts?.find(contact => contact.id === contactId)
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const deletedContact = contacts?.find(contact => contact.id === contactId) || null
    if (deletedContact) {
      const newContactsList = contacts.filter(contact => contact.id !== contactId)
      await writeFile(contactsPath, JSON.stringify(newContactsList), 'utf8')
    }
    return deletedContact
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts()
    const newContact = {id: crypto.randomUUID(), name, email, phone}
    contacts?.push(newContact)
    await writeFile(contactsPath, JSON.stringify(contacts), 'utf8')
    return newContact
  } catch (err) {
    console.log(err)
    return null
  }
}
