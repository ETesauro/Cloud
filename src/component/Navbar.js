import React from 'react'
import content from "../content/content";

export default function Navbar() {

    return (
        <div>
            <div className="flex items-center justify-between w-10/12 mx-auto text-black font-dosis">
                <h1 className="text-3xl font-bold">
                    <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} className="w-1/12 py-3"/>
                </h1>

                <div>
                    {content.nav.links.map((link, index) => {
                        return <span key={index} className="text-xl mr-4">{link.text}</span>
                    })}
                </div>
            </div>
        </div>
    );
}