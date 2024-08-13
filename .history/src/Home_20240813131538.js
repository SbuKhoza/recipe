import React, { useState, useEffect } from 'react';
import './Home.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Modal from './components/Modal'; 
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Alert';
import { Link, useHistory } from 'react-router-dom'; 

function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [defaultRecipes, setDefaultRecipes] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [alert, setAlert] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const APP_ID = "dcfe57f3";
  const APP_KEY = "395ac63c63efeb1a85786f06dd7cb113";

  const searchUrl = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10&&health=alcohol-free`;
  const defaultUrl = `https://api.edamam.com/search?q=random&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=8`; 

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      setLoading(true);
      try {
        const result = await Axios.get(defaultUrl);
        setDefaultRecipes(result.data.hits);
      } catch (error) {
        console.error("Error fetching default recipes:", error);
        setAlert('Failed to load default recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultRecipes();

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const getData = async () => {
    if (query !== '') {
      setLoading(true);
      try {
        const result = await Axios.get(searchUrl);
        if (!result.data.more) {
          setAlert('Results not found');
          return;
        }
        setRecipes(result.data.hits);
        setAlert('');
        setShowModal(true);
        setQuery('');
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlert('An error occurred while fetching the data. Please try again later.');
      } finally {
        setLoading(false);
      }
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
    history.push('/login'); // Navigate to login page after logout
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
        <div className='login'>
          {currentUser ? (
            <>
              <h4>Welcome, {currentUser.email}</h4>
              <button onClick={handleLogout} className='button'>Logout</button>
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

      <div className='head'><h2>Discover Your Perfect Meal</h2></div>

      <div className='content'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='recipes'>
            {defaultRecipes.map(recipe => (
              <Recipe key={recipe.recipe.uri} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
      
      <Modal show={showModal} onClose={closeModal}>
        <div className='recipes'>
          {recipes.map(recipe => (
            <Recipe key={recipe.recipe.uri} recipe={recipe} />
          ))}
        </div>
      </Modal>

      <div className='footer'></div>
    </div>
  );
}

export default Home;
