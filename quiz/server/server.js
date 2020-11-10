// server/server.js
const express = require('express');
// const router = express.Router()
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

// mock data to send to our frontend
let events = 
[
  {
    id: 1,
    name: 'Pee'
  },
  {
    id: 2,
    name: 'Poop'
  }
];



app.get('/events/:id', (req, res) => {

  console.log('user connected');
  // console.log(req._parsedUrl.path); // "/events/1"

  const id = Number(req.params.id);
  const event = events.find(event => event.id === id);
  
  res.send(event);

});

app.get('/events', (req, res) => {
  res.send(events);
});

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

// listen on the port
app.listen(port);