

var getName = function(names){
  var people = [];
  for(var i=0; i < names ; i++){
    var obj = {
      firstName: blogPost.name.firstName(),
      lastName: blogPost.name.lastName(),
      email: blogPost.internet.email(),
      bday: blogPost.date.past(),
    }
    people.push(obj);
  }
  var peoples = {};
  peoples.people = people;
  peoples.layout = "otherPage";
  return peoples;
}
module.exports = getName;
