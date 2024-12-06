import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player'; // Import the Lottie Player

// Custom Stars Component for Rating
const CustomStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }
  return <div className="flex space-x-1">{stars}</div>;
};

const Testimonials = () => {
  const feedbacks = [
    {
      feedback: "This store has everything I need for my training sessions. Exceptional quality and service!",
      name: "Serena W.",
      sport: "Tennis",
      rating: 5,
      image: 'https://i.ibb.co.com/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "EquiSports helped me gear up for my championship. Great range of products!",
      name: "Michael J.",
      sport: "Basketball",
      rating: 4.5,
      image: 'https://i.ibb.co.com/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "Their equipment made my workouts so much better. Highly recommended!",
      name: "Sophia M.",
      sport: "Fitness",
      rating: 4,
      image: 'https://i.ibb.co.com/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "Great products and quick delivery! Perfect for professional athletes.",
      name: "Roger F.",
      sport: "Tennis",
      rating: 5,
      image: 'https://i.ibb.co.com/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "Best quality sports accessories I’ve found online. Worth every penny.",
      name: "Alex T.",
      sport: "Cycling",
      rating: 4.5,
      image: 'https://i.ibb.co.com/xfbYhMB/Arthur-Morgan.webp',
    },
  ];

  return (
    <div className="">
      <h2 className="text-center text-gray-800 text-4xl font-bold mb-12">
        What Athletes Say About Us
      </h2>

      <div className="flex flex-wrap items-center">
        {/* Left section with static Lottie animation */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <Player
            autoplay
            loop
            src="/public/Animation - 1733475754198.json" // Lottie animation URL
            style={{ height: '300px', width: '300px', margin: 'auto' }}
          />
        </div>

        {/* Right section with the Swiper component */}
        <div className="w-full lg:w-2/3">
          {/* Swiper component with autoplay */}
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {feedbacks.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center mx-auto text-gray-700 bg-gray-50 rounded-xl shadow-lg p-8">
                  {/* Testimonial content */}
                  <img
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 mb-6"
                    src={item.image}
                    alt={item.name}
                  />
                  <p className="text-center italic text-lg mb-4">
                    "{item.feedback}"
                  </p>
                  <CustomStars rating={item.rating} />
                  <h3 className="font-bold text-lg text-gray-800 mt-4">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.sport}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
