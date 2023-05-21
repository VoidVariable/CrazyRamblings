// script.js
document.addEventListener('DOMContentLoaded', function() {

  var button = document.querySelector('.header-button');
  var body = document.querySelector('body');

  button.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
  });

    // Save dark mode preference in localStorage
    var darkModeEnabled = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkModeEnabled);

});

