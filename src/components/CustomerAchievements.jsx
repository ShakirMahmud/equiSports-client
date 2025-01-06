import React from 'react';
import { FaTrophy, FaMedal, FaQuoteLeft } from 'react-icons/fa';

const CustomerAchievements = () => {
    const achievements = [
        {
            icon: <FaTrophy />,
            title: "Professional Endorsements",
            description: "Trusted by professional athletes across multiple sports disciplines",
            color: "text-yellow-500"
        },
        {
            icon: <FaMedal />,
            title: "Award-Winning Gear",
            description: "Multiple awards for innovation and quality in sports equipment",
            color: "text-blue-500"
        },
        {
            icon: <FaQuoteLeft />,
            title: "Community Impact",
            description: "Supporting local sports programs and athlete development",
            color: "text-green-500"
        }
    ];

    return (
        <div className="py-16 bg-lightBg dark:bg-darkBg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-lightText dark:text-darkText mb-4">
                        Our Commitment to Excellence
                    </h2>
                    <p className="text-base md:text-lg text-subtitleText dark:text-gray-400 max-w-2xl mx-auto">
                        More than just a store - we're your partner in sports performance
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => (
                        <div 
                            key={index}
                            className="
                                bg-white 
                                dark:bg-darkCard 
                                rounded-2xl 
                                shadow-lg 
                                p-8 
                                text-center 
                                hover:scale-105 
                                transition-transform 
                                duration-300
                            "
                        >
                            <div className={`
                                text-6xl 
                                mb-6 
                                flex 
                                justify-center 
                                ${achievement.color}
                            `}>
                                {achievement.icon}
                            </div>
                            <h3 className="text-xl font-bold text-lightText dark:text-darkText mb-4">
                                {achievement.title}
                            </h3>
                            <p className="text-subtitleText dark:text-gray-400">
                                {achievement.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerAchievements;