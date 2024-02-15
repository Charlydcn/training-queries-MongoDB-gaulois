// -------------------------------------------------------------------------------------------------- 
// Afficher tous les personnages (nom) sans les identifiants triés par nom (alphabétique)
db.personnage
    .find({}, { _id: 0, nom_personnage: 1 })
    .sort({ nom_personnage: 1 });
// -------------------------------------------------------------------------------------------------- 



// -------------------------------------------------------------------------------------------------- 
// Afficher les personnages (nom + adresse) qui habitent une rue (triés par nom de personnage)
db.personnage
    .find(
        { adresse_personnage: /rue/i },
        { nom_personnage: 1, adresse_personnage: 1 }
    )
    .sort({ nom_personnage: 1 });
// -------------------------------------------------------------------------------------------------- 



// -------------------------------------------------------------------------------------------------- 
// Compter le nombre de gaulois par lieu (trié par nombre de personnages)

db.personnage.aggregate([
    {
        // jointure avec la collection "specialite"
        $lookup: {
            from: "specialite", // collection à joindre
            localField: "id_specialite", // champ local 
            foreignField: "id_specialite", // champ étranger
            as: "specialite_docs", // alias pour les documents correspondants de "specialite"
        },
    },
    {
        // étape d'unwind pour dérouler les tableaux créés par la jointure
        $unwind: "$specialite_docs",
    },
    {
        // Étape de regroupement pour regrouper les documents par nom de spécialité
        $group: {
            // Champ d'identifiant pour le regroupement
            _id: "$specialite_docs.nom_specialite",
            // Compte le nombre de documents regroupés
            count: { $sum: 1 },
        },
    },
    {
        // Projection pour renvoyer uniquement les champs nécessaires
        $project: {
            // Inclut le champ d'identifiant dans les résultats
            _id: 1,
            // Renomme le champ pour le rendre plus lisible
            nom_specialite: "$_id",
            // Inclut le compteur dans les résultats
            count: 1,
        },
    },
])
// Tri des résultats par ordre décroissant de comptage
.sort({ count: -1 });

// -------------------------------------------------------------------------------------------------- 



// -------------------------------------------------------------------------------------------------- 
// Afficher toutes les infos des personnages avec leur spécialité

db.personnage.aggregate([
    // jointure
    {
        $lookup: {
            from: "specialite",
            localField: "id_specialite",
            foreignField: "id_specialite",
            as: "specialite_docs",
        },
    },
    // déconstruis un tableau
    {
        $unwind: "$specialite_docs",
    },
])

/*

exemple de $unwind :
{
  "_id": 1,
  "nom": "Alice",
  "notes": [80, 75, 90]
}

INTO

{
  "_id": 1,
  "nom": "Alice",
  "note": 80
}

{
  "_id": 1,
  "nom": "Alice",
  "note": 75
}

{
  "_id": 1,
  "nom": "Alice",
  "note": 90
}

*/

// -------------------------------------------------------------------------------------------------- 



// -------------------------------------------------------------------------------------------------- 
// Afficher uniquement le nom du personnage et sa specialite (triés par nom de spécialité)

db.personnage.aggregate([
    {
        $lookup: {
            from: "specialite",
            localField: "id_specialite",
            foreignField: "id_specialite",
            as: "specialite_docs",
        },
    },
    {
        $unwind: "$specialite_docs",
    },
    {
        $project: {
            _id: 0,
            nom_personnage: 1,
            nom_specialite: "$specialite_docs.nom_specialite",
        },
    },
])
.sort({ nom_specialite: 1 });

// -------------------------------------------------------------------------------------------------- 
