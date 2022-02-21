// -- Global function --
(function () {

  toggleNav();
  toggleSearch();

})();

// -- Function to show or hide navbar --
function toggleNav() {
  const navbar = document.getElementById("navbar");

  // -- Show navbar when nav button is clicked --
  document.getElementById("toggle-nav-btn").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    navbar.classList.toggle("active");

    if (document.getElementById("searchbar").classList.contains("active")) {
      document.getElementById("searchbar").classList.remove("active");
    }
  });

  document.body.addEventListener("click", function (e) {
    if (navbar.classList.contains("active") && e.target.offsetParent.id !== "navbar") {
      e.preventDefault();
      navbar.classList.remove("active");
    }
  });

  window.addEventListener("resize", function () {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }
  });

  window.addEventListener("scroll", function () {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }
  });

};

// -- Function to show or hide searchbar
function toggleSearch() {
  const searchbar = document.getElementById("searchbar");

  document.getElementById("toggle-search-btn").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    searchbar.classList.toggle("active");

    if (document.getElementById("navbar").classList.contains("active")) {
      document.getElementById("navbar").classList.remove("active");
    }

  });

  document.body.addEventListener("click", function (e) {
    if (searchbar.classList.contains("active") && (e.target.offsetParent.id !== "searchbar")) {
      e.preventDefault();
      searchbar.classList.remove("active");
    }
  });

  window.addEventListener("scroll", function () {
    if (searchbar.classList.contains("active")) {
      searchbar.classList.remove("active");
    }
  });

};