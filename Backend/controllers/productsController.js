const Product = require('../models/Product')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')


// @desc Get all products
// @route GET /products
// @access Private
const getAllProducts = asyncHandler(async (req, res) => {
        // Get all products from MongoDB
        const products = await Product.find().select('-createdAt').lean()
        // If no products 
        if (!products?.length) {
            return res.status(400).json({ message: 'No products found' })
        }
        res.json(products)
})

// @desc Create new products
// @route POST /products
// @access Private
const createNewProduct = asyncHandler(async (req, res) => {
    const {user, productName, productImage, category, quantity, price, description} = req.body

    //confirm data
    if (!user || !productName || !category || !quantity || !price || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicate
    const duplicateProductName = await Product.findOne({productName}).lean().exec()

    if (duplicateProductName) {
        return res.status(409).json({ message: 'Duplicate Product' })
    }

    const productObject = {user, productName, productImage, category, quantity, price, description}

    //create and store new product
    const product = await Product.create(productObject)

    if (product) { //created 
        res.status(201).json({ message: `New product ${productName} created` })
    } else {
        res.status(400).json({ message: 'Invalid product data received' })
    }
})

// @desc Update a products
// @route PATCH /products
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const { productName, productImage, category, quantity, price, description} = req.body

    // Confirm data 
    if(!productName || !productImage || !category || !quantity || !price || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the product exist to update?
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    // Check for duplicate 
    const duplicate = await Product.findOne({productName}).lean().exec()

    // Allow updates to the original product 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate product' })
    }

    product.productName = productName
    product.productImage  = productImage 
    product.category = category
    product.quantity = quantity
    product.price = price
    product.description = description


    const updatedProduct = await product.save()

    res.json({ message: `${updatedProduct.productName} updated` })
})

// @desc Delete a products
// @route DELETE /products
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Product ID Required' })
    }

    // Does the product still have assigned notes?
    // const note = await Note.findOne({ product: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'Product has assigned notes' })
    // }

    // Does the product exist to delete?
    const product = await Product.findById(id).exec()

    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `ProductName ${result.productName} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}

















// const asyncHandler = require("express-async-handler");
// const Product = require("../models/productModel");
// const { fileSizeFormatter } = require("../utils/fileUpload");
// const cloudinary = require("cloudinary").v2;

// // Create Prouct
// const createProduct = asyncHandler(async (req, res) => {
//   const { name, sku, category, quantity, price, description } = req.body;

//   //   Validation
//   if (!name || !category || !quantity || !price || !description) {
//     res.status(400);
//     throw new Error("Please fill in all fields");
//   }

//   // Handle Image upload
//   let fileData = {};
//   if (req.file) {
//     // Save image to cloudinary
//     let uploadedFile;
//     try {
//       uploadedFile = await cloudinary.uploader.upload(req.file.path, {
//         folder: "Pinvent App",
//         resource_type: "image",
//       });
//     } catch (error) {
//       res.status(500);
//       throw new Error("Image could not be uploaded");
//     }

//     fileData = {
//       fileName: req.file.originalname,
//       filePath: uploadedFile.secure_url,
//       fileType: req.file.mimetype,
//       fileSize: fileSizeFormatter(req.file.size, 2),
//     };
//   }

//   // Create Product
//   const product = await Product.create({
//     product: req.product.id, name, sku, category, quantity, price, description, image: fileData,
//   });
//   res.status(201).json(product);
// });

// // Get all Products
// const getProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({ product: req.product.id }).sort("-createdAt");
//   res.status(200).json(products);
// });

// // Get single product
// const getProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   // if product doesnt exist
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   // Match product to its product
//   if (product.product.toString() !== req.product.id) {
//     res.status(401);
//     throw new Error("Product not authorized");
//   }
//   res.status(200).json(product);
// });

// // Delete Product
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   // if product doesnt exist
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   // Match product to its product
//   if (product.product.toString() !== req.product.id) {
//     res.status(401);
//     throw new Error("Product not authorized");
//   }
//   await product.remove();
//   res.status(200).json({ message: "Product deleted." });
// });

// // Update Product
// const updateProduct = asyncHandler(async (req, res) => {
//   const { name, category, quantity, price, description } = req.body;
//   const { id } = req.params;

//   const product = await Product.findById(id);

//   // if product doesnt exist
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   // Match product to its product
//   if (product.product.toString() !== req.product.id) {
//     res.status(401);
//     throw new Error("Product not authorized");
//   }

//   // Handle Image upload
//   let fileData = {};
//   if (req.file) {
//     // Save image to cloudinary
//     let uploadedFile;
//     try {
//       uploadedFile = await cloudinary.uploader.upload(req.file.path, {
//         folder: "Pinvent App",
//         resource_type: "image",
//       });
//     } catch (error) {
//       res.status(500);
//       throw new Error("Image could not be uploaded");
//     }

//     fileData = {
//       fileName: req.file.originalname,
//       filePath: uploadedFile.secure_url,
//       fileType: req.file.mimetype,
//       fileSize: fileSizeFormatter(req.file.size, 2),
//     };
//   }

//   // Update Product
//   const updatedProduct = await Product.findByIdAndUpdate(
//     { _id: id },
//     {
//       name,
//       category,
//       quantity,
//       price,
//       description,
//       image: Object.keys(fileData).length === 0 ? product?.image : fileData,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).json(updatedProduct);
// });

// module.exports = {
//   createProduct,
//   getProducts,
//   getProduct,
//   deleteProduct,
//   updateProduct,
// };