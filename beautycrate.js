require('dotenv').config();
var my = require('./my.js');

var mysql = require("mysql");
var inquirer = require("inquirer")

//setup connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: my.pass.word,
    database: "beautycrate"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection is working")
    console.log("\n_______________________________________________\n");
    makeTable();
});

function makeTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " || " + res[i].product + " || " +
                res[i].department + " || " + res[i].price + " || " + res[i].stock + "\n");
        }
        console.log("\n_______________________________________________\n");
        startShopping(res);
    })
}

function startShopping(res) {
    inquirer.prompt([{
            name: "choice",
            type: "input",
            message: "What would you like to buy?[Press X to Exit]",
        }])
        .then(function (answer) {
            var correct = false;
            if (answer.choice.toUpperCase() == "X") {
                process.exit();
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].product == answer.choice) {
                    correct = true;
                    var productchosen = answer.choice;
                    var item = i;
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many would you like to buy?",
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function (answer) {
                        if ((res[item].stock - answer.quantity) > 0) {
                            connection.query('UPDATE beautycrate.products SET stock= ' + (res[item].stock - answer.quantity) + ' WHERE product = "' + productchosen +
                                '"',
                                function (err, res2) {
                                    var price = res[item].price;
                                    var total = answer.quantity * price;
                                    console.log("\n_______________________________________________\n");
                                    console.log("You've purchased " + answer.quantity + " products!");
                                    console.log("\n_______________________________________________\n");
                                    console.log("Your total is " + total + " Thanks for shopping!");
                                    console.log("\n_______________________________________________\n");
                                    console.log("Inventory has been updated. See below.");
                                    console.log("\n_______________________________________________\n");
                                    makeTable();
                                    // continueShopping();
                                })
                        } else {
                            console.log("Not a valid quantity.");
                            startShopping(res);
                        }
                    })
                }
            }
            if (i = res.length && correct == false) {
                console.log("Choose another Product");
                startShopping(res);
            }
        })
}

 // Ask the customer if they would like to continue shopping //
//  function continueShopping() {
//     inquirer.prompt({
//         name: "action",
//         type: "list",
//         message: " Would you like to make another purchase?\n",
//         choices: ["Yes", "No"]
//     }).then(function (answer) {
//         switch (answer.action) {
//             case "Yes":
//                 break;
//             case "No":
//                 connection.end();
//                 break;
//         }
//     })
// }
