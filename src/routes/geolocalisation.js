const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/regions', async function (req, res) {
   axios.get('https://geo.api.gouv.fr/regions').then(response => res.send(response.data));
});

module.exports = router;
