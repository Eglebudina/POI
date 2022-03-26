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
  categorys: {
    _model: "Category",
    kerry: {
      name: "Kerry",
      userid: "->users.homer"
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
  }
};
