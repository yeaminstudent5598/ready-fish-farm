import React from 'react';

const FishAndSeafoods = () => {
  const products = [
    {
      link: "/product/ayala-mackerel-fish",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ededf155949.jpeg",
      title: "Ayala/Mackerel Fish Whole (আইলা মাছ)",
      oldPrice: "BDT 500 /1kg",
      price: "BDT 430 /1kg",
      discount: "14%",
    },
    {
      link: "/product/silver-pomfretrupchada-whole-size-7-8-pcs",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64eb5761ae9fe.jpeg",
      title: "Silver Pomfret Whole (রূপচাঁদা মাছ আস্ত)",
      oldPrice: "BDT 1,500 /1kg",
      price: "BDT 1,365 /1kg",
      discount: "9%",
    },
    {
      link: "/product/silver-pomfret-size-4-pcs-kg-1",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64eb5761ae9fe.jpeg",
      title: "Silver Pomfret রূপচাদা (Big Size-বড় সাইজ)",
      oldPrice: "BDT 1,800 /1kg",
      price: "BDT 1,560 /1kg",
      discount: "13%",
    },
    {
      link: "/product/horse-mackerel",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64eb4c4acf03f.jpeg",
      title: "Horse Mackerel",
      oldPrice: "BDT 500 /1kg",
      price: "BDT 450 /1kg",
      discount: "10%",
    },
    {
      link: "/product/silver-croaker-silver-poa-fish-1",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64eb5760cecbb.jpeg",
      title: "Silver Croaker / Silver Poa Fish",
      oldPrice: "BDT 700 /1kg",
      price: "BDT 630 /1kg",
      discount: "10%",
    },
    {
      link: "/product/queen-poared-poya-small",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64eb575fe3ed8.jpeg",
      title: "Queen Poa/Red Poya Small (ছোট সুন্দরি পোয়া মাছ)",
      oldPrice: "BDT 350 /1kg",
      price: "BDT 294 /1kg",
      discount: "16%",
    },
    {
      link: "/product/sole-fish-whole-size-medium-1",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64eb5761dc438.jpeg",
      title: "Sea Sole Fish Whole (Size: Medium)",
      oldPrice: "BDT 500 /1kg",
      price: "BDT 430 /1kg",
      discount: "14%",
    },
    {
      link: "/product/local-squid-calamari-tube",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/667a9fd27bfe4.jpg",
      title: "Squid Clean Tube/Calamari Clean Tube",
      oldPrice: "BDT 500 /0.5kg",
      price: "BDT 464 /0.5kg",
      discount: "7%",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-6">Fish & Seafoods</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <a
            key={index}
            href={product.link}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative">
              {/* Discount Badge */}
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}
                </span>
              )}
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 mb-2">{product.title}</p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-green-600">{product.price}</div>
                {product.oldPrice && (
                  <div className="text-sm line-through text-gray-500">{product.oldPrice}</div>
                )}
              </div>
              {/* Display Discount */}
              {product.discount && (
                <div className="text-sm text-red-600 font-semibold mt-2">-{product.discount}</div>
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="btn rounded-xl bg-green-600 text-white py-2 px-6 hover:bg-green-700 transition-all duration-300">
          Load More
        </button>
      </div>
    </div>
  );
};

export default FishAndSeafoods;
