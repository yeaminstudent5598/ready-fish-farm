import React from 'react';

const DriedFish = () => {
  const products = [
    {
      title: "Fresh Loitta Dried Fish Clean",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f738ce12b91.jpeg",
      price: "BDT 1,584 /1kg",
      oldPrice: "BDT 1,900 /1kg",  // Example old price
      discount: "12%",
      link: "/product/fresh-loitta-dried-fish-clean",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
    },
    {
      title: "Fresh Chapa Dried Fish",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f739f9e5795.jpeg",
      price: "BDT 1,358 /1kg",
      oldPrice: "BDT 1,500 /1kg",  // Example old price
      discount: "12%",
      link: "/product/fresh-chapa-dried-fish",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
    },
    {
      title: "Fresh Churi Dried Fish Clean",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f73aa29bfca.jpeg",
      price: "BDT 1,680 /1kg",
      oldPrice: "BDT 2,000 /1kg",  // Example old price
      discount: "12%",
      link: "/product/fresh-churi-dried-fish-clean",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
    },
    {
      title: "Fresh Mola Dried Fish",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f73b8d57c11.jpeg",
      price: "BDT 970 /1kg",
      oldPrice: "BDT 1,100 /1kg",  // Example old price
      discount: "12%",
      link: "/product/fresh-mola-dried-fish",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
    },
    {
      title: "Fresh Chapila Dried Fish",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f73c5ccb5ef.jpeg",
      price: "BDT 780 /1kg",
      oldPrice: "BDT 900 /1kg",  // Example old price
      discount: "12%",
      link: "/product/fresh-chapila-dried-fish",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
    },
    {
      title: "Fresh Silver Pomfret Dried Fish",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f73d2ee8de6.jpeg",
      price: "BDT 1,990 /0.5kg",
      oldPrice: "BDT 2,200 /0.5kg",  // Example old price
      discount: "12%",
      link: "/product/fresh-silver-pomfret-dried-fish",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
    },
    {
      title: "Fresh Red Shrimp Dried Fish",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f73f0925483.jpeg",
      price: "BDT 1,180 /1kg",
      oldPrice: "BDT 1,400 /1kg",  // Example old price
      discount: "12%",
      link: "/product/fresh-red-shrimp-dried-fish",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
    },
    {
      title: "Dried Small Shrimp Dried Fish",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f740020854b.jpeg",
      price: "BDT 980 /1kg",
      oldPrice: "BDT 1,200 /1kg",  // Example old price
      discount: "12%",
      link: "/product/dried-small-shrimp-dried-fish",
      description: "The Most Popular Dried Fish in Bangladesh. Quality: 100% Fresh And Organic"
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

export default DriedFish;
