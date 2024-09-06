import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import WordItem from '../components/WordItem'


function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ExampleComponent = () => {
    const { searchTerm } = useParams();

    console.log(searchTerm);

    const [meanings, setMeaning] = useState([]);
    const [examples, setExample] = useState([]);
    const [comments, setComment] = useState([]);
    const [svgData, setSvgData] = useState(null); // Sử dụng state để lưu dữ liệu SVG
    const [detailParts, setDetailParts] = useState([]);

    useEffect(() => {
        const getData = async () => {
        try {
            let response = await fetch(`/api/dictionary/search/kanji/${searchTerm}`);
            let data = await response.json();

            setMeaning(data.meaning);
            setExample(data.example);
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

    console.log(examples);

    return (
        <div className='border-4 border-[#f4f4f4] h-[82svh] w-full rounded-xl px-6 py-4 custom-scroll-bar-2 overflow-y-auto'>
            <div className="flex mb-4">
                <div className="ml-8">
                    <div className="flex items-center">
                        <div className="w-[18%] p-1 rounded-lg bg-[#C8FFD4] m-1 font-medium"> Hán tự: </div>
                        <div>
                            {meanings?.kanji} - {meanings?.mean}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[18%] p-1 rounded-lg bg-[#C8FFD4] m-1 font-medium content-center"> Kunyomi: </div>
                        <div>
                            {meanings?.kun}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[18%] p-1 rounded-md bg-[#C8FFD4] m-1 font-medium content-center"> Onyomi: </div>
                        <div>
                            {meanings?.on}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[18%] p-1 rounded-md bg-[#C8FFD4] m-1 font-medium"> Số nét: </div>
                        <div>
                            {meanings?.stroke_count}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[18%] p-1 rounded-md bg-[#C8FFD4] m-1 font-medium"> JLPT: </div>
                        <div>
                            {meanings?.level?.[0]}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[18%] p-1 rounded-md bg-[#C8FFD4] m-1 font-medium content-center"> Nghĩa: </div>
                        <div className="w-[80%]">
                            {detailParts.map((part, index) => (
                                <div key={index}>
                                    {part}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className={cn("kanji-text flex justify-center items-center", 'w-[30%] ml-auto')}
                    dangerouslySetInnerHTML={svgData ? { __html: svgData } : undefined}
                />
            </div>
            <div>
                <p className="font-bold text-lg">
                    Ví dụ
                </p>
                {meanings.examples && meanings.examples.length > 0 ? (meanings.examples.map((example, index) => (
                    <div key={index}>
                        <WordItem word={example} className={'flex flex-row p-1 rounded-xl hover:bg-gray-200 text-justify'}/>
                    </div>
                ))
                ) : (
                    <p></p>
                )}
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">
                    Ví dụ phân loại theo cách đọc
                </h1>
                <div>
                    <p className="font-semibold text-lg w-auto bg-[#C8FFD4] p-2 rounded-xl">
                        Kunyomi
                    </p>
                        {meanings.example_kun && Object.keys(meanings.example_kun).length > 0 ? (Object.keys(meanings.example_kun).map((key) => (
                            <div key={key}>
                                <h2 className="inline-block font-semibold text-lg w-auto text-red-500 pt-3 pb-1">{key}</h2>
                                <ul>
                                    {meanings.example_kun[key].map((item, index) => (
                                        <div key={index}>
                                            <WordItem word={item} className={'flex flex-row p-1 rounded-xl hover:bg-gray-200 text-justify'}/>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        ))
                        ) : (
                            <p></p>
                    )}
                </div>

                <div>
                    <p className="font-semibold text-lg w-auto bg-[#C8FFD4] p-2 rounded-xl mt-6">
                        Onyomi
                    </p>
                        {meanings.example_on && Object.keys(meanings.example_on).length > 0 ? (Object.keys(meanings.example_on).map((key) => (
                            <div key={key}>
                                <h2 className="inline-block font-semibold text-lg w-auto text-red-500 pt-3 pb-1">{key}</h2>
                                <ul>
                                    {meanings.example_on[key].map((item, index) => (
                                        <div key={index}>
                                            <WordItem word={item} className={'flex flex-row p-1 rounded-xl hover:bg-gray-200 text-justify'}/>
                                        </div>
                                    ))}
                                </ul>
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

export default ExampleComponent;
