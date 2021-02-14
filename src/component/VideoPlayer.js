import React, {useState} from 'react';
import {fetchFile} from '@ffmpeg/ffmpeg';

function VideoPlayer(props) {
    const [gif, setGif] = useState();

    const convertToGif = async () => {
        // Write the file to memory
        props.ffmpegValue.FS('writeFile', props.videoValue.name, await fetchFile(props.videoValue));

        // Creare sottotitoli todo


        // Run the props.ffmpegValue command
        await props.ffmpegValue.run('-i', props.videoValue.name, '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

        // Read the result
        const data = props.ffmpegValue.FS('readFile', 'out.gif');

        // Create a URL
        const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));
        setGif(url)
    }
    return (
        <div className="flex flex-col items-center justify-center">
            {props.videoValue && <video
                controls
                src={URL.createObjectURL(props.videoValue)}>
            </video>
            }

            {props.videoValue && <button onClick={convertToGif}>Convert</button>}

            {gif && <img src={gif} width="250"/>}

        </div>
    );
}

export default VideoPlayer;