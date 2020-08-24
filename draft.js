var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "CMS_DB"
});
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});
async function runSearch() {
    let answer = inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Employees",
            "Add Employees",
            "Add departments",
            "View departments",
            "add roles",
            "view roles",
            "EXIT"
        ]
    }])
        .then(function (answer) {
            switch (answer.action) {
                case "View Employees":
                    viewEmployees()

                    break;


                case "Add Employees":
                    addEmployees()

                    break;
                case "Add departments":
                    addDepartment()

                    break;
                case "View departments":
                    viewDepartment()

                    break;
                case "add roles":
                    addRole()

                    break;
                case "view roles":
                    viewRole()

                    break;
                case "EXIT":
                    connection.end()
                    break;

                default:
                    break;
            }
        }
        )
}


function viewEmployees() {
    connection.query("SELECT * FROM Employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();

    })
}
function addEmployees() {
    let questions = [{
        name: "firstName",
        type: "input",
        message: "What is the first name of the New Employee?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the last name of the New Employee?"
    }, {
        name: "managerID",
        type: "input",
        message: "What is your ID?"
    
    }, {
        name: "roleID",
        type: "input",
        message: "Please assign an ID number for your new Employee?"
    }]

    inquirer.prompt(questions).then((answer) => {

        let query = `insert into Employees (firstName,lastName,manager_id,role_id) values(?,?,?,?)`;

        connection.query(query, [answer.firstName, answer.lastName,answer.managerID,answer.roleID], function (err) {
            if (err) throw err;
            connection.end();
        })
    })
}


function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What is the name of the New Department?"
    })
        .then(function (answer) {

            let query = `insert into departments (departmentName) values(?) `;
            connection.query(query, answer.department, function (err) {
                if (err) throw err;
                connection.end();
            })

        })
}

function viewDepartment() {
    connection.query("SELECT * FROM Departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();

    })
}

function addRole() {
    let questions = [{
        name: "roleTitle",
        type: "input",
        message: "What is the Title of the Role?"
    },
    {
        name: "Salary",
        type: "input",
        message: "What is the Salary of this Role?"
    }]
    inquirer.prompt(questions).then((answer) => {

        let query = `insert into employeeRole (title,salary) values(?,?)`;
        connection.query(query, [answer.roleTitle,answer.salary])
        connection.end()
})}


function viewRole() {
    connection.query("SELECT * FROM employeeRole", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();

    })
}