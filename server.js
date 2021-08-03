const express = require('express');
const app = express();
const path = require('path')


var Rollbar = require("rollbar");
var rollbar = new Rollbar({
    accessToken: '98eb2609dff54f3a93e06956944c58fb',
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

    const index = employees.findIndex((employee) => {
        return employee === name
    })
    try {
        if (index === -1 && name !== "") {
          students.push(name);
          rollbar.info("An employee has been added")
          res.status(200).send(students);
        } else if (name === "") {
            rollbar.error('Someone tried to enter a blank employee name')
          res.status(400).send("must provide a name");
        } else {
            rollback.error('Someone tried to enter a dulpicate employee name')
          res.status(400).send("that student already exists");
        }
      } catch (err) {
        rollbar.error(err)
      }
})

const port = process.env.PORT || 5010;

app.listen(port, function (){
    console.log(`Server running on ${port}`)
    
})