const Joi = require('joi');
const db = require("../config/db");

exports.allCustomers = function () {
    return db.db.prepare(`SELECT * from customers`).all()
}

exports.getCustomerById = function (customerId) {
    return db.db.prepare(`SELECT * FROM customers WHERE id = ?`).get(customerId);
}

exports.getCustomerByEmail = function (email) {
    return db.db.prepare(`SELECT * FROM customers WHERE email = ?`).get(email);
}

exports.createCustomer = function (customer,hashed_password) {
    return db.db.prepare(`INSERT INTO customers (first_name, last_name, email, phone, address,hashed_password) 
    VALUES 
        (?,?,?,?,?,?)`).run(customer.first_name,customer.last_name,customer.email,customer.phone,customer.address,hashed_password);
}


function validateCustomer(customer) {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(255).required(),
        last_name: Joi.string().min(2).max(255).required(),
        email: Joi.string().email().required(),
        phone: Joi.string(),
        address: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
    });

    return schema.validate(customer);
}

exports.validateCustomer = validateCustomer;