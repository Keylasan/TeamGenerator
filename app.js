const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
let employees= [];

const questions = {
    manager:[
        {
        type: "input",
        name: "managerName",
        message: "Manager name?"
        },
        {
        type: "input",
        name: "managerID",
        message: "Manager ID number?"
        },
        {
        type: "input",
        name: "managerEmail",
        message: "Manager Email?"
        },
       {
        type: "input",
        name: "managerOfficeNumber",
        message: "Manager's Office Number?"
       } 
    ],
    intern:[
        {
        type: "input",
        name: "internName",
        message: "Intern's name?"
        },
        {
        type: "input",
        name: "internID",
        message: "Intern's ID number?"
        },
        {
        type: "input",
        name: "internEmail",
        message: "Intern's Email?"
        },
       {
        type: "input",
        name: "school",
        message: "Name your school:"
       } 
    ],
    Engineer:[
        {
        type: "input",
        name: "engineerName",
        message: "Engineer's name?"
        },
        {
        type: "input",
        name: "engineerID",
        message: "Engineer's ID number?"
        },
        {
        type: "input",
        name: "engineerEmail",
        message: "Engineer's Email?"
        },
       {
        type: "input",
        name: "github",
        message: "Github account:"
       } 
    ],
    addMember: [
       {
           type: "list",
           name: "choices",
           message:"Add another team member?" ,
           choices: [
               "Intern",
               "Engineer",
               "Continue"
           ]
       }

    ]
}

function start(){
    inquirer.prompt(questions.manager).then(function(data){
    let theManager= new Manager(data.managerName, data.managerID, data.managerEmail, data.managerOfficeNumber)
    employees.push(theManager);
    menu()
})
}

function menu(){
    inquirer.prompt(questions.addMember).then(function(data){
        switch (data.choices){
            case "Intern":
            inquirer.prompt(questions.intern).then(function(data){
                let theIntern = new Intern(data.internName, data.internID, data.internEmail, data.school)
                employees.push(theIntern);
            menu()
            })
            break;
            case "Engineer":
            inquirer.prompt(questions.Engineer).then(function(data){
                let theEngineer = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.github)
                employees.push(theEngineer);
            menu()
            })
            break;
            case "Continue":
            let html = render(employees);
            fs.writeFile("./output/team.html",html, err =>{
                if (err){
                    throw err;
                }
                console.log("success");
            })
           
        }
    })
}

const begin = new start();


