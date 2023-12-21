import {Request, Response, Router} from "express";

import User from "../models/user";
import CartProduct from "../models/cartProduct";
import Order from "../models/order";
import Product from "../models/product";

const router: Router = Router();

router.post("/order", async (req: Request, res: Response) => {
    const data = new Order({
        paid: req.body.paid,
        total: req.body.total,
        created: new Date(),
        orderer: req.body.orderer,
        products: []
    })
    try {
        const savedData = await data.save();
        res.status(200).json(savedData)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/order", async (req: Request, res: Response) => {
    try {
        const data = await Order.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/order/:id", async (req: Request, res: Response) => {
    try {
        const data = await Order.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete("/order/:id", async (req: Request, res: Response) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        const data = await Order.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put("/order/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const updatedData = req.body;
        const options = {new: true};
        const result = await Order.findByIdAndUpdate(id, updatedData, options)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.post("/order/:id/cartProduct", async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        const options =  {new: true};
        const data = new CartProduct({
            product: req.body.product,
            quantity: req.body.quantity
        })
        const dataToSave = await data.save();
        const cartProduct_id = data._id
        const result = await Order.findByIdAndUpdate(
            { _id: id },
            { $push: {
                    products: cartProduct_id
                }
            }, options
        )
        res.send(result)
    } catch (error) {
        res.status(500).send({message: error})
    }
})

router.get("/order/:id/cartProduct", async (req: Request, res: Response) => {
    try
    {
        const id = req.params.id;
        const result = await Order.findById(id).populate("products")
        res.send(result)
    }
    catch (error) {
        res.status(500).json({message: error})
    }
})

export default router

