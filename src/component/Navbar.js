import React from 'react'
import content from "../content/content";

export default function Navbar() {

    return (
        <div>
            <div style={{background:'linear-gradient(to right, #2f3542, #57606f)'}}>
                <div className="w-10/12 flex items-center justify-between mx-auto text-black font-dosis mx-auto">
                    <h1 className="text-3xl font-bold">
                        <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} className="w-1/12 py-3"/>
                    </h1>

                    <div>
                        {content.nav.links.map((link, index) => {
                            return <span key={index} className="text-xl mr-4 text-white">{link.text}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}