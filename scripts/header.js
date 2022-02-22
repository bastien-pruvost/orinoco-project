// -- Global function --
(function () {

  toggleNav();
  if (document.getElementById("toggle-search-btn")) {
    toggleSearch();
  }

})();

// -- Function to show or hide navbar --
function toggleNav() {
  const navbar = document.getElementById("navbar");

  // -- Show navbar when nav button is clicked --
  document.getElementById("toggle-nav-btn").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    navbar.classList.toggle("active");

    // -- Hide searchbar when navbar is active --
    if (document.getElementById("searchbar").classList.contains("active")) {
      document.getElementById("searchbar").classList.remove("active");
    }
  });

  // -- Hide navbar when user click somewhere on the body --
  document.body.addEventListener("click", function (e) {
    if (navbar.classList.contains("active") && !e.target.closest("#navbar")) {
      e.preventDefault();
      navbar.classList.remove("active");
    }
  });

  // -- Hide mobile navbar when width > 900px --
  window.addEventListener("resize", function (e) {
    if (navbar.classList.contains("active") && e.target.innerWidth >= 900) {
      navbar.classList.remove("active");
    }
  });

  // -- Hide navbar on scroll --
  window.addEventListener("scroll", function () {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }
  });
};

// -- Function to show or hide searchbar
function toggleSearch() {

  const searchbar = document.getElementById("searchbar");

  // -- Show search when search button is clicked --
  document.getElementById("toggle-search-btn").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    searchbar.classList.toggle("active");

    // -- Hide navbar when searchbar is active --
    if (document.getElementById("navbar").classList.contains("active")) {
      document.getElementById("navbar").classList.remove("active");
    }

  });

  // -- Hide searchbar when user click somewhere on the body --
  document.body.addEventListener("click", function (e) {
    if (searchbar.classList.contains("active") && (!e.target.closest(".searchbar"))) {
      e.preventDefault();
      searchbar.classList.remove("active");
    }
  });

  // -- Hide searchbar on scroll --
  window.addEventListener("scroll", function () {
    if (searchbar.classList.contains("active")) {
      searchbar.classList.remove("active");
    }
  });

};

