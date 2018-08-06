let mysql = require("mysql");
let inquirer = require("inquirer");
let cTable = require('console.table');

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "",

    password: "",

    database: "bamazonDB"
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////


connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    inquirer.prompt([{
        name: "purchase",
        type: "confirm",
        message: "Would you like to purchase something?",
        default: true
    }]).then(userChoice => {
        if (userChoice.purchase) {
            console.log("\nThank you!\n");
            buy();
        } else {
            console.log("\nThank you, please be sure to stop by again!\n")
            connection.end();
        }
    })
}


function buy() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table('Products Available for Purchase', res);
        let itemList = [];
        res.forEach(function (item, idx) {
            itemList.push(item.product_name + " $" + item.price);
        })
        // connection.end();
        inquirer.prompt([{
                name: "choice",
                type: "list",
                choices: itemList,
                message: "What product you would like to purchase?"
            },
            {
                name: "buy",
                type: "input",
                message: "How many unit's would you like to purchase?"
            }
        ]).then(answers => {
            // console.log(answers.choice);

            let chosenItem;
            for (let i = 0; i < res.length; i++) {
                if ((res[i].product_name + " $" + res[i].price) === answers.choice) {
                    chosenItem = res[i];
                }
            }
            let amount = chosenItem.stock_quantity - answers.buy;
            // console.log(chosenItem.stock_quantity);

            if (answers.buy <= chosenItem.stock_quantity) {
                console.log("\nYou would like to purchase " + answers.buy + " " + chosenItem.product_name + "'s\n");
                connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: amount
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        let amountOwed = chosenItem.price * answers.buy;
                        console.log("\nYou owe $" + amountOwed + "\n");
                        console.log("\nNew Stock Quantity for " + chosenItem.product_name + " is: " + amount + "\n");
                        start();
                    });
            } else {
                console.log("\nSorry! We don't have enough! Please choose another item or another amount\n");
                start();
            }
        })
    })
}