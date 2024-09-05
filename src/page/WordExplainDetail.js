import React, { useState, useEffect } from 'react';
import { AiOutlineSound } from "react-icons/ai";
import textToSpeech from '../components/TextToSpeech';
import { FaRegComments } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { TbPinFilled } from "react-icons/tb";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";


const WordExplainDetail = () => {
    const { searchTerm } = useParams(); // Destructure the specific parameter
    
    console.log(searchTerm);
    const [meanings, setMeaning] = useState([]);
    const [examples, setExample] = useState([]);
    const [comments, setComment] = useState([]); 
    
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
                let response = await fetch(`/api/dictionary/search/${searchTerm}`);
                let data = await response.json();
                // let data = {
                //     "meaning": {
                //         "short_mean": "sự tu sửa; sự đính chính; sự chỉnh sửa",
                //         "mobileId": 144730,
                //         "word": "修正",
                //         "phonetic": "しゅうせい",
                //         "means": [
                //             {
                //                 "examples": "null",
                //                 "kind": "n, vs",
                //                 "mean": "sự tu sửa; sự đính chính; sự chỉnh sửa"
                //             }
                //         ]
                //     },
                //     "example": {
                //         "0": {
                //             "transcription": "しゅうせいきにゅう",
                //             "content": "修正記入",
                //             "mean": "viết phần đính chính"
                //         },
                //         "1": {
                //             "transcription": "〜にしゅうせいをくわえることをいっさいこばむ",
                //             "content": "〜に修正を加えることを一切拒む",
                //             "mean": "dứt khoát từ chối việc đính chính"
                //         },
                //         "2": {
                //             "transcription": "けつぎあんをしゅうせいする",
                //             "content": "決議案を修正する",
                //             "mean": "Sửa đổi dự thảo nghị quyết"
                //         },
                //         "3": {
                //             "transcription": "かれはじせつをしゅうせいした。",
                //             "content": "彼は自説を修正した。",
                //             "mean": "Anh ấy đã sửa lại ý kiến ​​của mình."
                //         },
                //         "4": {
                //             "transcription": "つぎのようにしゅうせいしてください。",
                //             "content": "次のように修正してください。",
                //             "mean": "Vui lòng sửa như sau."
                //         }
                //     },
                //     "comment": {
                //         "0": {
                //             "mean": "無修正 Kiểu dạng phim không che. :))"
                //         },
                //         "1": {
                //             "mean": "修正 sửa lại cho đúng ( Vì nó sai nên phải sửa)\n調整 điều chỉnh lại (ví dụ như kế hoạch thay đổi thì điều chỉnh lại, chứ ko phải nó sai nên phải sửa)."
                //         },
                //         "2": {
                //             "mean": "住所が間違っているので、修正してください"
                //         },
                //         "3": {
                //             "mean": "Fix (bug)"
                //         },
                //         "4": {
                //             "mean": "Chỉnh sửa văn bản,nội dung"
                //         },
                //         "5": {
                //             "mean": "sự tu sửa, nâng cấp lại máy móc, mạng, hệ thống"
                //         },
                //         "6": {
                //             "mean": "切り替え装置の組図と部品図を作成する時、お客様からの指摘が多くて、何度も図面を修正しなければなりません。図面を何度も修正するのは時間がかかるし、私にとって本当に嫌でした。しかし、お客様の指摘のおかげで、仕事をしている時、気が付かない事を学びました。安全カバーが必要とか、製作が困難とか、ＬＭガイドの抜け止めとか。。。そういう事から経験を重ねて次に同じミスを繰り返さないようにしていきたいと思います。"
                //         },
                //         "7": {
                //             "mean": "写真を修正した。chỉnh sửa ảnh"
                //         },
                //         "8": {
                //             "mean": "エブーイ動画を見るのは趣味だから、よく無修正の女優を見てる"
                //         },
                //         "9": {
                //             "mean": "来週中にバグ修正が完了する見通しです"
                //         },
                //         "10": {
                //             "mean": "Sự chỉnh sửa"
                //         },
                //         "11": {
                //             "mean": "điều chỉnh nội dung trên văn bản, giấy tờ"
                //         },
                //         "12": {
                //             "mean": "図面修正をお願いします Vui lòng chỉnh sửa bản vẽ"
                //         },
                //         "13": {
                //             "mean": "cty tôi chư hán này có nghĩa là sửa 傷が悪いから、修正してください"
                //         },
                //         "14": {
                //             "mean": "khắc phục"
                //         },
                //         "15": {
                //             "mean": "EN: adjust"
                //         }
                //     }
                // }
                setMeaning(data.meaning);
                setExample(data.example);
                setComment(data.comment);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, [searchTerm]); // Add searchTerm as a dependency

    console.log(meanings, examples, comments);

    return (
        <div className='border-4 border-[#f4f4f4] h-full w-full rounded-xl p-4 custom-scroll-bar-2 overflow-y-auto'>
            <div>
                <h1 className='text-5xl font-semibold text-dark-green mb-6'>
                    {searchTerm} {/* Use searchTerm instead of searchWord */}
                </h1>
                <p className='font-medium text-red-orange mb-2'>
                    {meanings.phonetic}
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
                        meanings.means.map((mean, index) => (
                            <span key={index}>{
                                mean.kind.split(', ').map((kindItem, i, arr) => (
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
                            meanings.means.map((mean, index) => (
                                <div key={index}>
                                    <p className='inline-flex items-center m-2 text-blue-700 text-lg'>
                                        <TbPinFilled className='text-2xl mr-1 text-red-orange'/> 
                                        <span className='text-xl'>{mean.mean}</span>
                                    </p>
                                    {mean.examples && mean.examples.length > 0 ? (
                                    mean.examples.map((example, idx) => (
                                    <div key={idx} className='ml-8'>
                                        <p className='inline-flex items-center text-lg '>
                                            <span className='text-red-600'>{example.content}</span>
                                            <AiOutlineSound 
                                                onClick={() => textToSpeech(example.transcription)} // Gọi hàm khi bấm vào biểu tượng
                                                className='cursor-pointer ml-2'
                                            />
                                        </p>
                                        <p>{example.mean}</p>
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
                            Object.keys(examples).map((key, idx) => (
                                <div key={idx} className="ml-8 my-2">                                    
                                    {/* Hiển thị nội dung (content) */}
                                    <p className="inline-flex items-center text-lg">
                                        <span className='text-red-600'>{examples[key].content}</span>
                                        <  AiOutlineSound 
                                            onClick={() => textToSpeech(examples[key].transcription)} // Gọi hàm khi bấm vào biểu tượng
                                            className='cursor-pointer ml-2'
                                        />
                                    </p>
                                    {/* Hiển thị nghĩa (mean) */}
                                    <p>{examples[key].mean}</p>
                                </div>
                            ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
}

export default WordExplainDetail;
