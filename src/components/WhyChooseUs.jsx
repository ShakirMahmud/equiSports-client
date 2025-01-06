import React from 'react';
import { 
    FaShieldAlt, 
    FaHandshake, 
    FaLightbulb, 
    FaGlobeAmericas 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WhyChooseUs = () => {
    const navigate = useNavigate();
    const whyChoosePoints = [
        {
            icon: <FaShieldAlt />,
            title: "Quality Guaranteed",
            description: "Every product undergoes rigorous quality checks to ensure top-performance and durability.",
            color: "text-blue-500",
            background: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            icon: <FaHandshake />,
            title: "Expert Partnerships",
            description: "Collaborated with professional athletes and sports organizations to curate our product range.",
            color: "text-green-500",
            background: "bg-green-50 dark:bg-green-900/20"
        },
        {
            icon: <FaLightbulb />,
            title: "Innovative Solutions",
            description: "Constantly evolving with cutting-edge sports technology and equipment design.",
            color: "text-yellow-500",
            background: "bg-yellow-50 dark:bg-yellow-900/20"
        },
        {
            icon: <FaGlobeAmericas />,
            title: "Global Standards",
            description: "International sourcing and compliance with global sports equipment standards.",
            color: "text-purple-500",
            background: "bg-purple-50 dark:bg-purple-900/20"
        }
    ];

    return (
        <div className="py-16 bg-lightBg dark:bg-darkBg">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-lightText dark:text-darkText mb-6">
                        Why Athletes Trust EquiSports
                    </h2>
                    <p className="text-xl text-subtitleText dark:text-gray-400 max-w-3xl mx-auto">
                        We're not just selling equipment; we're empowering athletes to reach their full potential with meticulously curated gear and unwavering commitment.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyChoosePoints.map((point, index) => (
                        <div 
                            key={index}
                            className={`
                                ${point.background}
                                rounded-2xl 
                                p-6 
                                transform 
                                transition-all 
                                duration-300 
                                hover:-translate-y-4 
                                hover:shadow-xl
                                border 
                                border-transparent 
                                hover:border-accentColor/30
                            `}
                        >
                            {/* Icon */}
                            <div className={`
                                mb-6 
                                ${point.color} 
                                text-6xl 
                                flex 
                                items-center 
                                justify-center 
                                transform 
                                transition-transform 
                                group-hover:scale-110
                            `}>
                                {point.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-2xl font-bold text-lightText dark:text-darkText mb-4">
                                    {point.title}
                                </h3>
                                <p className="text-subtitleText dark:text-gray-400">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <button 
                        onClick={() => navigate('/allSportsEquipment')}
                        className="
                            px-8 
                            py-3 
                            bg-lightBtn 
                            text-white 
                            rounded-full 
                            text-lg 
                            font-semibold 
                            hover:bg-lightBtnHover 
                            transition-colors 
                            dark:bg-darkBtn 
                            dark:hover:bg-darkBtnHover
                        "
                    >
                        Start Your Sports Journey
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;