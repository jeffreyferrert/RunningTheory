// MainPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './MainPage.css';
import lupa from "../assets/lupa.png";

function MainPage() {
    const [input, setInput] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/tracks?search=${input}`);
        setInput('');
    };

    return (
        <div className='landing-main-container'>
            <img className='main-img' alt='lp-img' src='/RunningTheory.jpg' />
            <div className='search-bar-container'>
                <div className='main-text'>Get On Track</div>
                <form onSubmit={handleSubmit} className='topbar-form'>
                    <input
                        type='text'
                        placeholder='Search...'
                        maxLength='240'
                        className='topbar-search'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <img src={lupa} alt='lupa' className='topbar-lupa' />
                </form>
            </div>
        </div>
    );
}

export default MainPage;
