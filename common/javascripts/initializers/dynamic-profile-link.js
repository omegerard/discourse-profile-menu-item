require(["application", "I18n"], function (Discourse, I18n) {
  Discourse.TopicRoute.reopen({
    activate() {
      this._super(...arguments);

      const currentUser = Discourse.User.current();
      console.log("Current User:", currentUser);  // Log de huidige gebruiker

      if (currentUser) {
        const username = currentUser.username;
	console.log("Username:", username);  // Log de gebruikersnaam

        if (!document.querySelector('li[data-list-item-name="profile-link"]')) {
          const menuList = document.querySelector("#sidebar-section-content-community");
	  console.log("Menu List Found:", menuList);  // Log het menu-element

          if (menuList) {
            const listItem = document.createElement("li");
            listItem.setAttribute("data-list-item-name", "profile-link");
            listItem.className = "sidebar-section-link-wrapper";
	    console.log("List Item Created:", listItem);  // Log het gemaakte item

            // Gebruik de vertaling
            const menuName = I18n.t("js.menu_name");
            console.log("Menu Name:", menuName);  // Log de vertaling

            listItem.innerHTML = `
              <a class="ember-view sidebar-section-link sidebar-row" 
                 title="${profileText}" 
                 href="/u/${username}/preferences/profile">
                <span class="sidebar-section-link-prefix icon">
                  <svg class="fa d-icon d-icon-user svg-icon prefix-icon svg-string" xmlns="http://www.w3.org/2000/svg">
                    <use href="#user"></use>
                  </svg>
                </span>
                <span class="sidebar-section-link-content-text">
                  ${menuName}
                </span>
              </a>
            `;

            menuList.insertBefore(listItem, menuList.firstChild);
	    console.log("List Item Inserted:", listItem);  // Log het ingevoegde item
          }
        }
      }
    }
  });
});

