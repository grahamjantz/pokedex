import React, {useState, useEffect} from 'react'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

const Poke = () => {

    const ranNum = () => {
        return Math.floor(Math.random() * 10000)
    }

    const [data, setData] = useState();
    const [Find, setFind] = useState('ditto');
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        fetch(`${baseUrl}/${Find}`)
            .then(response => response.json())
            .then((resData) => {
                setData(resData);
            })
        }, [Find])

    const Search = () => {
        if (inputValue !== '') setFind(inputValue)
        setInputValue('')
    }
        
    const goBack = () => {
        data.id--
        setFind(data.id)
    }
    const goNext = () => {
        data.id++
        setFind(data.id)
    }
    const goRandom = () => {
        data.id = Math.floor(Math.random() * 805)
        setFind(data.id)
    }

  return (
    <div className='App'>
        <div className='search'>
            <input type='text' onChange={(e) => {setInputValue(e.target.value)}} value={inputValue}/>
            <button type='submit' onClick={Search}>Search</button>
        </div>
        <div className='card'>
            <img src={data.sprites.front_default} className='img' alt={data.name} />
            <h1 className='name'>{data.name}</h1>
            <div className='type'>
                <p>Type:</p>
                <p>{data.types[0].type.name}</p>
            </div>
            <div className='abilities'>
                <h3>Abilities:</h3>
                <div className='ability-list'>
                    {data.abilities.map((item) => {
                        return <p key={ranNum()} >{item.ability.name}</p>
                    })}
                </div>
            </div>
        </div>
        <div className='nav'>
            <button onClick={() => goBack()}>Back</button>
            <button onClick={() => goRandom()}>Random</button>
            <button onClick={() => goNext()}>Next</button>
        </div>
    </div>
    )
}

export default Poke