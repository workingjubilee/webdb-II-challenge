const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());


server.post('/api/zoos/', async (req,res) => {
  const {name} = req.body;

  if (!name) {
    res.status(400).json({ error: "Not enough nomenclature."})
  } else {

    try { 
      let reply = await db('zoos').insert({ name });

      res.status(201).json(reply);
    } catch(error) {
      res.status(500).json({ error: "The DB lost your request while it went gambling." });
    }

  }
})

server.get('/api/zoos/', async (req,res) => {
  try { 
    let reply = await db.from('zoos')

    res.status(200).json(reply);
  } catch(error) {
    res.status(500).json(error);
  }
})

server.get('/api/zoos/:id', async (req,res) => {
  const {id} = req.params;

  try { 
    let reply = await db.from('zoos').where('id', id);
    
    res.status(200).json(reply);
  } catch(error) {
    res.status(500).json(error);
  }
})

server.put('/api/zoos/:id', async (req,res) => {
  const {id} = req.params;
  const {name} = req.body;

  if (!name) {
    res.status(400).json({ error: "Not enough nomenclature."})
  } else {

    try { 
      let reply = await db('zoos').where('id', id).update({ name });

      res.status(202).json(reply);
    } catch(error) {
      res.status(500).json({ error: "The DB got drunk and forgot your name." });
    }

  }
})


server.delete('/api/zoos/:id', async (req,res) => {
  const {id} = req.params;

 try { 
    let reply = await db('zoos').where('id', id).del();

    res.status(202).json(reply);
  } catch(error) {
    res.status(500).json({ error: "The DB broke everything EXCEPT the record you wanted gone." });
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
