const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const faker = require('faker');
const getName = require("./faker")
const getName2 = require("./faker2")

app.use(bodyParser.json());
app.engine('handlebars', hb({
  defaultLayout: 'main',
  helpers: {
          age: ageCalculator,
          char: calculate
      } }));
app.set('view engine', 'handlebars');
app.get("/mike", function(req, res){
    var a = getName(12);
    console.log(a);
    res.render('person', a);
    });
app.get("/peter", function(req, res){
      var a = getName2(50);
      console.log(a);
      res.render('person2', a);
    });
function calculate(firstName,lastName) {
  var char = firstName.length + lastName.length;
  return char;
}
function ageCalculator(bday) {
        var birthdate = new Date(bday);
        var cur = new Date();
        var diff = cur-birthdate;
        var age = Math.floor(diff/315576000);
        console.log(diff);
        return age;
}
// app.get('/people', function(req, res){
//     var obj = {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         email: faker.internet.email()
//     };
//     res.render('person', obj);
// });

app.listen(8080);
