/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//On récupère login et passwd de la table login pour les comparer avec ceux que l'utilisateur va rentrer
//On utilise le module cryptr pour décrypter le mdp de la BD et le comparer avec la saisie utilisateur dans
//le controleur
module.exports.Connexion = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT login, passwd from login ";



				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
