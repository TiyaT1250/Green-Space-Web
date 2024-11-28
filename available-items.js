// Firebase Configuration (placeholder)
const firebaseConfig = {
    // TODO: Replace with Firebase project configuration
};

// Initialize Firebase (only when ready)
// firebase.initializeApp(firebaseConfig);

// Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links ul');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners for:
    // - Search input and filter changes
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const filterBtn = document.getElementById('filter-btn');
    const itemCards = document.querySelectorAll('.item-card');

    // Filter items based on search and category
    filterBtn.addEventListener('click', () => {
        const searchValue = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        itemCards.forEach(card => {
            const itemName = card.querySelector('h3').textContent.toLowerCase();
            const itemCategory = card.querySelector('p').textContent.toLowerCase();

            if (
                (itemName.includes(searchValue) || searchValue === '') &&
                (itemCategory.includes(selectedCategory) || selectedCategory === '')
            ) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Sorting Logic
document.getElementById('sort-options').addEventListener('change', (event) => {
    const sortBy = event.target.value;
    const itemsArray = Array.from(document.querySelectorAll('.item-card'));

    const sortedItems = itemsArray.sort((a, b) => {
        const aText = a.querySelector(`p:nth-of-type(${sortBy === 'name' ? 1 : sortBy === 'category' ? 2 : 3})`).textContent.toLowerCase();
        const bText = b.querySelector(`p:nth-of-type(${sortBy === 'name' ? 1 : sortBy === 'category' ? 2 : 3})`).textContent.toLowerCase();
        return aText.localeCompare(bText);
    });

    const itemsGrid = document.querySelector('.items-grid');
    itemsGrid.innerHTML = '';
    sortedItems.forEach(item => itemsGrid.appendChild(item));
});

// - Pagination clicks
// - Modal controls



// Additional Functionality
// Parse URL Parameters
const params = new URLSearchParams(window.location.search);
const itemName = params.get('name');
const itemCategory = params.get('category');
const itemCondition = params.get('condition');

// Display the data on the page
document.querySelector('.item-details h1').textContent = itemName;
document.querySelector('.item-details p:nth-of-type(1)').textContent = `Category: ${itemCategory}`;
document.querySelector('.item-details p:nth-of-type(2)').textContent = `Condition: ${itemCondition}`;


// Example: Pagination Logic
document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 8; // Adjust this to control how many items are shown per page
    const itemCards = document.querySelectorAll('.item-card'); // All item cards
    const paginationButtons = document.querySelectorAll('.pagination .btn'); // Pagination buttons

    // Function to show items for the current page
    function showItemsForPage(pageNumber) {
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Hide all items first
        itemCards.forEach((card, index) => {
            card.style.display = index >= start && index < end ? "block" : "none";
        });
    }

    // Add click event listeners to pagination buttons
    paginationButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const pageNumber = parseInt(button.innerText);

            if (!isNaN(pageNumber)) {
                // If it's a page number button, show corresponding items
                showItemsForPage(pageNumber);
            } else if (button.innerText === "Next") {
                // Handle "Next" button
                const currentPage = document.querySelector('.pagination .btn.active');
                const nextPage = parseInt(currentPage.innerText) + 1;
                if (nextPage <= paginationButtons.length - 2) {
                    showItemsForPage(nextPage);
                }
            } else if (button.innerText === "Previous") {
                // Handle "Previous" button
                const currentPage = document.querySelector('.pagination .btn.active');
                const previousPage = parseInt(currentPage.innerText) - 1;
                if (previousPage > 0) {
                    showItemsForPage(previousPage);
                }
            }
        });
    });

    // Initialize the first page
    showItemsForPage(1);
});




