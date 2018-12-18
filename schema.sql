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



CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(13,4) NULL,
  PRIMARY KEY (department_id)
);

