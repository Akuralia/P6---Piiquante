const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://akuralia:CQc3Pv6QWoqxidcB@cluster0.cycfg08.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));