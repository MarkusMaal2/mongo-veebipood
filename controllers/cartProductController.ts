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


export default router;