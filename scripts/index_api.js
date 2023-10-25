// API credentials
const APP_ID = '072eb70b';
const APP_KEY = 'db7277ebc3842274d74e4a4b9c002cae';

// Global variables
let allRecipes = [];
let searchQuery = '';
let from = 0;
let to = 50;
let recipes = [];

// DOM elements
const searchInput = document.querySelector('#search-input');
const resultsSection = document.querySelector('#results');

// Function Definitions

async function fetchRecipes(query, from, to, clearResults, columnId) {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`;
    console.log("fetchRecipes called");
console.log("URL: ", url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        const targetDiv = columnId === 'results' ? resultsSection :
    document.querySelector(`.${columnId} .scrollable`);

        if (clearResults) {
            targetDiv.innerHTML = ''; // Clear previous results
        }
        displayRecipes(data.hits, targetDiv); // Pass scrollableDiv to displayRecipes function

        // Update global variable with fetched recipes
        allRecipes = data.hits;

    } catch (error) {
        console.log(error);
    }
}

function displayRecipes(recipes, resultsSection) {
    if (recipes.length > 0) {
        resultsSection.innerHTML = '';
        recipes.forEach((recipe) => {
            const recipeCard = `
                 <div class="recipe">
                     <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                     <h2>${recipe.recipe.label}</h2>
                     <p><strong>Calories:</strong> ${Math.round(recipe.recipe.calories)}</p>
                     <button onclick="window.open('${recipe.recipe.url}', '_blank')">Get Recipe</button>
                     <button class="save-recipe" data-recipe-id="${recipe.recipe.uri}">Save</button>
                 </div>
             `;
            resultsSection.insertAdjacentHTML('beforeend', recipeCard);
        });
    } else {
        resultsSection.innerHTML = '<p>No recipes found.</p>';
    }
}

function getRandomQuery(queries) {
    const randomIndex = Math.floor(Math.random() * queries.length);
    return queries[randomIndex];
}

function fetchAndDisplayMeals() {
    const breakfastQuery = getRandomQuery(['pancakes', 'omelette', 'cereal', 'toast']);
    const lunchQuery = getRandomQuery(['sandwich', 'pasta', 'burger']);
    const dinnerQuery = getRandomQuery(['steak', 'pizza', 'soup', 'stir fry']);
    
    fetchRecipes(breakfastQuery, 0, 30, true, 'column_1');
    fetchRecipes(lunchQuery, 0, 30, true, 'column_2');
    fetchRecipes(dinnerQuery, 0, 30, true, 'column_3');
}

function toggleView(isSearch) {
    const mealColumns = document.querySelectorAll('.column');
    const searchResults = document.querySelector('#results');

    if (isSearch) {
        mealColumns.forEach(column => column.style.display = 'none');
        searchResults.style.display = 'grid';
    } else {
        mealColumns.forEach(column => column.style.display = 'block');
        searchResults.style.display = 'none';
    }
}

function debounce(func, delay) {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

async function handleAutoSearch() {
    const query = searchInput.value;
    console.log("handleAutoSearch called");
console.log("Query: ", query);
    if (query.length > 0) {
        await fetchRecipes(query, 0, 50, true, 'results');
        toggleView(true);
    } else {
        toggleView(false);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', fetchAndDisplayMeals);
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('save-recipe')) {
        console.log("Recipe saved");
    }
});


// Dark Mode Toggle Logic
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('darkModeToggle');
    const currentMode = localStorage.getItem('darkMode');
    
    // Check user preference in localStorage
    if (currentMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleButton.innerText = "Toggle Light Mode";
    }
    
    // Add event listener to the toggle button
    toggleButton.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            toggleButton.innerText = "Toggle Dark Mode";
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            toggleButton.innerText = "Toggle Light Mode";
        }
    });
});
searchInput.addEventListener('input', debounce(handleAutoSearch, 500));
