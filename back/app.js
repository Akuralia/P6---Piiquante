const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const fs = require('fs');


const session = require('express-session');
const morgan = require('morgan');
const nocache = require('nocache');
const dotenv = require("dotenv");
dotenv.config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

/* Connexion à la base donnée MongoDB */
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors());


/* Options de sécurisation des cookies */
const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  cookie: { secure: true,
            httpOnly: true,
            domain: 'http://localhost:3000',
            expires: expiryDate
          }
  })
);

/* Morgan - crée un flux d'écriture (en mode ajout) */
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }); 
/* Morgan - configurer l'enregistreur */
app.use(morgan('combined', { stream: accessLogStream }));

/* Désactive la mise en cache du navigateur */
app.use(nocache());


app.use(express.json());

app.use(bodyParser.json());

/* Enregistrement des routes de l'api dans l'application */
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

/* Rend le dossier "images" statique */
app.use('/images', express.static(path.join(__dirname,'images')));


module.exports = app;