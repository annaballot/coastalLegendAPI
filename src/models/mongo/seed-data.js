
export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    lists: {
      _model: "List",
      faveBeaches: {
        title: "Favourite Beaches",
        userid: "->users.homer"
      },
      munsterFavourites: {
        title: "Munster Favourites",
        userid: "->users.homer"
      },
      placesNotYetVisited: {
        title: "Places Not Yet Visited",
        userid: "->users.Marge"
      }
    },
    placemarks: {
      _model : "Placemark",
      placemark1 : {
        name: "Clonea",
        category: "Beach",
        description: "Lovely long beach in west waterford",
        latitude: 3.75,
        longitude: 15.4,
        rating: 8,
        img: "https://res.cloudinary.com/dloycvswk/image/upload/v1714496692/uvagfsaikoletstdt3sl.jpg",
        userid: "->users.homer",
        listid: "->lists.faveBeaches"
      },
      placemark2 : {
        name: "Kilmurrin",
        category: "Beach",
        description: "Great beach for surfing and swimming",
        latitude: 2.95,
        longitude: 1.4,
        userid: "->users.homer",
        listid: "->lists.faveBeaches"
      },
      placemark3 : {
        name: "Ardmore Coastal Walk",
        category: "Coastal Path",
        description: "Beautiful coastal path with views of shipwreck",
        latitude: 27.5,
        longitude: 3.2,
        userid: "->users.homer",
        listid: "->lists.munsterFavourites"
      },
      placemark4 : {
        name: "Dunmore East",
        category: "Mobile Sauna",
        description: "Mobile sauna which you can book via the Hotpod.com",
        latitude: 7.35,
        longitude: 2.25,
        userid: "->users.homer",
        listid: "->lists.munsterFavourites"
      },
      placemark5 : {
        name: "Inch Beach",
        category: "Beach",
        description: "Long Beach in Co.Kerry",
        latitude: 3.35,
        longitude: 7.5,
        userid: "->users.marge",
        listid: "->lists.placesNotYetVisited"
      },
      placemark6 : {
        name: "Lahinch",
        category: "Surf Spot",
        description: "Great surfing beach, suitable for beginners",
        latitude: 9.5,
        longitude: 55.61,
        userid: "->users.homer",
        listid: "->lists.munsterFavourites"
      },
      placemark7 : {
        name: "The Guillamene",
        category: "Diving Board",
        description: "Great spot for diving. Can give at high or low tide",
        latitude: 19.5,
        longitude: 31.14,
        userid: "->users.homer",
        listid: "->lists.munsterFavourites"
      },
      placemark8 : {
        name: "Ardmore Shipwreck",
        category: "Snorkelling",
        description: "Amazing snorkelling around the shipwreck in Ardmore. Need boat to get out to it",
        latitude: 19.5,
        longitude: 31.14,
        userid: "->users.homer",
        listid: "->lists.munsterFavourites"
      },
    }
  };