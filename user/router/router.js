
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/listerPilote/:lettre',PiloteController.Lister);
    app.get('/detailPilote/:pilnum',PiloteController.Detailler);
    
    

 // circuits
 app.get('/circuits', CircuitController.ListerCircuits);
 app.get('/detailCircuits/:circuit', CircuitController.DetailsCircuits);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/detailEcurie/:ecunum', EcurieController.Detailler);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/detailResultat/:id', ResultatController.detailResultat);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
