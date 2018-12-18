// npm packages
var mysql = require(`mysql`);
var inquirer = require(`inquirer`);
var chalk = require(`chalk`);
var Table = require('cli-table');

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
    log(chalk.red(`WELCOME TO BAMAZON`));
    setTimeout(renderInventory, 500);
});

function renderTable(res) {
    var productsTable = new Table({
        head: ['ID', 'Product_Name', 'Department_Name', 'Price', ' Stock_Quantity']
      , colWidths: [10, 40, 40, 15, 20]
    });

    for (var i = 0; i < res.length; i++) {
        productsTable.push([res[i].id, res[i].product_name, res[i].department_name, `$${res[i].price.toFixed(2)}`, res[i].stock_quantity])
    }
    log(productsTable.toString());
};

function renderInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        renderTable(res);
        // connection.end();
        inquireUser();
    });
};


function inquireUser() {
    inquirer
        .prompt([
            {
            name: `id`,
            type: `input`,
            message: `What product ID would you like to buy?`,
            },
            {
            name: `purchaseQuantity`,
            type: `input`,
            message: `How many would you like to buy?`,
            }
        ])
        .then(function (answer) {
            // log(answer);
            selectProduct(answer);
        })
};

function selectProduct(answer) {
    connection.query(`SELECT * FROM products WHERE id = ${answer.id}`, function (err, res) {
        var purchaseQuantity = answer.purchaseQuantity;
        var userSelection = answer.id;
        var stock = res[0].stock_quantity;
        var price = res[0].price;
        var productSales = res[0].product_sales;

        if (err) throw err;
        // log(res);
        // log(res[0].product_name)

        if (stock <= 0) {
            log(`Sorry the ${res[0].product_name} is not available at this time. Please select another item.`);
            inquireUser();
        } else if (stock - purchaseQuantity < 0) {
            log(`Sorry, we do not have enough to fulfill that order. Please try again.`);
            inquireUser();
        }
        else {
            // log(`Thank you for your purchase of the ${res[0].product_name}. \nYour total is $${chalk.green(res[0].price * purchaseQuantity)}.`)
            
            //updateProducts table
            
            // log(chalk.red(`There are ${remaining} remaining.`));
            updateProducts(purchaseQuantity, stock, price, productSales, userSelection);
        };
    });
}

function updateProducts(purchaseQuantity, stock, price, productSales, userSelection) {
    connection.query(`UPDATE products SET ?, ? WHERE ?`,
        [
            {
                stock_quantity: (stock - purchaseQuantity)
            },
            {
                product_sales: productSales + (price * purchaseQuantity)
            },
            {
                id: userSelection
            },
        ],
        function (err, res) {
            if (err) throw err;

            renderPurchase(userSelection, purchaseQuantity);
            // setTimeout(renderInventory, 2500);
            // log(res.affectedRows);
        }
    )
}

function renderPurchase(userSelection, purchaseQuantity) {
    connection.query(`SELECT * FROM products WHERE id = ${userSelection}`, function (err, res) {
        if (err) throw err;
        // log("this work? " + res[0].product_sales)
        renderTable(res);
        log(`Thank you for your purchase of the ${res[0].product_name}. \nYour total is ${chalk.green(`$${(res[0].price * purchaseQuantity).toFixed(2)}`)}.`);
        log(chalk.red(`There are ${res[0].stock_quantity} remaining.`));
        inquirer
            .prompt([
                {
                    name: "continue",
                    type: "confirm",
                    message: "Would you like to continue shopping?"
                },
            ])
            .then(function (answer) {
                if (answer.continue === true) {
                    renderInventory();
                } else {
                    connection.end();
                }
            })
    })
}