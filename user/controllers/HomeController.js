
let model = require('../models/home.js');

// ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function (request, response) {
  response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
  response.title2 = 'Dernier résultat';

  model.getDernierResultat(function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.dernierResultat = result;
    console.log(result);
    response.render('home', response);
  });
}

module.exports.NotFound = function (request, response) {
  response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
  response.render('notFound', response);
};
