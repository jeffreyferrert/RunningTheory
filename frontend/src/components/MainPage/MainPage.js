import SearchBar from '../Searchbar';
import NavBarSearch from '../NavBar/NavBarSearch';
import './MainPage.css';

function MainPage() {
    return (
        <>

            <div id='landing-main-container'>

                <img id='main-img' src='/RunningTheory.jpg'></img>

                <div id='search-bar-container'>
                    <div id='main-text'>Get On Track</div>
                    <SearchBar />
                </div>
            </div>
            
        </>
    );
}

export default MainPage;