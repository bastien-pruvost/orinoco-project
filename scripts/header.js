const toggleNavBtn = document.getElementById("toggle-nav-btn");
const navbar = document.getElementById("navbar");

const toggleSearchBtn = document.getElementById("toggle-search-btn");
const searchbar = document.getElementById("searchbar");

main();

function main() {

  toggleNav();
  toggleSearch();

}


function toggleNav() {

  toggleNavBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    navbar.classList.toggle("active");

    if (searchbar.classList.contains("active")) {
      searchbar.classList.remove("active");
    }

  });

  document.body.addEventListener("click", function (e) {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }
  });

  window.addEventListener("resize", function () {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }
  });

};

function toggleSearch() {

  toggleSearchBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    searchbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }

  });

  document.body.addEventListener("click", function (e) {
    if (searchbar.classList.contains("active") && (e.target.offsetParent.id !== "searchbar")) {
      searchbar.classList.remove("active");
    }
  });

};