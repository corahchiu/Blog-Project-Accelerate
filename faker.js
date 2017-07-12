const faker = require('faker');
var getName = function(names){
  var people = [];
  for(var i=0; i < names ; i++){
    var obj = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      bday: faker.date.past(),
    }
    people.push(obj);
  }
  var peoples = {};
  peoples.people = people;
  peoples.layout = "otherPage";
  return peoples;
}
module.exports = getName;
