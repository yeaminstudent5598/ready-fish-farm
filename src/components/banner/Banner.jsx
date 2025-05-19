import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Banner = () => {
  return (
    <div className="w-full px-6"> {/* Full screen height */}
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
            src="https://api.freshtoday.com.bd/media/6786ae6ddc016.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide >
          <img
            src="https://api.freshtoday.com.bd/media/6658975c0b2d6.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide >
          <img
            src="https://api.freshtoday.com.bd/media/665dd9ab7d354.jpg"
            alt=""
            
          />
        </SwiperSlide>
        <SwiperSlide >
          <img
            src="https://api.freshtoday.com.bd/media/665dd9643ed2b.jpg"
            alt=""
            
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
