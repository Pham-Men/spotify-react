import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import "./IsPlaying.css";
import { useSelector } from 'react-redux';
import { selectorPlayer } from '../../selector';

function IsPlaying() {

    const islayer = useSelector(selectorPlayer)

    return (
        <>

            <AudioPlayer
                src={islayer.currentUrl}
                autoPlay
                entTime="Loading"
                layout="horizontal-reverse"
                customAdditionalControls={
                    [
                        <div>
                            {islayer.img && <img className='customImg' src={islayer.img} alt='Audio'/>}
                            
                        </div>,
                        <div className='customDiv'>
                            <p className='customText customTitle'>{islayer.currentTrackName}</p>
                            <p className='customText'>{islayer.artistName}</p>
                        </div>,
                    ]
                    
                }
            />
        </>
    )
}

export default IsPlaying