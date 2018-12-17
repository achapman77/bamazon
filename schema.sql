DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(13,4) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(13,4) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("WHITEWATER RAFT", "OUTDOOR RECREATION", 4500.00, 4),
        ("COOLER", "OUTDOOR RECREATION", 450.50, 3),
        ("STOVE", "OUTDOOR RECREATION", 275.75, 2),
        ("GROOVER", "OUTDOOR RECREATION", 75.00, 20),
        ("TABLE SAW", "TOOLS", 675.35, 15),
        ("ANGLE GRINDER", "TOOLS", 75.45, 25),
        ("TABLE ROUTER", "TOOLS", 165.85, 25),
        ("LEGOS", "TOYS", 55.55, 100),
        ("TRAIN SET", "TOYS", 45.00, 2),
        ("ERECTOR SET", "TOYS", 125.25, 45);

SELECT * FROM products;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(13,4) NULL,
);