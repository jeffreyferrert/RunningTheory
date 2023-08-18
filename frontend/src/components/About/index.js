import './About.css';
import { useState } from 'react';

function AboutUs() {
    const [menu1, setMenu1] = useState(false);
    const [menu2, setMenu2] = useState(false);
    const [menu3, setMenu3] = useState(false);
    const [menu4, setMenu4] = useState(false);

    const open1 = () => { setMenu1(true) };
    const close1 = () => { setMenu1(false) };
    const open2 = () => { setMenu2(true) };
    const close2 = () => { setMenu2(false) };
    const open3 = () => { setMenu3(true) };
    const close3 = () => { setMenu3(false) };
    const open4 = () => { setMenu4(true) };
    const close4 = () => { setMenu4(false) };

    return (

        <div id='about-main-container'>
            <div id='title'>About the App</div>
            <div id='app-body'>With a competitive spirit at heart, Running Theory was born. The application 
                is aimed at runners who seek to prove their capabilities by allowing users to create unique tracks and post their best times
                for a chance to have thier track hosted as the weekly event! By giving users a planned event, the application aims to drive enagagment
                and allow those with a passion for running to see how they stack up against other runners</div>
            <div id='title'>The Team</div>
            <div id='team-container'>
            <div id='one'><img  className='team-img' src='/comp-emoji.png'/><div className='position'>Backend Lead</div>
            <div className="links-auth">

                    {menu1 ? <>
                   <div id='both-cont' onMouseEnter={open1} onMouseLeave={close1}> <div id='main-drop-cont-signin'> <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link'>Jeffrey Ferrer</a>
                        </div>
                        </div>
                        </div>
                        <div id='extender-container-signin'>
                                <div id='icons'>
                                    <div className='symbol'><a href=''><i className="fa-brands fa-github fa-2xl" style={{fontSize: '3em', color: "#000000"}}></i></a></div>
                                    <div id='linked'className='symbol'> <a href=''><i className="fa-brands fa-linkedin fa-2xl" style={{fontSize: '3em', color: "#0a66c2"}}></i></a></div>
                                    </div>
                                </div>
                           </div>
                    </> : <div id='both-cont' onMouseEnter={open1} onMouseLeave={close1}> <div id='main-drop-cont-signin' > <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link' to={'/tracks'}>Jeffrey Ferrer</a>
                        </div> </div> </div>  </div>}
        </div></div>
            
            <div id='two'><img  className='team-img' src='/comp-emoji.png'/><div className='position'>The Lead</div>
            <div className="links-auth">

                    {menu2 ? <>
                   <div id='both-cont' onMouseEnter={open2} onMouseLeave={close2}> <div id='main-drop-cont-signin'> <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link'>Jason Staubach </a>
                        </div>
                        </div>
                        </div>
                        <div id='extender-container-signin'>
                                <div id='icons'>
                                    <div className='symbol'><a href=''><i className="fa-brands fa-github fa-2xl" style={{fontSize: '3em', color: "#000000"}}></i></a></div>
                                    <div id='linked'className='symbol'> <a href=''><i className="fa-brands fa-linkedin fa-2xl" style={{fontSize: '3em', color: "#0a66c2"}}></i></a></div>
                                    </div>
                                </div>
                           </div>
                    </> :<div id='both-cont' onMouseEnter={open2} onMouseLeave={close2}> <div id='main-drop-cont-signin' > <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link' to={'/tracks'}>Jason Staubach </a>
                        </div> </div> </div> </div>}
        </div></div>
            <div id='three'><img  className='team-img' src='/comp-emoji.png'/><div className='position'>Frontend Lead</div>
            <div className="links-auth">

                    {menu3 ? <>
                   <div id='both-cont' onMouseEnter={open3} onMouseLeave={close3}> <div id='main-drop-cont-signin'> <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link'>Josh Kim</a>
                        </div>
                        </div>
                        </div>
                        <div id='extender-container-signin'>
                                <div id='icons'>
                                    <div className='symbol'><a href=''><i className="fa-brands fa-github fa-2xl" style={{fontSize: '3em', color: "#000000"}}></i></a></div>
                                    <div id='linked'className='symbol'> <a href=''><i className="fa-brands fa-linkedin fa-2xl" style={{fontSize: '3em', color: "#0a66c2"}}></i></a></div>
                                    </div>
                                </div>
                           </div>
                    </> : <div id='both-cont' onMouseEnter={open3} onMouseLeave={close3}> <div id='main-drop-cont-signin' > <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link' to={'/tracks'}>Josh Kim</a>
                        </div> </div> </div>  </div>}
        </div></div>
            <div id='four'><img  className='team-img' src='/comp-emoji.png'/><div className='position'>Flex Lead</div>
            <div className="links-auth">

                    {menu4 ? <>
                   <div id='both-cont' onMouseEnter={open4} onMouseLeave={close4}> <div id='main-drop-cont-signin'> <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link'>Juan Avila</a>
                        </div>
                        </div>
                        </div>
                        <div id='extender-container-signin'>
                                <div id='icons'>
                                    <div className='symbol'><a href=''><i className="fa-brands fa-github fa-2xl" style={{fontSize: '3em', color: "#000000"}}></i></a></div>
                                    <div id='linked'className='symbol'> <a href=''><i className="fa-brands fa-linkedin fa-2xl" style={{fontSize: '3em', color: "#0a66c2"}}></i></a></div>
                                    </div>
                                </div>
                           </div>
                    </> : <div id='both-cont' onMouseEnter={open4} onMouseLeave={close4}> <div id='main-drop-cont-signin' > <div id='user-all-container-signin'> 
                        <div id='all-tracker'>
                        <a id='all-tracks-signin' className='button-link' to={'/tracks'}>Juan Avila</a>
                        </div> </div> </div>  </div>}
        </div></div>
            </div>
        </div>
    )

}


export default AboutUs