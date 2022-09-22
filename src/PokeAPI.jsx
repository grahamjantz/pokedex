import React, { useState, useEffect } from 'react'
import pokemonLogo from '../src/images/pokemon-logo.png'

const PokeAPI = () => {

    const [name, setName] = useState('');
    const [Find, setFind] = useState(1);
    const [pokeName, setPokeName] = useState('');
    let [id, setId] = useState();
    const [Img, setImg] = useState('');
    const [Type, setType] = useState('');
    const [abilities, setAbilities] = useState([]);

    useEffect(() => {
        async function getData() {
            fetch(`https://pokeapi.co/api/v2/pokemon/${Find}`)
                .then((response) => response.json())
                .then((data) => {
                    setPokeName(data.name)
                    setImg(data.sprites.front_default);
                    setType(data.types[0].type.name);
                    setAbilities(data.abilities);
                    setId(data.id);
                });
        }

        getData();
    }, [Find]);

    const TypeName = (event) => {
        setName(event.target.value);
    }

    const Search = () => {
        if (name !== '') setFind(name);
        setName('');
    }

    const ranNum = () => {
        return Math.floor(Math.random() * 100000);
    }

    let abilitiesMap = abilities.map((item) => {
        return (
            <p key={ranNum()}>{item.ability.name}</p>
        )
    })

    const goNext = () => {
        setId(id++);
        setFind(id)
    }

    const goBack = () => {
        setId(id--)
        setFind(id);
    }

    const ranpoke = () => {
        let ranId = Math.floor(Math.random() * 809)
        setFind(ranId);
    }

  return (
    <>
        <div className='logo' >
            <img src={pokemonLogo} alt='' onClick={() => setFind('bulbasaur')}/>
            <h3>Search for Pokemon!</h3>
        </div>
        <div className='search'>
            <input type='text' onChange={TypeName} value={name}/>
            <button onClick={Search}>SEARCH</button>
        </div>
        <div className='card'>
                    <img src={`${Img}`} alt='' className='img'/>
                    <h2 className='name'>{pokeName.toUpperCase()}</h2>
                    <div className='type'>
                        <p>Type: </p>
                        <p>{Type.toUpperCase()}</p>
                    </div>
                    <div className='abilities'>
                        <h3>Abilities:</h3>
                        <div className='ability-list'>
                            {abilitiesMap}
                        </div>
                    </div>
            </div>
        <div className='nav'>   
            <button onClick={goBack}>BACK</button>
            <button onClick={ranpoke}>RANDOM</button>
            <button onClick={goNext}>NEXT</button>
        </div>
    </>
  )
}

export default PokeAPI