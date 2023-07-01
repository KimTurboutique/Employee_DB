const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');
db.query = util.promisify(db.query);

function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option',
            choices: [
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: 'Add Departments',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add an Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]
        }
    ]).then(response => {
        console.log(response)
        switch (response.choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_EMPLOYEE":
                // prompt user for employee info then use db.query() mysql2 method to insert employee info into database
                addEmployee();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_EMPLOYEE_ROLE":
                addEmployeeRole();
                break;
            case "VIEW_ALL_ROLES":
                viewAllRoles();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            default:
                db.close();                    
        }
    })

}

menu();

async function viewDepartments(){
    const departments = await db.query('SELECT * FROM department');
    console.table(departments);
    menu();
}
