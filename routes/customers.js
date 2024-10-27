const _ = require("lodash");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const Customer = require("../models/customer");

router.get("/",asyncMiddleware(async (req, res,next) => {
    const customers = Customer.allCustomers()

    let filteredCustomers = []
    customers.forEach(customer => {
        filteredCustomers.push(_.pick(customer, ["id","first_name","last_name","phone","email","address","created_at"]))
    })

    res.send(filteredCustomers);
}));

router.get("/:id",asyncMiddleware(async (req, res,next) => {
    const customer = Customer.getCustomerById(parseInt(req.params.id));

    if (!customer) return res.status(404).send("No customer found");

    res.send(_.pick(customer, ["id","first_name","last_name","phone","email","address","created_at"]));
}));

router.post("/", asyncMiddleware(async (req, res,next) => {
    const {error} = Customer.validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = Customer.getCustomerByEmail(req.body.email);
    if (customer) return res.status(400).send("Customer is already registered");

    const info = Customer.createCustomer(req.body,"kmsldkfmsapdomsrg");
    customer = Customer.getCustomerById(info.lastInsertRowid);

    res.status(201).send(_.pick(customer, ["id","first_name","last_name","phone","email","address","created_at"]));
}))

module.exports = router;