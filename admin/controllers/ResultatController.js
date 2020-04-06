let model = require('../models/resultat.js');
var async = require('async');

//Affichage de la page de résultat (on choisit pour quel grandPrix)
module.exports.Repertoire = function(request, response){
    response.title = 'Répertoire des resultats';
    model.getGrandPrix( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeResultat = result;
       console.log(result);
       response.render('gestionResultat', response);
    });
 }


//Affichage pour un grandprix selectionné
 module.exports.ListePiloteGrandPrix = function(request, response){
   response.title = 'Ajout résultat a un grand prix';
   let data = request.query.gpnum;
   async.parallel([

      function(callback)
      {
         model.getGrandPrix(function(err,result) {callback(null,result)});
      },
      //Fin callback1
      function (callback)
      {
         model.classementGrandPrix(data, function(err,resultClassement) {callback(null,resultClassement)});
      },

      function (callback)
      {
         model.getNombrePilote(data, function(err,resultNbPiloteCourse) {callback(null,resultNbPiloteCourse)});
      },

      function (callback)
      {
         model.getTotalitePilnom(data,function(err,resultPiloteNom) {callback(null,resultPiloteNom)});
      },
      //Fin callback2
   ],
    function(err,result)
    {
       if(err)
       {
          console.log(err);
          return;
       }
       response.resultatGrandPrix = result[0];
       console.log(result[0]);
       response.classementGrandPrix = result[1];
       console.log(result[1]);
       response.NombrePiloteDansLaCourse = result[2];
       console.log(result[2]);
        response.NomPilote = result[3];
       response.render('ajouterResultat', response)
    }
   ); //fin Async
};


module.exports.SupprimerResultat = function(request, response){
   response.title = 'Supprimer Resultat ';
   let data = request.params.pilnum;
   let data2 = request.params.gpnum
   async.parallel([
      function(callback)
      {
          model.CourseInfoSuppression(data2,data, function (err, resultInfoSuppression) {callback(null,resultInfoSuppression)})
      },

      function(callback)
      {
          model.SupprimerResultat(data2,data, function (err, resultSupprimeResultat) {callback(null, resultSupprimeResultat)})
      }
  ],
  function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.ResultatInfoSuppression = result[0][0];
      response.ResultatSuppression = result[1];
      console.log(result[0]);
      console.log(result[1]);
      response.render('supprimerResultat', response);
  });
};

module.exports.AjouterResultat = function(request, response){
    response.title = "Ajout d'un résultat";
    let gpnum = request.params.gpnum;
    let pilnum = request.query.pilnum;
    let tempscourse = request.query.tempscourse;

    model.ajouterResultat(gpnum,pilnum,tempscourse,function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.Resultat = result;
       console.log(result);
       response.render('ajouterResultatResultat', response);
    });
 }
