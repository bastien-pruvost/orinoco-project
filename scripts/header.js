// Global function
main();
function main() {
  toggleNav();
  toggleSearch();
}

function toggleNav() {
  const navbar = document.getElementById("navbar");

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

function toggleSearch() {
  const searchbar = document.getElementById("searchbar");

  document.getElementById("toggle-search-btn").addEventListener("click", function (e) {
    e.stopPropagation();

    setTimeout(() => {
      searchbar.classList.toggle("active");
    }, 400);

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