import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './PokemonDetails.css'

function PokemonDetails(){

    const {id}=useParams();
    // console.log(id);

    const [pokemon,setPokemon]=useState({})

    async function downloadPokemon(){
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data);
        setPokemon({
            name:response.data.name ,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name)
        })
    }

    useEffect(()=>{
        downloadPokemon()
    },[])
    
    return(
        <div className="pokemon-details-wrapper">
           <h1 className="details-head"> Details :</h1>
            <br />

            <div className="pokemon-name">Name: {pokemon.name}</div>
            <div className="pokemon-name">Height: {pokemon.height}</div>
            <div className="pokemon-name">Weight: {pokemon.weight}</div>
            {/* <div className="pokemon-types">Types: {pokemon.types && bpokemon.types.map((t)=> <div key={name}>{t}</div>)}</div> */}
            <div className="pokemon-img"><img src={pokemon.image}></img></div>
            

        </div>
    );

}

export default PokemonDetails;