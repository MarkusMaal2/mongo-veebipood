import mongoose from "mongoose";

const category = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
})

export default mongoose.model('Category', category)