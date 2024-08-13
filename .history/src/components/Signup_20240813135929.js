import Axios from 'axios';
import { useState } from 'react';
import ''

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const { data: users } = await Axios.get('http://localhost:3001/users');
      
      if (users.find(user => user.email === email)) {
        setError('User already exists');
        return;
      }

      const newUser = {
        email,
        password,
        favorites: [],
        customRecipes: []
      };

      await Axios.post('http://localhost:3001/users', newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      setError('');
      // Navigate to home or dashboard after successful signup
    } catch (error) {
      setError('Error signing up. Please try again later.');
    }
  };

  return (
    <div className='signn'>
      <h2>Signup</h2><br></br>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='formm' onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br></br>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
