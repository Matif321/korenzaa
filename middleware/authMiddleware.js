// // // // // // import jwt from "jsonwebtoken"

// // // // // // import User from "../models/userModel.js"


// // // // // // const authMiddlewere = (res, req, next) => {
// // // // // //     try {

// // // // // //         //  Get token headrs

// // // // // //         const authHeader = req.headers.authorization

// // // // // //         if (!authHeader || !authHeader.startWith('Bearer')) {
// // // // // //             return res.status(401).json({
// // // // // //                 success: false,
// // // // // //                 message: "No token, authorization denied"
// // // // // //             })
// // // // // //         }


// // // // // //         const token = req.authHeader.split("")[1]
// // // // // //         next();
// // // // // //     } catch (error) {
// // // // // //         res.status(401).json({
// // // // // //             success: false,
// // // // // //             message: "Token is not valid"
// // // // // //         })


// // // // // //     }

// // // // // // }





// // // // // // import jwt from jsonwebtoken
// // // // // // import User from "../models/userModel.js"


// // // // // // const authMiddwere = async (req, res, next) => {


// // // // // //     try {

// // // // // //         const authHeader = req.header.authorization
// // // // // //         if (!authHeader || !authHeader.startWith("Bearer")){
// // // // // //             success:false,
// // // // // //             message:""

// // // // // //         }

// // // // // //     } catch (error) {

// // // // // //     }

// // // // // // }


// // // // // import jwt from "webjsontoken";


// // // // // import User from "../models/userModel.js"
// // // // // import { verify } from "jsonwebtoken";


// // // // // const authMiddwere = async (req, res, next) => {
// // // // //     try {

// // // // //         const authHeader = req.authHeader.athorization

// // // // //         if (!authHeader || !authHeader.startWith("Bearer")) {
// // // // //             return res.status(403).json({
// // // // //                 success: false,
// // // // //                 message: "token denied"

// // // // //             })
// // // // //         }

// // // // //         const token = authHeader.split("")[1];


// // // // //         const decoded = jwt.verify(token, process.env.JWT_SECRET)

// // // // //         req.user = decoded;

// // // // //     } catch (error) {
// // // // //         res.status.json({
// // // // //             sucess: false,
// // // // //             message: "token donied,"
// // // // //         })
// // // // //         next();

// // // // //     }
// // // // // }



// // // // import jwt from webjsontoken;



// // // // const authMiddlewere = async (req, res, next) => {
// // // //     try {

// // // //         const authHeader = req.authHeader.athorization;

// // // //         if (!authHeader || !authHeader.startWith("Bearer")) {
// // // //             return res.status(403).json({
// // // //                 success: false,
// // // //                 message: "token,deniend"
// // // //             })
// // // //         }

// // // //         const token = authHeader.split(""[1]);

// // // //         const decoded = jwt.verify(token, process.env.JWT_SECRET)


// // // //         req.user = decoded;







// // // //     } catch (error) {
// // // //         res.status(401).json({
// // // //             success: false,
// // // //             message: "token denied"
// // // //         })
// // // //     }





// // // //     next();

// // // // }


// // // import jwt from "jsonwebtoken";

// // // import User from "../models/userModel.js"


// // // const authMiddlewere = async (req, res, next) => {

// // //     try {

// // //         const authHeader = req.authHeader.athorized;

// // //         if (!authHeader || !authHeader.startWith("Baerer")) {
// // //             return res.status(403).json({
// // //                 success: false,
// // //                 message: "token is denyed"
// // //             })
// // //         }

// // //         const token = authHeader.split("")[1]


// // //         const decoded = jwt.verify(token, process.env.JWT_SECRET)

// // //         User.req = decode





// // //     } catch (error) {
// // //         res.status.json({
// // //             success: false,
// // //             message: "token denied "


// // //         })

// // //     }
// // //     next();


// // // }





// // const authMiddlewere = async (req, res, next) => {


// //     try {
// //         const authHeader = req.headers.authorization;
// //         if (!authHeader || !authHeader.startsWith("Bearer")) {
// //             return res.status(401).json({
// //                 message: false,
// //                 message: " No token ,athorzation denied"
// //             })
// //         }

// //         const token = authHeader.split("")[1]


// //         const decoded = Jwt.verify(token, process.env.JWT_SECRET)

// //         res.user = decoded

// //         next();


// //     } catch (error) {
// //         res.status(401).json({
// //             success: false,
// //             message: "invalid token"
// //         })

// //     }
// // }


// import jwt from "jsonwebtoken";


// import User from "../models/userModel.js"


// const authMiddlewere = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization

//         if (!authHeader || !authHeader.startsWith("Bearer")) {

//             return res.status(401).json({
//                 sucess: false,
//                 message: "no token athure"
//             })
//         }



//     } catch (error) {
//         res.status(401).json({
//             sucess: false,
//             message: "invalid token"
//         })

//     }
// }




const authMiddlewere = async (req, res, next) => {
    try {
        const authHeader = req.headers.athorizaton
        if (!authHeader || !authHeader.starWith("Barer")) {
            return res.status(401).json({
                sucess: false,
                message: ""
            })
        }



    } catch (error) {

    }

}


















