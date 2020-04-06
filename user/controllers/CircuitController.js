let model = require('../models/circuits.js');
var async = require('async')

// ////////////////////// L I S T E R     C I R C U I T S


module.exports.ListerCircuits = function(request, response){
    response.title = 'Liste des circuits';
 
       model.getListeCircuits( function (err, result) {
          if (err) {
              // gestion de l'erreur
              console.log(err);
              return;
          }
          response.listeCircuits = result;
          //console.log(result);
          response.render('listerCircuits', response);
       });
 } ;
 


 module.exports.DetailsCircuits = function(request, response){
     response.title = 'Détails du circuit';
     let data = request.params.circuit;

    async.parallel([
        function(callback)
        {
            model.getListeCircuits( function (err, result) {callback(null,result)})
        },

        function(callback)
        {
            model.getDetailsCircuits(data, function (errdetails, resultdetails) {callback(null, resultdetails)})
        }
    ],
    function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        response.detailsCircuits = result[1];
        response.listeCircuits = result[0];
        console.log(result);
        response.render('detailCircuits', response);
    });
 };  