import React, { useState, useEffect } from 'react';

const ExampleImg = ({word}) => {
    const [img, setImg] = useState([]); 

    useEffect(() => {
        const getImg = async () => {
            try {
                let response = await fetch(`/api/dictionary/img/${word}`);
                let data = await response.json();
                setImg(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getImg();
    }, [word]); 

    return (
        <div className='flex items-center justify-center pb-10'>
            {img ? <img src={img} alt="" /> : null}
        </div>
    )
}

export default ExampleImg