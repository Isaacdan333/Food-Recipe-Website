document.addEventListener('DOMContentLoaded', function() {
    displaySavedRecipes();
});

function displaySavedRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const savedRecipesSection = document.getElementById('saved-recipes');

    savedRecipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        savedRecipesSection.appendChild(recipeCard);
    });
}

function createRecipeCard(recipeData) {
    const recipe = document.createElement('div');
    recipe.className = 'recipe';
    recipe.innerHTML = `
        <img src="${recipeData.recipe.image}" alt="${recipeData.recipe.label}">
        <h2>${recipeData.recipe.label}</h2>
        <p><strong>Calories:</strong> ${Math.round(recipeData.recipe.calories)}</p>
        <p><strong>Servings:</strong> ${recipeData.recipe.yield || 'N/A'}</p>
        <button onclick="window.open('${recipeData.recipe.url}', '_blank')">View Recipe</button>
    `;
    return recipe;
}
