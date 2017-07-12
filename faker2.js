const faker = require('faker');
var getName2 = function(names){
  var people = [];
  for(var i=0; i < names ; i++){
    var obj = {
      zip: faker.address.zipCode(),
      country: faker.address.country(),
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      bday: faker.date.past(),
        }
    people.push(obj)
  }
  var peoples = {};
  peoples.people = people;
  return peoples;
}
module.exports = getName2;
