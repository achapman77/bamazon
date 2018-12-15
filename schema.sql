DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Whitewater Raft", "Outdoor Recreation", 4500.00, 10),
        ("Cooler", "Outdoor Recreation", 450.50, 30),
        ("Stove", "Outdoor Recreation", 275.75, 25),
        ("Groover", "Outdoor Recreation", 75.00, 20),
        ("Table Saw", "Tools", 675.35, 15),
        ("Grinder", "Tools", 75.45, 25),
        ("Router", "Tools", 165.85, 25),
        ("Legos", "Toys", 55.55, 100),
        ("Capsela", "Toys", 45.00, 75),
        ("Erector Set", "Toys", 125.25, 45);

SELECT * FROM products;