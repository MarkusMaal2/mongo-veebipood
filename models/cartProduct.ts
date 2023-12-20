import mongoose from "mongoose";

const cartProduct = new mongoose.Schema({
    product: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    },
    quantity: {
        required: true,
        type: Number,
    }
})

export default mongoose.model('CartProduct', cartProduct)