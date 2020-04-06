
let model = require('../models/resultat.js');
var async = require('async');

// //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
	response.title = 'Répertoire des pilotes';
   model.getListeGrandPrix( function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.resultatGrandPrix = result;
      console.log(result);
      response.render('listerResultat', response);
   });
};


module.exports.detailResultat = function(request, response){
   response.title = 'Detail du grand Prix';
   let data = request.params.id;
   async.parallel([
      
      function(callback)
      {
         model.getListeGrandPrix(function(err,result) {callback(null,result)});
      },
      //Fin callback1
      function (callback)
      {
         model.classementGrandPrix(data, function(err,resultClassement) {callback(null,resultClassement)});
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
       response.render('detailResultat', response)
    }
   ); //fin Async
};
