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
    },
    admin: {
      email: "admin@simpson.com",
      password: "secret"
    }
  },
  categorys: {
    _model: "Category",
    kerry: {
      name: "Kerry",
      userid: "->users.homer",
      img: "https://res.cloudinary.com/dxrvgvnzb/image/upload/v1648490779/hng454i1y3cszcltslbx.jpg"
      
    },
    wicklow: {
      name: "Wicklow",
      userid: "->users.homer",
      img: "https://res.cloudinary.com/dxrvgvnzb/image/upload/v1648377258/wicklow-category_x31nw1.jpg"
    },
    donegal: {
      name: "Donegal",
      userid: "->users.homer",
      img: "https://res.cloudinary.com/dxrvgvnzb/image/upload/v1648377369/donegal-category_tikrik.jpg"
    }
  },
  places: {
    _model : "Place",
    place_1 : {
      name: "Carrauntoohil",
      description: "Climbing route, Difficult",
      latitude: 51.9990,
      longitude: 9.7432,
      categoryid: "->categorys.kerry"
    },
    place_2 : {
      name: "The_Glen_of_Aherlow",
      description: "Trek to Lough Curra, Medium",
      latitude: 52.4169,
      longitude: 8.1444,
      categoryid: "->categorys.kerry"
    },
    place_3 : {
      name: "Errigal_Mountain",
      description: "Trek to Donegal skyline, Medium",
      latitude: 55.0343,
      longitude: 8.1130,
      categoryid: "->categorys.donegal"
    },
    place_4 : {
      name: "Djouce",
      description: "Hike in Wicklow Mountain National Park, Medium",
      latitude: 53.1305,
      longitude: 6.2393,
      categoryid: "->categorys.wicklow"
    }
  }
};
