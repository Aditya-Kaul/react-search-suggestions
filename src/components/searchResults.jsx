import React from 'react';
import "./searchResult.css"

export const SearchResults = ({result, isSelected, className, onClick}) => {
    return (
        <div className={`search-result ${isSelected ? "selected" : ""} ${className}`} 
        onClick={onClick}
        aria-selected={isSelected}
        >
            {result.city}
        </div>
    )
}


