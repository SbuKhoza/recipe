import React, { useState, useEffect } from 'react';
import Recipe from './components/Recipe';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
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

  const openRecipeForm = () => {
    navigate('/'); // Assuming the recipe form is in Home.js
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
              <button onClick={openRecipeForm} className='button'>Add Your Recipe</button>
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

      <div className='footer'></div>
    </div>
  );
}

export default Dashboard;
