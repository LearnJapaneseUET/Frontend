import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { AiOutlineSound } from "react-icons/ai";
import textToSpeech from '../components/TextToSpeech';
import { FaRegComments } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { TbPinFilled } from "react-icons/tb";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import ExampleImg from '../components/ExampleImg';
import FlashCardListBox from '../components/FlashCardListBox';
import { FiPlusCircle } from "react-icons/fi";
import fetchWordList from '../services/fetchWordList';
import fetchWordData from '../services/fetchWordData';
import isWordInList from '../utils/checkWordInList';
import addWord from '../services/addWord'


const WordExplainDetail = () => {
    const { searchTerm } = useParams(); // Destructure the specific parameter
    
    console.log(searchTerm);
    const [meanings, setMeaning] = useState([]);
    const [examples, setExample] = useState([]);
    const [comments, setComment] = useState([]); 
    const [selectedList, setSelectedList] = useState(null);
    const [isInList, setIsInList] = useState(true);

    const kindMapping = {
        n: "danh từ",
        vs: "danh từ động từ",
        adj: "tính từ",
        adv: "trạng từ",
        // Thêm các ánh xạ khác nếu cần
    };
    

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchWordData(searchTerm);
                setMeaning(data.meaning);
                setExample(data.example);
                setComment(data.comment);
                // Cập nhật selectedList khi searchTerm thay đổi
                if (selectedList) {
                    const wordList = await fetchWordList(selectedList);
                    setIsInList(isWordInList(searchTerm.trim(), wordList.words));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, [searchTerm, selectedList]); // Thêm selectedList vào dependency array

    const kanjiCharacters = searchTerm?.split('')?.map((char, index) => ({
        char,
        index,
    }));

    // Đảm bảo `handleListChange` là một hàm
    const handleListChange = async (selectedOption) => {
        console.log("Selected Option:", selectedOption);
        const data = await fetchWordList(selectedOption); // Fetch danh sách từ của list được chọn
        setSelectedList(selectedOption);
        setIsInList(isWordInList(searchTerm.trim(), data.words));
    };

    const handleSaveWord = async () => {
        console.log("selectedList", selectedList, "searchTerm:", searchTerm)
        if (selectedList && searchTerm) {
            const result = await addWord(searchTerm, selectedList);

            if (result.success) {
                // Update wordList or show a success message
                console.log('Word added successfully');
                setIsInList(true)                
            } else {
                // Show an error message
                console.error('Failed to add word:', result.message);
            }
        }
    };
    

    return (
        <div className='relative border-4 border-[#f4f4f4] h-[82svh] w-full rounded-xl p-3 custom-scroll-bar-2 overflow-y-auto'>
            <div className="absolute top-3 right-3">
                <FlashCardListBox onSelectListChange={handleListChange}/>
            </div>
            <div>
                <div className='flex flex-row items-center'>
                    <h1 className='text-5xl font-semibold text-dark-green'>
                        {kanjiCharacters?.map((kanji, idx) => (
                            <Link to={`/search/kanji/${kanji.char}`}>
                                <span key={idx} className='cursor-pointer hover:text-blue-500'>
                                    {kanji?.char}
                                </span>
                            </Link>
                        ))}
                    </h1>
                    {!isInList ? 
                        <FiPlusCircle className='ml-3 text-3xl text-green-500 cursor-pointer' onClick={() => handleSaveWord()}/> 
                    : 
                        ""
                    }
                </div>
                <p className='font-medium text-red-orange mb-2 mt-6'>
                    {meanings?.phonetic}
                </p>
                <p className='text-2xl m-2'>
                    <AiOutlineSound 
                        onClick={() => textToSpeech(searchTerm)} // Gọi hàm khi bấm vào biểu tượng
                        className='cursor-pointer'
                    />
                </p>
                <p className='inline-flex items-center mx-2 text-red-600'>
                    <CiStar />
                    {meanings?.means?.length > 0 ? (
                        meanings?.means?.map((mean, index) => (
                            <span key={index}>{
                                mean?.kind?.split(', ')?.map((kindItem, i, arr) => (
                                    <span key={i} className='mx-1'>
                                        {kindMapping[kindItem] || kindItem}
                                        {i < arr.length - 1 && ','}    
                                    </span> // Hiển thị từng phần tử
                                ))}
                            </span>
                        ))
                    ) : (
                        <span></span> // Hoặc hiển thị nội dung khác nếu không có dữ liệu
                    )}
                </p>
            </div>
            <div className='word_meaning'>
                <div>
                    <div>
                        {meanings?.means?.length > 0 ? (
                            meanings?.means?.map((mean, index) => (
                                <div key={index}>
                                    <p className='inline-flex items-center m-2 text-blue-700 text-lg'>
                                        <TbPinFilled className='text-2xl mr-1 text-red-orange'/> 
                                        <span className='text-xl'>{mean?.mean}</span>
                                    </p>
                                    {mean?.examples && mean?.examples?.length > 0 ? (
                                    mean?.examples?.map((example, idx) => (
                                    <div key={idx} className='ml-8'>
                                        <p className='inline-flex items-center text-lg '>
                                            <span className='text-red-600'>{example?.content}</span>
                                            <AiOutlineSound 
                                                onClick={() => textToSpeech(example?.transcription)} // Gọi hàm khi bấm vào biểu tượng
                                                className='cursor-pointer ml-2'
                                            />
                                        </p>
                                        <p>{example?.mean}</p>
                                    </div>
                                    ))
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <span></span> // Hoặc hiển thị nội dung khác nếu không có dữ liệu
                        )}
                        <div>
                            {examples && Object.keys(examples).length > 0 ? (
                            Object.keys(examples)?.map((key, idx) => (
                                <div key={idx} className="ml-8 my-2">                                    
                                    {/* Hiển thị nội dung (content) */}
                                    <p className="inline-flex items-center text-lg">
                                        <span className='text-red-600'>{examples[key]?.content}</span>
                                        <  AiOutlineSound 
                                            onClick={() => textToSpeech(examples[key]?.transcription)} // Gọi hàm khi bấm vào biểu tượng
                                            className='cursor-pointer ml-2'
                                        />
                                    </p>
                                    {/* Hiển thị nghĩa (mean) */}
                                    <p>{examples[key]?.mean}</p>
                                </div>
                            ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='example_img'>
                <ExampleImg word={searchTerm}/>
            </div>

            <div className='word_comment'>
                <FaRegComments className='text-2xl mr-2 text-red-orange'/>
                <div>
                    {comments && Object.keys(comments).length > 0 ? (
                    Object.keys(comments)?.map((key, idx) => (
                        <div key={idx} className="ml-8 my-3 pb-2 border-b-2">                                    
                            <p>{comments[key]?.mean}</p>
                            <p className='flex justify-between'>
                                <div className='inline-flex items-center mt-1'>
                                    <span className='mr-3 inline-flex items-center'>
                                        <AiOutlineLike className='mr-1 text-blue-500'/> {comments[key]?.like}
                                    </span>
                                    <span className='inline-flex items-center'>
                                        <AiOutlineDislike className='mr-1 text-red-500'/> {comments[key]?.dislike}
                                    </span>
                                </div>
                                <div>
                                    <p>{comments[key]?.username}</p>
                                </div>
                            </p>
                        </div>
                    ))
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WordExplainDetail;
