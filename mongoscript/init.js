let categories=[
    {
        "category-description": "Two wheelers to travel in the city. Perfect for travel in busy cities. ",
        "category-icon": "fa-motorcycle",
        "category-name": "Bikes",
        "category-count":12       
    },

    {
        "category-description": "Choose from suvs, sedans, hatch-backs. Travel with no issue. ",
        "category-icon": "fa-car-alt",
        "category-name": "Cars",
        "category-count":15

   
    }
    ,
    {
        "category-description": "Perfect for families, for tours. Spacious leg room, perfect for camping. ",
        "category-icon": "fa-shuttle-van",
        "category-name": "Vans",
        "category-count":7

   }

];

let curDb=db.getSiblingDB('vehicle_buddy');
let collection=curDb.getCollection('vehicle_categories');
collection.insertMany(categories);