const Joi = require("joi");
const db = require("../config/db")

exports.allProducts = function() {
    return db.db.prepare(`SELECT * FROM products`).all();
}

exports.getProduct = function (id) {
    return db.db.prepare(`SELECT * FROM products WHERE id = ?`).get(id);
}

exports.deleteProduct = function (id) {
    return db.db.prepare(`delete FROM products WHERE id = ?`).run(id);
}

exports.createProduct = function (product) {
    return db.db.prepare(`INSERT into products (title, description, price, quantity_in_stock) 
    VALUES 
    (?,?,?,?);`).run(product.title, product.description, product.price, product.quantity_in_stock)
}

function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        description: Joi.string().min(5).max(64000).required(),
        price: Joi.number(),
        quantity_in_stock: Joi.number().max(1000).required(),
    });

    return schema.validate(product);
}

exports.validateProduct = validateProduct;