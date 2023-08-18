import './About.css';
import { useState } from 'react';

function AboutUs() {
const [menu, setMenu] = useState(false)



const open = () => {

    setMenu(true)

  }


const close = () => {

    setMenu(false)

}


    return (

        <div id='about-main-container'>
            <div id='title'>About the App</div>
            <div id='app-body'>With a competitive spirit at heart, Running Theory was born. The application 
                is aimed at runners who seek to prove their capabilities by allowing users to create unique tracks and post their best times
                for a chance to have thier track hosted as the weekly event! By giving users a planned event, the application aims to drive enagagment
                and allow those with a passion for running to see how they stack up against other runners</div>
            <div id='title'>The Team</div>
            <div id='team-container'>
            <div id='one'><img  className='team-img' src='/comp-emoji.png'/></div>
            <div id='two'><img  className='team-img' src='/comp-emoji.png'/></div>
            <div id='three'><img  className='team-img' src='/comp-emoji.png'/></div>
            <div id='four'><img  className='team-img' src='/comp-emoji.png'/></div>
            </div>
        </div>
    )

}


export default AboutUs