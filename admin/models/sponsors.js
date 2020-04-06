/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//Récupère la liste des sponsors
module.exports.getListeSponsor = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT sponum,sponom,sposectactivite from sponsor sp ORDER BY(sponom)  ASC";



				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Récupère les écuries
module.exports.getEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
                  let sql =" SELECT ecunom,ecunum from ecurie ORDER BY(ecunom) ASC";

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Ajoute un sponsor
module.exports.AjoutSponsor = function (valeurs,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
            connexion.query('INSERT INTO sponsor SET ?',valeurs,callback);
            connexion.release();
         }
      });
};

//Ajoute l'écurie sponsorisé par un sponsor
module.exports.sponsoriseEcurie = function (finance,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
            connexion.query('INSERT INTO finance SET ?',finance,callback);
            connexion.release();
         }
      });
};


//Affiche les infos d'un sponsor modifié
module.exports.SponsorInfoModif = function (sponum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT sponum,sponom,sposectactivite from sponsor sp where sponum=" + sponum;

            console.log (sql);

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Modifie le sponsor
module.exports.SponsorModification = function (sponum,sponom,sposectactivite,ecunum,callback,callback2) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
             // execution de la requête SQL
                  let sql2 ="UPDATE finance set ecunum=" + ecunum;
                  sql2= sql2 + " where sponum=" + sponum;
                  let sql ="UPDATE sponsor set sponom=" + connexion.escape(sponom) ;
                  sql = sql + ",sposectactivite=" + connexion.escape(sposectactivite) ;
                  sql = sql + " where sponum=" + sponum;




            console.log (sql2);
            console.log (sql);

            connexion.query(sql2, callback2);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Supprime le sponsor de finance si il ne sponsorise aucune écurie
module.exports.supprimerSponsorFinance = function(sponum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" DELETE FROM finance where sponum=" + sponum;

            console.log (sql);

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Supprime un sponsor de la table sponsor
module.exports.SupprimerSponsor = function (sponum,callback,callback1,callback2) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE from sponsor where sponum=" + sponum;
                  let sql1="DELETE from finance where sponum =" + sponum;
                  let sql2="DELETE from sponsorise where sponum =" + sponum;

                  connexion.query(sql2,callback2);
                  connexion.query(sql1, callback1);
                  connexion.query(sql, callback);


            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Affiche les infos du sponsor supprimé
module.exports.SponsorInfoSuppression = function (sponum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT sponum,sponom,sposectactivite from sponsor  where sponum=" + sponum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
