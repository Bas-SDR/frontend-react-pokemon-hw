import './PokemonCard.css';
import {useEffect, useState} from "react";
import axios from "axios";

function PokemonCard({endpoint}) {
    const [pokemon, setPokemon] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);


    useEffect(() => {
        const controller = new AbortController();
        toggleLoading(true);
        async function fetchPokemon() {

            toggleError(false);
            try {
                const result = await axios.get(endpoint, {
                    signal: controller.signal,
                });
                setPokemon(result.data);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchPokemon();
        // console.log(pokemon);
        return function cleanUp() {
            controller.abort();
        }

    }, [endpoint]);



    return (
        <>

            {Object.keys(pokemon).length > 0 &&
                <article>
                    <h2>{pokemon.id}. {pokemon.name}</h2>
                    <img src={pokemon.sprites.front_shiny} alt="Shiny pokemon picture"/>
                    <p><strong>Moves:</strong> {pokemon.moves.length}</p>
                    <p><strong>Weight:</strong> {pokemon.weight}</p>
                    <ul>
                        <p><strong>Abilities</strong></p>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li key={ability.ability.name}>{ability.ability.name}</li>
                            );
                        })}
                    </ul>
                </article>
            }
            {Object.keys(pokemon).length === 0 && loading && <p>Pokémon are loading...</p>}
            {Object.keys(pokemon).length === 0 && error && <p>Pokémon could not be found</p>}

        </>
    );
}

export default PokemonCard;