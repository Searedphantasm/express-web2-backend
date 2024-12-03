const db = require('better-sqlite3')('web-2-backend.db', {verbose: console.log});


function initDb() {

    db.prepare(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique customer ID
    first_name TEXT NOT NULL,              -- First name of the customer
    last_name TEXT NOT NULL,               -- Last name of the customer
    email TEXT UNIQUE NOT NULL,            -- Customer email (must be unique)
    phone TEXT,                            -- Phone number (optional)
    address TEXT,                          -- Customer address (optional)
    hashed_password TEXT NOT NULL,                    -- User hashed_password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record creation timestamp
    );`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique customer ID
    first_name TEXT NOT NULL,              -- First name of the user
    last_name TEXT NOT NULL,               -- Last name of the user
    email TEXT UNIQUE NOT NULL,            -- Customer email (must be unique)
    phone TEXT,                            -- Phone number (optional)
    address TEXT,                          -- Customer address (optional)
    hashed_password TEXT NOT NULL,                    -- User hashed_password 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record creation timestamp
    );`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Unique product ID
    title TEXT NOT NULL,                    -- Product title
    description TEXT,                      -- Product description (optional)
    price REAL NOT NULL,                   -- Product price
    quantity_in_stock INTEGER DEFAULT 0,   -- Quantity available in stock
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record creation timestamp
    );`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   -- Unique cart ID
    customer_id INTEGER NOT NULL,           -- Reference to the customer
    status TEXT DEFAULT 'open',             -- Status (e.g., 'open', 'completed')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Cart creation time
    FOREIGN KEY (customer_id) REFERENCES customers(id)  -- Foreign key to customers table
    );`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   -- Unique cart item ID
    cart_id INTEGER NOT NULL,               -- Reference to the cart
    product_id INTEGER NOT NULL,            -- Reference to the product
    quantity INTEGER DEFAULT 1,             -- Quantity of the product
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the product was added
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,   -- Link to cart
    FOREIGN KEY (product_id) REFERENCES products(id)               -- Link to product
    );`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   -- Unique purchase ID
    cart_id INTEGER NOT NULL,               -- Reference to the cart
    price REAL NOT NULL,                    -- Total price of the purchase
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE  -- Link to cart
    );`).run()

}

function dummyData() {
    try{
        db.prepare(`INSERT INTO products (title, description, price, quantity_in_stock) 
    VALUES 
    ('Wireless Mouse', 'Ergonomic wireless mouse with adjustable DPI.', 29.99, 50),
    ('Mechanical Keyboard', 'RGB-backlit mechanical keyboard with blue switches.', 79.99, 30);
    `).run()

        db.prepare(`INSERT INTO customers (first_name, last_name, email, phone, address,hashed_password) 
    VALUES 
        ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Elm Street, Springfield','rgmdslkfgmldskfgmpseorgj'),
        ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Oak Avenue, Metropolis','sgmdslkfgmldskmfgslkdfmg');
    `).run()
    }catch (e) {
        console.log(e)
    }
}



module.exports = {
    initDb: initDb,
    db,
    dummyData
}