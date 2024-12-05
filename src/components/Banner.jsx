import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Fade } from 'react-awesome-reveal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [products, setProducts] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0); 
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    // Slick settings
    const settings = {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3500,
        beforeChange: (current, next) => setActiveSlide(next), // Update active slide
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className=''>
            <div className="bg-[#f0f5f5] px-20 py-8">
                <h2 className="flex items-center gap-2 justify-center">
                    <span className="text-3xl text-orange-600 font-bold">35% OFF</span>
                    <span className="text-gray-600 text-xl">
                        {' '}
                        on total order of $120 or more!!
                    </span>
                    <span className="text-3xl text-orange-600 font-semibold">
                        + Free Shipping
                    </span>
                </h2>
            </div>
            <div className=" bg-[#ececec]">
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            className={`p-8 transition-transform duration-300 ${
                                index === activeSlide
                                    ? 'scale-125 z-10' // Make the center card bigger
                                    : 'scale-75'
                            }`}>
                            <div onClick={() => navigate(`/allSportsEquipment/${product._id}`)} className="bg-[#ececec] p-4 text-center flex flex-col justify-center items-center">
                                <img
                                    src={product.image}
                                    alt={product.itemName}
                                    className={`transition-transform duration-300 rounded-lg ${
                                        index === activeSlide ? 'w-60 h-60' : 'w-40 h-40'
                                    } object-contain`}
                                />
                                {index === activeSlide && (
                                    <Fade delay={600} >
                                        <h3 className="text-lg font-semibold mt-2">{product.itemName}</h3>
                                        <p className="text-gray-500 text-sm">{product.categoryName}</p>
                                        <p className="text-orange-600 font-bold mt-2">${product.price}</p>
                                    </Fade>
                                )}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Banner;
