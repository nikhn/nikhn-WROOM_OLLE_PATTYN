
let HomeController = require('./../controllers/HomeController');
let PiloteController = require('./../controllers/PiloteController');
let ResultatController = require('./../controllers/ResultatController');
let CircuitController = require('./../controllers/CircuitController');
let EcurieController = require('./../controllers/EcurieController');
let SponsorController = require('./../controllers/SponsorController');
let AuthentificationController = require('./../controllers/AuthentificationController');



//Explication des routes :

//1. Mon HomeController : l'endroit où toute la connexion se déroule.

//2. VerifierConnecter : sur chaque page je vérifie si l'utilisateur s'est bien connecté
//pour pas qu'il puisse accéder par l'url sur la page

//3. Je fais mes autres modules pour mon affichage

// Routes
module.exports = function(app){

// Main Routes

    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);
    app.post('/accueil', HomeController.Connexion);
    app.post('/', HomeController.Connexion);

//Pilote

    app.get('/pilotes',AuthentificationController.VerifierConnecter,PiloteController.Repertoire);
   //Ajout

    app.get('/ajouterPilote',AuthentificationController.VerifierConnecter,PiloteController.Pilote);

    app.post('/ajouterPiloteResultat',AuthentificationController.VerifierConnecter,PiloteController.Ajout);
    //Modif
    app.get('/modifierPiloteParam/:pilnum',AuthentificationController.VerifierConnecter,PiloteController.PiloteInfoModif);

    app.post('/modifierPiloteResultat/:pilnum',AuthentificationController.VerifierConnecter,PiloteController.PiloteModification);

   //Supprimer
    app.get('/supprimerPilote/:pilnum',AuthentificationController.VerifierConnecter,PiloteController.SupprimerPilote);



//Circuits

    app.get('/circuits',AuthentificationController.VerifierConnecter,CircuitController.Repertoire);
    app.get('/ajouterCircuits',AuthentificationController.VerifierConnecter,CircuitController.Circuit);
    app.post('/ajouterCircuitsResultat',AuthentificationController.VerifierConnecter,CircuitController.AjoutCircuit);


     //Modif
     app.get('/modifierCircuitParam/:cirnum',AuthentificationController.VerifierConnecter,CircuitController.CircuitInfoModif);
     app.post('/modifierCircuitResultat/:cirnum',AuthentificationController.VerifierConnecter,CircuitController.CircuitModification);


     //Supprimer
      app.get('/supprimerCircuit/:cirnum',AuthentificationController.VerifierConnecter,CircuitController.SupprimerCircuit);


//Ecurie

      app.get('/ecuries',AuthentificationController.VerifierConnecter,EcurieController.Repertoire);
      app.get('/ajouterEcurie',AuthentificationController.VerifierConnecter,EcurieController.Ecurie);
      app.post('/ajouterEcurieResultat',AuthentificationController.VerifierConnecter,EcurieController.AjoutEcurie);

      //Modif
      app.get('/modifierEcurieParam/:ecunum',AuthentificationController.VerifierConnecter,EcurieController.EcurieInfoModif);
      app.post('/modifierEcurieResultat/:ecunum',AuthentificationController.VerifierConnecter,EcurieController.EcurieModification);
      //Supprimer
      app.get('/supprimerEcurie/:ecunum',AuthentificationController.VerifierConnecter,EcurieController.SupprimerEcurie);


//Sponsor

      //Ajout
      app.get('/sponsors',AuthentificationController.VerifierConnecter,SponsorController.Repertoire,);
      app.get('/ajouterSponsor',AuthentificationController.VerifierConnecter,SponsorController.SponsorEcurie);
      app.post('/ajouterSponsorResultat',AuthentificationController.VerifierConnecter,SponsorController.AjoutSponsor);

      //Modif
      app.get('/modifierSponsorParam/:sponum',AuthentificationController.VerifierConnecter,SponsorController.SponsorInfoModif);

      app.post('/modifierSponsorResultat/:sponum',AuthentificationController.VerifierConnecter,SponsorController.SponsorModification);


      //Supprimer

      app.get('/supprimerSponsor/:sponum',AuthentificationController.VerifierConnecter,SponsorController.SupprimerSponsor);


//Resultat d'une course

      app.get('/resultat',AuthentificationController.VerifierConnecter,ResultatController.Repertoire);

      //Ajout

      app.get('/ajouterResultat',AuthentificationController.VerifierConnecter,ResultatController.ListePiloteGrandPrix);
      app.get('/ajouterResultatResultat/:gpnum',AuthentificationController.VerifierConnecter,ResultatController.AjouterResultat);



      //Supprimer

      app.get('/supprimerResultat/:pilnum/:gpnum',AuthentificationController.VerifierConnecter,ResultatController.SupprimerResultat);





// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
