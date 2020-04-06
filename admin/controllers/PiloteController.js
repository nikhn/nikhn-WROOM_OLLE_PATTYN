let model = require('../models/pilote.js');
var async = require('async');

module.exports.Repertoire = function(request, response){
    response.title = 'Répertoire des pilotes';
    model.getListePilote( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listePilote = result;
       console.log(result);
       response.render('gestionPilote', response);
    });
 }


 module.exports.Pilote = function(request, response){
   response.title = 'Ajout pilote';
   async.parallel([
      function(callback)
      {
          model.getPays( function (err, resultPays) {callback(null,resultPays)})
      },

      function(callback)
      {
          model.getEcurie( function (err, resultEcurie) {callback(null, resultEcurie)})
      }
  ],
  function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.resultPays = result[0];
      response.resultEcurie = result[1];
      console.log(result[0]);
      console.log(result[1]);
      response.render('ajouterPilote', response);
  });
};



 module.exports.Ajout = function(request, response){
   response.title = 'Ajout du pilote';
   let data = request.body;
   file = request.files.image;
    console.log(file.name);
    file.mv("../user/public/image/pilote/"+file.name);


   console.log(data);
   async.parallel([
      function(callback)
      {
          model.Ajout(data,function (err, resultAjout) {callback(null,resultAjout)})
      },

      function(callback)
      {
          model.AjoutPhoto(file.name, function (err, resultAjoutPhoto) {callback(null, resultAjoutPhoto)})
      }
  ],
  function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.Ajout = result[0];
      response.AjoutPhoto = result[1];
      console.log(result[0]);
      console.log(result[1]);
      response.render('ajouterPiloteResultat', response);
  });
};

 module.exports.PiloteInfoModif = function(request, response){
    response.title = 'Modification du pilote';
    let data = request.params.pilnum;
    async.parallel([
       function(callback)
       {
           model.PiloteInfoModif(data, function (err, resultInfo) {callback(null,resultInfo)})
       },

       function(callback)
       {
           model.getPays( function (err, resultPays) {callback(null, resultPays)})
       },
       function(callback)
       {
           model.getEcurie( function (err, resultEcurie) {callback(null, resultEcurie)})
       },
   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.PiloteInfoModif = result[0][0];
       response.resultPays = result[1];
       response.resultEcurie = result[2];
       console.log(result[0]);
       console.log(result[1]);
       console.log(result[2]);
       response.render('modifierPilote', response);
   });
 };


 module.exports.PiloteModification = function(request, response){
    response.title = 'Modification d un Pilote ';

    let data = request.params.pilnum;
    let pilnom = request.body.pilnom;
    let pilprenom= request.body.pilprenom;
    let pildatenais = request.body.pildatenais;
    let paynum=request.body.paynum;
    let ecunum = request.body.ecunum;
    let pilpoints = request.body.pilpoints;
    let pilpoids = request.body.pilpoids;
    let piltaille = request.body.piltaille;
    let piltexte = request.body.piltexte;
    async.parallel([
       function(callback)
       {
           model.PiloteModification(data,pilnom,pilprenom,pildatenais,paynum,ecunum,pilpoints,pilpoids,piltaille,piltexte,function (err, resultModificationPilote) {callback(null, resultModificationPilote)})
       },

       function(callback)
       {
           model.PiloteInfoModif(data, function (err, resultInfo) {callback(null,resultInfo)})
       },
   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.PiloteModification = result[0];
       response.PiloteApresModif=result[1];
       console.log(result[0]);
       console.log(result[1]);

       response.render('modifierPiloteResultat', response);
   });
 };



 module.exports.SupprimerPilote = function(request, response){
    response.title = 'Supprimer Pilote ';
    let data = request.params.pilnum;
    async.parallel([
       function(callback)
       {
           model.PiloteInfoSuppression(data, function (err, resultInfoSuppression) {callback(null,resultInfoSuppression)})
       },

       function(callback)
       {
           model.SupprimerPilote(data, function (err, resultSupprimerPilote) {callback(null, resultSupprimerPilote)})
       }
   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.PiloteInfoSuppression = result[0];
       response.PiloteSuppression = result[1];
       console.log(result[0]);
       console.log(result[1]);
       response.render('supprimerPilote', response);
   });
 };
