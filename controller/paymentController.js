import stripe from "Stripe";

const stripe = new stripe(process.env.stripe_JWT_SECRET)



// @desc    Create Stripe Payment Intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res, next) => {
    try {
        const { amount, currency = 'pkr' } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'A valid amount is required',
            });
        }

        // Stripe amounts are in the smallest currency unit (paisa for PKR = no decimal)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to paisa
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: req.user._id.toString(),
            },
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get Stripe publishable key (safe to expose to frontend)
// @route   GET /api/payment/config
// @access  Public
const getStripeConfig = async (req, res) => {
    res.status(200).json({
        success: true,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    });
};

module.exports = { createPaymentIntent, getStripeConfig };