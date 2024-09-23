import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from "../hooks/useDebounce"; 
import { useOnClickOutside } from "usehooks-ts";
import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom'
import fetchWordSuggestion from '../services/fetchWordSuggestion';

const SearchField = (props) => {
    const [suggestions, setSuggestion] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const suggestMenuRef = useRef(null);
    const debouncedValue = useDebounce(searchWord, 500); // Debounced value

    const getWordSuggestion = useCallback(async (value) => {
        const data = await fetchWordSuggestion(value);
        setSuggestion(data);
    }, []);

    useEffect(() => {   
        if (!debouncedValue.trim()) {
          setIsFocus(false);
          return;
        }
    
        getWordSuggestion(debouncedValue);
    
        if (
          document.activeElement &&
          document.activeElement.id !== "search-field"
        ) {
          return setIsFocus(false);
        }
        setIsFocus(true);
    }, [debouncedValue, getWordSuggestion]);

    const getWordData = async (word) => {
        setSearchWord(word);
        setIsFocus(false);
    };

    useOnClickOutside(suggestMenuRef, () => {
        setIsFocus(false);
      });

    useEffect(() => {
        if (searchWord === "j") {
            setSearchWord("");
        }
    }, [searchWord]);

    return (
    <div className='flex-1 flex justify-center'>
        <div className='relative flex items-center justify-center border border-2 px-4 py-2 w-5/12 rounded-3xl'>
            <input
                className='text-base bg-transparent w-full focus:outline-none'
                onChange={(e) => {
                    setSearchWord(e.target.value);
                }}
                onFocus={() => {
                    setIsFocus(true);
                }}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        getWordData(searchWord);
                    }
                }}
                value={searchWord}
                placeholder='Search for query'
                id="search-field"
            />
            <FaSearch className='text-gray-500 text-lg cursor-pointer' />
            <div
                className={`absolute top-full left-0 w-full z-20 ${isFocus ? "block" : "hidden"}`}
                style={{ marginTop: "4px" }} // Adjust margin as needed
            >
                <div
                    ref={suggestMenuRef}
                    className="text-white bg-gray-600 max-h-96 custom-scroll-bar-2 overflow-y-auto rounded-md"
                >
                    {Array.isArray(suggestions) && suggestions?.map((word, index) => (
                        <Link to={`/search/word/${word?.kanji}`} key={index}>
                            <div
                                className="border-b-gray-500 px-4 py-3 border-b border-solid cursor-pointer"
                                onClick={() => {
                                    getWordData(word.kanji);
                                }}
                            >
                             
                                <div className="gap-x-3 flex">
                                        <span className="font-bold text-green-500">{word?.kanji}</span>
                                        <span className="text-red-400">{word?.reading}</span>
                                </div>
                                <div className="truncate">{word?.meaning}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export default SearchField;
