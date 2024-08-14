import React, { useState } from 'react';

function RecipeForm({ onSave, onClose, initialRecipe }) {
  const [name, setName] = useState(initialRecipe?.name || '');
  const [ingredients, setIngredients] = useState(initialRecipe?.ingredients || '');
  const [instructions, setInstructions] = useState(initialRecipe?.instructions || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, ingredients, instructions });
  };

  return (
    <div className="modal form">
      <form onSubmit={handleSubmit}>
        <h2>{initialRecipe ? 'Edit Recipe' : 'Add Recipe'}</h2>
        <label>Recipe Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
        <label>Ingredients:</label>
        <textarea 
          value={ingredients} 
          onChange={(e) => setIngredients(e.target.value)} 
          required 
        />

        <label>Instructions:</label>
        <textarea 
          value={instructions} 
          onChange={(e) => setInstructions(e.target.value)} 
          required 
        />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default RecipeForm;
