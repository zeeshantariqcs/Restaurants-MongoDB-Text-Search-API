var express = require('express');
var router = express.Router();

const Restaurant = require('../models/restaurant');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/restaurants', function (req, res, next) {
    console.log("NAME IS THIS " + req.body.name);
    //param required: name, limit
    let name=req.body.name || "";
    let limit = parseInt(req.query.limit || req.body.limit || 100);
    let skip = parseInt(req.query.skip || req.body.skip || 0);
    Restaurant.find({$text: {$search: name}},{_id:1,name:1,cuisine:1}).skip(skip).limit(limit).exec(function (err, restaurants) {
        if (err) {
            return res.json({
                code: 500,
                success: false,
                message: "Internal Server Error",
                error: err
            });
        } else {
            return res.json({
                code: 200,
                success: true,
                total_restaurants: restaurants.length,
                data: restaurants
            });
        }
    });
});

module.exports = router;
