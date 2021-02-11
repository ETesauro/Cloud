import React from 'react'
import content from "../content/content";

export default function Navbar() {
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: "black",
                height: 3
            }}
        />
    );

    return (
        <div>
            <div className="flex items-center justify-between w-10/12 mx-auto py-8 text-black font-dosis">
                <h1 className="text-3xl font-bold">
                    {content.nav.logo} {' '}
                    <span className="w-3 h-3 bg-red-500 inline-block rounded-full"/>
                </h1>

                <div>
                    {content.nav.links.map((link, index) => {
                        return <span key={index} className="text-xl mr-4">{link.text}</span>
                    })}
                </div>
            </div>

            <div className="w-10/12 mx-auto justify-center">
                <ColoredLine />
            </div>
        </div>
    );
}