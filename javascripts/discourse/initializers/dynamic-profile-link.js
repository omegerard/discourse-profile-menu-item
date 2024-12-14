import User from "discourse/models/user";

export default {
  name: "dynamic-profile-link",

  initialize() {
    console.log("My GiPSo Discourse Theme Component werkt!");

    const currentUser = User.current();
    if (currentUser) {
      console.log(`Gebruiker ingelogd: ${currentUser.username}`);
      const username = currentUser.username;

      // Controleer of het menu-item al bestaat
      if (!document.querySelector('li[data-list-item-name="profile-link"]')) {
        const menuList = document.querySelector("#sidebar-section-content-community");

        if (menuList) {
          // Maak het nieuwe menu-item
          const listItem = document.createElement("li");
          listItem.setAttribute("data-list-item-name", "profile-link");
          listItem.className = "sidebar-section-link-wrapper";

          // Voeg de inhoud van het menu-item toe
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

          // Voeg het nieuwe item toe aan de lijst (als eerste item)
          menuList.insertBefore(listItem, menuList.firstChild);
          console.log("Profiel-link toegevoegd aan het menu!");
        } else {
          console.warn("Menu lijst niet gevonden!");
        }
      } else {
        console.log("Profiel-link bestaat al.");
      }
    } else {
      console.warn("Geen gebruiker ingelogd.");
    }
  }
};

