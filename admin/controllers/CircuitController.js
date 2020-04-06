let model = require('../models/circuits.js');
var async = require('async');

module.exports.Repertoire = function(request, response)
{
    response.title = 'Répertoire des pilotes';
    model.getListeCircuits( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeCircuits = result;
       console.log(result);
       response.render('gestionCircuits', response);
    });
 }

 module.exports.Circuit = function(request, response){
    response.title = 'Répertoire des pilotes';
    model.getPays( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.resultPays = result;
       console.log(result);
       response.render('ajouterCircuits', response);
    });
 }

 module.exports.AjoutCircuit = function(request, response){
   response.title = 'Ajout du circuit';
   let cirnom = request.body.cirnom;
   let cirlongueur = request.body.cirlongueur;
   let paynum = request.body.paynum;
   let cirnbspectateurs = request.body.cirnbspectateurs;
   let cirtext = request.body.cirtext;

   file = request.files.ciradresseimage;
   console.log(file);
   file.mv("../user/public/image/circuit/"+file.name);
   file.mv("../admin/public/image/circuit/"+file.name);



   async.parallel([
      function(callback)
      {
          model.AjoutCircuit(cirnom,cirlongueur,paynum,cirnbspectateurs,cirtext,file.name,function (err, resultAjoutCircuit) {callback(null,resultAjoutCircuit)})
      },
  ],
  function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.AjoutCircuit = result[0];

      console.log(result[0]);

      response.render('ajouterCircuitsResultat', response);
  });
};

 module.exports.CircuitInfoModif = function(request, response){
    response.title = 'Modification du circuit';
    let data = request.params.cirnum;
    async.parallel([
       function(callback)
       {
           model.CircuitInfoModif(data, function (err, resultInfo) {callback(null,resultInfo)})
       },

       function(callback)
       {
           model.getPays( function (err, resultPays) {callback(null, resultPays)})
       },

   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.CircuitInfoModif = result[0][0];
       response.resultPays = result[1];
       console.log(result[0]);
       console.log(result[1]);

       response.render('modifierCircuit', response);
   });
 };


 module.exports.CircuitModification = function(request, response){
    response.title = 'Modification d un Circuit ';

    let data = request.params.cirnum;
    let cirnom = request.body.cirnom;
    let cirlongueur= request.body.cirlongueur;
    let cirnbspectateurs = request.body.cirnbspectateurs;
    let paynum=request.body.paynum;
    let cirtext = request.body.cirtext;

    async.parallel([
       function(callback)
       {
           model.CircuitModification(data,cirnom,cirlongueur,cirnbspectateurs,paynum,cirtext,function (err, resultModificationCircuit) {callback(null, resultModificationCircuit)})
       },
       function(callback)
       {
           model.CircuitInfoModif(data, function (err, resultInfo) {callback(null,resultInfo)})
       },
   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.CircuitModification = result[0];
       response.CircuitApresModif = result[1];
       console.log(result[0]);

       response.render('modifierCircuitResultat', response);
   });
 };

 module.exports.SupprimerCircuit = function(request, response){
    response.title = 'Supprimer un Circuit ';
    let data = request.params.cirnum;
    async.parallel([
       function(callback)
       {
           model.CircuitInfoSuppression(data, function (err, resultInfoSuppression) {callback(null,resultInfoSuppression)})
       },

       function(callback)
       {
           model.SupprimerCircuit(data, function (err, resultSupprimerCircuit) {callback(null, resultSupprimerCircuit)})
       }
   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.CircuitInfoSuppression = result[0][0];
       response.CircuitSuppression = result[1];
      console.log(result[0]);
       //console.log(result[1]);
       response.render('supprimerCircuit', response);
   });
 };
