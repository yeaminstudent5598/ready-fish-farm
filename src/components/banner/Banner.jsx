import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Banner = () => {
  return (
    // Navbar এর height এর সাথে মিল রেখে gap তৈরি করা হলো এবং 
    // Navbar এর সাথে হুবহু align করার জন্য max-w-[1400px], mx-auto, px-4 দেওয়া হলো
    <div className="w-full max-w-[1400px] mx-auto px-4 pt-[70px] lg:pt-[100px] pb-6">
      <Swiper 
        className="rounded-2xl overflow-hidden"
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {[
          "https://i.ibb.co/VnVKsQ3/Web-Bannar-Artboard-3.jpg",
          "https://i.ibb.co/KRb2zK7/Web-Bannar-Artboard-1.jpg",
          "https://i.ibb.co/3Y566nkd/Web-Bannar-Artboard-2.jpg"
        ].map((imgSrc, index) => (
          <SwiperSlide key={index}>
            {/* 1920x700 ratio ঠিক রাখার জন্য aspect-[1920/700] এবং object-cover ব্যবহার করা হয়েছে */}
            <div className="w-full relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[1920/700]">
              <img
                src={imgSrc}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;