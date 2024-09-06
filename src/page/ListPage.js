import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WordItem from '../components/WordItem'

const ListPage = ({match}) => {
    const { id } = useParams();
    const [words, setWord] = useState(null)

    useEffect(() => {
        getWord();
        // eslint-disable-next-line
    }, [id]);

    const getWord = async () => {
        let response = await fetch(`/api/flashcard/${id}/`);
        let data = await response.json();
        setWord(data);
        console.log(data)
    };

    return (
        <div>
            {words && words.length > 0 && (
                <div className="list_detail">
                    {words.map((word, index) => (
                        <div key={index}>
                            <WordItem word={word} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListPage