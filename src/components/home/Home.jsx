import Banner from "../banner/Banner";
import CategoryShop from "./categoryShop/CategoryShop";
import Deals from "./dealsOfTheDay/Deals";

// ✅ সঠিক ইমপোর্ট পাথ (твоমার ফোল্ডার স্ট্রাকচার অনুযায়ী)
import WhyChooseUs from "../Pages/WhyChooseUs";
import PromoBanner from "../Pages/PromoBanner";
import Newsletter from "../Pages/Newsletter";
import FeaturedProducts from "../Pages/FeaturedProducts";
import OrganicBanner from "../Pages/OrganicBanner";
import Testimonials from "../Pages/Testimonials";

const Home = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* 1. Hero Banner */}
            <Banner/>
            
            {/* 2. Features */}

            {/* 3. Category Slider */}
            <CategoryShop/>

            {/* 4. Promo Banners */}
            <PromoBanner />

            {/* 5. Featured Products */}
            <FeaturedProducts />

            {/* 6. Parallax Organic Story Banner */}
            <OrganicBanner />

            {/* 7. Deals of the Day */}
            <Deals/>

            {/* 8. Customer Reviews */}
            <Testimonials />

            {/* 9. Newsletter */}
            <Newsletter />
            <WhyChooseUs />
        </div>
    );
};

export default Home;