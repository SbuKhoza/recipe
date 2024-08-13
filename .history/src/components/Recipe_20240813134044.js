import React, { useState } from 'react';
import RecipeDetails from './RecipeDetails';
import Axios from 'axios';

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe.recipe;

  const addToFavorites = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        favorites: [...currentUser.favorites, { label, image, url, ingredients }]
      };

      try {
        await Axios.put(`http://localhost:5000/users/${currentUser.id}`, updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert('Recipe added to favorites!');
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    } else {
      alert('Please log in to add recipes to favorites.');
    }
  };

  return (
    <div className='recipe'>
      <h2>{label}</h2>

      <img src={image} alt={label}></img>

      <a href={url} target='_blank' rel='noopener noreferrer'>
        View Recipe
      </a>

      <button onClick={() => setShow(!show)}>Ingredients</button>
      {show && <RecipeDetails ingredients={ingredients} />}

      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default Recipe;
