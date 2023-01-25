// Multer pour gérer les requêtes HTTP avec envoie de fichier

const multer = require('multer');

// Dictionnaire des MIME TYPES
const MIME_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png" : "png"
};

// la destination du fichier (répertoire) et générer un nom de fichier unique
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
    //supprimer les espaces dans le nom du fichier
    const name = file.originalname.split('.')[0];
    console.log(name);
    const extension = MIME_TYPES[file.mimetype];

    // callback(null, name + Date.now() + '.' + extension);
    callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

// Exportation du middleware multer
module.exports = multer({storage}).single("image");