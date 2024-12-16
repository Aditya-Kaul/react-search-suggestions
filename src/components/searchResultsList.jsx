import React, {useRef, useEffect, useCallback} from "react";
import "./searchResultList.css"
import { SearchResults } from "./searchResults";

export const SearchResultsList = ({results, selectedIndex, setSelectedIndex, setShowResults, handleSelectedItem, active}) => {
    const containerRef = useRef(null);

    function setChange() {
        const selected = containerRef?.current?.querySelector(".active");
        if (selected) {
          selected?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }
      }

    useEffect(() => {
        const clickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [setShowResults]);

    return (
    <div className="result-list" role="listbox" id="search-city-list"
    aria-label="Search User Results" ref={containerRef} >        
        {
            results.map((result,idx) => {
                let className = '';
                if (idx === active) {
                    className = "active";
                }
                setTimeout(() => {
                    setChange();
                }, [100]);
                return <SearchResults
                key={idx} 
                result={result}    
                isSelected={idx === selectedIndex}
                className={className}
                 onClick={() => {
                    setSelectedIndex(idx)
                    handleSelectedItem(result);
                 }}
                 />
            })
        }
    </div>
    )
}

