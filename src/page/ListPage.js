import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WordItem from '../components/WordItem'

const ListPage = ({match}) => {
    const { id } = useParams();
    const [words, setWord] = useState(null)
    const [listName, setName] = useState(null)

    useEffect(() => {
        getWord();
        // eslint-disable-next-line
    }, [id]);

    const getWord = async () => {
        let response = await fetch(`/api/flashcard/${id}/`);
        let data = await response.json();
        setWord(data.words);
        setName(data.name)
        console.log(data)
    };

    return (
        <div>
            <h1 className='mb-3 font-semibold'>{listName}</h1>
            {words && words.length > 0 && (
                <div className="list_detail">
                    {words.map((word, index) => (
                        <div key={index}>
                            <WordItem word={word} className={'flex flex-row p-1 rounded-xl hover:bg-gray-200 text-justify'}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListPage