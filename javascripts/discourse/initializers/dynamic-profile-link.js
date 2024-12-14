export default {
  name: "dynamic-profile-link", // Naam van de initializer (vrij te kiezen)

  initialize() {
    console.log("My GiPSo Discourse Theme Component werkt!");

    // Voeg hier je functionaliteit toe
    const currentUser = Discourse.User.current();
    if (currentUser) {
      console.log(`Gebruiker ingelogd: ${currentUser.username}`);
    }
  }
};

