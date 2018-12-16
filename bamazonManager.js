var mysql = require(`mysql`);
var inquirer = require(`inquirer`);
var chalk = require(`chalk`);
var log = console.log;

var connection = mysql.createConnection({
    port: 8889,
    user: `root`,
    password: `root`,
    database: `bamazon_db`
});

connection.connect(function (err) {
    if (err) throw err;
    log(`connectd as id ${connection.threadId}`);
    log(chalk.red(`WELCOME TO THE BAMAZON MANAGER INTERFACE`));
    promptManager();
});

// promptManager();
function promptManager() {
    var commandArr = ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "End Session"]

    inquirer
        .prompt([
            {
                name: "command",
                type: "rawlist",
                message: "What would you like to do?",
                choices: commandArr
            },
        ])
        .then(function (res) {
            
            switch (res.command) {
                case commandArr[0]:
                    renderInventory();
                    break;
                case commandArr[1]:
                    viewLowInventory();
                    break;
                case commandArr[2]:
                    addToInventory();
                    break;
                case commandArr[3]:
                    addNewProduct();
                    break;
                case commandArr[4]:
                    connection.end();
                    break;
            }
        });
}

function renderInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        log(res);
    });
};

function viewLowInventory() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (err, res) {
        if (err) throw err;

        log(res);
    });     
};

function addToInventory() {
    inquirer
        .prompt([
            {
                name: `id`,
                type: `input`,
                message: `What product ID would you like to Update?`,
            },
            {
                name: `add`,
                type: `input`,
                message: `How much would you like to add?`,
            },
        ])
        .then(function (answer) {
            log(answer.id);
            log(answer.add);
            connection.query(
            `UPDATE products 
            SET stock_quantity = stock_quantity + ${answer.add} 
            WHERE id = ${answer.id}`,
                function (err, res) {
                    if (err) throw err;

                    log(`${res.affectedRows} products updated!`);
                    renderInventory();
                    setTimeout(promptManager, 2500);
                });
        });
};

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: `name`,
                type: `input`,
                message: `What is the name of the new product?`,
            },
            {
                name: `department`,
                type: `input`,
                message: `What department to categorize?`,
            },
            {
                name: `price`,
                type: `input`,
                message: `What is the price per unit?`,
            },
            {
                name: `stock`,
                type: `input`,
                message: `How much of the product to sell?`,
            },
        ])
        .then(function (answer) {
            log(answer.name);
            log(answer.department);
            log(answer.price);
            log(answer.stock);
            
            connection.query(
                `INSERT INTO products(product_name, department_name, price, stock_quantity)
                VALUES ("${answer.name}", "${answer.department}", ${answer.price}, ${answer.stock})`,
                function (err, res) {
                    if (err) throw err;
                    renderInventory();
                    setTimeout(promptManager, 2500);
                });
        });
    
}
