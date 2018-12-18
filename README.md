# bamazon

## Description:
Bamazon is a CLI storefront with three different CLI interfaces:

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
* Customer: https://drive.google.com/file/d/1mJaIe5sc94aJpmzrROuinGOqkLk8ubaC/view

* Manager: https://drive.google.com/file/d/1-F6a9Cp-ywqy8DVSQsZ9WuNFmzTQc0xw/view

* Superviser: https://drive.google.com/file/d/1g9P0MPTbuyygMp9o2pSMyBOh7aD1Hr_Y/view

## Bonus Features:
* Tricked out CLI table to better render MySQL JSON (npm cli-table)
* Manager & Supervisor interfaces

## Future Enhancements:
* [ ] Validation on Inquirer prompts to validate IDs exist in database
* [ ] Dynamically show available departments to select in Inquirer prompt

## Skills Practiced:
* MySQL - Selects, Joins, Updates, Alias'
* Node - npms = MySQL, Inquirer, Chalk, Cli-Table, NodeMon
* Javascript