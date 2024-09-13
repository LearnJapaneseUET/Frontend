import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import FlashCardListBox from '../components/FlashCardListBox';
import ExampleDisplay from '../components/ExampleDisplay'

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const KanjiExplainDetail = () => {
    const { searchTerm } = useParams();

    const [meanings, setMeaning] = useState([]);
    //const [examples, setExample] = useState([]);
    const [comments, setComment] = useState([]);
    const [svgData, setSvgData] = useState(null); // Sử dụng state để lưu dữ liệu SVG
    const [detailParts, setDetailParts] = useState([]);
    const [selectedList, setSelectedList] = useState(null); // Thêm state để lưu giá trị của list đã chọn

    useEffect(() => {
        const getData = async () => {
        try {
            let response = await fetch(`/api/dictionary/search/kanji/${searchTerm}`);
            let data = await response.json();

            setMeaning(data.meaning);
            //setExample(data.example);
            setComment(data.comment);
            setSvgData(data.kanjiArt.replace(/ns[0-9]+:/g, '')
                                    .replace(/xmlns(:[a-z0-9]+)?="[^"]+"/g, ''));
            
            const parts = data.meaning.detail.split('##').map(part => part.trim());
            setDetailParts(parts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        getData();
    }, [searchTerm]); // Chạy lại khi searchTerm thay đổi

    // Hàm callback để nhận giá trị từ FlashCardListBox
    const handleListChange = (selectedOption) => {
        setSelectedList(selectedOption);
        console.log("Received list from FlashCardListBox:", selectedOption);
    };

    return (
        <div className='border-4 border-[#f4f4f4] h-[82svh] w-full rounded-xl px-6 py-4 custom-scroll-bar-2 overflow-y-auto'>
            <div className="flex mb-4">
                <div className="ml-8 w-[70svh]">
                    <div className="flex items-center">
                        <div className="w-[10svh] flex-shrink-0 p-1 rounded-lg bg-[#C8FFD4] mr-2 my-1 font-medium"> Hán tự: </div>
                        <div>
                            {meanings?.kanji} - {meanings?.mean}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[10svh] flex-shrink-0 p-1 rounded-lg bg-[#C8FFD4] mr-2 my-1 font-medium content-center"> Kunyomi: </div>
                        <div>
                            {meanings?.kun}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[10svh] flex-shrink-0 p-1 rounded-md bg-[#C8FFD4] mr-2 my-1 font-medium content-center"> Onyomi: </div>
                        <div>
                            {meanings?.on}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[10svh] flex-shrink-0 p-1 rounded-md bg-[#C8FFD4] mr-2 my-1 font-medium"> Số nét: </div>
                        <div>
                            {meanings?.stroke_count}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[10svh] flex-shrink-0 p-1 rounded-md bg-[#C8FFD4] mr-2 my-1 font-medium"> JLPT: </div>
                        <div>
                            {meanings?.level?.[0]}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-[10svh] flex-shrink-0 p-1 rounded-md bg-[#C8FFD4] mr-2 my-1 font-medium content-center"> Nghĩa: </div>
                        <div className="flex-grow">
                            {detailParts.map((part, index) => (
                                <div key={index}>
                                    {part}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cn("kanji-text flex flex-col", 'w-[22svh] max-h-20 ml-auto')}>
                    <FlashCardListBox onSelectListChange={handleListChange} />
                    <div dangerouslySetInnerHTML={svgData ? { __html: svgData } : undefined} />
                </div>
            </div>
            
            <ExampleDisplay meanings={meanings} listId={selectedList}/>

            <div className='word_comment'>
                <FaRegComments className='text-2xl mr-2 text-red-orange'/>
                <div>
                    {comments && Object.keys(comments).length > 0 ? (
                    Object.keys(comments).map((key, idx) => (
                        <div key={idx} className="ml-8 my-3 pb-2 border-b-2">                                    
                            <p>{comments[key].mean}</p>
                            <p className='flex justify-between'>
                                <div className='inline-flex items-center mt-1'>
                                    <span className='mr-3 inline-flex items-center'>
                                        <AiOutlineLike className='mr-1 text-blue-500'/> {comments[key].like}
                                    </span>
                                    <span className='inline-flex items-center'>
                                        <AiOutlineDislike className='mr-1 text-red-500'/> {comments[key].dislike}
                                    </span>
                                </div>
                                <div>
                                    <p>{comments[key].username}</p>
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
};

export default KanjiExplainDetail;
