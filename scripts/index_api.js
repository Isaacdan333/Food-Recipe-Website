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
async function fetchRecipes(query = '', fromParam = 0, toParam = 50, clearResults = true) {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${fromParam}&to=${toParam}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (clearResults) {
            resultsSection.innerHTML = '';
        }
        if (data.hits) {
            allRecipes = [...allRecipes, ...data.hits]; 
            populateDishTypes();
            populateCuisineTypes();
            displayRecipes(data.hits, resultsSection);
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
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
    await fetchRecipes(mealType, 0, 50, true, 'results');
}


function toggleView(isSearch) {
    const navTabs = document.querySelector('.nav-tabs');
    const resultsTitle = document.getElementById('results-title');
    const results = document.getElementById('results');

    if (isSearch) {
        navTabs.style.display = 'none';
        results.style.display = 'grid';
    } else {
        navTabs.style.display = 'flex';
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

async function compileDishTypes() {
    const dishTypes = new Set();
    allRecipes.forEach((recipeData) => {
        if (recipeData.recipe.dishType) {
            recipeData.recipe.dishType.forEach((dish) => {
                dishTypes.add(dish);
            });
        }
    });
    return Array.from(dishTypes);
}

async function populateDishTypes() {
    const dishTypes = await compileDishTypes();
    const dropdown = document.getElementById('dish-dropdown');
    dropdown.innerHTML = ''; 
    dishTypes.forEach((dish) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'dropdown-item';
        link.href = '#';
        link.textContent = dish;
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            await fetchAndDisplayMeals(dish);
        });
        listItem.appendChild(link);
        dropdown.appendChild(listItem);
    });
}

fetchRecipes('', 0, 50).catch(error => {
    console.error('Failed to fetch recipes:', error);
});


async function compileCuisineTypes() {
    const cuisineTypes = new Set();
    allRecipes.forEach((recipeData) => {
        if (recipeData.recipe.cuisineType) {
            recipeData.recipe.cuisineType.forEach((cuisine) => {
                cuisineTypes.add(cuisine);
            });
        }
    });
    return Array.from(cuisineTypes);
}

async function populateCuisineTypes() {
    const cuisineTypes = await compileCuisineTypes();
    const dropdown = document.getElementById('cuisine-dropdown');
    dropdown.innerHTML = ''; 
    cuisineTypes.forEach((cuisine) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'dropdown-item';
        link.href = '#';
        link.textContent = cuisine;
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            await fetchAndDisplayMeals(cuisine);
        });
        listItem.appendChild(link);
        dropdown.appendChild(listItem);
    });
}

fetchRecipes('', 0, 50).catch(error => {
    console.error('Failed to fetch recipes:', error);
});

// Dark Mode Toggle Logic
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  
    const iconSun = this.querySelector('.fa-sun');
    const iconMoon = this.querySelector('.fa-moon');
    if (document.body.classList.contains('dark-mode')) {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'inline-block';
      localStorage.setItem('theme', 'dark');
    } else {
      iconSun.style.display = 'inline-block';
      iconMoon.style.display = 'none';
      localStorage.setItem('theme', 'light');
    }
  });
  
  window.onload = function() {
    const toggleButton = document.getElementById('darkModeToggle');
    const iconSun = toggleButton.querySelector('.fa-sun');
    const iconMoon = toggleButton.querySelector('.fa-moon');
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      iconSun.style.display = 'none';
      iconMoon.style.display = 'inline-block';
    }
  };
  

searchInput.addEventListener('input', debounce(handleAutoSearch, 500));
