const express = require('express');

const Container = require('./../models/container');

const router = express.Router();

router.get('/containers', (req, res) => {
  Container.find({})
  .then((results) => {
    res.send(JSON.stringify(results))
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  })
})

module.exports = router;