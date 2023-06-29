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
                }
            ]
        },
        {
            type:'list',
            name:'choice',
            message:'Select an option',
            choices:[
                {
                    name:'View all roles',
                    value:'VIEW_ROLES'
                }
            ]
        },
        {
            type:'list',
            name:'choice',
            message:'Select and option',
            choices:[
                {
                    name:'View all employees',
                    value:'VIEW_EMPLOYEES'
                }
            ]
        }
    ]).then(response => {
        console.log(response)
    })
    
}

menu();
