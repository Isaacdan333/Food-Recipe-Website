
document.addEventListener('DOMContentLoaded', function () {
    // API credentials
    const APP_ID = '072eb70b';
    const APP_KEY = 'db7277ebc3842274d74e4a4b9c002cae	';

    // Fetch recipes for different meal types
    function fetchAndDisplayMeals() {
        const breakfastQuery = getRandomQuery(['pancakes', 'omelette', 'cereal', 'toast']);
        const lunchQuery = getRandomQuery(['sandwich', 'pasta', 'burger']);
        const dinnerQuery = getRandomQuery(['steak', 'pizza', 'soup', 'stir fry']);

        fetchRecipes(breakfastQuery, 0, 30, true, 'column_1');
        fetchRecipes(lunchQuery, 0, 30, true, 'column_2');
        fetchRecipes(dinnerQuery, 0, 30, true, 'column_3');
    }

    // Function to get a random query from an array of queries
    function getRandomQuery(queries) {
        const randomIndex = Math.floor(Math.random() * queries.length);
        return queries[randomIndex];
    }

    // Fetch recipes
    async function fetchRecipes(query, from, to, clearResults, columnId) {
        const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const scrollableDiv = document.querySelector(`.${columnId} .scrollable`);
            if (clearResults) {
                scrollableDiv.innerHTML = ''; // Clear previous results
            }
            displayRecipes(data.hits, scrollableDiv); // Pass scrollableDiv to displayRecipes function
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
                 </div>
             `;
                resultsSection.insertAdjacentHTML('beforeend', recipeCard);
            });
        } else {
            resultsSection.innerHTML = '<p>No recipes found.</p>';
        }
    }



    // Call fetchAndDisplayMeals function when the page loads
    window.addEventListener('load', fetchAndDisplayMeals);

});
