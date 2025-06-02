import React from 'react';

const PasteSpice = () => {
  const products = [
    {
      title: "Ginger Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f74246a01d5.jpeg",
      price: "BDT 600 /1kg",
      link: "/product/ginger-paste-homemade",
      description: "100 % Fresh Homemade Ginger Paste..."
    },
    {
      title: "Garlic Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f742f782c92.jpeg",
      price: "BDT 480 /1kg",
      link: "/product/garlic-paste-homemade",
      description: "100% Fresh Homemade Garlic Paste ...."
    },
    {
      title: "Onion Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f743ab4db2a.jpeg",
      price: "BDT 340 /1kg",
      link: "/product/onion-paste-homemade",
      description: "100% Fresh Homemade Onion Paste...."
    },
    {
      title: "Dried Red Chilli Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f7496018373.jpeg",
      price: "BDT 980 /1kg",
      link: "/product/dried-red-chilli-paste-homemade",
      description: "100% Dried Homemade Red Chilli Paste....."
    },
    {
      title: "Turmeric Paste (Homemade) পাটায় হাতে বাটা",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f74a8b7e43c.jpeg",
      price: "BDT 760 /1kg",
      link: "/product/turmeric-paste-homemade-patay-hate-bata",
      description: "100% Fresh Homemade Turmeric Paste"
    },
    {
      title: "Ginger & Garlic Mixed Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f74b570905b.jpeg",
      price: "BDT 510 /1kg",
      link: "/product/ginger-garlic-mixed-paste-homemade",
      description: "100% Fresh Ginger & Garlic Mixed Paste (Homemade)"
    },
    {
      title: "Fresh Green Chilli Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f74c36b32e9.png",
      price: "BDT 650 /1kg",
      link: "/product/fresh-green-chilli-paste-homemade",
      description: "100% Fresh Homemade Green Chilli Paste....."
    },
    {
      title: "Cumin Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f74de9a7845.jpg",
      price: "BDT 1,000 /1kg",
      link: "/product/cumin-paste-homemade",
      description: "100% Fresh Homemade Cumin Paste...."
    },
    {
      title: "Nut Paste (Homemade)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f74e7b2d7c5.jpeg",
      price: "BDT 900 /1kg",
      link: "/product/nut-paste-homemade",
      description: "100% Fresh Homemade Nut Paste...."
    },
    {
      title: "Red Chili Powder",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f74f407d588.jpeg",
      price: "BDT 950 /1kg",
      link: "/product/red-chili-powder",
      description: "দেশি মরিচ আমাদের দেশের বিভিন্ন জায়গা থেকে সংগ্রহ করা হয়।"
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

export default PasteSpice;
