import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../pages/Loading';

const Banner = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://equi-sports-server-shakir.vercel.app/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        beforeChange: (current, next) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '0px',
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '0px',
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            }
        ]
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-lightBg dark:bg-darkBg">
            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-lightBtn dark:from-darkBtn  to-lightBtnHover dark:to-darkBtnHover text-white py-4 text-center">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
                        <span className="text-2xl font-bold">35% OFF</span>
                        <span className="text-lg">on total order of $120 or more</span>
                        <span className="text-2xl font-bold">+ Free Shipping</span>
                    </div>
                </div>
            </div>

            {/* Product Slider */}
            <div className="py-12 px-4 md:px-8 relative">
                <div className="container mx-auto">
                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <div 
                                key={product._id} 
                                className="px-2 md:px-4 outline-none"
                            >
                                <div 
                                    className={`
                                        bg-lightCard 
                                        dark:bg-darkCard 
                                        rounded-xl 
                                        shadow-md 
                                        hover:shadow-lg 
                                        transition-all 
                                        duration-300 
                                        p-4 
                                        text-center 
                                        h-[350px] 
                                        flex 
                                        flex-col 
                                        justify-between 
                                        items-center
                                        ${index === activeSlide 
                                            ? 'scale-100 opacity-100' 
                                            : 'scale-90 opacity-70'}
                                    `}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <div className="w-full flex flex-col items-center">
                                        <div className="mb-4 h-48 flex items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.itemName}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>

                                        <h3 className="text-lg font-semibold text-lightText dark:text-darkText mb-2">
                                            {product.itemName}
                                        </h3>
                                        <p className="text-subtitleText text-sm mb-2">
                                            {product.categoryName}
                                        </p>
                                    </div>

                                    <div className="w-full">
                                        <span className="text-priceText font-bold text-xl">
                                            ${product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Banner;