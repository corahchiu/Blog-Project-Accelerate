var pg = require ('pg');

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

var query = 'SELECT * FROM blogposts WHERE id = $1';

client.query(query, [id], function(err, results){
    console.log(results.rows);
    // client.end();
})
