var mysql = require(`mysql`);
var inquirer = require(`inquirer`);
var chalk = require(`chalk`);

var connection = mysql.createConnection({
    port: 8889,
    user: `root`,
    password: `root`,
    database: `products`
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            
        })
}