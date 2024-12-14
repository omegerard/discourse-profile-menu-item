import User from "discourse/models/user";

export default {
  name: "dynamic-profile-link",

  initialize() {
    console.log("My GiPSo Discourse Theme Component werkt!");

    const currentUser = User.current();
    if (!currentUser) {
      console.warn("Geen gebruiker ingelogd.");
      return;
    }

    console.log(`Gebruiker ingelogd: ${currentUser.username}`);
    const username = currentUser.username;

    // Functie om de profiel-link toe te voegen
    function addProfileLink() {
      if (document.querySelector('li[data-list-item-name="profile-link"]')) {
        console.log("Profiel-link bestaat al.");
        return;
      }

      const menuList = document.querySelector("#sidebar-section-content-community");
      if (!menuList) {
        console.warn("Menu lijst niet gevonden!");
        return;
      }

      const listItem = document.createElement("li");
      listItem.setAttribute("data-list-item-name", "profile-link");
      listItem.className = "sidebar-section-link-wrapper";
      listItem.innerHTML = `
        <a class="ember-view sidebar-section-link sidebar-row" 
           title="Mijn profiel" 
           href="/u/${username}/preferences/profile">
          <span class="sidebar-section-link-prefix icon">
            <svg class="fa d-icon d-icon-user svg-icon prefix-icon svg-string" xmlns="http://www.w3.org/2000/svg">
              <use href="#user"></use>
            </svg>
          </span>
          <span class="sidebar-section-link-content-text">
            Mijn profiel
          </span>
        </a>
      `;
      menuList.insertBefore(listItem, menuList.firstChild);
      console.log("Profiel-link toegevoegd aan het menu!");
    }

    // Gebruik een MutationObserver om te wachten op het menu
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const menuList = document.querySelector("#sidebar-section-content-community");
          if (menuList) {
            addProfileLink();
            observer.disconnect(); // Stop observer na toevoegen
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
};

