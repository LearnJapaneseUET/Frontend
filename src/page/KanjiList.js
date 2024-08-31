import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';

const KanjiList = () => {
    const [words, setList] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/flashcardwordlist/');
        let data = await response.json();
        setList(data);
    };

    return (
        <div>
            <div className="word-list">
                {words.map((word, index) => (
                    <div key={index}>
                        <ListItem key={index} word={word}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanjiList;
