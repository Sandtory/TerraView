const express = require('express');
const axios = require('axios');
const logger = require('morgan');
require('dotenv').config()
const router = express.Router();
router.use(logger('tiny'));

router.get('/:search', (req, res) => {
    const search = req.params.search;
    console.log(search)
    const api_key = "insert key here";
    const number = 10;
    const url = `https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=${process.env.API_KEY_FLICKR}&tags=${search}&per_page=${number}&format=json&media=photos&has_geo=1&geo_context=2&extras=geo&nojsoncallback=1`;
    const encoded = encodeURI(url)
    axios
        .get(encoded)
        .then( (response) => {
            return response.data;
        })
        .then( (rsp) => {
            res.json(rsp);
        }) 
        .catch((error) => {
            console.error(error);
        })
});

module.exports = router;



