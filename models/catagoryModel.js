import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true // duplicate category name na ho
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String // URL ya image path store hoga
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;