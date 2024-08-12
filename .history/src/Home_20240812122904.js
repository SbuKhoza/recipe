import React from 'react'
import './Home.css';

function Home() {
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
                <div className='cont'></div>


            </div>

            <div className='footer'>


            </div>

        </div>
        
    );
};

export default Home
