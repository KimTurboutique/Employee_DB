const inquirer = require('inquirer');

function menu(){
    inquirer.prompt([
        {
            type:'list',
            name:'choice',
            message:'Select an option',
            choices:[
                {
                    name:'View all departments',
                    value:'VIEW_DEPARTMENTS',
                },
                {
                    name:'View all roles',
                    value:'VIEW_ROLES'
                },
                {
                    name:'View all employees',
                    value:'VIEW_EMPLOYEES'
                },
                {
                    name:'Add an Employee',
                    value:'ADD_EMPLOYEE'
                },
            ]
        }   
    ]).then(response => {
        console.log(response)
        switch(response.choice) {
          case "VIEW_EMPLOYEES":
            viewEmployees();
            break;
          case "ADD_EMPLOYEE":
            // prompt user for employee info then use db.query() mysql2 method to insert employee info into database
            addEmployee();
            break;
        }
    })
    
}

menu();
