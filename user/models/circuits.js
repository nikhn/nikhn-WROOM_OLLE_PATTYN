/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

// Récupère tout les circuits

module.exports.getListeCircuits = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT cirnum, cirnom, payadrdrap FROM " +
                            "circuit c INNER JOIN pays p ";
						sql= sql + "ON c.paynum=p.paynum ORDER BY cirnom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Récupère les détails associés à un circuit
module.exports.getDetailsCircuits = function (circuit, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT cirnom, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext, paynom, gpnom FROM circuit c LEFT JOIN grandprix g ON c.cirnum=g.cirnum LEFT JOIN pays p ON p.paynum=c.paynum WHERE c.cirnum=" + circuit;

            connexion.query(sql, callback);

            connexion.release();
        }
    })
}
