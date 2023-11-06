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
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (clearResults) {
            resultsSection.innerHTML = '';
        }
        allRecipes = [...allRecipes, ...data.hits];
        populateDishTypes();
        displayRecipes(data.hits, resultsSection);
    } catch (error) {
        console.log(error);
    }
}

function displayRecipes(recipes, resultsSection) {
    if (recipes.length > 0) {
        resultsSection.innerHTML = '';
        recipes.forEach((recipe) => {
            const servingSize = recipe.recipe.yield || 'N/A';  
            const recipeCard = `
                 <div class="recipe">
                     <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                     <h2>${recipe.recipe.label}</h2>
                     <p><strong>Calories:</strong> ${Math.round(recipe.recipe.calories)}</p>
                     <p><strong>Servings:</strong> ${servingSize}</p> 
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

async function fetchAndDisplayMeals(mealType) {
    await fetchRecipes(mealType, 0, 30, true, 'results');
}


function toggleView(isSearch) {
    const tabList = document.querySelector('.tab-list');
    const resultsTitle = document.getElementById('results-title');
    const results = document.getElementById('results');

    if (isSearch) {
        tabList.style.display = 'none';
        results.style.display = 'grid';
    } else {
        tabList.style.display = 'flex';
        results.style.display = 'grid';  
        resultsTitle.innerHTML = '';
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
    const resultsTitle = document.getElementById('results-title');

    if (query.length > 0) {
        await fetchRecipes(query, 0, 50, true, 'results');
        toggleView(true);
        resultsTitle.innerHTML = `Results for: ${query}`;
    } else {
        resultsTitle.innerHTML = '';
        await fetchAndDisplayMeals('breakfast');  // Fetch default meals
        toggleView(false);
    }
}



document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', () => fetchAndDisplayMeals('breakfast'));
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('save-recipe')) {
        console.log("Recipe saved");
    }
});

function populateDishTypes() {
    const dishTypes = compileDishTypes();
    const dropdown = document.getElementById('dish-dropdown');
    dropdown.innerHTML = ''; 
    dishTypes.forEach((dish) => {
        const listItem = document.createElement('li'); 
        const link = document.createElement('a'); 
        link.className = 'dropdown-item'; 
        link.href = '#'; 
        link.textContent = dish; 
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            fetchAndDisplayMeals(dish); 
        });
        listItem.appendChild(link); 
        dropdown.appendChild(listItem); 
    });
}



function compileDishTypes() {
    const dishTypes = new Set();
    allRecipes.forEach((recipe) => {
        if (recipe.recipe.dishType) {
            recipe.recipe.dishType.forEach((dish) => {
                dishTypes.add(dish);
            });
        }
    });
    return Array.from(dishTypes);
}

function toggleDropdown() {
    document.getElementById("dish-dropdown").classList.toggle("show");
}

document.querySelectorAll('.tab-list button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.tab-list button').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Dark Mode Toggle Logic
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('darkModeToggle');
    const currentMode = localStorage.getItem('darkMode');
    
    if (currentMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleButton.innerText = "Toggle Light Mode";
    }
    
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
