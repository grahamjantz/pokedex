import './App.css';
import { useEffect } from 'react';
import PokeAPI from './PokeAPI'

function App() {

  useEffect(() => {
    // fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    //   .then(response => response.json())
  })

  return (
    <div className='App'>
      <PokeAPI />
    </div>
  );
}

export default App;
