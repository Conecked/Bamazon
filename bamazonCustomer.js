let mysql = require("mysql");
let inquirer = require("inquirer");
let cTable = require('console.table');

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "mysql",

    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table('Products Available for Purchase', res);
        inquirer
            .prompt([{
                    type: "confirm",
                    message: "Would you like to purchase something today?",
                    name: "confirm",
                    default: true
                },
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push("Item#: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
                        }
                        return choiceArray;

                    },
                    message: "What is the ID number of the product you would like to purchase?"
                },
                {
                    name: "buy",
                    type: "input",
                    message: "How many unit's would you like to purchase?"
                }
            ])
            .then(answers => {
                let chosenItem;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].product_name === answers.choice) {
                        chosenItem = res[i];
                    }
                }
                if (chosenItem.stock_quantity < parseInt(answer.buy)) {
                    console.log(answers.buy)
                    connection.query("DELETE FROM products WHERE stock_quantity ?", [{
                            stock_quantity: answers.buy
                        },
                    ], function (err) {
                        if (err) throw err;
                        console.log("New Stock Quantity for " + chosenItem + " is: " + res.stock_quantity);
                    })
                } else console.log("Insufficient quantity!")
                end.connection();
            })
    })
};