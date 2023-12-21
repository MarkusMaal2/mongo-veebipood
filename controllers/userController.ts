import {Request, Response, Router} from "express";
import User from "../models/user";
const router: Router = Router();

router.post('/user', async(req: Request, res: Response) => {
    const user = new User({
        personalCode: req.body.personalCode,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        address: req.body.address,
        password: req.body.password,
        admin: req.body.admin,
        created: new Date(),
    })

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(400).json({message: error})
    }
})

router.get("/user", async (req: Request, res: Response) => {
    try {
        const data = await User.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/user/:id", async (req: Request, res: Response) => {
    try {
        const data = await User.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id);
        const data = await User.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put("/user/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        const updatedData = req.body
        const options = {new: true}
        const result = await User.findByIdAndUpdate(id, updatedData, options)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router;