import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const Lists = () => {
    const [lists, setList] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        let response = await fetch('/api/flashcard/all/');
        let data = await response.json();
        setList(data);
    };

    console.log(lists)
    return (
        <div>
            <div className="lists">
                {lists.map((list, index) => (
                    <div key={index}>
                        <Link to={`/list/${list.id}`}>
                            <h3>{list.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lists;
