import React, { useEffect, useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/searchResultsList'

function App() {
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [active, setActive] = useState(0);

  const handleSelectedItem = () => {
    if(selectedIndex >= 0 && results.length > 0){
      const selectedItem = results[selectedIndex];
      alert(`You selected: ${selectedItem.city}`);
      setShowResults(false);
      setSelectedIndex(-1);
      setActive(0);
    }

  }

  const handleListItemClick = (item) => {
    if(item){
      alert(`You selected: ${item.city}`);
      setShowResults(false);
      setSelectedIndex(-1);
      setActive(0);
    }

  }


  return (
    <div className="App">
      <div className="title">
      Auto-Suggestions Search Bar 
      </div>
      <div className="search-bar-container">
        <SearchBar results={results} setResults={setResults} 
        setShowResults={setShowResults} setIndex={setSelectedIndex}
         showResults={showResults} handleSelectedItem={handleSelectedItem} setActive={setActive}/>
         {
          showResults && <SearchResultsList 
            results={results} selectedIndex={selectedIndex} 
            setSelectedIndex={setSelectedIndex} setShowResults={setShowResults}
            handleSelectedItem={handleListItemClick} active={active}
            />

         }
      </div>
    </div>
  )
}

export default App
