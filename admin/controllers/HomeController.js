
let model = require('../models/connexion.js');
var async = require('async');
let Cryptr = require('cryptr'); // module permettant de crypté 

////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    if (request.session.admin)
    {
      request.session.admin=true;
    }
    else
    {
      request.session.admin=false;
    }
   
    response.render('home', response);
    
};
module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};


 ////////////////////// L I S T E R     C I R C U I T S

//request.body.login
//request.body.passwd
module.exports.Connexion = function(request, response){
    response.title = 'Connexion';
    let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');

       model.Connexion( function (err, result) 
       {
           
          if (err) {
              // gestion de l'erreur
              console.log(err);
              return;
          }
          if(request.body.password == cryptr.decrypt(result[0].passwd) 
          && request.body.login == result[0].login)
          {
           request.session.admin=true;
          }
          else
          {
            request.session.admin=false;
          }

          response.connexion = result;
          
          
          console.log(result);

          response.render('home', response);
       });
 } ;
 
