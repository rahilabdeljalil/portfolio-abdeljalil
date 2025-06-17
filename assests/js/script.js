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

///////////////////////////////////////////////////////////////////////////////////
  // project section js 
  document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter');
    const projects = document.querySelectorAll('.project');
    const searchBar = document.querySelector('.search-bar');

    // Function to filter projects
    function filterProjects(filterValue, searchText = '') {
        projects.forEach(project => {
            const category = project.getAttribute('data-category');
            const title = project.querySelector('h3').textContent.toLowerCase();
            const description = project.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(project.querySelectorAll('.tag'))
                .map(tag => tag.textContent.toLowerCase());
            const popup = project.querySelector('.popup').textContent.toLowerCase();
            
            // Remove any existing hide class first
            project.classList.remove('hide');
            
            // Check if project matches both filter and search criteria
            const matchesFilter = filterValue === 'all' || category === filterValue;
            const matchesSearch = searchText === '' || 
                title.includes(searchText) || 
                description.includes(searchText) || 
                tags.some(tag => tag.includes(searchText)) ||
                popup.includes(searchText);
            
            // Hide project if it doesn't match either criteria
            if (!matchesFilter || !matchesSearch) {
                project.classList.add('hide');
            }
            
            // Trigger reflow to ensure animation works
            project.offsetHeight;
        });
    }

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            filterProjects(filterValue, searchBar.value.toLowerCase());
        });
    });

    // Search input handler with debounce
    let searchTimeout;
    searchBar.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const activeFilter = document.querySelector('.filter.active');
            const filterValue = activeFilter.getAttribute('data-filter');
            filterProjects(filterValue, searchBar.value.toLowerCase());
        }, 300); // Debounce delay of 300ms
    });
});
// Add click handlers for info buttons
const infoButtons = document.querySelectorAll('.info-btn');
let activePopup = null;

infoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling up
        const popup = button.nextElementSibling;
        
        // If there's an active popup and it's not this one, hide it
        if (activePopup && activePopup !== popup) {
            activePopup.classList.remove('show');
        }
        
        // Toggle current popup
        popup.classList.toggle('show');
        activePopup = popup.classList.contains('show') ? popup : null;
    });
});

// Close popup when clicking anywhere else on the page
document.addEventListener('click', () => {
    if (activePopup) {
        activePopup.classList.remove('show');
        activePopup = null;
    }
});


///////////////////////////////////////////////////////////////////////////////////




   document.addEventListener('DOMContentLoaded', () => {
            const carousel = document.querySelector('.reviews-carousel');
            const items = document.querySelectorAll('.review-item');
            const prevBtn = document.querySelector('.scroll-btn.prev');
            const nextBtn = document.querySelector('.scroll-btn.next');

            let activeIndex = 1; // Tracks the index of the currently active (centered) item

            // Function to update the 'active' class and scroll to the item
            const updateCarousel = () => {
                // Remove 'active' from all items first
                items.forEach(item => item.classList.remove('active'));

                // Add 'active' to the current active item
                if (items[activeIndex]) {
                    items[activeIndex].classList.add('active');
                    // Custom scroll to center the active item in the carousel
                    const carouselRect = carousel.getBoundingClientRect();
                    const itemRect = items[activeIndex].getBoundingClientRect();
                    const carouselScrollLeft = carousel.scrollLeft;
                    const offset = (itemRect.left + itemRect.width / 2) - (carouselRect.left + carouselRect.width / 2);
                    carousel.scrollTo({
                        left: carouselScrollLeft + offset,
                        behavior: 'smooth'
                    });
                }

                // Optionally disable buttons if there's only one item, or if at the start/end and not looping
                // For a looping carousel, this is less relevant, but good for non-looping ones.
                if (items.length <= 1) {
                    prevBtn.classList.add('hidden');
                    nextBtn.classList.add('hidden');
                } else {
                    prevBtn.classList.remove('hidden');
                    nextBtn.classList.remove('hidden');
                }
            };

            // Initialize the carousel by setting the first item as active
            updateCarousel();

            // Event listener for the 'Previous' button
            prevBtn.addEventListener('click', () => {
                activeIndex = (activeIndex === 0) ? items.length - 1 : activeIndex - 1; // Loop back to last item
                updateCarousel();
            });

            // Event listener for the 'Next' button
            nextBtn.addEventListener('click', () => {
                activeIndex = (activeIndex === items.length - 1) ? 0 : activeIndex + 1; // Loop back to first item
                updateCarousel();
            });

            // Handle user scrolling: update active item based on which is closest to center
            let isScrolling;
            carousel.addEventListener('scroll', () => {
                // Clear our timeout throughout the scroll
                window.clearTimeout(isScrolling);

                // Set a timeout to run after scrolling ends
                isScrolling = setTimeout(() => {
                    const carouselRect = carousel.getBoundingClientRect();
                    const carouselCenterX = carouselRect.left + carouselRect.width / 2;

                    let closestItemIndex = 0;
                    let minDistance = Infinity;

                    items.forEach((item, index) => {
                        const itemRect = item.getBoundingClientRect();
                        const itemCenterX = itemRect.left + itemRect.width / 2;
                        const distance = Math.abs(itemCenterX - carouselCenterX);

                        if (distance < minDistance) {
                            minDistance = distance;
                            closestItemIndex = index;
                        }
                    });

                    // Only update if the closest item has changed, to avoid redundant updates
                    if (closestItemIndex !== activeIndex) {
                        activeIndex = closestItemIndex;
                        updateCarousel(); // Re-center the newly active item
                    }
                }, 100); // Debounce time in ms
            });

            // Optional: Add keyboard navigation (left/right arrows)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            });
        });

        // contact 
        document.addEventListener('DOMContentLoaded', () => {
            const contactForm = document.getElementById('contactForm');
            const messageBox = document.getElementById('messageBox');

            if (contactForm) {
                contactForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Prevent default form submission

                    // In a real application, you would send this data to a server
                    // using fetch() or XMLHttpRequest here.
                    const formData = new FormData(contactForm);
                    const formObject = {};
                    formData.forEach((value, key) => {
                        formObject[key] = value;
                    });

                    console.log('Form data:', formObject); // Log data for demonstration

                    // Simulate a successful submission
                    showMessageBox('Message sent successfully! I\'ll get back to you soon.', 'success');

                    // Clear the form after a short delay
                    setTimeout(() => {
                        contactForm.reset();
                    }, 500); // Clear after 0.5 seconds
                });
            }

            function showMessageBox(message, type) {
                messageBox.textContent = message;
                messageBox.className = 'message-box show'; // Reset classes and add 'show'
                if (type === 'success') {
                    messageBox.style.backgroundColor = '#28a745'; // Green for success
                } else if (type === 'error') {
                    messageBox.style.backgroundColor = '#dc3545'; // Red for error
                }

                setTimeout(() => {
                    messageBox.classList.remove('show');
                }, 3000); // Hide message after 3 seconds
            }
        });