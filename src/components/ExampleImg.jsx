import React, { useState, useEffect } from 'react';

const ExampleImg = ({word}) => {
    console.log("ảnh:", word)
    const [img, setImg] = useState([]); 

    useEffect(() => {
        getImg();
    }, [word]); 

    const getImg = async () => {
        try {
            let response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/dictionary/img/${word}`);
            console.log("response:", response);
            let data = await response.json();
            setImg(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='flex items-center justify-center pb-10'>
            {img ? <img src={img} alt="" /> : null}
        </div>
    )
}

export default ExampleImg