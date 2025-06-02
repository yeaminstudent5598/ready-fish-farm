import React from 'react';

const BeefMutton = () => {
    const products = [
        {
            "title": "Premium Beef - Curry Cut Bone-in. (গরুর মাংস হাঁড়-সহ রেগুলা ক্বারিকার্ট)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f71d79934b7.jpeg",
            "price": "BDT 799 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-curry-cut-include-bones"
        },
        {
            "title": "Premium Beef - Boneless Curry Cut (গরুর মাংস হাঁড় ছাড়া ক্বারি-কাট)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f71dbd57b36.jpeg",
            "price": "BDT 1,147 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-boneless-curry-cut-hannr-chara-grur-mangs"
        },
        {
            "title": "Premium Beef Back Leg Chaka Meat Bone-in (গরুর রানের চাকা মাংস আস্ত হাঁড় সহ)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f71e1c08fe9.jpeg",
            "price": "BDT 828 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-back-leg-chaka-meat-include-bone"
        },
        {
            "title": "Premium Beef - Boneless Stacks. (রানের চাকা মাংস হাঁড় ছাড়া)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f71e8b61527.jpeg",
            "price": "BDT 1,147 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-boneless-stacks"
        },
        {
            "title": "Premium Beef Mince / Keema (গরুর মাংসের কিমা)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f72638aa9e1.jpeg",
            "price": "BDT 1,134 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-mince-keema"
        },
        {
            "title": "Premium Beef Kuruli Boneless. (গরুর করলির মাংস হাঁড় ছাড়া)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f73073b8c1d.jpeg",
            "price": "BDT 1,280 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-kuruli-meat-bone-in"
        },
        {
            "title": "Premium Beef Biryani Cut Bone-in. (গরুর মাংস বিরিয়ানি ক্বাট)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f72fd95bbf8.jpeg",
            "price": "BDT 828 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-biryani-cut-include-bone"
        },
        {
            "title": "Premium Cow-Tripe (Ready To Cook) (গরুর ভুঁড়ি রেডি টু কুক)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f72c7d10739.jpeg",
            "price": "BDT 688 /1kg",
            "oldPrice": "BDT 744 /1kg",
            "discount": "7.5%",
            "link": "/product/premium-cow-tripe-bhury-ready-to-cook"
        },
        {
            "title": "Premium Pure Cow Liver (গরুর পিওর কলিজা)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f726cf2fb0e.jpeg",
            "price": "BDT 945 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-pure-cow-liver"
        },
        {
            "title": "Premium Cow Brain (গরুর মগজ)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/64f72edcf3232.jpeg",
            "price": "BDT 454 /1Piece",
            "oldPrice": "",
            "discount": "",
            "link": "/product/cow-brain-grur-mgj"
        },
        {
            "title": "Premium Beef Kuruli-Meat (Bone In) (গরুর করলির মাংস হাঁড় সহ)",
            "imgSrc": "https://api.freshtoday.com.bd/media/thumbnail/media/66262e8d38bbd.jpg",
            "price": "BDT 894 /1kg",
            "oldPrice": "",
            "discount": "",
            "link": "/product/premium-beef-kuruli-meat-bone-in-grur-krlir-mangs-hannr-sh"
        }
    ];

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <a
                        key={index}
                        href={product.link}
                        className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative">
                            {product.discount && (
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    -{product.discount}
                                </span>
                            )}
                            <img
                                src={product.imgSrc}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                        <div className="p-3">
                            <p className="text-sm font-semibold mb-1">{product.title}</p>
                            <div className="text-sm text-gray-600">
                                {product.oldPrice && (
                                    <div className="line-through text-gray-400">{product.oldPrice}</div>
                                )}
                                <div className="text-green-600 font-bold">{product.price}</div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BeefMutton;
