import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';
import uuid from 'uuid'
import request from "request";

export default function TranslateCheck(props) {

    const [videoInfo, setVideoInfo] = useState([]);
    const {v4: uuidv4} = require('uuid');

    useEffect(() => {
        //translateText("2f05614515214f3cb8f91f9f49103184", "westeurope", "https://api.cognitive.microsofttranslator.com", ["hello", "world"])
    }, []);

    function translateText(subscriptionKey, region, endpoint, inputText) {
        var objArray = [];
        inputText.forEach(string => {
            objArray.push({
                'text': string.toString()
            });
        });

        let options = {
            method: 'POST',
            baseUrl: endpoint,
            url: 'translate',
            qs: {
                'api-version': '3.0',
                'to': ['it']
            },
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            body: objArray,
            json: true,
        };

        request(options, function (err, res, body) {
            // TODO Controlla se ci sono errori

            setVideoInfo(body);
        });
    };

    return (
        <div>
            <div className=" my-4 flex flex-col w-10/12 mx-auto">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Start
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Original Text
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Translated Text
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            End
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {videoInfo.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full"
                                                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                                                         alt=""/>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        Jane Cooper
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        jane.cooper@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
                                            <div className="text-sm text-gray-500">Optimization</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>{item.translations[0].text}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            Admin
                                        </td>
                                    </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}