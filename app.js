const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const inquirer = require("inquirer");
const fs = require("fs");

const createTeam = [];

//create fx for specific questions general prompts
const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your employee's name?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your employee's email?"
  },
  {
    type: "input",
    name: "id",
    message: "What is your employee's ID?"
  }
];

//intern specific
const internPrompt = [
  {
    type: "input",
    name: "school",
    message: "What is your employee's school?"
  }
];

//eng specific
const engineerPrompt = [
  {
    type: "input",
    name: "github",
    message: "What is your employee's GitHub username?"
  }
];

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is your manager's name?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your manager's email?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your manager's ID?"
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your manager's office number?"
    }
  ])
  .then(res => {
    createTeam.push(new Manager(res.name, res.email, res.id, res.officeNumber));

    addRoles();
  });

//add new employees
function addRoles() {
  return (
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which type of team member would you like to add?",
          choices: ["Engineer", "Intern", "None"],
          name: "employee"
        }
      ])
      // new array to handle questions/answers
      .then(res => {
        let team = [];
        switch (res.employee) {
          case "Engineer":
            team = engineerPrompt;
            break;
          case "Intern":
            team = internPrompt;
            break;
          case "None":
            let HTML = generateHTML();
            fs.writeFile("./output/team.html", html, err => {
              if (err) {
                console.log(err);
              }
            });
        }
        // add both arrays together push to create team array
        inquirer.prompt(questions.concat(team)).then(ans => {
          switch (res.employee) {
            case "Engineer":
              createTeam.push(
                new Engineer(ans.name, ans.id, ans.email, ans.github)
              );
              break;
            case "Intern":
              createTeam.push(
                new Intern(ans.name, ans.id, ans.email, ans.school)
              );
              break;
          }
          console.log(createTeam);
          addRoles();
        });
      })
  );
}
