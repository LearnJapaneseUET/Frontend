import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListView from '../components/ListView';
import AnimationCard from '../components/AnimationCard';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";


const ListPage = ({match}) => {
    const { listId } = useParams();
    const [words, setWord] = useState(null)
    const [listName, setName] = useState(null)
    const [isLearning, setIsLearning] = useState(false)

    useEffect(() => {
        getWord();
        // eslint-disable-next-line
    }, [listId]);

    const getWord = async () => {
        let response = await fetch(`/api/flashcard/${listId}/`);
        let data = await response.json();
        setWord(data.words);
        setName(data.name)
        console.log(data)
    };

    return (
        <div>
            <div className='flex justify-between mx-10'>
                <h1 className='mb-3 font-semibold'>{listName}</h1>
                <div className='bg-dark-green text-white font-semibold text-xl cursor-pointer p-2 rounded-xl' 
                      onClick={() => setIsLearning(!isLearning)}>
                    {isLearning ? 
                        <div className='inline-flex items-center justify-center'> 
                            <p><FaArrowLeft className='mr-2'/></p>
                            <p> Danh sách từ vựng </p>
                        </div> : 
                        <div className='inline-flex items-center justify-center'> 
                            <p> Thẻ ghi nhớ </p>
                            <p><FaArrowRight className='ml-2'/></p>
                        </div>
                    }
                </div>
            </div>
            <div>
                {/* {words && words.length > 0 && (
                    <div className="list_detail">
                        {words.map((word, index) => (
                            <div key={index}>
                                <WordItem word={word} className={'flex flex-row p-1 rounded-xl hover:bg-gray-200 text-justify'}/>
                            </div>
                        ))}
                    </div>
                )} */}
                {isLearning ? <AnimationCard words={words}/> : <ListView words={words} fetchWord={getWord}/>}
            </div>
        </div>
    )
}

export default ListPage