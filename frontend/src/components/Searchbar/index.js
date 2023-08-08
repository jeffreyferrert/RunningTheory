import React from "react";
import { useState } from "react";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './Searchbar.css'

function SearchBar() {
    const [searchText, setSearchText] = useState()
    const [timer, setTimer] = useState(0);
    const searchResults = useSelector(state => Object.values(state.search))
    const history = useHistory();
    const dispatch = useDispatch();

    function handleSearch(e) {
        const query = e.target.value

        setSearchText(query)
        clearTimeout(timer)

        if (query.trim() !== "") {
            setTimer(setTimeout(() => dispatch(fetchSearchResults(query)), 300));
        } else {
            dispatch(clearSearchResults);
            setSearchText("")
        }
    }


    function handClick(id) {

        return (e) => {
            e.preventDefault();
            history.push(`/products/${id}`)
            dispatch(clearSearchResults)
        }

    }

    function handleSubmit(e) {
        e.preventDefault();

        if (searchText.trim() !== '') {
            history.push(`/search?query=${searchText}`)
        }
    }

    return (
        <div id="searchbar-container">
            <input 
            type='text' 
            id='search-input' 
            value={searchText} 
            placeholder='Search for tracks'
            onChange={handleSearch}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit()
                }
            }}
            />
           
           <button id='search-button' onClick={handleSubmit}>
            <i id='mag' className="fa-solid fa-magnifying-glass">S</i> 
           </button>
            {searchText && searchResults && <ul id='search-dropdown'>
                {searchResults.map(result => { 
                    return <li className="search-dropdown-item" onClick={handClick(result.id)}>{result.name}</li>
                })}
            </ul>}
        </div>
    )

}



export default SearchBar