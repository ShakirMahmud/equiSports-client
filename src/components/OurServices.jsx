import React from 'react';
import { 
    FaShippingFast, 
    FaUndo, 
    FaHeadset, 
    FaTools 
} from 'react-icons/fa';

const OurServices = () => {
    const services = [
        {
            icon: <FaShippingFast />,
            title: "Fast Shipping",
            description: "Free shipping on orders over $100, delivered quickly to your doorstep",
            color: "text-blue-500"
        },
        {
            icon: <FaUndo />,
            title: "Easy Returns",
            description: "30-day hassle-free return policy for your complete satisfaction",
            color: "text-green-500"
        },
        {
            icon: <FaHeadset />,
            title: "Customer Support",
            description: "24/7 dedicated support to assist you with any queries",
            color: "text-purple-500"
        },
        {
            icon: <FaTools />,
            title: "Expert Consultation",
            description: "Professional advice to help you choose the right equipment",
            color: "text-orange-500"
        }
    ];

    return (
        <div className="py-16 bg-lightBg dark:bg-darkBg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-lightText dark:text-darkText mb-4">
                        Our Commitment to You
                    </h2>
                    <p className="text-base md:text-lg text-subtitleText dark:text-gray-400 max-w-2xl mx-auto">
                        We go beyond selling equipment - we provide a complete sports experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className="
                                bg-white 
                                dark:bg-darkCard 
                                rounded-2xl 
                                shadow-lg 
                                p-6 
                                text-center 
                                hover:scale-105 
                                transition-transform 
                                duration-300
                            "
                        >
                            <div className={`
                                text-5xl 
                                mb-4 
                                flex 
                                justify-center 
                                ${service.color}
                            `}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-lightText dark:text-darkText mb-3">
                                {service.title}
                            </h3>
                            <p className="text-subtitleText dark:text-gray-400 text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurServices;