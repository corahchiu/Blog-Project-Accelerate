var getName2 = function(names){
  var people = [];
  for(var i=0; i < names ; i++){
    var obj = {
      zip: blogPost.address.zipCode(),
      country: blogPost.address.country(),
      city: blogPost.address.city(),
      street: blogPost.address.streetAddress(),
      bday: blogPost.date.past(),
        }
    people.push(obj)
  }
  var peoples = {};
  peoples.people = people;
  return peoples;
}
module.exports = getName2;
