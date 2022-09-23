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

    const [Find, setFind] = useState(1);
    const [inputValue, setInputValue] = useState('')
    let [num, setNum] = useState(0);

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
        if (inputValue !== '') setFind(inputValue)
        setInputValue('')
    }
        
    const goBack = () => {
        id--
        setFind(id)
    }
    const goNext = () => {
        id++
        setFind(id)
    }
    const goRandom = () => {
        id = Math.floor(Math.random() * 805)
        setFind(id)
    }

    const handleSlideBack = () => {
        switch (num) {
            case -400: 
                setNum(num += 200)
                break;
            case -200:
                setNum(num += 200)
                break;
            default:
                setNum(num)
        }
    }

    const handleSlideForward = () => {
        switch (num) {
            case 0:
                setNum(num -= 200)
                break;
            case -200: 
                setNum(num -= 200)
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
            <button type='submit' onClick={Search}>Search</button>
        </div>
        <div className='card'>
            <div className='slideshow-master'>
                <IoChevronBackOutline size={40} onClick={handleSlideBack} style={{position: 'relative', zIndex: 1}}/>
                <div className='slideshow-container'>
                    <div className='slideshow' style ={{transform: `translateX(${num}px)`}}>
                        <img src={img1} className='img slide' alt={name} />
                        <img src={img2} className='img slide' alt={name} />
                        <div className='img-container'>
                            <img src={img3} className='img slide animated' alt={name} />
                        </div>
                    </div>
                </div>
                <IoChevronForwardOutline size={40} onClick={handleSlideForward} style={{position: 'relative', zIndex: 1}}/>
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
            <button onClick={goBack}>Back</button>
            <button onClick={goRandom}>Random</button>
            <button onClick={goNext}>Next</button>
        </div>
    </div>
    )
}

export default Poke