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

//-------------HOME ROUTE--------------------------------------------
app.get('/', (req, res) => {
  res.render('./index.ejs', {url: req.url, links: ['login', 'register']});
});

//--------USER LOGIN ROUTES--------------------------------------------
app.get('/login',(req, res)=>{
  res.render('./pages/login.ejs',{url: req.url,links: ['login', 'register']});

});
app.post('/login', loginUser);


//---------USER REGISTRATION ROUTES------------------------------------------
app.get('/register',(req, res)=>{
  res.render('./pages/registration.ejs',{url: req.url, links: ['login', 'register']});
});
app.post('/register', registerUser);

//---------------------------FRIDGE ROUTES------------------------------------------
app.get('/fridge', checkMagnets);
app.post('/fridge', updateMagnet);
app.get('/update', getPositions);

//generate random x and y coordinates within the provided mins and maxes
function randomCoords(xMin, xMax, yMin, yMax) {
  let xCoord = Math.floor(Math.random() * (Math.floor(xMax) - Math.floor(xMin) + 1)) + Math.floor(xMin);
  let yCoord = Math.floor(Math.random() * (Math.floor(yMax) - Math.floor(yMin) + 1)) + Math.floor(yMin);
  return {x: xCoord, y: yCoord};
}

//Resets coordinates for all alphabetical magnets in the database whenever all the other magnets are re-created
function resetAlphabet(req, res) {
  client.query(`SELECT * FROM magnets WHERE type_id=1`)
    .then(result => {
      result.rows.forEach(letter => {
        let coords = randomCoords(5, 95, 12, 25);
        client.query(`UPDATE magnets SET x=${coords.x}, y=${coords.y} WHERE id=${letter.id}`)
      })
      fetchMemeAPI(req, res);
    })
}

//This retrieves and returns data from Meme API
function fetchMemeAPI(req, res) {
  const meme_URL = `https://api.imgflip.com/get_memes`;
  return superagent.get(meme_URL)
    .then(results => {
      if (results.body.data.memes.length > 0) {
        results.body.data.memes.slice(4, 8).forEach(result => {
          let coords = randomCoords(5, 95, 12, 25);
          let mag = new Magnet(result.url, coords.x, coords.y, 2);
          mag.save();
        });
        client.query(`UPDATE magnet_types SET created_at=${Date.now()} WHERE id=2;`);
      } else {
        throw 'no results returned...sorry';
      }
      fetchWordAPI(req, res);
    })
    .catch(err => handleError(err, res));// app.post('/test', registerUser)
}

//retrieves 30 random words that are a mix of noun, adjectives, verbs, adverbs
function fetchWordAPI(req, res) {
  const word_URL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb%2C%20adverb&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=8&limit=30&api_key=${process.env.WORDS_API_KEY}`;

  return superagent.get(word_URL)
    .then(results => {
      if (results.body.length) {
        results.body.forEach(word => {
          let coords = randomCoords(5, 95, 12, 25);
          let mag = new Magnet(word.word.toLowerCase(), coords.x, coords.y, 3);
          mag.save();
        });
      } else {
        throw 'no word results returned...sorry'
      }
      loadMagnets(req, res);
    })
    .catch(err => handleError(err, res));
}

//checks the database to see if memes and words are older than 1 week, if they are then the server will remove them from the DB and create new magnets
function checkMagnets(req, res){
  client.query(`SELECT created_at FROM magnet_types WHERE id=2`)
    .then(time=>{
      if(!time.rows[0].created_at){
        console.log('getting new data');
        resetAlphabet(req, res);
      }
      else if((Date.now() - time.rows[0].created_at)/(1000*60*60*24) > 7){
        console.log('data too old');
        client.query(`DELETE FROM magnets WHERE type_id>1`)
          .then(()=>{
            resetAlphabet(req, res);
          })
      }
      else{
        loadMagnets(req, res);
      }
    })
}

//retrieves all magnets and sorts them into arrays within an object based on what type of magnet they are to then send out for rendering
function loadMagnets(req, res) {
  let magnets = {
    alphabet: [],
    meme: [],
    word: []
  }

  client.query(`SELECT magnets.id, content, x, y, type FROM magnets JOIN magnet_types ON magnets.type_id=magnet_types.id`)
    .then( result =>{
      result.rows.forEach(element =>{
        magnets[element.type].push(element)
      })
      res.render('./pages/community/show.ejs', {data: Object.values(magnets), url: req.url, links: ['login', 'register']});
    })
    .catch(err => handleError(err, res));
}

//Magnet constructor
function Magnet(content, x, y, type_id){
  this.content = content;
  this.x = x;
  this.y = y;
  this.type_id = type_id;
}

//protpye to be called on each magnet after creation so that it can be saved into the database
Magnet.prototype.save = function() {
  const SQL = `INSERT INTO magnets(content, x, y, type_id) VALUES ($1, $2, $3, $4);`;
  const values = Object.values(this);

  client.query(SQL, values);
}

//Called whenever a POST to /fridge is made so that a magnets coordinates can be saved
function updateMagnet(req, res) {
  const SQL = `UPDATE magnets SET x=$2, y=$3 WHERE id=$1`
  const values = Object.values(req.body);
  client.query(SQL, values)
}

//Used for the GET request on the /update route so the magnets positsions will automatically refresh for anyone on the site
function getPositions(req, res) {
  client.query('SELECT id, x, y FROM magnets;')
    .then(result => res.send(result.rows))
}

//On submit of a  registration form, the POST route will call this and send a response based on if the username or email is available or not
function registerUser(req, res){
  let SQL = `SELECT * FROM users WHERE username=$1 OR email=$2`;
  let values = Object.values(req.body);
  client.query(SQL, values)
    .then(results =>{
      if(results.rowCount){
        res.send('1')
      }
      else{
        SQL = `INSERT INTO users (username, email) VALUES ($1, $2);`;
        client.query(SQL, values)
          .then(() => res.send('0'))
      }
    })
}

//On submit of the login form, the POST route will use this to check if that is a registered email and send a response back
function loginUser(req, res){
  let SQL = `SELECT username FROM users WHERE email=$1`;
  let values = Object.values(req.body);
  client.query(SQL, values)
    .then(results =>{
      if(results.rowCount){
        res.send('0');
      }
      else{
        res.send('1')
      }
    })
}

// For errrors
function handleError(err, res) {
  console.log('Oh oh error! Try unpluggin then pluggin back in', err);
  res.render('pages/error');
}

