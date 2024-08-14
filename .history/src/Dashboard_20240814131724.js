import React, { useState, useEffect } from 'react';
import Recipe from './components/Recipe';
import RecipeForm from './components/RecipeForm'; 
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showRecipeForm, setShowRecipeForm] = useState(false); // State for showing the recipe form
  const [recipeToEdit, setRecipeToEdit] = useState(null); // State for recipe to edit
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const openRecipeForm = (recipe = null) => {
    setRecipeToEdit(recipe);
    setShowRecipeForm(true);
  };

  const closeRecipeForm = () => {
    setShowRecipeForm(false);
    setRecipeToEdit(null);
  };

  const saveRecipe = async (newRecipe) => {
    let updatedUser;
    if (recipeToEdit) {
      // Edit existing recipe
      updatedUser = {
        ...currentUser,
        customRecipes: currentUser.customRecipes.map(r =>
          r.id === recipeToEdit.id ? { ...r, ...newRecipe } : r
        )
      };
    } else {
      // Add new recipe
      const recipeWithId = { ...newRecipe, id: uuidv4() };
      updatedUser = {
        ...currentUser,
        customRecipes: [...currentUser.customRecipes, recipeWithId]
      };
    }

    try {
      await Axios.put(`http://localhost:3001/users/${currentUser.id}`, updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      alert('Recipe saved!');
      closeRecipeForm();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <div className='container'>
      <nav>
        <div className='logo'><h1>HUNGRY?</h1></div>
        
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/breakfast">Breakfast</Link></li>
          <li><Link to="/lunch">Lunch time</Link></li>
          <li><Link to="/dinner">Supper/Dinner</Link></li>
          <li><Link to="/special-diet">Special diet</Link></li>
        </ul>

        <div className='logout'>
          {currentUser ? (
            <>
              <h4>Welcome, {currentUser.email}</h4>
              <button onClick={handleLogout} className='button'>Logout</button>
              <button onClick={() => openRecipeForm()} className='button'>Add Your Recipe</button>
            </>
          ) : (
            <h4>
              <Link to="/login" className='button'>Login</Link> | 
              <Link to="/signup" className='button'>Signup</Link>
            </h4>
          )}
        </div>
      </nav>

      <div className='banner'>
        <div className='bnn'>
          <img src='banner.gif' alt='banner pic'></img>
        </div>
      </div>

      <div className='head'>
        <h2>Your Saved Recipes</h2>
      </div>

      <div className='content'>
        <div className='recipes'>
          {currentUser?.customRecipes && currentUser.customRecipes.length > 0 ? (
            currentUser.customRecipes.map(recipe => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p>No saved recipes yet. Start adding your favorite recipes!</p>
          )}
        </div>
      </div>

      {showRecipeForm && (
        <RecipeForm 
          onSave={saveRecipe} 
          onClose={closeRecipeForm} 
          initialRecipe={recipeToEdit} 
        />
      )}

      <div className='footer'></div>
    </div>
  );
}

export default Dashboard;
