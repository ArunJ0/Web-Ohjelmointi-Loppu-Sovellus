import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Table from './components/Table';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const keys = ["name"]

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPokemon(res.data.results.map(item=>item))
    })

    return () => cancel()
  }, [currentPageUrl])

  const search = (pokemon) => {
    return pokemon.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    )
  }

  if (loading) return "Loading..."
  
  return (
    <div className='app'>
      <h1>Search Your Favorite Pokemon</h1>
      <input 
        className='search' 
        placeholder='Search...' 
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <Table info={search(pokemon)} />
    </div>
  );
}

export default App;