import {Request, Response, Router} from "express";
import Product from "../models/product";
import Category from "../models/category";
import CartProduct from "../models/cartProduct";
const router: Router = Router();

router.post("/cartProduct", async (req: Request, res: Response) => {
    const category = new Category({
        name: req.body.product.category.name
    })
    try {
        const savedCategory = await category.save();
        const product = new Product({
            name: req.body.product.name,
            price: req.body.product.price,
            image: req.body.product.image,
            active: req.body.product.active,
            stock: req.body.product.stock,
            category: savedCategory._id
        })
        const productToSave = await product.save();
        const cartProduct = new CartProduct({
            product: productToSave._id,
            quantity: req.body.quantity
        })
        const cartProductToSave = await cartProduct.save();
        res.status(200).json(cartProductToSave);
    } catch (error) {
        res.status(400).json({message: error})
    }
})

router.get("/cartProduct", async (req: Request, res: Response) => {
    try {
        const data = await CartProduct.find().populate("product")
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/cartProduct/:id", async (req: Request, res: Response) => {
    try {
        const data = await CartProduct.findById(req.params.id).populate("product")
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete("/cartProduct/:id", async(req: Request, res: Response) => {
    try {
        await CartProduct.findByIdAndDelete(req.params.id);
        const data = await CartProduct.find().populate("product");
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put("/cartProduct/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await CartProduct.findByIdAndUpdate(id, updatedData, options).populate("product")
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})


export default router;