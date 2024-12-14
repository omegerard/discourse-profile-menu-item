import User from "discourse/models/user";

export default {
  name: "dynamic-profile-link", // Naam van de initializer

  initialize() {
    console.log("My GiPSo Discourse Theme Component werkt!");

    const currentUser = User.current();
    if (currentUser) {
      console.log(`Gebruiker ingelogd: ${currentUser.username}`);
    }
  }
};
