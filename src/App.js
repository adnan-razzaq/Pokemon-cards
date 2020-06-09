import React, { useState, useEffect } from "react";
import Card from "./Components/Card/Card";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import { getPokemon, getAllPokemon } from "./pokemon";

export default function App() {
  const [pokemonData, setpokemonData] = useState([]);
  const [nextUrl, setnextUrl] = useState("");
  const [prevUrl, setprevUrl] = useState("");
  const [loading, setloading] = useState(true);

  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const getData = async () => {
      let response = await getAllPokemon(initialUrl);
      setprevUrl(response.previous);
      setnextUrl(response.next);
      await loadPokemon(response.results);
      setloading(false);
    };
    getData();
  }, []);
  // fetching data again after initially fetching data
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setpokemonData(_pokemonData);
  };

  const next = async () => {
    setloading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setnextUrl(data.next);
    setprevUrl(data.previous);
    setloading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setloading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setnextUrl(data.next);
    setprevUrl(data.previous);
    setloading(false);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="m-4 flex justify-center">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={prev}
            >
              Prev
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={next}
            >
              Next
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:grid-cols-1 justify-center">
            {pokemonData.map((data, index) => (
              <Card key={index} data={data} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
