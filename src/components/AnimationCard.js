import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

function SampleNextArrow(props) {
    const { className, style, onClick, isVisible } = props;
    return (
        <FaRegArrowAltCircleRight
            className={className}
            style={{ 
                ...style, 
                display: isVisible ? "block" : "none", 
                color: 'gray', 
                width: '2.5rem', 
                height: '2.5rem' 
            }}
            onClick={onClick}
        />
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick, isVisible } = props;
    return (
        <FaRegArrowAltCircleLeft
            className={className}
            style={{ 
                ...style, 
                display: isVisible ? "block" : "none", 
                color: 'gray', 
                width: '2.5rem', 
                height: '2.5rem' 
            }}
            onClick={onClick}
        />
    );
}

const AnimationCard = ({words}) => {
    const [currentSlide, setCurrentSlide] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const sliderRef = useRef(null);

    // const items = [
    //     { title: "Slide 1", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...", back: "hehe day la mat sau" },
    //     { title: "Slide 2", content: "Laudantium voluptas ipsa similique magni adipisci accusamus...", back: "hehe day la mat sau" },
    //     { title: "Slide 3", content: "Laudantium voluptas ipsa similique magni adipisci accusamus...", back: "hehe day la mat sau" },
    //     { title: "Slide 4", content: "Laudantium voluptas ipsa similique magni adipisci accusamus...", back: "hehe day la mat sau" },
    //     { title: "Slide 5", content: "Laudantium voluptas ipsa similique magni adipisci accusamus...", back: "hehe day la mat sau" },
    //     // Thêm các slide khác nếu cần
    // ];
    
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow isVisible={currentSlide < words.length - 1} />,
        prevArrow: <SamplePrevArrow isVisible={currentSlide > 0} />,
        afterChange: index => {
            setCurrentSlide(index);
        },
        beforeChange: () => {
            setIsFlipped(false); // Reset isFlipped to false before changing slide
            setIsChange(true);
        },
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                sliderRef.current.slickNext();
            } else if (event.key === 'ArrowLeft') {
                sliderRef.current.slickPrev();
            } else if (event.code === 'Space') {
                setIsFlipped((prev) => !prev); // Flip the card on Space key press
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='w-[50svw] m-auto'>
            <div className='p-20'>
                <Slider ref={sliderRef} {...settings}>
                    {words?.map((word, index) => (
                        <div key={index} className="w-full h-full !flex justify-center items-center">
                            <div
                            className={`relative w-96 h-96 ${!isChange ? 'transition-transform duration-1000' : ''} transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                            onClick={() => {
                                setIsFlipped(!isFlipped)
                                setIsChange(false)
                            }}
                            >
                            {/* Front Side */}
                            <div className="absolute w-full h-full bg-gradient-to-br from-dark-yellow to-red-orange flex items-center justify-center rounded-lg shadow-md backface-hidden">
                                <h2 className="text-white text-5xl font-bold">{word?.w}</h2>
                            </div>
                
                            {/* Back Side */}
                            <div className="absolute w-full h-full bg-white border-4 border-dark-yellow rounded-lg shadow-md transform rotate-y-180 flex flex-col justify-center items-center p-8 backface-hidden">
                                <div className="card__header relative">
                                  <img
                                      src="https://i.pinimg.com/564x/14/c8/9f/14c89f577db17526bfdd268e6da77f9f.jpg"
                                      alt="Profile"
                                      className="w-32 h-32 rounded-full mx-auto border-2 border-white object-cover"
                                  />
                                  <h2 className="text-gray-800 text-3xl font-extrabold text-center mt-4">
                                      {word?.w}
                                  </h2>
                                  </div>
                                  <div className="card__body mt-4 text-center">
                                  <h3 className="text-xl text-gray-900 font-semibold">{word?.h}</h3>
                                  <p className="text-xl text-gray-900">{word?.p}</p>
                                  <p className="text-gray-700 mt-2">
                                     {word?.m}
                                  </p>
                                </div>
                            </div>
                        </div>
                      </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default AnimationCard;
