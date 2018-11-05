'use strict'

const express = require('express');
const pg = require('pg');
require(`dotenv`).config();

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.log(err));

let app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is up on${PORT}`));


app.get('/', (req, res) => res.render('./index.ejs'));


//function loadBook(req, res) {
//   client.query('SELECT * FROM saved;')
//     .then( results => {
//       res.render('./index.ejs', {data: results.rows[0]});
//     })
// }
