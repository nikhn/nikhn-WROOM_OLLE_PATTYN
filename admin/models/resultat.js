/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//Récupre tous les grand prix
module.exports.getGrandPrix = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT gpnum,gpnom from grandprix  ORDER BY(gpnom)  ASC";



				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


//Récupère le classement d'un grand prix
module.exports.classementGrandPrix = function (id,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
             let sql ="SELECT t.gpnum,p.pilnum,rang,CONCAT(p.pilnom, ' ', p.pilprenom) AS pilote ,t.tempscourse, CASE";
             sql =sql +" WHEN rang=1 THEN '25' ";
             sql =sql + " WHEN rang=2 THEN '18' ";
             sql =sql + " WHEN rang=3 THEN '15' ";
             sql =sql + " WHEN rang=4 THEN '12' ";
             sql =sql + " WHEN rang=5 THEN '10' ";
             sql =sql + " WHEN rang=6 THEN '8' ";
             sql =sql +  "WHEN rang=7 THEN '6' ";
             sql =sql + " WHEN rang=8 THEN '4' ";
             sql =sql + " WHEN rang=9 THEN '2' ";
             sql =sql + " WHEN rang=10 THEN '1' ";
             sql =sql + " END AS Points FROM ";
             sql =sql + "(";
             sql =sql + " SELECT  tempscourse,c.gpnum, gpcommentaire, c.pilnum ,ROW_NUMBER() OVER(ORDER BY tempscourse) AS rang ";
             sql =sql + " FROM COURSE c INNER JOIN grandprix gp ON gp.GPNUM=c.gpnum "
             sql =sql + " WHERE c.gpnum=" + id;
             sql =sql + ")t ";
             sql =sql + " INNER JOIN PILOTE p on t.pilnum=p.pilnum ";
             sql =sql + "  LIMIT 10 ";

            connexion.query(sql, callback);
            console.log(sql);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


//Récupère le nombre de pilote sur un grand prix
module.exports.getNombrePilote = function (id,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT COUNT(tempscourse) as NbPiloteCircuit from course c LEFT JOIN grandprix gp ON gp.GPNUM=c.GPNUM WHERE c.gpnum=" +id;



				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Récupère la totalité des noms des pilotes n'ayant pas participé au grand prix
module.exports.getTotalitePilnom = function (gpnum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT p.pilnum, pilnom FROM (SELECT pilnum FROM pilote EXCEPT (SELECT pilnum FROM course  WHERE gpnum="+ gpnum +"))t INNER JOIN pilote p ON p.pilnum=t.pilnum ORDER BY pilnom" ;



				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


//Récupère les infos de la course qu'on vient de supprimer
module.exports.CourseInfoSuppression = function (gpnum,id,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT p.pilnom,p.pilprenom,tempscourse,gp.gpnom from course c LEFT JOIN grandprix gp ON gp.gpnum=c.gpnum LEFT JOIN pilote p ON p.pilnum=c.pilnum where c.pilnum=" +id + " AND c.gpnum="+ gpnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Supprime le résultat du pilote sur un circuit
module.exports.SupprimerResultat = function (gpnum,id,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" DELETE  from course where pilnum=" +id + " AND gpnum="+ gpnum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//Ajoute un résultat sur un circuit pour un pilote
module.exports.ajouterResultat = function (gpnum,pilnum,tempscourse,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO course (gpnum, pilnum, tempscourse) VALUES ("+gpnum + ", " + pilnum +", '" + tempscourse + "')";

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
