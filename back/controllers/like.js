const Sauces = require('../models/sauce');

exports.likeDislikeSauce = (req, res, next) => {

// Aller chercher la sauce dans la base de donnée

Sauces
.findOne({_id : req.params.id})
.then((sauces) => {
    res.status(200).json(sauces);
})
.catch((error) => res.status(404).json({error}));
}