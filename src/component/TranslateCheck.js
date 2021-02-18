import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Swal from "sweetalert2";

const {
    REACT_APP_TRANSLATOR_SUBSCRIPTION_KEY,
    REACT_APP_TRANSLATOR_REGION,
    REACT_APP_TRANSLATOR_ENDPOINT
} = process.env;

export default function TranslateCheck(props) {

    const [textTranslated, setTextTranslated] = useState([]);
    const [isTranslationEnded, setIsTranslationEnded] = useState(false);

    useEffect(() => {
        if (props.videoInfo.state === "Processed") {
            var stringArray = [];
            props.videoInfo.videos[0].insights.transcript.forEach(element => {
                console.log(element.text);
                stringArray.push(element.text)
            });

            translateText(stringArray)
        }
    }, [props.videoInfo]);

    async function translateText(inputText) {
        console.log("traduco");

        var objArray = [];
        inputText.forEach(string => {
            objArray.push({
                'text': string.toString()
            });
        });

        let translateResponse;
        try {
            translateResponse = await axios.post(`${REACT_APP_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&to=` + props.selectedLanguage.code, objArray, {
                headers: {
                    'Ocp-Apim-Subscription-Key': `${REACT_APP_TRANSLATOR_SUBSCRIPTION_KEY}`,
                    'Ocp-Apim-Subscription-Region': `${REACT_APP_TRANSLATOR_REGION}`,
                    'Content-type': 'application/json'
                },
            })
        } catch (e) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was a problem during translation\'s process.'
            });
            return;
        }

        translateResponse.data.map((item, index) => {
            console.log("item " + index + ": " + item);
            console.log("item" + index + ": " + JSON.stringify(item));
        });

        setTextTranslated(translateResponse.data);
        setIsTranslationEnded(true);

        console.log("Sto creando il file per la Function App");
        const translationArray = [];
        props.videoInfo.videos[0].insights.transcript.map((item, index) => {
            const start = item.instances[0].adjustedStart;
            const originalText = item.text;
            const translatedText = translateResponse.data[index].translations[0].text;
            const end = item.instances[0].adjustedEnd;

            console.log(start, originalText, translatedText, end);
            const obj = {
                start: start,
                originalText: originalText,
                translatedText: translatedText,
                end: end
            };

            translationArray.push(obj);
        });
        console.log("Ho creato l'array", objArray);
        props.onTranslationEnd(translationArray);
    };

    return (
        <div>
            <div className="mb-4 mt-10 flex flex-col mx-auto">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Start
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Original
                                            Text
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Translated
                                            Text
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">End
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {!isTranslationEnded ?
                                        <tr>
                                            <td scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentence
                                                start
                                            </td>
                                            <td scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your
                                                original text
                                            </td>
                                            <td scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your
                                                translated text
                                            </td>
                                            <td scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentence
                                                end
                                            </td>
                                        </tr>
                                        :
                                        props.videoInfo.videos && props.videoInfo.videos[0].insights.transcript && props.videoInfo.videos[0].insights.transcript.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{item.instances[0].adjustedStart}</td>
                                                    <td scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">{item.text}</td>
                                                    <td scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                                        {
                                                            textTranslated && textTranslated[index] && textTranslated[index].translations[0] && textTranslated[index].translations[0].text
                                                            }
                                                        </td>
                                                        <td scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{item.instances[0].adjustedEnd}</td>
                                                    </tr>
                                                );
                                            })
                                    }
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