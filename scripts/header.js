// -- Global function --
(function () {

  // toggleNav();
  toggleBar("toggle-nav-btn", "navbar", "searchbar");
  if (document.getElementById("toggle-search-btn")) {
    // toggleSearch();
    toggleBar("toggle-search-btn", "searchbar", "navbar");
  }

  // toggleBar("toggle-search-btn", "searchbar", "navbar");
  // toggleBar("toggle-nav-btn", "navbar", "searchbar");

})();

function toggleBar(trigger, toDisplay, toHide) {

  const toDisplayElement = document.getElementById(toDisplay);

  // -- Show search when search button is clicked --
  document.getElementById(trigger).addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    toDisplayElement.classList.toggle("active");

    // -- Hide navbar when searchbar is active --
    if (document.getElementById(toHide).classList.contains("active")) {
      document.getElementById(toHide).classList.remove("active");
    }

  });

  // -- Hide searchbar when user click somewhere on the body --
  document.body.addEventListener("click", function (e) {
    if (toDisplayElement.classList.contains("active") && (!e.target.closest("#" + toDisplay))) {
      e.preventDefault();
      toDisplayElement.classList.remove("active");
    }
  });

  // -- Hide searchbar on scroll --
  window.addEventListener("scroll", function () {
    if (toDisplayElement.classList.contains("active")) {
      toDisplayElement.classList.remove("active");
    }
  });

};