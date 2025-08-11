import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Banner = () => {
  return (
    <div className="w-full px-6 mt-24"> {/* Full screen height */}
      <Swiper className="rounded-2xl shadow-2xl "
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide >
          <img
            src="https://i.ibb.co/VnVKsQ3/Web-Bannar-Artboard-3.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide >
          <img
            src="https://i.ibb.co/KRb2zK7/Web-Bannar-Artboard-1.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide >
          <img
            src="https://i.ibb.co/3Y566nkd/Web-Bannar-Artboard-2.jpg"
            alt=""
            
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
