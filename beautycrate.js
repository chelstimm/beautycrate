require('dotenv').config();
var my = require('./my.js');

var mysql = require("mysql");
var inquirer = require("inquirer")

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
    console.log("Connection Works")
    makeTable();
});

function makeTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " || " + res[i].product + " || " +
                res[i].department + " || " + res[i].price + " || " + res[i].stock + "\n");
        }
        runSearch(res);
    })
}


function runSearch(res) {
    inquirer.prompt([{
            name: "choice",
            type: "input",
            message: "What would you like to buy?[Press X to Exit]",
        }])
        .then(function (answer) {
            var correct = false;
            if(answer.choice.toUpperCase()=="X"){
                process.exit();
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].product == answer.choice) {
                    correct = true;
                    var productchosen = answer.choice;
                    var itemid = i;
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
                        if ((res[itemid].stock-answer.quantity)>0){
                            connection.query("UPDATE products SET stock= " + (res[itemid].stock-answer.quantity) + " WHERE product= " + productchosen +
                                " ",
                                function (err, res2) {
                                    console.log(answer.quantity + " Products Purchased!");
                                    makeTable();
                                })
                        } else {
                            console.log("Not valid");
                            runSearch(res);
                        }
                    })
                }
            }
            if (i = res.length && correct == false){
                console.log("Choose again");
                runSearch(res);
            }
        })
}