import React, {useState, useCallback} from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css"
import { debounce } from "lodash";

export const SearchBar = ({ results, setResults, setShowResults, setIndex, showResults, handleSelectedItem, setActive}) => {
    const [input, setInput] = useState("");

    const fetchData = useCallback((value) => {
        fetch('/src/assets/mockData.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((json) => {
            const filteredResults = json.filter((item) => {
                return (
                    value &&
                    item && 
                    item.city && 
                    item.city.toLowerCase().includes(value.toLowerCase())
                )
            });
            setResults(filteredResults); 
            setIndex(-1);
            setActive(0);
            setShowResults(filteredResults.length > 0);
        })
        .catch((err) => {
            console.error('Error fetching data:', err);
            setResults([]);
            setIndex(-1);
            setShowResults(false);
        })
    }, [setResults, setIndex, setActive, setShowResults]);


    const debounced = useCallback(debounce(fetchData, 500), [fetchData]);
    const handleChange = (value) => {
        setInput(value)
        debounced(value);
    }

    

    const handleKeyDown = useCallback((e) => {
        if (!showResults) return;

        if(e.target.value.length === 0) {
            setIndex(-1);
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setIndex((prevIndex) => 
                    prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
                );
                
                setActive((prevActive) => 
                    prevActive < results.length - 1 ? prevActive + 1 : prevActive
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setIndex((prevIndex) => 
                    prevIndex > 0 ? prevIndex - 1 : prevIndex
                );
                setActive((prevActive) => 
                    prevActive > 0 ? prevActive - 1 : prevActive
                );
                break;
            case 'Enter':
                e.preventDefault();
                handleSelectedItem();
                break;
            case 'Escape':
                setShowResults(false);
                setIndex(-1);
                break;
        }
    }, [showResults, results.length, setIndex, setActive, handleSelectedItem, setShowResults]);


    return (
    <div className="input-wrapper" >
        <FaSearch id="search-icon" />
        <input type="text" placeholder="Type to search" 
        value={input} 
        onChange={(e) => handleChange(e.target.value) }
        onKeyDown={handleKeyDown}
        aria-label="Search cities"
        aria-autocomplete="list"
        aria-controls="search-city-list"
        />
    </div>
    )
}


