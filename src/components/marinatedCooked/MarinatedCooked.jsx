import React from 'react';

const MarinatedCooked = () => {
  const products = [
    {
      title: "Special Cow-Tripe Cooked",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f8541c09cb5.jpeg",
      price: "BDT 1,080 /1kg",
      link: "/product/special-cow-tripe-cooked",
      description: "মজাদার গরুর ভুঁড়ি ভুনা (১ কেজি). ১০০% হাইজেনিক উপায় রান্না এবং প্যাকেট করা, ১০০% স্বাদের নিশ্চয়তা।"
    },
    {
      title: "Deshi Duck Bhuna/দেশী হাঁসের মাংস ভুনা",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f854d2d6b34.jpeg",
      price: "BDT 1,184 /1Pack",
      link: "/product/duck-bhunahannser-mangs-vuna",
      description: "মজাদার হাঁসের মাংস ভুনা (১ কেজি+ ওজনের হাঁস). ১০০% হাইজেনেনিক উপায় রান্না এবং প্যাকেট করা, ১০০% স্বাদের নিশ্চয়তা।"
    },
    {
      title: "Deshi Duck Kalia/দেশী হাঁসের কালিয়া",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f8565419931.jpeg",
      price: "BDT 1,184 /1Pack",
      link: "/product/duck-kaliahannser-mangser-kaliya",
      description: "মজাদার হাঁসের কালিয়া (১ কেজি+ ওজনের হাঁস). ১০০% হাইজেনিক উপায় রান্না এবং প্যাকেট করা, ১০০% স্বাদের নিশ্চয়তা।"
    },
    {
      title: "Special Beef Kala Bhuna 1 Kg/Pack",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f857d099179.jpeg",
      price: "BDT 1,284 /1Pack",
      link: "/product/special-beef-kala-bhuna-1-kgpack",
      description: "মজাদার গরুর মাংসের কালা ভুনা (১ কেজি). ১০০% হাইজেনিক উপায় রান্না এবং প্যাকেট করা, ১০০% ঐতিহ্যবাহী স্বাদের নিশ্চয়তা।"
    },
    {
      title: "Yummy Beef Cutlets 4pcs Pack",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f86c78d06e6.jpeg",
      price: "BDT 640 /1Pack",
      link: "/product/yummy-beef-cutlets-4pcs-pack",
      description: "Yummy Beef Cutlets 4pcs Pack In one pack"
    },
    {
      title: "Yummy Chicken Cutlets 4pcs Pack",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f86cd32b3e4.jpeg",
      price: "BDT 560 /1Pack",
      link: "/product/yummy-chicken-cutlets-4pcs-pack",
      description: "Yummy Chicken Cutlets 4pcs Pack In one pack"
    },
    {
      title: "Yummy Mutton Cutlets 4pcs Pack",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f86d495a930.jpeg",
      price: "BDT 680 /1Pack",
      link: "/product/yummy-mutton-cutlets-4pcs-pack",
      description: "100% Fresh & Healthy Yummy Mutton Cutlets 4pcs Pack"
    },
    {
      title: "Yummy Fish Cutlets 4Pcs Pack",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f86e834d8c1.jpeg",
      price: "BDT 680 /1Pack",
      link: "/product/yummy-fish-cutlets-4pcs-pack",
      description: "100% Fresh & Healthy Yummy Fish Cutlets 4pcs Pack"
    },
    {
      title: "Fish Finger Marinated 10 Pcs/Pack",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f87d7817b45.jpeg",
      price: "BDT 575 /1Pack",
      link: "/product/fish-finger-marinated-10-pcspack",
      description: "100% Fresh & Healthy Homemade Fish Finger Marinated 10 Pcs Pack"
    },
    {
      title: "Tuna Fish Kabab Marinated 10 Pcs/Pack",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f87e0c79ee4.jpeg",
      price: "BDT 620 /1Pack",
      link: "/product/tuna-fish-kabab-marinated-10-pcspack",
      description: "Yummy & Healthy Fish Kabab. Favorite food of all ages. Especially kids."
    }
  ];

  return (
     <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          // Calculate the discounted price (12% discount)
          const discountedPrice = product.oldPrice
            ? (parseFloat(product.oldPrice.replace("BDT ", "").replace("/1kg", "").replace("/0.5kg", "")) * 0.88).toFixed(2)
            : product.price;

          return (
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
                  <div className="text-green-600 font-bold">BDT {discountedPrice} /1kg</div>
                </div>
                <p className="elipsis_title2">{product.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MarinatedCooked;
