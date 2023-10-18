import express from "express";

const contactsRouter = express.Router()

import { makeContact } from "../controllers/Contacts";

contactsRouter.post('/makecontact', makeContact)



export default contactsRouter;