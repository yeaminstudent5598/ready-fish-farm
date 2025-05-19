import Banner from "../banner/Banner";
import CategoryShop from "./categoryShop/CategoryShop";
import Deals from "./dealsOfTheDay/Deals";

const Home = () => {
    return (
        <div className="">
            <Banner/>
            <CategoryShop/>
            <Deals/>
        </div>
    );
};

export default Home;