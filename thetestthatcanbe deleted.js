const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const getName = require("./blogPost");
const getName2 = require("./blogPost2");

var jsonfile = require('jsonfile');
var jsonData = './data.json';
// var addblogPost = '';
// var blogPost = {};

// put data from data.json to preview
app.get("/preview", function(req, res){
    jsonfile.readFile(jsonData, function(err, obj){
        for (var i=0; i<5; i++){
            obj.posts[i].titlePre = obj.posts[i].title;
            obj.posts[i].contentPre = obj.posts[i].content.substring(0,160) + "...";
        }
        res.render('pre', obj);
    })
});

app.get("/singlepost:id", function(req, res){
    jsonfile.readFile(jsonData, function(err, obj){
        obj.posts[req.params.id-1].titlePost = obj.posts[req.params.id-1].title;
        obj.posts[req.params.id-1].contentPost = obj.posts[req.params.id-1].content;
        res.render('pre', obj);
    })
    // console.log(req.params.id);
});
// display submitform
app.get("/submission", function(req, res){
    res.render('submitform');
});
// get data from form, add to data.json - unfinished
app.post("/writepost", function(req, res){
    jsonfile.readFile(jsonData, function(err, obj){
        var i = obj.posts.length;
        var title = "super peter";
        obj.posts.push({title});
        obj.posts[i].content = "super peter is NOT as cool as you think.";
        obj.posts[i].id = i+1;
        jsonfile.writeFile(jsonData, obj, {spaces: 4}, function(err, obj){
            // obj.posts[i].content = obj.newPost.newContent;
            // obj.posts[i].date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            // obj.posts[i].time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        })
    })
});

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
//         firstName: blogPost.name.firstName(),
//         lastName: blogPost.name.lastName(),
//         email: blogPost.internet.email()
//     };
//     res.render('person', obj);
// });

app.listen(8080);
