import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, composeTrack } from '../../store/tracks';
import TrackBox from './TrackBox';
import './TrackCompose.css';
import MapTrackForm from '../Map/MapTrackForm';
import MapTrackDefault from '../Map/MapTrackDefault';

function TrackCompose() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [miles, setMiles] = useState(0);
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const author = useSelector(state => state.session.user);
    const newTrack = useSelector(state => state.tracks.new);
    const errors = useSelector(state => state.errors.tracks);
    const [city, setCity] = useState('');
    const [startAddress, setStartAddress] = useState('');
    const [endAddress, setEndAddress] = useState('');
    const [mapForm, setMapForm] = useState(false);
  
    useEffect(() => {
        return () => dispatch(clearTrackErrors());
    }, [dispatch, mapForm]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composeTrack({author, name, location, miles, description }));
        setName('');
        setLocation('');
        setMiles(0);
        setDescription('');
    };
  
    
    const handleReset = (e) => {
        e.preventDefault();
        
        setMapForm(false)
        
    }
    
    const handleClick = (e) => {
        
        e.preventDefault();
        
        setMapForm(true)
    }
    
    const track = { startAddress: startAddress, endAddress: endAddress}


    return (
        <>

        <div id='create-track-main'>
                <form className="compose-track" onSubmit={handleSubmit}>
                    <div id='form-cont'>
                     <div id='title-cont'>
                        <div id='create-title' className='shine'>Create Your Track</div>
                        </div>
                        <div > Give Your Track A Name
                        <input 
                            className='form-box'
                            type="textarea"
                            value={name}
                            onChange={e => setName(e.currentTarget.value)}
                            placeholder="Write the track name..."
                            required
                        />
                        </div>
                        <div > Address, or Nearby City
                        <input
                            className='form-box'
                            type="textarea"
                            value={city}
                            onChange={e => setCity(e.currentTarget.value)}
                            placeholder="Write your track location..."
                            required
                        />
                        </div>
                        <div  > Start Location
                        <input
                            className='form-box'
                            type="textarea"
                            value={startAddress}
                            onChange={e => setStartAddress(e.currentTarget.value)}
                            placeholder="Write your track location..."
                            required
                        />
                        </div>
                        <div > End Location
                        <input
                            className='form-box'
                            type="textarea"
                            value={endAddress}
                            onChange={e => setEndAddress(e.currentTarget.value)}
                            placeholder="Write your track location..."
                            required
                        />
                        </div>
                        <div id='address-check'>
                            <button  id='button-form1' className='form-box-button' onClick={handleClick}>Check Address</button>
                            <button id='button-form2' className='form-box-button'onClick={handleReset}>Reset Address</button>
                        </div>
                        <div >Input The Approximate Distance in Miles
                        <input
                            className='form-box'
                            type="number"
                            value={miles}
                            onChange={e => setMiles(e.currentTarget.value)}
                            placeholder="Write your track miles..."
                            required
                        />
                        
                        </div>
                        <div > Tell Us About Your Track
                        <input
                            className='form-box'
                            type="textarea"
                            value={description}
                            onChange={e => setDescription(e.currentTarget.value)}
                            placeholder="Write your track description..."
                            required
                        />
                        </div>
                        <div>
                            <div className="errors">{errors?.text}</div>
                        </div>
                        <div>
                        <input id='form-submit' className='form-box-button' type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
                    <div id='form-map'>
                    {mapForm ? <MapTrackForm track={track} /> :  <MapTrackDefault />}
                    </div>
            </div>

            <div className="previous-track">
                {newTrack ? (<>  <h3>Track Created</h3> <TrackBox track={newTrack} /> </>) : undefined}
            </div>

        </>
    )
}

export default TrackCompose;
