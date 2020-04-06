/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//Récupère la liste des écuries
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT ecunum,ecunom,ecunomdir,ecupoints from ecurie e ORDER BY(ecunom)  ASC";



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

//Recupère le fournisseur de pneu de l'écurie
module.exports.getFournisseurPneu = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
                  let sql =" SELECT fpnom,fpnum from fourn_pneu ORDER BY(fpnom) ASC";

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//On ajoute une écurie dans la BD on utilise fileupload (express) et on passe les arguments 1 par 1 car c'est plus simple a gérer avec le connexion.escape !
module.exports.AjoutEcurie = function (ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,ecuadresseimage,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="INSERT INTO ecurie (ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,ecuadresseimage) VALUES ("+connexion.escape(ecunom) +","+ connexion.escape(ecunomdir) +","+ connexion.escape(ecuadrsiege)+","+ ecupoints+","+ paynum+","+ connexion.escape(ecuadresseimage)+")";

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//On récupère les informations d'une écurie qu'on souhaite modifier
module.exports.EcurieInfoModif = function (ecunum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT e.ecunum,ecunom,e.fpnum,ecunomdir,e.paynum,pa.paynom,ecuadrsiege,ecupoints from ecurie e LEFT JOIN pays pa ON pa.paynum=e.paynum LEFT JOIN fourn_pneu fp ON fp.fpnum=e.fpnum where e.ecunum=" + ecunum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//On modifie l'écurie
module.exports.EcurieModification = function (ecunum,fpnum,ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
                  let sql ="UPDATE ecurie set ecunom=" +  connexion.escape(ecunom) ;
                  sql = sql+ ",fpnum=" + fpnum;
                  sql = sql + ",ecunomdir=" + connexion.escape(ecunomdir);
                  sql = sql + ",ecuadrsiege=" + connexion.escape(ecuadrsiege);
                  sql = sql+ ",ecupoints=" + ecupoints;
                  sql = sql+ ",paynum=" + paynum;
                  sql = sql + " WHERE ecunum=" +ecunum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


//On supprime l'écurie de la BD
module.exports.SupprimerEcurie = function (ecunum,callback,callback1,callback2,callback3) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="DELETE from ecurie where ecunum=" + ecunum;
                  let sql1="DELETE from voiture where ecunum =" + ecunum;
                  let sql2="DELETE from finance where ecunum =" + ecunum;
                  let sql3="UPDATE pilote SET ecunum=null where ecunum =" + ecunum;

                  connexion.query(sql3,callback3);
                  connexion.query(sql2,callback2);
                  connexion.query(sql1, callback1);
                  connexion.query(sql, callback);


            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//On récupère les infos de l'écurie qu'on veut supprimer
module.exports.EcurieInfoSuppression = function (ecunum,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql =" SELECT ecunum,ecunom,ecunomdir,ecuadrsiege,ecupoints,ecuadresseimage,pa.paynom from ecurie e LEFT JOIN pays pa ON pa.paynum=e.paynum  where e.ecunum=" + ecunum;

				console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
