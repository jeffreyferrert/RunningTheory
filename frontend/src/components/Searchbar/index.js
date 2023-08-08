import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import './Searchbar.css'

function SearchBar() {
    const history = useHistory();
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/tracks?search=${input}`);
        setInput('');
    }

    return (
        <div id='searchbar-container'>
            <form onSubmit={handleSubmit}>
                <input
                    id='nav-search'
                    type="text"
                    placeholder="Search..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />
                <button type='submit' hidden />
            </form>
        </div>
    )
}



export default SearchBar