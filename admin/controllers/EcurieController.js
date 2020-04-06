let model = require('../models/ecurie.js');
var async = require('async');

module.exports.Repertoire = function(request, response){
    response.title = 'Répertoire des écuries';
    model.getListeEcurie( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeEcurie = result;
       console.log(result);
       response.render('gestionEcurie', response);
    });
 }

 module.exports.Ecurie = function(request, response){
    response.title = 'Répertoire des pilotes';
    model.getPays( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.resultPays = result;
       console.log(result);
       response.render('ajouterEcurie', response);
    });
 }

 module.exports.AjoutEcurie = function(request, response){
   response.title = 'Ajout d une ecurie';
   let ecunom = request.body.ecunom;
   let ecunomdir = request.body.ecunomdir;
   let ecuadrsiege = request.body.ecuadrsiege;
   let ecupoints = request.body.ecupoints;
   let paynum = request.body.paynum;
    file = request.files.ecuadresseimage;

   console.log(ecunom);
   console.log(ecunomdir);
   console.log(ecuadrsiege);
   console.log(ecupoints);
   console.log(paynum);
   console.log(file.name);
   file.mv("../user/public/image/ecurie/"+file.name);
   file.mv("../admin/public/image/ecurie/"+file.name);



   async.parallel([
      function(callback)
      {
          model.AjoutEcurie(ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,file.name,function (err, resultAjoutEcurie) {callback(null,resultAjoutEcurie)})
      },
  ],
  function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.AjoutEcurie = result[0];

      console.log(result[0]);

      response.render('ajouterEcurieResultat', response);
  });
 };

 module.exports.EcurieInfoModif = function(request, response){
    response.title = 'Modification d une ecurie';
    let data = request.params.ecunum;
    async.parallel([
       function(callback)
       {
           model.EcurieInfoModif(data, function (err, resultInfo) {callback(null,resultInfo)})
       },

       function(callback)
       {
           model.getPays( function (err, resultPays) {callback(null, resultPays)})
       },

       function(callback)
       {
           model.getFournisseurPneu( function (err, resultFournisseurPneu) {callback(null, resultFournisseurPneu)})
       },

   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.EcurieInfoModif = result[0][0];
       response.resultPays = result[1];
       response.resultFournisseurPneu = result[2];
       console.log(result[0]);
       console.log(result[1]);
       console.log(result[2]);

       response.render('modifierEcurie', response);
   });
 };



 module.exports.EcurieModification = function(request, response){
    response.title = 'Modification d une ecurie ';

    let data = request.params.ecunum;
    let fpnum = request.body.fpnum;
    let ecunom= request.body.ecunom;
    let ecunomdir = request.body.ecunomdir;
    let ecuadrsiege=request.body.ecuadrsiege;
    let ecupoints = request.body.ecupoints;
    let paynum = request.body.paynum;

    async.parallel([
       function(callback)
       {
           model.EcurieModification(data,fpnum,ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,function (err, resultModificationCircuit) {callback(null, resultModificationCircuit)})
       },
       function(callback)
       {
           model.EcurieInfoModif(data, function (err, resultInfo) {callback(null,resultInfo)})
       },
   ],
   function(err, result){
       if (err) {
           console.log(err);
           return;
       }
       response.EcurieModification = result[0];
       response.EcurieApresModif = result[1];
       console.log(result[0]);

       response.render('modifierEcurieResultat', response);
   });
 };


 module.exports.SupprimerEcurie = function(request, response){
   response.title = 'Supprimer une Ecurie ';
   let data = request.params.ecunum;
   async.parallel([
      function(callback)
      {
          model.EcurieInfoSuppression(data, function (err, resultInfoSuppression) {callback(null,resultInfoSuppression)})
      },

      function(callback)
      {
          model.SupprimerEcurie(data, function (err, resultSupprimerEcurie) {callback(null, resultSupprimerEcurie)})
      }
  ],
  function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      response.EcurieInfoSuppression = result[0][0];
      response.EcurieSuppression = result[1];
      console.log(result[0]);
      console.log(result[1]);
      response.render('supprimerEcurie', response);
  });
};
