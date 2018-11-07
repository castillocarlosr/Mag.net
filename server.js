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

app.get('/', (req, res) => res.render('./index.ejs'));
app.get('/login',(req, res)=>{
  res.render('./pages/login.ejs')
});
app.post('/login', loginUser);
app.get('/register',(req, res)=>{
  res.render('./pages/registration.ejs')
});
app.post('/register', registerUser);
//+++++____--------+++++++====---change what to render in renderTest function to test pages
app.get('/test', renderTest);
// app.post('/test', registerUser)

<<<<<<< HEAD
=======
// app.post('/meme', fetchMemeAPI)

//This gets all API related data
function fetchAll(req, res){
  fetchMemeAPI(req, res);
  fetchWordAPI(req, res);
}

>>>>>>> da5c4fab510172c7b41f627ae2311150009492e2
//This retrieves and returns data from Meme API
function fetchMemeAPI(req, res) {
  const meme_URL = `https://api.imgflip.com/get_memes`;
  return superagent.get(meme_URL)
    .then(results => {
      if (results.body.data.memes.length > 0) {
        results.body.data.memes.slice(4, 8).forEach(result => {
          let mag = new Magnet(result.url, 6, 7, 2);
          mag.save();
        });
<<<<<<< HEAD
=======
        client.query(`UPDATE magnet_types SET created_at = ${Date.now()} WHERE id=2`)
        // return res.render('pages/searches/show', { memes: formattedResults});
>>>>>>> da5c4fab510172c7b41f627ae2311150009492e2
      } else {
        throw 'no results returned...sorry';
      }
    })
    .catch(err => handleError(err, res));
}

function fetchWordAPI(req, res) {
  const word_URL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb%2C%20adverb&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=8&limit=30&api_key=${process.env.WORDS_API_KEY}`;

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

function checkMagnets(req, res){
  client.query(`SELECT created_at FROM magnet_types WHERE id=2`)
    .then(time=>{
      if(!time.rowCount){
        fetchAll(req, res);
        loadMagnets(req, res);
      }
      // console.log(time.rows[0]);
      // console.log(minutes);
      else if((Date.now() - time.rows[0].created_at)/(1000*60*60*24) > 7){
        client.query(`DELETE FROM magnets WHERE type_id>1`)
          .then(()=>{
            fetchAll(req, res);
            loadMagnets(req, res);
          })
      }
      else{
        loadMagnets(req, res);
      }
    })
}

function loadMagnets(req, res) {
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
      // console.log(Object.values(magnets));
      // res.render('/ejsSomething', magnets);
      //TODO: CARLOS make sure you uncomment above and put an ACTUAL link to pages/
    })
    .catch(err => handleError(err, res));
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
  let SQL = `SELECT * FROM users WHERE username=$1 OR email=$2`;
  let values = Object.values(req.body);
  client.query(SQL, values)
    .then(results =>{
      if(results.rowCount){
        // TODO: add better alert system
        res.status(406).send('User name or email already taken.  Try again.  Sorry....')
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
      }
      else{
        res.status(406).send('email is not registerd.  Go to registration page or check spelling')
      }
    })
  // res.render('pages/login');
}

//=====-----++++++ Render Test
function renderTest(req, res){

  // fetchMemeAPI();
  checkMagnets();
  res.render('pages/login.ejs');

}

// For errrors
function handleError(err, res) {
  console.log('Oh oh error! Try unpluggin then pluggin back in', err);
  res.render('pages/error');
}

