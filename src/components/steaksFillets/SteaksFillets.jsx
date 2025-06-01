import React from 'react';

const SteaksFillets = () => {
  const products = [
  {
    title: "River Rui Fish Stacks Include Head Pieces (Size: 2kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/66a3a4bbb397a.jpg", 
    price: "BDT 1,236 /2kg",
    oldPrice: "BDT 1,276 /2kg",
    discount: "3% Off",
    link: "/product/river-rui-fish-stacks-include-head-pieces-size-2kg"
  },
  {
    title: "Premium River Rui Fish Stacks (8kg) (Include Head Pieces)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 10,240 /8kg",
    oldPrice: "",
    discount: "",
    link: "/product/premium-river-rui-fish-stacks-8kg-include-head-pieces"
  },
  {
    title: "Deshi Rui Fish Stacks Include Head Pieces (Size: 2kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 1,196 /2kg",
    oldPrice: "BDT 1,236 /2kg",
    discount: "3% Off",
    link: "/product/deshi-rui-fish-stacks-include-head-pieces-size-2kg"
  },
  {
    title: "Deshi Rui Fish Stacks Include Head Pieces (Size: 2.5kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 1,587 /2.5kg",
    oldPrice: "BDT 1,662 /2.5kg",
    discount: "4% Off",
    link: "/product/deshi-rui-fish-stacks-include-head-pieces-size-25kg"
  },
  {
    title: "Deshi Rui Fish Stacks Include Head Pieces (Size: 3kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 2,046 /3kg",
    oldPrice: "BDT 2,094 /3kg",
    discount: "2% Off",
    link: "/product/deshi-rui-fish-stacks-include-head-pieces-size-3kg"
  },
  {
    title: "Deshi Rui Fish Stacks Include Head Pieces (Size: 3.5kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 2,632 /3.5kg",
    oldPrice: "BDT 2,768 /3.5kg",
    discount: "5% Off",
    link: "/product/deshi-rui-fish-stacks-include-head-pieces-size-35kg"
  },
  {
    title: "Deshi Rui Fish Stacks Include Head Pieces (Size: 4kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 3,868 /4kg",
    oldPrice: "BDT 4,028 /4kg",
    discount: "4% Off",
    link: "/product/deshi-rui-fish-stacks-include-head-pieces-size-4kg"
  },
  {
    title: "Deshi Rui Fish Stacks Include Head Pieces (Size: 5kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 5,620 /5kg",
    oldPrice: "BDT 5,790 /5kg",
    discount: "3% Off",
    link: "/product/deshi-rui-fish-stacks-include-head-pieces-size-5kg"
  },
  {
    title: "River Rui Fish Curry Cut Include Head Pieces (Size: 2kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef3ef9d4ff4.jpeg", 
    price: "BDT 1,236 /2kg",
    oldPrice: "BDT 1,276 /2kg",
    discount: "3% Off",
    link: "/product/river-rui-fish-curry-cut-include-head-pieces-size-2kg"
  },
  {
    title: "Deshi Meni Fish Clean & Dressed (Ready To Cook)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/673842becc6b1.jpg", 
    price: "BDT 482 /0.5kg",
    oldPrice: "",
    discount: "",
    link: "/product/deshi-meni-fish-clean-dressed-ready-to-cook"
  },
  {
    title: "Deshi Shol Fish Clean & Dressed (Size:700-800gm)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef1ed2c789b.jpeg", 
    price: "BDT 1,024 /1kg",
    oldPrice: "",
    discount: "",
    link: "/product/deshi-shol-fish-clean-dressed-size-700-800gm"
  },
  {
    title: "Deshi Nola Fish (Belly Clean & Dressed)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f03945f2aa0.jpeg", 
    price: "BDT 422 /1kg",
    oldPrice: "",
    discount: "",
    link: "/product/deshi-nola-fish-belly-clean-dressed"
  },
  {
    title: "River Kaikka Fish (Steaks With Head Pieces)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef2784004b6.jpeg", 
    price: "BDT 447 /0.5kg",
    oldPrice: "",
    discount: "",
    link: "/product/river-kaikka-fish-steaks-with-head-pieces"
  },
  {
    title: "River Kajoli Fish Clean & Dressed (Ready To Cook)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64ef2bb26b25c.jpeg", 
    price: "BDT 825 /0.5kg",
    oldPrice: "",
    discount: "",
    link: "/product/river-kajoli-fish-clean-dressed-ready-to-cook"
  },
  {
    title: "River Pabda Fish (Ready To Cook) (Size: 14 To 18 Pcs)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f07c82bb496.jpeg", 
    price: "BDT 460 /0.5kg",
    oldPrice: "BDT 475 /0.5kg",
    discount: "3% Off",
    link: "/product/river-pabda-fish-ready-to-cook-size-14-to-18-pcs"
  },
  {
    title: "River Koral Fish Stacks Include Head Pieces (Size: 1kg)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/6536424ecd252.jpg", 
    price: "BDT 1,366 /1kg",
    oldPrice: "BDT 1,412 /1kg",
    discount: "3% Off",
    link: "/product/river-koral-fish-stacks-include-head-pieces-size-1kg"
  },
  {
    title: "River Bhangor Fish (Belly Clean & Dressed)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f064880ba8b.jpeg", 
    price: "BDT 784 /1kg",
    oldPrice: "",
    discount: "",
    link: "/product/river-bhangor-fish-belly-clean-dressed"
  },
  {
    title: "River Bhangor Fish Steaks (Include Head Pieces)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f06488060e2.jpeg", 
    price: "BDT 784 /1kg",
    oldPrice: "",
    discount: "",
    link: "/product/river-bhangor-fish-steaks-include-head-pieces"
  },
  {
    title: "Desi Puti Fish Clean & Dressed (রেডি টু কুক)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f073f0787b6.jpeg", 
    price: "BDT 477 /0.5kg",
    oldPrice: "",
    discount: "",
    link: "/product/desi-puti-fish-clean-dressed-ready-to-cook"
  },
  {
    title: "Biler Deshi Shing Fish Clean & Dressed (Ready To Cook)",
    imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f07ca24b8ef.jpeg", 
    price: "BDT 472 /0.5kg",
    oldPrice: "",
    discount: "",
    link: "/product/biler-deshi-shing-fish-clean-dressed-ready-to-cook"
  }
];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product, index) => (
        <a
          key={index}
          href={product.link}
          className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
        >
          <div className="relative">
            {/* Discount Badge */}
            {product.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}
              </span>
            )}
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold mb-1">{product.title}</p>
            <div className="text-sm text-gray-600">
              {/* Old price and new price */}
              {product.oldPrice && (
                <div className="line-through text-gray-400">{product.oldPrice}</div>
              )}
              <div className="text-green-600 font-bold">{product.price}</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SteaksFillets;
