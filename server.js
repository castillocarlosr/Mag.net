'use strict'

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const superagent = require('superagent');
require(`dotenv`).config();

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.log(err));

let app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());

const port = process.env.PORT || 8989;
app.listen(port, () => console.log(`Server running on port:${port}`));

app.get('/', (req, res) => {
  res.render('./index.ejs', {url: req.url, links: ['login', 'register']});
  console.log(req.url);
});
// app.get('/', loadUser);
// app.get('/', loadMagnets);
app.get('/login',(req, res)=>{
  res.render('./pages/login.ejs',{url: req.url,links: ['login', 'register']});
  
});
app.post('/login', loginUser);
app.get('/register',(req, res)=>{
  res.render('./pages/registration.ejs',{url: req.url, links: ['login', 'register']});
});
app.post('/register', registerUser);
//+++++____--------+++++++====---change what to render in renderTest function to test pages
// app.get('/test', renderTest);
// app.post('/test', registerUser)
// app.post('/test', loginUser)

// app.post('/meme', fetchMemeAPI)
//This retrieves and returns data from Meme API
function fetchMemeAPI(req, res) {
  const meme_URL = `https://api.imgflip.com/get_memes`;
  return superagent.get(meme_URL)
    .then(results => {
      // console.log(results.body.data.memes);
      if (results.body.data.memes.length > 0) {
        results.body.data.memes.slice(4, 8).forEach(result => {
          let mag = new Magnet(result.url, 6, 7, 2);
          mag.save();
        });
        // return res.render('pages/searches/show', { memes: formattedResults});
      } else {
        throw 'no results returned...sorry';
      }
    })
    .catch(err => handleError(err, res));
}

function fetchWordAPI(req, res) {
  const word_URL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb%2C%20adverb&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=8&limit=30&api_key=${process.env.WORD_API_KEY}`;

  return superagent.get(word_URL)
    .then(results => {
      if (results.body.length) {
        results.body.forEach(word => {
          let mag = new Magnet(word.word.toLowerCase(), 10, 12, 3);
          mag.save();
        });
      } else {
        throw 'no word results returned...sorry'
      }
    })
    .catch(err => handleError(err, res));
}

function loadMagnets(req, res) {
  // const magArray = [];
  // let types = 0;
  let magnets = {
    alphabet: [],
    meme: [],
    word: []
  }
  client.query(`SELECT content, x, y, type FROM magnets JOIN magnet_types ON magnets.type_id=magnet_types.id`)
    .then( result =>{
      result.rows.forEach(element =>{
        magnets[element.type].push(element)
      })
      console.log(Object.values(magnets));
      // res.render('/ejsSomething', magnets);
      //TODO: CARLOS make sure you uncomment above and put an ACTUAL link to pages/

      // magArray.push(result.rows);
      // console.log(magArray);
    })
    .catch(err => handleError(err, res));
  // res.send('Howdy again');
}

function loadUser(req, res) {
  client.query('SELECT * FROM users;')
  return client.query()
    .then( results => {
      res.render('./index.ejs', {data: results.rows[0]});
    })
    .catch(err => handleError(err, res));
}

function Magnet(content, x, y, type_id){
  this.content = content;
  this.x = x;
  this.y = y;
  this.type_id = type_id;
}

Magnet.prototype.save = function() {
  const SQL = `INSERT INTO magnets(content, x, y, type_id) VALUES ($1, $2, $3, $4);`;
  const values = Object.values(this);

  client.query(SQL, values);
}

function registerUser(req, res){
  // console.log(Object.values(req.body));
  let SQL = `SELECT * FROM users WHERE username=$1 OR email=$2`;
  let values = Object.values(req.body);
  client.query(SQL, values)
    .then(results =>{
      if(results.rowCount){
        // alert.show('User name or email already taken.  Try again.  Sorry....')
        res.status(500).send('User name or email already taken.  Try again.  Sorry....')
      }
      else{
        SQL = `INSERT INTO users (username, email) VALUES ($1, $2);`;
        client.query(SQL, values)
          .then(() => res.redirect('/'))
      }
    })
}

function loginUser(req, res){
  console.log(req.body);
  let SQL = `SELECT username FROM users WHERE email=$1`;
  let values = Object.values(req.body);
  client.query(SQL, values)
    .then(results =>{
      if(results.rowCount){
        /////will login to the fridge page
        res.redirect('/');
        // SQL = `SELECT * FROM magnets`
      }
      else{
        res.status(500).send('email is not registerd.  Go to registration page or check spelling')
      }
    })
  // res.render('pages/login');
}

//=====-----++++++ Render Test
function renderTest(req, res){

  // loadMagnets();
  res.render('pages/login.ejs');

}

// For errrors
function handleError(err, res) {
  console.log('Oh oh error! Try unpluggin then pluggin back in', err);
  res.render('pages/error');
}

