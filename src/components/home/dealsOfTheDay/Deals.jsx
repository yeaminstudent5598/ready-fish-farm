import React from 'react';

const dealsData = [
  {
    name: "Imported Frozen Dory Fillets. (3pcs 1kg Pack)",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64f1e4c79a73f.jpeg",
    oldPrice: "BDT 584 /1kg",
    newPrice: "BDT 499 /1kg",
    discount: "15%",
    link: "/product/imported-cream-dorybasa-bonless-fillet-3-pcs1kg-pack",
  },
  {
    name: "Panchmishali Fish Clean & Dressed",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64f0a5973be93.jpeg",
    oldPrice: "BDT 690 /1kg",
    newPrice: "BDT 599 /1kg",
    discount: "13%",
    link: "/product/premium-panchmishali-ready-to-cook-panncmisali-reri-tu-kuk",
  },
  {
    name: "River Datina Koral Fish",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64ec90f518c6b.jpeg",
    oldPrice: "BDT 740 /1kg",
    newPrice: "BDT 674 /1kg",
    discount: "9%",
    link: "/product/datina-koral-white-snapper",
  },
  {
    name: "River Sonali Boal Fish",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64f05eefd3c2b.jpeg",
    newPrice: "BDT 684 /1kg",
    link: "/product/river-sonali-boal-fish-ndeer-sonalee-boyal-mach",
  },
  {
    name: "Imported Frozen Dory Fillets. (3pcs 1kg Pack)",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64f1e4c79a73f.jpeg",
    oldPrice: "BDT 584 /1kg",
    newPrice: "BDT 499 /1kg",
    discount: "15%",
    link: "/product/imported-cream-dorybasa-bonless-fillet-3-pcs1kg-pack",
  },
  {
    name: "Panchmishali Fish Clean & Dressed",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64f0a5973be93.jpeg",
    oldPrice: "BDT 690 /1kg",
    newPrice: "BDT 599 /1kg",
    discount: "13%",
    link: "/product/premium-panchmishali-ready-to-cook-panncmisali-reri-tu-kuk",
  },
  {
    name: "River Datina Koral Fish",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64ec90f518c6b.jpeg",
    oldPrice: "BDT 740 /1kg",
    newPrice: "BDT 674 /1kg",
    discount: "9%",
    link: "/product/datina-koral-white-snapper",
  },
  {
    name: "River Sonali Boal Fish",
    image: "https://api.freshtoday.com.bd/media/thumbnail/media/64f05eefd3c2b.jpeg",
    newPrice: "BDT 684 /1kg",
    link: "/product/river-sonali-boal-fish-ndeer-sonalee-boyal-mach",
  },
  // Add more products here...
];

const Deals = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-6">Deals of the Day</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dealsData.map((product, index) => (
          <a
            key={index}
            href={product.link}
            className=" rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold mb-1">{product.name}</p>
              <div className="text-sm text-gray-600">
                {product.oldPrice && (
                  <div className="line-through text-gray-400">{product.oldPrice}</div>
                )}
                <div className="text-green-600 font-bold">{product.newPrice}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className='text-center mt-6'>      <button className='btn rounded-xl bg-[#40a944] text-white'>Lead More</button>
</div>
    </div>
  );
};

export default Deals;
