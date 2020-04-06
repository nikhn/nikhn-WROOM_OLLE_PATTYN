/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//Récupère toutes les écuries
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom FROM " +
                            "ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


//Récupère le détail d'une ecurie
module.exports.Detailler = function (ecurie,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
             let sql ="SELECT DISTINCT  COUNT(pi.pilnum) as nbPilote, ecunom,ecunomdir,ecuadrsiege, p.paynom,ecuadresseimage FROM ECURIE e ";
               sql= sql + "LEFT JOIN pays p ON p.paynum=e.paynum LEFT JOIN pilote pi ON pi.ecunum = e.ecunum  where e.ecunum= " + ecurie;


            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


//Regarde si l'écurie comporte des pilotes
module.exports.aUnPilote = function (ecurie,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
             let sql ="SELECT ph.phoadresse,SUBSTRING(piltexte,1,200) as piltexte,pi.pilnum, pilnom, pilprenom FROM pilote pi ";
               sql= sql + "LEFT JOIN photo ph ON ph.pilnum=pi.pilnum LEFT JOIN ecurie e on e.ecunum=pi.ecunum where e.ecunum= " + ecurie + " AND PHONUM=1";


            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Récupère les voitures associés à l'écurie
module.exports.typeVoiture = function (ecurie,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
             let sql ="SELECT t.typelibelle, v.voiadresseimage,v.voinom  FROM type_voiture t ";
               sql= sql + " LEFT JOIN voiture v ON t.typnum=v.typnum LEFT JOIN ecurie e on e.ecunum=v.ecunum where e.ecunum= " + ecurie;


            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
