import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import categoryController from "./controllers/categoryController"
import productController from "./controllers/productController";
import cartProductController from "./controllers/cartProductController";

import mongoose from "mongoose"

mongoose.connect("mongodb+srv://markusmaal:A9bpQ9RbUSTbZ34o@cluster0.u5k9lk4.mongodb.net/?retryWrites=true&w=majority");
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log("Database Connected")
})

// create application/json parser
const app: Express = express();
app.use(bodyParser.json());
app.use('/', categoryController)
app.use('/', productController)
app.use('/', cartProductController)
/*app.get('/', (req:Request, res:Response) =>{
    res.send("Express + TypeScript Server");
})*/

app.listen(3001, () => {
    console.log(`[server]: Server is running at http://localhost:3001`)
})