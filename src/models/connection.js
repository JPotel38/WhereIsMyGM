require('dotenv').config();

const mongoose = require('mongoose');

const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(`mongodb+srv://Jerem:${process.env.CONNEXION_PASSWORD}@cluster0.gwzac.mongodb.net/rpgdb?retryWrites=true&w=majority`,
    options,
    function (err) {
        if (err) {
            console.log("Erreur connection " + err)
        } else {
            console.info("Connection ok")
        }

    }
);
