import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';

// Custom Stars Component for Rating
const CustomStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
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
      image: 'https://i.ibb.co/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "EquiSports helped me gear up for my championship. Great range of products!",
      name: "Michael J.",
      sport: "Basketball",
      rating: 4.5,
      image: 'https://i.ibb.co/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "Their equipment made my workouts so much better. Highly recommended!",
      name: "Sophia M.",
      sport: "Fitness",
      rating: 4,
      image: 'https://i.ibb.co/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "Great products and quick delivery! Perfect for professional athletes.",
      name: "Roger F.",
      sport: "Tennis",
      rating: 5,
      image: 'https://i.ibb.co/xfbYhMB/Arthur-Morgan.webp',
    },
    {
      feedback: "Best quality sports accessories I’ve found online. Worth every penny.",
      name: "Alex T.",
      sport: "Cycling",
      rating: 4.5,
      image: 'https://i.ibb.co/xfbYhMB/Arthur-Morgan.webp',
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16 ">
      {/* Section Title */}
      <h2 className="text-center text-gray-900 dark:text-gray-100 text-4xl font-bold mb-12">
        What Athletes Say About Us
      </h2>

      {/* Container */}
      <div className="flex flex-wrap items-center justify-center dark:bg-gray-700 rounded-lg w-11/12 mx-auto">
        {/* Left Section: Lottie Animation */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <Player
            autoplay
            loop
            src="/Animation - 1733475754198.json"
            style={{ height: '300px', width: '300px', margin: 'auto', color: 'white' }}
          />
        </div>

        {/* Right Section: Testimonials Slider */}
        <div className="w-full lg:w-2/3">
          <Swiper
            spaceBetween={30}
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
                <div className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                  {/* Testimonial Image */}
                  <img
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 mb-4"
                    src={item.image}
                    alt={item.name}
                  />

                  {/* Feedback Text */}
                  <p className="italic text-lg text-gray-700 dark:text-gray-300 mb-3">
                    "{item.feedback}"
                  </p>

                  {/* Custom Stars for Rating */}
                  <CustomStars rating={item.rating} />

                  {/* Athlete Details */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-4">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.sport}</p>
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
