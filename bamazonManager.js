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

        // for (var i = 0; i < res.length; i++) {
        //     productsTable.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        // }
        // log(productsTable.toString());
        renderTable(res);
        
        promptManager();
    });
};

function viewLowInventory() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (err, res) {
        if (err) throw err;

        renderTable(res);
        promptManager();
    });     
};

function addToInventory() {
    inquirer
        .prompt([
            {
                name: `id`,
                type: `input`,
                message: `What product ID would you like to Update?`,
                // validate: function (input) {
                //     // Declare function as asynchronous, and save the done callback
                //     var done = this.async();
                 
                //     // Do async stuff
                //     setTimeout(function() {
                //     //     connection.query(`SELECT id FROM products WHERE id = ${input}`), function (err, res) {
                //     //         if (err) throw err;

                //     //         if (res[0].id === undefined) {
                //     //             log(`Not a valid ID`)
                //     //         }
                //     //   }
                //         if (typeof input !== 'number') {
                //         // Pass the return value in the done callback
                //         done('You need to provide a number');
                //         return;
                //       }
                //       // Pass the return value in the done callback
                //       done(null, true);
                //     }, 2500);
                // },
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
                    // setTimeout(promptManager, 2500);
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
            // log(answer.name);
            // log(answer.department);
            // log(answer.price);
            // log(answer.stock);
            
            connection.query(
                `INSERT INTO products(product_name, department_name, price, stock_quantity)
                VALUES ("${answer.name.toUpperCase()}", "${answer.department.toUpperCase()}", ${answer.price}, ${answer.stock})`,
                function (err, res) {
                    if (err) throw err;
                    renderInventory();
                    // setTimeout(promptManager, 2500);
                });
        });
    
}
