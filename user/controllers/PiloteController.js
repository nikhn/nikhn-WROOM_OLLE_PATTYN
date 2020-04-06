
let model = require('../models/pilote.js');
var async = require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

//Repertoire de nos pilotes (une lettre correspond au lien d'un repertoire contenant les pilotes avec le nom qui commence par cette lettre)
module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
   model.getListePilote( function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePilote = result;
      console.log(result);
      response.render('repertoirePilotes', response);
   });
}


module.exports.Lister = function(request, response){
   response.title = 'Liste des pilotes';
   let data = request.params.lettre;
   response.lettre = data;
   async.parallel([
     function(callback)
     {
        model.getListePilote(function(err,result) {callback(null,result)});
     },
     //Fin callback1
     function (callback)
     {
        model.getNomPilote(data,function(errNom,resultNom) {callback(null,resultNom)});
     }
     //Fin callback2
  ],
   function(err,result)
   {
      if(err)
      {
         console.log(err);
         return;
      }
      response.listePilote = result[0];
      response.getNomPilote = result[1];
      response.render('listerPilote', response)
   }
  ); //fin Async
};


module.exports.Detailler = function(request, response){
   response.title = 'Liste des pilotes';
   let data = request.params.pilnum;
  
   async.parallel([
      
     function(callback)
     {
        model.Detailler(data, function(err,result) {callback(null,result)});
     },
     //Fin callback1
     function (callback)
     {
        model.Sponsor(data, function(err,resultSponsor) {callback(null,resultSponsor)});
     },
     //Fin callback2
     function (callback)
     {
        model.Photo(data, function(err,resultPhoto) {callback(null,resultPhoto)});
     },
     function(callback)
     {
        model.getListePilote(function(err,resultLettre) {callback(null,resultLettre)});
     },
     //fin callback3
  ],
   function(err,result)
   {
      if(err)
      {
         console.log(err);
         return;
      }
      response.detailPilote = result[0];
      response.detailSponsor = result[1];
      response.detailPhotos = result[2];
      response.listePilote = result[3];
      response.render('detailPilote', response)
   }
  ); //fin Async
   
};



