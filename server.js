const express = require('express');
const app = express();
const path = require('path')


var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '71893be2ce8444e49534a7d6c273555d',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(express.json());

const employees = ['Jim', 'Jane', 'Jolly', 'Holly']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.post('/api/employee-list', (req,res) => {
    let {name} = req.body;
console.log(name)
    const index = employees.findIndex((employee) => {
        return employee === name
    })
    try {
        if (index === -1 && name !== "") {
          employees.push(name);
          rollbar.info("An employee has been added")
          res.status(200).send(employees);
        } else if (name === "") {
            rollbar.error('Someone tried to enter a blank employee name')
          res.status(400).send("must provide a name");
        } else {
            rollbar.error('Someone tried to enter a dulpicate employee name')
          res.status(400).send("that employee already exists");
        }
      } catch (err) {
        rollbar.error(err)
      }
})

const port = process.env.PORT || 5010;

app.listen(port, function (){
    console.log(`Server running on ${port}`)
    
})