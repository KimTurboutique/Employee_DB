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
                    value: 'VIEW_ALL_ROLES'
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
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployee();
                break;
            default:
                db.close();
        }
    })

}

menu();

async function viewDepartments() {
    const departments = await db.query('SELECT * FROM department');
    console.table(departments);
    menu();
}

async function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name 
    AS "last name", role.title, department.name AS department, role.salary, 
    concat(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id`
    const employees = await db.query(sql);
    console.table(employees);
    menu();
}

async function viewAllRoles() {
    const roles = await db.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON department.id =role.department_id');
    console.table(roles);
    menu();
}

async function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'What is the name of the new department?'
    }]).then(async answer => {
        await db.query('INSERT INTO department (name) VALUES (?)', [answer.department])
        console.log('Your role has been added.')
        menu();
    })
}

async function addRole() {
    const departments = await db.query('SELECT id as value, name as name FROM department')
    const answers = await inquirer.prompt([{
        type: 'input',
        name: 'role',
        message: 'What is the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary?'
    },
    {
        type: 'list',
        name: 'departmentid',
        message: 'Choose the department.',
        choices: departments
    }])

    await db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [answers.role, answers.salary, answers.departmentid])
    console.log('Your role was successfully added.')
    menu();
}

async function addEmployee() {
    const employees = await db.query('SELECT id as value, CONCAT(first_name, " ", last_name) as name from employee')
    const roles = await db.query('SELECT id as value, title as name FROM role')
    const answers = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the employee\'s first name?'
    },
    {
        type: 'input',
        name: 'lname',
        message: 'What is the employee\'s last name?'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select employee\'s role.',
        choices: roles
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is their manager?',
        choices: employees
    }
    ])
    await db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answers.name, answers.lname, answers.role, answers.manager])
    console.log('Employee was added successfully.')
    menu();
}

async function updateEmployee() {
    const employees = await db.query('SELECT id as value, CONCAT(first_name, " ", last_name) as name from employee')
    const roles = await db.query('SELECT id as value, title as name FROM role')
    const answers = await inquirer.prompt([{
        type: 'list',
        name: 'role',
        message: 'Select employee\'s role.',
        choices: roles
    },
    {
        type: 'list',
        name: 'employee',
        message: 'Who is the employee?',
        choices: employees
    }])
    await db.query('UPDATE employee SET role_id=? WHERE id=?', [answers.role, answers.employee])
    console.log('Employee successfully updated')
    menu();
}
