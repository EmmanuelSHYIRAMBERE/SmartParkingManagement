import express from "express";
import { verifyToken, admin } from "../middleware";

const testimoniesRouter = express.Router()

import { addTestimony, deleteTestimony, updateTestimony, getTestimonies } from "../controllers/Testmonies";


testimoniesRouter.post('/addtestimony', addTestimony)

testimoniesRouter.get('/gettestimonies', verifyToken, admin, getTestimonies)

testimoniesRouter.delete('/deletetestimony/:id', deleteTestimony)

testimoniesRouter.patch('/updatetestimony/:id', updateTestimony)


export default testimoniesRouter;