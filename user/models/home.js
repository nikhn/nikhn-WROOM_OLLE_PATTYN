/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

//Récupère les derniers résultats

module.exports.getDernierResultat = function (callback) {
    db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT gpnum,gpnom, gpdate, gpdatemaj FROM grandprix ";
            sql += "WHERE gpdate=(SELECT MAX(gpdate) FROM grandprix)";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}
