import express from "express";

const testimoniesRouter = express.Router()

import { addTestimony, deleteTestimony, updateTestimony, getTestimonies } from "../controllers/Testmonies";


testimoniesRouter.post('/addtestimony', addTestimony)

testimoniesRouter.get('/gettestimonies', getTestimonies)

testimoniesRouter.delete('/deletetestimony/:id', deleteTestimony)

testimoniesRouter.patch('/updatetestimony/:id', updateTestimony)


export default testimoniesRouter;