import mongoose from "mongoose";

const product = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    image: {
        required: true,
        type: String
    },
    active: {
        required: true,
        type: Boolean
    },
    stock: {
        required: true,
        type: Number
    },
    created: {
        required: true,
        type: Date
    },
    category: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
})

export default mongoose.model('Product', product)