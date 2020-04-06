let model = require('../models/ecurie.js');
var async = require('async');
   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
response.render('listerEcurie', response);
});
}

module.exports.Detailler = function(request, response){
    response.title = 'Détail de l écurie';
    let ecurie = request.params.ecunum;
   
    async.parallel([
       
      function(callback)
      {
         model.Detailler(ecurie, function(err,result) {callback(null,result)});
      },
      //Fin callback1
      function (callback)
      {
         model.aUnPilote(ecurie, function(err,resultPilote) {callback(null,resultPilote)});
         
      },

      function (callback)
      {
         model.typeVoiture(ecurie, function(err,resultType) {callback(null,resultType)});
      },

      function (callback)
      {
         model.getListeEcurie( function(err,resultListe) {callback(null,resultListe)});
      }
     
   ],
    function(err,result)
    {
       if(err)
       {
          console.log(err);
          return;
       }
       response.detailEcurie = result[0];
       response.aUnPilote = result[1];
       response.typeVoiture = result[2];
       response.listeEcurie = result[3];
       console.log(result[1]);
       console.log(result[2]);
       console.log(result[3]);
       response.render('detailEcurie', response)
    }
   ); //fin Async
  
  
    
}
 
 