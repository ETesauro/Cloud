import React, {useEffect, useState} from 'react';
import Navbar from "./component/Navbar";
import TranslateCheck from "./component/TranslateCheck";
import Body from "./component/Body";
import Footer from "./component/Footer";
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import Loading from "./component/Loading";

const ffmpeg = createFFmpeg({log: true});

function App() {
    //FFMpeg
    const [ready, setReady] = useState(false);
    useEffect(() => {
        load();
    }, [])
    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    }

    return ready ? (
            <div>
                <Navbar/>
                <Body ffmpegValue={ffmpeg}/>
                <Footer/>
            </div>
        )
        :
        <Loading/>;
}

export default App;
