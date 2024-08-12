import React, { useState } from 'react';
import './Home.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Modal from './components/Modal'; 
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Alert';

function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [alert, setAlert] = useState(''); // Fixed spelling

  const APP_ID = "dcfe57f3";
  const APP_KEY = "395ac63c63efeb1a85786f06dd7cb113";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

  const getData = async () => {
    if(query !== ''){
        const result = await Axios.get(url);

        if(!result.data.more){
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

  return (
    <div className='container'>
      <nav>
        <div className='logo'><h1>HUNGRY?</h1></div>
        <ul>
          <li>Home</li>
          <li>Breakfast</li>
          <li>Lunch time</li>
          <li>Supper/Dinner</li>
          <li>Special diet</li>
        </ul>
        <form className='searchform' onSubmit={onSubmit}>
          {alert !== '' && <Alert alert={alert} />} {/* Fixed spelling */}
          <input type='text' className='searchbox' placeholder='Search for your next favorite' onChange={onChange} value={query} />
          <button type='submit' className='button'>Search</button>
        </form>
        <div className='login'><h4>Profile</h4></div>
      </nav>

      <div className='banner'>
        <div className='bnn'>
          <img src='banner.gif' alt='banner pic'></img>
        </div>
        <h2 onClick={getData}>Discover Your Perfect Meal</h2>
      </div>

      <div className='content'>
        <div className='cont'>
          {/* Search Results Modal */}
          <Modal show={showModal} onClose={closeModal}>
            <div className='recipes'>
              {recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
            </div>
          </Modal>
        </div>
      </div>

      <div className='footer'>
      </div>
    </div>
  );
}

export default Home;
