import React, { useState, useEffect } from 'react';
import './Home.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Modal from './components/Modal'; 
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Alert';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [defaultRecipes, setDefaultRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [alert, setAlert] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();

  const APP_ID = "dcfe57f3";
  const APP_KEY = "395ac63c63efeb1a85786f06dd7cb113";

  const searchUrl = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10&&health=alcohol-free`;
  const defaultUrl = `https://api.edamam.com/search?q=random&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=8`; 

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      const result = await Axios.get(defaultUrl);
      setDefaultRecipes(result.data.hits);
    };

    fetchDefaultRecipes();

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(searchUrl);

      if (!result.data.more) {
        return setAlert('Results not found');
      }

      setRecipes(result.data.hits);
      setAlert('');
      setShowModal(true);
      setQuery('');
    } else {
      setAlert('Search cannot be empty');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    getData();
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const handleAddRecipe = async () => {
    if (!currentUser) {
      alert('Please log in to add your recipe.');
      return;
    }

    const newRecipe = {
      id: uuidv4(),
      name: 'Custom Recipe',
      ingredients: [],
      instructions: ''
    };

    const updatedUser = {
      ...currentUser,
      customRecipes: [...currentUser.customRecipes, newRecipe]
    };

    try {
      await Axios.put(`http://localhost:3001/users/${currentUser.id}`, updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser); // Update currentUser state
      alert('Recipe added to your collection!');
    } catch (error) {
      console.error('Error adding custom recipe:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
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
          {currentUser ? (
            <>
              <h4>Welcome, {currentUser.email}</h4>
            </>
          ) : (
            <h4>
              <Link to="/login" className='button'>Login</Link> | 
              <Link to="/signup" className='button'>Signup</Link>
            </h4>
          )}
        </ul>

        <div className='hamburger' onClick={toggleDropdown}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {dropdownVisible && (
          <div className='dropdown-content'>
            <Link to="/">Home</Link>
            <Link to="/breakfast">Breakfast</Link>
            <Link to="/lunch">Lunch time</Link>
            <Link to="/dinner">Supper/Dinner</Link>
            <Link to="/special-diet">Special diet</Link>
            {currentUser ? (
              <>
                <span>Welcome, {currentUser.email}</span>
                <button onClick={handleLogout} className='button'>Logout</button>
                <button onClick={handleAddRecipe} className='button'>Add Your Recipe</button>
              </>
            ) : (
              <>
                <Link to="/login" className='button'>Login</Link> 
                <Link to="/signup" className='button'>Signup</Link>
              </>
            )}
          </div>
        )}

        
      </nav>

      <div className='logout'>
        {currentUser && (
          <>
            <button onClick={handleAddRecipe} className='button'>Add Your Recipe</button>
            <button onClick={handleLogout} className='button'>Logout</button>
          </>
        )}
      </div>

      <div className='banner'>
        <div className='bnn'>
          <img src='banner.gif' alt='banner pic'></img>
        </div>
        
      </div>

      <div className='head'><h2>Discover Your Perfect Meal</h2></div>

      <div className='search'></div>
      <form className='searchform' onSubmit={onSubmit}>
          {alert !== '' && <Alert alert={alert} />}
          <input
            type='text'
            className='searchbox'
            placeholder='Search for your next favorite'
            onChange={onChange}
            value={query}
          />
          <button type='submit' className='button'>Search</button>
        </form>

      <div className='content'>
        <div className='recipes'>
          {defaultRecipes.map(recipe => (
            <Recipe key={uuidv4()} recipe={recipe} />
          ))}
        </div>
      </div>
      
      <Modal show={showModal} onClose={closeModal}>
        <div className='recipes'>
          {recipes.map(recipe => (
            <Recipe key={uuidv4()} recipe={recipe} />
          ))}
        </div>
      </Modal>

      <div className='footer'></div>
    </div>
  );
}

export default Home;
