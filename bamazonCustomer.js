let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.connection({
    host: "localhost",

    port: 3306, 

    user: "root",

    password: "mysql",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
    .prompt({
        
    })
}