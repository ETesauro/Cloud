import React, {useEffect, useState} from 'react';
import Navbar from "./component/Navbar";
import Body from "./component/Body";
import Footer from "./component/Footer";
import {createFFmpeg} from '@ffmpeg/ffmpeg';
import Loading from "./component/Loading";
import {CSSTransition} from "react-transition-group";

const ffmpeg = createFFmpeg({log: true});

function App() {
    //FFMpeg
    const [ready, setReady] = useState(false);

    useEffect(() => {
        load();
    }, [])
    const load = async () => {
        await ffmpeg.load().catch(err => {
            console.log(err);
        });
        setReady(true);
    }

    return ready ? (
            <CSSTransition appear={true} in={ready} timeout={200} classNames="fade">
                <div className="font-dosis">
                    <Navbar/>
                    <Body ffmpegValue={ffmpeg}/>
                    <Footer/>
                </div>
            </CSSTransition>
        )
        :
        <Loading isLoading={!ready}/>;
}

export default App;