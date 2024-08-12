import React from 'react'
import './Home.css';

function Home() {

    

    const url = "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free";


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

                

                <div className='login'><h4>Profile</h4></div>

            </nav>

            <div className='banner'>
                
                <img src='banner.gif' alt='banner pic'></img>
                
            </div>

            <div className='content'>
                <div className='cont'>

                </div>


            </div>

            <div className='footer'>


            </div>

        </div>
        
    );
};

export default Home
