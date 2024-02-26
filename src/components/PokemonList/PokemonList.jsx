
import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

function PokedexList(){

    // axios --> alternative of fetch API ..

    // useEffect() --> 2 aruments , callback , dependecies array([]) --> empty array that facilitate to execute the task only at FIRST time of rendering the page , if we NOT pass the [] array then it will excute at every render..

    
    // const [x,setX]=useState(0)
    // const [y,setY]=useState(0)

    const [pokemonList,setPokemonList]=useState([]);
    const [isLoading,setIsLoading]=useState(true)

    const [POKEDEX_URL,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon/')


    const [nextUrl,setNextUrl]=useState('')
    const [prevUrl,setPrevUrl]=useState('')

    async function downloadPokemons(){
        setIsLoading(true)
        const response=await axios.get(POKEDEX_URL)
        const pokemonResults =response.data.results
        // console.log('response.data -- > ',response.data);

        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)

        const pokemonResultPromise=pokemonResults.map((pokemon)=> axios.get(pokemon.url))

        const pokemonData=await axios.all(pokemonResultPromise)
        console.log(pokemonData);



        const pokeListResult =(pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data

            return {
                id:pokemon.id,
                name:pokemon.name ,
                image:(pokemon.sprites.others) ? pokemon.sprites.other.dream_world.front_deafult : pokemon.sprites.front_shiny,
                types:pokemon.types
            }
        }))
        console.log(pokeListResult);
        setPokemonList(pokeListResult)
        setIsLoading(false)
    }


    useEffect(()=>{
        downloadPokemons();
    },[POKEDEX_URL]);



    return (
        <div className="pokemon-list-wrapper">
            <div className="list-head"> List of Pokemon </div>
            
            <div className="pokemon-wrapper">
                {
                    (isLoading) ? 'Loading ...' : 
                    pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
                }
            </div>

            <div className="controls">
                <button disabled={prevUrl == null} onClick={ ()=> setPokedexUrl(prevUrl)}>Prev.</button>

                <button disabled={nextUrl == null} onClick={ ()=> setPokedexUrl(nextUrl)}>Next</button>
            </div>
            
        </div>
    );

}

export default PokedexList;