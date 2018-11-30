const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const jwt = require('jsonwebtoken');


const secret = require('../_secrets/keys').jwtKey;

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/',(req,res)=>{res.send('Server Running')})//test if running
};

function generateToken(user) {
  console.log(user)
  const payload = {
      subject: user.id,
      username: user.username
  };

  const options = {
      expiresIn: '1h',
  }

  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  db('users').insert(creds)
  .then(userId => {
    res.status(200).json(userId)
  })
  .catch(err => {
    res.json(err)
  })
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  if(creds.username && creds.password){
    // console.log(creds)
    db('users')
    .where({username : creds.username})
    .then(user => {
      if(user && bcrypt.compareSync(creds.password,user[0].password)){
        const token = generateToken(user[0]);//jwt.sign({username: user.username}, {secret : secret}, { expiresIn: '10h' });
        res.status(200).json({Token : token});
      }else{
        console.log("inside else login block")
        res.status(401).json({ERROR : "You shall not pass!"})
      }
    })
    .catch(err =>{
      res.json({Error : err})
    })
  }else{
    res.send('Must include username and password in request')
  }
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

