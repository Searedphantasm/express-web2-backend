const express = require('express')
const app = express()
const cors = require('cors')
const customers = require('./routes/customers')
const products = require('./routes/products')
const db = require("./config/db")

app.use(express.json())
app.use(cors())

db.initDb();
db.dummyData();

app.use("/api/customers", customers)
app.use("/api/products", products)

const port = process.env.PORT || 3001

const server = app.listen(port,() => console.log(`Listening on port ${port}...`));

module.exports = server;