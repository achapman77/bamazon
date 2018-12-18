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



INSERT INTO departments (department_name, over_head_costs)
VALUES  ("OUTDOOR RECREATION", 500000.00),
        ("TOOLS", 750000.00),
        ("TOYS", 425000.00);

SELECT * FROM departments;