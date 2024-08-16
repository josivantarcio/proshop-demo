import express from "express";
const router = express.Router();
//import products from "../data/products.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    //const product = products.find((p) => p._id === req.params.id);

    if(product){
        res.json(product);
    }

    res.status(404).json({ message: "Produto não encontrado"});
  })
);

export default router;