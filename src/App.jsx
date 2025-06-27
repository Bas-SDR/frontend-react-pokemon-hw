import './App.css'
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "./components/button/Button.jsx";

function App() {

    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    const [pokemons, setPokemons] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    // const [loading, toggleLoading] = useState("Loading");


    useEffect(() => {
        const controller = new AbortController();
        toggleLoading(true);

        async function fetchPokemons() {

            toggleError(false);
            try {
                const result = await axios.get(endpoint, {
                    signal: controller.signal,
                });
                setPokemons(result.data);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        fetchPokemons();
        // console.log(pokemon);
        return function cleanUp() {
            controller.abort();
        }

    }, [endpoint]);

    return (
        <>
            <h1>Shiny Pokémon Dex</h1>
            <section>
                <Button
                    className="main-page-button"
                    type="button"
                    clickAction={() => setEndpoint(pokemons.previous)}
                    disabled={!pokemons.previous}
                    name="Previous"
                />
                <Button
                    className="main-page-button"
                    type="button"
                    clickAction={() => setEndpoint(pokemons.next)}
                    disabled={!pokemons.next}
                    name="Next"
                />
            </section>
            {Object.keys(pokemons).length > 0 &&
                <div>
                    {pokemons?.results?.map((result) => {
                        return (
                            <PokemonCard
                                key={result.name}
                                endpoint={result.url}
                            />
                        )
                    })}
                </div>
            }
            {Object.keys(pokemons).length === 0 && error && <p>Pokémon could not be found</p>}
            {Object.keys(pokemons).length === 0 && loading && <p>Pokémon are loading...</p>}
        </>
    )
}


export default App;
