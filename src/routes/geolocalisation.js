const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/regions', async function (req, res) {
   axios.get('https://geo.api.gouv.fr/regions').then(response => res.send(response.data));
});

router.get('/departments', async function (req, res) {
   axios.get('https://geo.api.gouv.fr/departments').then(response => res.send(response.data));
});

router.get('/communes', async function (req, res) {
   axios.get('https://geo.api.gouv.fr/communes?nom=' + req.query.param + '&fields=nom,department,region&format=json&geometry=centre').then(response => res.send(response.data));
});

module.exports = router;
