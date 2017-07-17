const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const getName = require("./blogPost");
const getName2 = require("./blogPost2");

var pg = require('pg');
var jsonfile = require('jsonfile');
var jsonData = './data.json';
// var addblogPost = '';
// var blogPost = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// put data from data.json to preview
// * still need to arrange id descending order then show in preview
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
    console.log(req.body);
    var title = req.body.title;
    var content = req.body.content;
    var sql = 'INSERT INTO posts(title, content) VALUES ($1, $2)';
    client.query(sql, [title, content], function(err, results){
        if (err){
            // cb(err);
            console.error(err);
            // return;
        }
        // cb(null, results);
        res.redirect('/preview');
        // console.log(results);
    })
});
    // addPost(req.body.title, req.body.content, function(err, results){
    //     if(err){
    //         console.log(err);
    //     }
    //     res.redirect('/preview');
    // });

    // jsonfile.readFile(jsonData, function(err, obj){
    //     var i = obj.posts.length;
    //     var title = 'super peter';
    //     obj.posts.push({title});
    //     obj.posts[i].content = "super peter is NOT as cool as you think.";
    //     obj.posts[i].id = i+1;
    //     jsonfile.writeFile(jsonData, obj, {spaces: 4}, function(err, obj){
    //         res.redirect('/preview');
            // obj.posts[i].content = obj.newPost.newContent;
            // obj.posts[i].date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            // obj.posts[i].time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // })
    // })
// });

var config = {
    user: 'corah',
    database: 'blog',
    password: 'password',
    host: 'localhost',
    port: 5432,
    max: 10,
}

var client = new pg.Client(config);
client.connect();


// function addPost(title, content, cb){}




app.engine('handlebars', hb({
  defaultLayout: 'main',
  helpers: {
          age: ageCalculator,
          char: calculate
      }
  }));
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
