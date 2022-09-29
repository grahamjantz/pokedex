import React, {useState, useEffect} from 'react'
import pokemonLogo from './images/pokemon-logo.png'
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

const baseUrl = 'https://pokeapi.co/api/v2';

const Poke = () => {

    const ranNum = () => {
        return Math.floor(Math.random() * 10000)
    }

    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const [name, setName] = useState('');
    let [id, setId] = useState();
    const [type, setType] = useState();
    const [abilities, setAbilities] = useState([]);

    const [Find, setFind] = useState('bulbasaur');
    const [inputValue, setInputValue] = useState('')
    let [num, setNum] = useState(0);
    const [leftDisplay, setLeftDisplay] = useState('white');
    const [rightDisplay, setRightDisplay] = useState('black');
    
    useEffect(() => {
        async function getData() {
            fetch(`${baseUrl}/pokemon/${Find}/`)
            .then((response) => response.json())
            .then((resData) => {
                setName(resData.name)
                setId(resData.id)
                setType(resData.types[0].type.name)
                setAbilities(resData.abilities)
                setImg1(resData.sprites.other["official-artwork"].front_default);
                setImg2(resData.sprites.other.home.front_shiny);
                setImg3(resData.sprites.versions["generation-v"]["black-white"].animated.front_default);
                
            });
        }

        getData();
    }, [Find]);

    const Search = () => {
        if (inputValue !== ''){
            setFind(inputValue.toLowerCase())
            setInputValue('')
        }
    }
        
    const goBack = () => {
        id--
        setFind(id)
        setNum(0)
    }
    const goNext = () => {
        id++
        setFind(id)
        setNum(0)
    }
    const goRandom = () => {
        id = Math.floor(Math.random() * 805)
        setFind(id)
        setNum(0)
    }

    const handleSlideBack = () => {
        switch (num) {
            case -400: 
                setNum(num += 200)
                setRightDisplay('black')
                break;
            case -200:
                setNum(num += 200)
                setLeftDisplay('white')
                break;
            default:
                setNum(num)
        }
    }

    const handleSlideForward = () => {
        switch (num) {
            case 0:
                setNum(num -= 200)
                setLeftDisplay('black')
                break;
            case -200: 
                setNum(num -= 200)
                setRightDisplay('white')
                break;
            default:
                setNum(num)
        }
    }

  return (
    <div className='App'>
        <div className='logo'>
            <img src={pokemonLogo} alt='pokemon-logo' onClick={() => setFind(1)}/>
            <h3>Search for PokeMon!</h3>
        </div>
        <div className='search'>
            <input type='text' onChange={(e) => {setInputValue(e.target.value)}} value={inputValue}/>
            <button type='submit' onClick={() => Search()}>Search</button>
        </div>
        <div className='card'>
            <div className='slideshow-master'>
                <IoChevronBackOutline size={40} onClick={handleSlideBack} style={{position: 'relative', zIndex: 1, color: leftDisplay}}/>
                <div className='slideshow-container'>
                    <div className='slideshow' style ={{transform: `translateX(${num}px)`}}>
                        <img src={img1} className='img slide' alt={name} />
                        <img src={img2} className='img slide' alt={name} />
                        <div className='img-container'>
                            <img src={img3} className='img slide animated' alt={name} />
                        </div>
                    </div>
                </div>
                <IoChevronForwardOutline size={40} onClick={handleSlideForward} style={{position: 'relative', zIndex: 1, color: rightDisplay}}/>
            </div>
            <h2 className='name'>{name.toUpperCase()}</h2>
            <div className='type'>
                <p>Type:</p>
                <p>{type}</p>
            </div>
            <div className='abilities'>
                <h3>Abilities:</h3>
                <div className='ability-list'>
                    {abilities.map((item) => {
                        return <p key={ranNum()} >{item.ability.name}</p>
                    })}
                </div>
            </div>
            <div>

            </div>
        </div>
        <div className='nav'>
            <button onClick={goBack} style={{visibility: id === 1 ? 'hidden' : 'visible' }}>Back</button>
            <button onClick={goRandom}>Random</button>
            <button onClick={goNext} style={{visibility: id === 905 ? 'hidden' : 'visible' }}>Next</button>
        </div>
    </div>
    )
}

export default Poke