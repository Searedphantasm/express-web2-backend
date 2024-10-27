const express = require("express");
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const Product = require("../models/product");


router.get("/",asyncMiddleware(async (req, res,next) => {
    const products = Product.allProducts()
    res.send(products)
}));

router.get("/:id",asyncMiddleware(async (req, res,next) => {
    const products = Product.getProduct(parseInt(req.params.id));

    if (!products) return res.status(404).send("No product found");

    res.send(products)
}));

router.delete("/:id",asyncMiddleware(async (req, res,next) => {
    const products = Product.getProduct(parseInt(req.params.id));
    if (!products) return res.status(404).send("No product found");

    const info = Product.deleteProduct(parseInt(req.params.id));
    if (info.changes === 0 ) return res.status(400).send("Product was not deleted. (ریکوست مشکل داره)");


    res.send({})
}));


router.post("/",asyncMiddleware(async (req, res,next) => {
    const {error} = Product.validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const info = Product.createProduct(req.body);
    if (info.changes === 0 ) return res.status(400).send("Product was not created. (ریکوست مشکل داره)");

    const newProduct = Product.getProduct(info.lastInsertRowid)

    res.status(201).send(newProduct)
}));

module.exports = router;