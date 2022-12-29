const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/piquante-api",
    { useNewUrlParser : true, useUnifiedTopology: true},
    (err) => {
        if(!err)
    }
)