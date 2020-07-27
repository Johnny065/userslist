const express = require('express');
const cors = require('cors');
const app = express();
const usersModule = require('./usersModule.js');

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ' *');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  usersModule.readAll().then(data => {
    res.send(data);
  });
});

app.get('/:id', (req, res) => {
  usersModule.readById(req.params.id).then(item => {
    res.send(item);
  });
});

app.post('/', (req, res) => {
  usersModule.addUser(req.body).then(data => console.log(data));
});

app.put('/', (req, res) => {
  usersModule
    .updateUser(req.body.id, req.body.prop, req.body.val)
    .then(data => res.send(data));
});

app.delete('/:id', (req, res) => {
  usersModule.deleteUserById(req.params.id).then(data => res.send(data));
});

app.listen(3000);
