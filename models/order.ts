import mongoose from "mongoose";

const order = new mongoose.Schema({
    paid: {
        required: true,
        type: Boolean,
    },
    total: {
        required: true,
        type: Number,
    },
    created: {
        required: true,
        type: Date,
    },
    orderer: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    products: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'CartProduct',
    }]
})

export default mongoose.model('Order', order)