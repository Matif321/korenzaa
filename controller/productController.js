
import Product from "../models/productModel.js";

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {
    try {
        const { name, category, price, description, image } = req.body;

        if (!name || !category || !price) {
            return res.status(400).json({
                success: false,
                message: "Name, category and price are required"
            });
        }

        const product = await Product.create({
            name,
            category,
            price,
            description,
            image
        });

        res.status(201).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= GET ALL PRODUCTS =================
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category");

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate("category");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

