const inquirer = require('inquirer');

function menu(){
    inquirer.prompt([
        {
            type:'list',
            name:'choice',
            message:'Select an option',
            choices:[
                {
                    name:'View all employees',
                    value:'VIEW_EMPLOYEES',
                }
            ]
        }
    ]).then(response => {
        console.log(response)
    })
    
}

menu();
