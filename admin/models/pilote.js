/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//Récupère la liste des pilotes
module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT pilnum,pilnom,pilprenom,pildatenais from pilote p ORDER BY(pilnom)  ASC";



				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Récupère la nationalité pour l'attribuer a un pilote
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

//Récupère les écuries
module.exports.getEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT ecunom,ecunum from ecurie  ORDER BY(ecunom) ASC";

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Ajoute un pilote dans la base de données
module.exports.Ajout = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
            connexion.query('INSERT INTO pilote SET ? ',data,callback);
            connexion.release();
         }
      });
};

//On ajoute une photo dans la BD
module.exports.AjoutPhoto = function (filename, callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "INSERT INTO photo (PHONUM,PILNUM,PHOADRESSE) SELECT 1,MAX(PILNUM),'"+filename+"' from pilote";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

//On prend les infos du pilotes qu'on veut modifier
module.exports.PiloteInfoModif = function (pilnum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT p.pilnum,pilnom,pilprenom,pildatenais,e.ecunum,e.ecunom,p.paynum,pa.paynom,pilpoints,pilpoids,piltaille,piltexte from pilote p LEFT JOIN pays pa ON pa.paynum=p.paynum LEFT JOIN ecurie e ON e.ecunum=p.ecunum where p.pilnum=" + pilnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//On modifie le pilote
module.exports.PiloteModification = function (pilnum,pilnom,pilprenom,pildatenais,paynum,ecunum,pilpoints,pilpoids,piltaille,piltexte,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
                  let sql ="UPDATE pilote set pilnom=" + connexion.escape(pilnom) + ",pilprenom=" +  connexion.escape(pilprenom) +",pildatenais=" + connexion.escape(pildatenais)  ;
                  sql = sql+ ",paynum=" + paynum;
                  sql= sql+ ",ecunum=" + ecunum;
                  sql =sql+ ",pilpoints=" + pilpoints;
                  sql = sql+ ",pilpoids=" + pilpoids;
                  sql = sql +",piltaille=" + piltaille;
                  sql = sql + ",piltexte=" + connexion.escape(piltexte);
                  sql = sql + " WHERE pilnum=" +pilnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};



//On récupère les infos du pilote qu'on supprime
module.exports.PiloteInfoSuppression = function (pilnum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT pilnom,pilprenom,pildatenais,e.ecunum,e.ecunom,p.paynum,pa.paynom,pilpoints,pilpoids,piltaille,piltexte from pilote p LEFT JOIN pays pa ON pa.paynum=p.paynum LEFT JOIN ecurie e ON e.ecunum=p.ecunum where p.pilnum=" + pilnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//On supprime le pilote
module.exports.SupprimerPilote = function (pilnum,callback,callback1,callback2,callback3,callback4) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
			     let sql =" DELETE from pilote where pilnum=" + pilnum;
              let sql1="DELETE from photo where pilnum =" + pilnum;
              let sql2="DELETE from sponsorise where pilnum =" + pilnum;
              let sql3="DELETE from essais where pilnum =" + pilnum;
              let sql4="DELETE from course where pilnum =" + pilnum;
            console.log (sql);
            connexion.query(sql4, callback4);
            connexion.query(sql3, callback3);
            connexion.query(sql2, callback2);
            connexion.query(sql1, callback1);
            connexion.query(sql, callback);


            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
