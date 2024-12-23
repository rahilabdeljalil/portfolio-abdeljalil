// script.js

const toggleButton = document.getElementById('mode-toggle');
const body = document.body;

function updateButtonText() {
  if (body.classList.contains('dark-mode')) {
    toggleButton.textContent = '☀️'; // Sun icon for light mode
  } else {
    toggleButton.textContent = '🌙'; // Moon icon for dark mode
  }
}

// Check if the dark mode is already set in local storage
if (localStorage.getItem('dark-mode') === 'true') {
  body.classList.add('dark-mode');
}

updateButtonText(); // Set the initial button text

// Toggle dark mode on button click
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Update button text
  updateButtonText();
  
  // Save the user's preference to local storage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'true');
  } else {
    localStorage.setItem('dark-mode', 'false');
  }
});


const hamburger = document.getElementById('hamburger');
const navbarLinks = document.querySelector('.navbar-links');

hamburger.addEventListener('click', () => {
    navbarLinks.classList.toggle('active'); // Toggle active class
    
    if (navbarLinks.classList.contains('active')) {
      hamburger.innerHTML = "✖"; // Change icon to 'X'
    } else {
      hamburger.innerHTML = "☰"; // Change icon to hamburger
    }
  });
  