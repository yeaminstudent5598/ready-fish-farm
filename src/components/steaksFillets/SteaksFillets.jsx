import React from 'react';

const SteaksFillets = () => {
     const products = [
    {
      title: "Premium River Rui Fish Stacks (Include Head Pieces)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ede7d72c1e8.jpeg", 
      price: "BDT 497 /0.5kg",
      oldPrice: "BDT 513 /0.5kg",
      discount: "3% Off",
      link: "/product/premium-river-rui-fish-stacks-include-head-pieces"
    },
    {
      title: "Deshi Mola Fish Clean & Dressed (রেডি টু কুক)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef491f31fad.jpeg", 
      price: "BDT 497 /0.5kg",
      oldPrice: "BDT 513 /0.5kg",
      discount: "3% Off",
      link: "/product/deshi-mola-fish-clean-dress-ready-to-cook"
    },
    {
      title: "River Bata Fish Stacks (Ready To Cook)",
      imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f083076247e.jpeg", 
      price: "BDT 441 /0.5kg",
      oldPrice: "",
      discount: "",
      link: "/product/river-bata-fish-stacks-ready-to-cook"
    }
  ];
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product, index) => (
        <a
          key={index}
          href={product.link}
          className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="relative">
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
            {product.discount && (
              <div className="text-sm text-red-600 font-semibold mt-2">-{product.discount}</div>
            )}
          </div>
        </a>
      ))}
    </div>
    );
};

export default SteaksFillets;