import express from "express";

const contactsRouter = express.Router()

import { makeContact, getContacts, deleteContact } from "../controllers/Contacts";

contactsRouter.post('/makecontact', makeContact)

contactsRouter.get('/getcontacts', getContacts)

contactsRouter.delete('/deletecontact/:id', deleteContact)




export default contactsRouter;