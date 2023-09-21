// API credentials
const APP_ID = '072eb70b';
const APP_KEY = 'd236403b4ba4a899b703964ff86deb6a	';

// DOM elements
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const resultsSection = document.querySelector('#results');

// API variables
let searchQuery = '';
let from = 0;
let to = 50;
let recipes = [];

// Event listeners
searchForm.addEventListener('submit', handleSearch);
searchBtn.addEventListener('click', handleSearch);
suggestBtn.addEventListener('click', suggestRecipe);
function handleSearch(event) {
  event.preventDefault();
  console.log('Search button clicked');
  searchQuery = searchInput.value.trim();
  if (searchQuery !== '') {
    from = 0;
    to = 50;
    resultsSection.innerHTML = '';
    fetchRecipes(searchQuery, from, to);
  }
}



// Fetch recipes
async function fetchRecipes(query, from, to, clearResults) {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (clearResults) {
      recipes = data.hits;
      resultsSection.innerHTML = '';
    } else {
      recipes = [...recipes, ...data.hits];
    }
    displayRecipes(recipes);
  } catch (error) {
    console.log(error);
  }
}
// Display recipes
function displayRecipes(recipes) {
  if (recipes.length > 0) {
    resultsSection.innerHTML = '';
    recipes.forEach((recipe) => {
      const recipeCard = `
        <div class="recipe">
          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
          <h2>${recipe.recipe.label}</h2>
          <p><strong>Calories:</strong> ${Math.round(recipe.recipe.calories)}</p>
          <a href="${recipe.recipe.url}" target="_blank">Get recipe</a>
        </div>
      `;
      resultsSection.insertAdjacentHTML('beforeend', recipeCard);
    });
  } else {
    resultsSection.innerHTML = '<p>No recipes found.</p>';
  }
}


