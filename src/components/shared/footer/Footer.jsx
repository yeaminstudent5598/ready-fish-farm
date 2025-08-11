import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            
            <h1 className="font-bold text-4xl uppercase text-red-500 text-center my-8">we are very proud to serve</h1>
            <section id="footer-section" className="bg-gray-100 py-8">
            <div className="container custom_container custom_container_footer mx-auto px-4">
                <div className="grid md:grid-cols-5 gap-6">
                    {/* Logo Section */}
                    <div className="text-center">
                        <div className=" mb-4">
                            <a href="/">
                                <img
                                    src="https://i.ibb.co/ksQ8xc5Q/Amer-Sadi-Logo-05.png"
                                    alt="Footer Logo"
                                    className="mx-auto"
                                />
                            </a>
                            <p className="mt-4">
                                <img
                                    src="https://api.freshtoday.com.bd/media/64eb483b5d7df.png"
                                    alt="SSL Commerz"
                                    className=" w-full"
                                />
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-sm">
                        <h4 className="font-semibold ">Quick links</h4>
                        <ul className="">
                            <li><a href="/pages/about-us">About Us</a></li>
                            <li><a href="/career">Career</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/help-center">Help Center</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div className="text-sm">
                        <h4 className="font-semibold">Contact us</h4>
                        <ul className="">
                            <li>
                                House: 1/A, Road: 17, South Baridhara R/A, DIT Project, Dhaka 1212 Bangladesh
                            </li>
                            <li>
                                <b>E-mail:</b> support@freshtodaybd.com
                            </li>
                            <li>
                                <b>Phone:</b> 09617 551122, 01931-000700
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="text-sm">
                        <h4 className="font-semibold">Policies</h4>
                        <ul className="">
                            <li><a href="/pages/privacy_policy">Privacy Policy</a></li>
                            <li><a href="/pages/return-policy">Return Policy</a></li>
                            <li><a href="/pages/terms-and-conditions">Terms and Conditions</a></li>
                        </ul>
                    </div>


        {/* Social Media */}
         <div className="footer-contact">
    <h4 className="font-semibold mb-2">Get in touch</h4>
    <div className="social_media flex gap-2 text-2xl">
        <a
            href="https://www.facebook.com/freshtodaybd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
        >
            <FaFacebook />
        </a>
        <a
            href="https://twitter.com/i/flow/login?redirect_after_login=%2FFreshToday3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
        >
            <FaTwitter />
        </a>
        <a
            href="https://www.instagram.com/freshtoday07/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700"
        >
            <FaInstagram />
        </a>
        <a
            href="https://www.youtube.com/channel/UCUGbJFjYahCuueTjiJBi0iw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-800"
        >
            <FaYoutube />
        </a>
        <a
            href="https://www.linkedin.com/in/freshtodaybd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900"
        >
            <FaLinkedin />
        </a>
    </div>
    <div className="apps_link mt-4">
        {/* Add app store or play store links here if available */}
    </div>
</div>

                </div>
            </div>
        </section>
        </div>
    );
};

export default Footer;
