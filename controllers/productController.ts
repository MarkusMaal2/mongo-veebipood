import {Request, Response, Router} from "express";
import Product from "../models/product";
import Category from "../models/category";
const router: Router = Router();

router.post('/product', async(req: Request, res: Response) => {
    const category = new Category({
        name: req.body.category.name
    })
    try {
        const savedCategory = await category.save()
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            active: req.body.active,
            stock: req.body.stock,
            created: new Date(),
            category: savedCategory._id
        })
        const productToSave = await product.save();
        res.status(200).json(productToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
})

router.get("/product", async (req: Request, res: Response) => {
    try {
        const data = await Product.find().populate('category');
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/product/:id", async (req: Request, res: Response) => {
    try {
        const data = await Product.findById(req.params.id).populate('category');
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        const data = await Product.find()
        res.send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put('/product/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
        const categoryId = product?.category
        const updatedCategory = {
            name: req.body.category.name
        }
        await Category.findByIdAndUpdate(categoryId, updatedCategory)

        const updatedData = {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            active: req.body.active,
            stock: req.body.stock,
            created: product?.created,
            category: categoryId
        };
        const options = { new: true };
        const result = await Product.findByIdAndUpdate(id, updatedData, options).populate("category")
        res.send(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router