import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Fade } from 'react-awesome-reveal';
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
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        beforeChange: (current, next) => setActiveSlide(next),
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
                    centerPadding: '20px',
                    slidesToShow: 1,
                },
            },
        ],
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-hidden">
            <div className="bg-lightBg dark:bg-darkBg px-20 py-8">
                <h2 className="flex lg:flex-row flex-col text-center items-center gap-2 justify-center">
                    <span className="text-3xl text-orange-500 font-bold">35% OFF</span>
                    <span className="text-subtitleText text-xl">
                        on total order of $120 or more!!
                    </span>
                    <span className="text-3xl text-orange-500 font-semibold">
                        + Free Shipping
                    </span>
                </h2>
            </div>
            <div className="bg-lightCard dark:bg-darkCard py-12 px-8">
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            className={`p-8 transition-transform duration-300 ${
                                index === activeSlide
                                    ? 'scale-125 z-10'
                                    : 'scale-75'
                            }`}>
                            <div
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="bg-lightCard dark:bg-darkCard p-4 text-center flex flex-col justify-center items-center rounded-lg ">
                                <img
                                    src={product.image}
                                    alt={product.itemName}
                                    className={`transition-transform duration-300 rounded-lg ${
                                        index === activeSlide ? 'w-60 h-60' : 'w-40 h-40'
                                    } object-contain`}
                                />
                                {index === activeSlide && (
                                    <Fade delay={600}>
                                        <h3 className="text-lg font-semibold mt-2 text-lightText dark:text-darkText">
                                            {product.itemName}
                                        </h3>
                                        <p className="text-subtitleText">{product.categoryName}</p>
                                        <p className="text-priceText font-bold mt-2">
                                            ${product.price}
                                        </p>
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
