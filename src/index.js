import express from 'express';
import Fuse from 'fuse.js';
import data from './../data/series.json';

const app = express();
const PORT = 8080;

app.listen(
  PORT,
  () => console.log(`it's alive on http://localhost:${PORT}`)
)

app.get('/series', (req, res) => {
  res.status(200).send({
    data
  })
});

app.get('/series/:id', (req, res) => {
  const { id } = req.params;
  const options = { 
    includeScore: true,
    ignoreFieldNorm: true, // keep?
    keys: ["title"]
  };
  const fuse = new Fuse(data, options);
  const result = fuse.search(id);
  const best = result[0].item;
  res.status(200).send({
    best
  })
});