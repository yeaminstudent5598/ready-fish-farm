import React from 'react';

const ChickenAndDuck = () => {
     const products = [
      {
        title: "Sonali Chicken Whole (Skinless Clean & Dreesed)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f43f062c4a1.png",
        price: "BDT 634 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/sonali-chicken-whole-clean-dreesed-without-skin"
      },
      {
        title: "Sonali Chicken (Skinless Curry Cut)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f43fcb075b7.jpeg",
        price: "BDT 654 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/sonali-chicken-skin-less-curry-cut"
      },
      {
        title: "Premium Deshi Chicken (দেশি মোরগী)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f44c4d64e8f.jpeg",
        price: "BDT 1,110 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/premium-deshi-chicken-desi-morgee"
      },
      {
        title: "Sonali Chicken (সোনালী মুরগী)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f43fcb0768e.jpeg",
        price: "BDT 634 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/premium-sonali-cock-chicken-sonalee-murgee"
      },
      {
        title: "Premium Deshi Duck (দেশি হাঁস-Deshi Hash)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f46338822fc.jpeg",
        price: "BDT 818 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/premium-deshi-duck-hash"
      },
      {
        title: "Deshi China Duck (দেশী চিনা হাঁস)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f71177d5a06.jpeg",
        price: "BDT 2,820 /2.5kg",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-china-duckdesee-cina-hanns"
      },
      {
        title: "Deshi Chicken (Skinless Curry Cut)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f44ca1936ea.jpeg",
        price: "BDT 1,217 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-chicken-skinless-curry-cut"
      },
      {
        title: "Deshi Chicken (Curry Cut With Skin)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f44c4d35681.jpeg",
        price: "BDT 1,170 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-chicken-curry-cut-whit-skin"
      },
      {
        title: "Deshi Chicken Smoky (Curry Cut With Skin)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f44c4d8b567.jpeg",
        price: "BDT 1,220 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/smoky-deshi-chicken-turmeric"
      },
      {
        title: "Deshi Duck (দেশি হাঁস) Clean & Dressed (With Skin)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f4622b4d66e.jpeg",
        price: "BDT 818 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-duck-hash-clean-dressed-skin-on"
      },
      {
        title: "Deshi Duck (দেশি হাঁস) Curry Cut ‍With Skin (ক্বারি-কাট)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f463387adc7.jpeg",
        price: "BDT 858 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-duck-hash-curry-cut"
      },
      {
        title: "Premium Deshi Swan Duck.(দেশী রাজ হাঁস)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f705ea17256.jpeg",
        price: "BDT 2,860 /2.5kg",
        oldPrice: "",
        discount: "",
        link: "/product/premium-swan-duckrajhanns-25-kg-size"
      },
      {
        title: "Layer Chicken Skinless Curry Cut",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/66a7636ca8253.jpg",
        price: "BDT 742 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/layer-chicken-curry-cut"
      },
      {
        title: "Deshi Chicken Eggs 12Pcs Pack",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f86d826e885.jpeg",
        price: "BDT 284 /1Dozen",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-chicken-eggs-12pcs-pack"
      },
      {
        title: "Turkey Chicken (Clean & Drees 4kg/Size)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f86996af211.jpeg",
        price: "BDT 2,560 /4kg",
        oldPrice: "",
        discount: "",
        link: "/product/turkey-chicken-clean-drees-4kgsize"
      },
      {
        title: "Premium Quail Bird 4.Pcs Pack",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f716642f2ef.jpeg",
        price: "BDT 336 /1Pack",
        oldPrice: "",
        discount: "",
        link: "/product/premium-quail-bird"
      },
      {
        title: "Pigeon Clean & Dressed- 2-Pcs (বাচ্চা কবুতর ক্লিন এন্ড ড্রেস)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f71d7570f76.jpeg",
        price: "BDT 448 /1Pair",
        oldPrice: "",
        discount: "",
        link: "/product/pigeon-whole-clean-2-pcs-bacca-kbutr"
      },
      {
        title: "Layer Chicken Skinless Whole",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f727b56a46e.jpeg",
        price: "BDT 720 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/layer-chicken-skinless"
      },
      {
        title: "Sonali Chicken Skinless (Roast Cut)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/65362b23a1ddd.jpg",
        price: "BDT 654 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/sonali-chicken-roast-cut"
      },
      {
        title: "Deshi Small Chicken (দেশী ছোট বাচ্চা মুরগী)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/6543cc54c10f4.jpeg",
        price: "BDT 984 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-small-chicken-desee-chot-bacca-murgee-1"
      },
      {
        title: "Deshi Chicken Whole Cline And Dressed (With Skin)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/662cd752ede7f.jpg",
        price: "BDT 1,110 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/deshi-chicken-skin-on-whole"
      },
      {
        title: "Beijing Duck (2.50 - 3.00 KG)",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/662cd83666202.jpg",
        price: "BDT 1,460 /2.5kg",
        oldPrice: "",
        discount: "",
        link: "/product/duck"
      },
      {
        title: "Layer Chicken Skin On Whole",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/64f86996af211.jpeg",
        price: "BDT 668 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/layer-chicken-skin-on-whole"
      },
      {
        title: "Layer Chicken Skin On Curry Cut",
        imgSrc: "https://api.freshtoday.com.bd/media/thumbnail/media/66a760d0ec26b.jpg",
        price: "BDT 698 /1kg",
        oldPrice: "",
        discount: "",
        link: "/product/layer-chicken-skin-on-curry-cut"
      }
    ];
    return (
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
    );
};

export default ChickenAndDuck;