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
    log(chalk.red(`WELCOME TO BAMAZON SUPERVISOR INTERFACE`));
    // setTimeout(renderInventory, 500);
    promptSupervisor();
});

function promptSupervisor() {
    var commandArr = ["View Product Sales by Department", "Create New Department", "End Session"];

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
                    querySalesByDept();
                    break;
                case commandArr[1]:
                    createNewDept();
                    break;
                case commandArr[2]:
                    connection.end();
                    break;
            }
        });

};

function renderSalesByDept(res) {
    var salesByDeptTable = new Table({
        head: ['Dept ID', 'Dept Name', 'Over Head Costs', 'Dept Sales', 'Total Profit']
      , colWidths: [10, 25, 25, 20, 20]
    });

    for (var i = 0; i < res.length; i++) {
        var overheadCosts = res[i].over_head_costs.toFixed(2);
        var deptSales = res[i].dept_sales;
        var totalProfit = res[i].total_profits;
        
        function formatDeptSales(deptSales) {
            if (deptSales === null) {
                return ""
            } else {
                return `$${deptSales.toFixed(2)}`
            };
        };

        function formatTotalProfit(totalProfit) {
            if (totalProfit === null) {
                return ""
            } else {
                return `$${totalProfit.toFixed(2)}`
            };
        };

        salesByDeptTable.push([res[i].department_id, res[i].department_name, `$${overheadCosts}`, formatDeptSales(deptSales), formatTotalProfit(totalProfit)])
    }
    log(salesByDeptTable.toString());
};

function querySalesByDept() {
    var query =
    `SELECT departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) AS dept_sales,
    (departments.over_head_costs - sum(products.product_sales)) AS total_profits
    FROM departments 
    LEFT JOIN products
    ON departments.department_name = products.department_name
    GROUP BY departments.department_id` 
    
    connection.query(query, function (err, res) {
        if (err) throw err;
        // log(res);
        // log(res[0].dept_sales);
        renderSalesByDept(res);
    });
};

function createNewDept() {
    inquirer
        .prompt([
            {
                name: `department_name`,
                input: `input`,
                message: `What new department would you like to create?`
            },
            {
                name: `over_head_costs`,
                input: `input`,
                message: `What is the forecasted overhead for this new department?`
            },
        ])
        .then(function (answer) {
            connection.query(
                `INSERT INTO departments (department_name, over_head_costs)
                VALUES("${answer.department_name.toUpperCase()}", "${answer.over_head_costs}")`,
                function (err, res) {
                    if (err) throw err;
                    querySalesByDept();
                }
            )
        })
}