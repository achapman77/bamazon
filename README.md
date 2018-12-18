# bamazon

## Description:
Bamazon is a CLI storefront. 
The app has 3 CLI interfaces:
* Customer Interface:
    * Takes orders, calculates total purchase, and deplete's stock from the store's inventory.
    * Before fulfilling purchase request it first checks to determine if enough stock available.

* Manager Interface:
    * View all products for sale
    * View low inventory (stock < 5 units)
    * Add items to inventory
    * Add new products

* Supervisor Interface:
    * View Product Sales Aggregated by Department
    * View Total Profit vs. Overhead
    * Create New Department

## Demonstration:


## Bonus Features:
* Tricked out CLI table to better render MySQL JSON (npm cli-table)
* Manager & Supervisor interfaces

## Future Enhancements:
[ ] Validation on Inquirer prompts to validate IDs exist in database
[ ] Dynamically show available departments to select in Inquirer prompt

## Skills Practiced:
* MySQL - Selects, Joins, Updates, Alias'
* Node - npms = MySQL, Inquirer, Chalk, Cli-Table, NodeMon
* Javascript