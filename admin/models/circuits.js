/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//Récupère la liste des circuits
module.exports.getListeCircuits = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT cirnum,cirnom,cirlongueur,cirnbspectateurs from circuit c ORDER BY(cirnom)  ASC";



				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Récupère la liste des pays
module.exports.getPays = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
                  let sql =" SELECT paynom,paynum from pays ORDER BY(paynom) ASC";

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Ajoute un circuit dans la BD en utilisant fileupload (express) je passe les arguments 1 par 1 car sur la même table c'est plus simple a gérer
module.exports.AjoutCircuit = function (cirnom,cirlongueur,paynum,cirnbspectateurs,cirtext,ciradresseimage,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO circuit (cirnom,cirlongueur,paynum,cirnbspectateurs,cirtext,ciradresseimage) VALUES ("+ connexion.escape(cirnom) +","+ cirlongueur +","+ paynum+","+ cirnbspectateurs+","+ connexion.escape(cirtext)+","+ connexion.escape(ciradresseimage) +")";

						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


//Affiche les informations du circuit qu'on supprime dans la BD
module.exports.CircuitInfoSuppression = function (cirnum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT cirnum,cirnom,cirlongueur,cirnbspectateurs,cirtext,ciradresseimage,pa.paynom from circuit c LEFT JOIN pays pa ON pa.paynum=c.paynum  where c.cirnum=" + cirnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Supprime le circuit de la BD
module.exports.SupprimerCircuit = function (cirnum,callback,callback1) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" DELETE from circuit where cirnum=" + cirnum;
                  let sql1=" DELETE from grandprix where cirnum =" + cirnum;

            connexion.query(sql1, callback1);
            connexion.query(sql, callback);


            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Affiche les informations du circuit qu'on modifie
module.exports.CircuitInfoModif = function (cirnum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT c.cirnum,cirnom,cirlongueur,cirnbspectateurs,c.paynum,pa.paynom,cirtext from circuit c LEFT JOIN pays pa ON pa.paynum=c.paynum  where c.cirnum=" + cirnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Modifie le circuit
module.exports.CircuitModification = function (cirnum,cirnom,cirlongueur,cirnbspectateurs,paynum,cirtext,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
                  let sql ="UPDATE circuit set cirnom=" + connexion.escape(cirnom) ;
                  sql = sql+ ",cirlongueur=" + cirlongueur;
                  sql = sql+ ",paynum=" + paynum;
                  sql = sql+ ",cirnbspectateurs=" + cirnbspectateurs ;
                  sql = sql + ",cirtext=" + connexion.escape(cirtext) ;
                  sql = sql + " WHERE cirnum=" +cirnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
