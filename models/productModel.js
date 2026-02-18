import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catagory",
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        trim: true
    },

    image: {
        type: String
    }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;