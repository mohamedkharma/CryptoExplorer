import React, { useEffect, useState } from "react";
import './App.css'
import CoinInfo from "./Components/coinInfo";


const API_KEY = import.meta.env.VITE_APP_API_KEY;


function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // declare the async data fetching function
    const fetchAllCoinData = async () => {
      const response = await fetch(
        // how do we call an API using fetch? 
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      );
      const json = await response.json();
      setList(json);
    };
    
      // calls functions and handles error
      fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
          <ul>
            {searchInput.length > 0 
              ? 
                filteredResults.map((coin) => 
                  list.Data[coin].PlatformType === "blockchain" ? 
                  <CoinInfo
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                : null
                )
              : list && Object.entries(list.Data).map(([coin]) => 
                  list.Data[coin].PlatformType === "blockchain" ? 
                  <CoinInfo
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                  />
                : null
              )}
          </ul>
    </div>
  )
}

export default App
