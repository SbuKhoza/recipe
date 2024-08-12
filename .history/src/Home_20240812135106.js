import React from 'react'
import './Home.css';
import Axios from 'axios';

function Home() {

    const APP_ID = "dcfe57f3";

    const APP_KEY = "395ac63c63efeb1a85786f06dd7cb113";

    const url = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

    const getData = async () => {
        const result = await Axios.get(url);

        console.log(result);
    }


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

                <form className='search'>
                    <input type='text' pl
                </form>

                <div className='login'><h4>Profile</h4></div>

            </nav>

            <div className='banner'>
                
                <img src='banner.gif' alt='banner pic'></img>
                
            </div>

            
            <div className='content'>
                
            <h2 on onClick={getData}>Discover Your Perfect Meal</h2>

                <div className='cont'>

                </div>


            </div>

            <div className='footer'>


            </div>

        </div>
        
    );
};

export default Home
