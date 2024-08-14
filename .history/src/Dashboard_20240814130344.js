import React, { useState, useEffect } from 'react';
import Recipe from './components/Recipe';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';


function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className='container'>
      <nav>
        {/* Add navigation elements like in Home.js */}
      </nav>

      <div className='logout'>
        {currentUser && (
          <>
            <button className='button'>Logout</button>
            <button className='button'>Add Your Recipe</button>
          </>
        )}
      </div>

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

      <div className='footer'></div>
    </div>
  );
}

export default Dashboard;
