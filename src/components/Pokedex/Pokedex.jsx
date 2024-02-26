import Search from "../SearchComponents/Search";

// css
import '../Pokedex/Pokedex.css'
import PokedexList from "../PokemonList/PokemonList";


function Pokedex(){
    return (
        <div className="pokedex-wrapper">
            
            <Search />
            <PokedexList />
        </div>
    );
}

export default Pokedex;