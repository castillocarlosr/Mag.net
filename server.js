'use strict'

const express = require('express');
const pg = require('pg');


let app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



app.get('/',function(req, res){
  res.send('it works!!');
})
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/login',login);
app.use('/sign-up',sign_up);
function sign_up(req, res){
  res.render('pages/registration');
}
function login(req, res){
  res.render('pages/login');
}
const port = process.env.PORT || 8989;

app.listen(port, () => console.log(`Server running on port:${port}`));
 
