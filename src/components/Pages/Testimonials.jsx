import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Quote } from 'lucide-react';

const reviews = [
    {
        name: "Rahim Ahmed",
        role: "Food Blogger",
        img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        text: "ShotejFoods has changed my eating habits! The vegetables are always fresh and crispy. Highly recommended for organic lovers."
    },
    {
        name: "Fatima Begum",
        role: "Housewife",
        img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        text: "Quick delivery and amazing packaging. I ordered mangoes last week, and they were sweet and chemical-free. Best service!"
    },
    {
        name: "Tanvir Hasan",
        role: "Chef",
        img: "https://i.pravatar.cc/150?u=a04258114e29026302d",
        text: "As a chef, quality is my priority. This website provides the best authentic organic spices and herbs in Bangladesh."
    },
    {
        name: "Sadia Islam",
        role: "Doctor",
        img: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        text: "I trust them for my family's health. The transparency about sourcing is what makes them unique."
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-green-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
                    <p className="text-gray-500">What our clients say about us</p>
                    <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-12"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center text-center relative mt-8">
                                {/* Profile Image */}
                                <div className="absolute -top-8 w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                    <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                
                                {/* Quote Icon */}
                                <div className="mt-8 mb-4">
                                    <Quote className="text-green-200 w-10 h-10 rotate-180 inline-block" />
                                </div>

                                <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                                
                                <div className="mt-auto">
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <span className="text-sm text-green-600">{review.role}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;