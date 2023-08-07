import SearchBar from '../Searchbar';
import './MainPage.css';

function MainPage() {
    return (
        <>
            <p>RT LANDING PAGE</p>

            <div id='landing-main-container'>

                <img id='main-img' src='/RunningTheory.jpg'></img>

                <div id='search-bar-container'>
                    <div id='main-text'>Get On Track</div>
                    <SearchBar />
                </div>

                <div id='page-divider'> <div id="circle"></div></div>


                <div id='bottom-info-containers'>
                    <div id='upcoming-container'>
                            upcoming event
                    </div>

                    <div id='leaderboard-container'>
                        leaderboard
                    </div>
                </div>
                
            </div>
            
        </>
    );
}

export default MainPage;