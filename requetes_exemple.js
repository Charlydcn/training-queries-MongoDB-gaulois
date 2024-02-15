
// afficher tous les restaurants
db.restaurants.find({})

// compter le nombre de restaurant
db.restaurants.find({}).count() --> 25357

// afficher les restaurants du Bronx (borough) : nom + address + cuisine (sans id)
db.restaurants.find({borough:'Bronx'}, {name:1, address:1, cuisine:1, borough:1, _id:0})

// compter le nombre de restaurant de Manhattan
db.restaurants.find({borough:'Manhattan'}).count() --> 10258

// afficher les restaurants dont la cuisine est italienne (cuisine) : nom + address (sans id)
db.restaurants.find({cuisine:'Italian'}, {name:1, address:1, _id:0})

// afficher les restaurants (nom du restaurant) dont le nom commence par 'New' (/i = case insensitive)
db.restaurants.find({ name: { $regex: /^New/i }},{name:1, _id:0})
db.restaurants.find({ name: /^New/i },{name:1, _id:0})

// afficher les restaurants français du Queens (borough) sans tenir compte de la casse triés par ordre alphabétique du nom (1) ou DESC (-1)
db.restaurants.find({cuisine:'French', borough:{$regex: /queens/i}}, {name:1, _id:0, borough:1}).sort({name:-1})
db.restaurants.find({cuisine:'French', borough:/queens/i}, {name:1, _id:0, borough:1}).sort({name:-1})
    
// combien existe-t-il de restaurants français dans le Queens ? 
db.restaurants.find({cuisine:'French', borough:'Queens'}, {name:1, _id:0, borough:1}).count()
    
// afficher les restaurants français dont le nom contient le mot 'cafe' (case insensitive)
db.restaurants.find({cuisine:'French', name: /Cafe/i}, {name:1, _id:0, borough:1})
db.restaurants.find({cuisine:'French', name: { $regex: /Cafe/i }}, {name:1, _id:0, borough:1})