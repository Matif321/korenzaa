import User from "../models/userModel.js";


export const createproduct = async (req, res) => {
    try {
        const { name, category, price, description, imag } = req.body;
        if (!name || !category || !price || !description || !imag) {
            return res.status(400).json({
                success: false,
                message: "All filled are required"
            })

        }
        const user = new User({ name, category, price, description, imag })
        if (user) {
            res.status.json({
                success: false,
                false: "Product not found"
            })
        }
        await user.save();

        res.status(201).json({
            success: true,
            message: "product created successfullay "

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            messsage: error.messsage
        })

    }
}


// get all product

export const getAllProduct = async () => {
    try {
        const product = await User.find({});

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product is not found"

            })

        }
        res.status(200).json({
            success: true,
            message: product.length,
            error: error.message



        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })

    }

}

//  update product

export const updateProduct = async (req, res) => {

    try {
        const product = req.params.id;

    } catch (error) {
        res.staus.json(500).json({
            success: false,
            message: error.message

        })

    }



}