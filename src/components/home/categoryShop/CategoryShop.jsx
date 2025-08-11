import React from 'react';

const categories = [
  {
    name: "Fish & Seafood",
    image: "https://i.ibb.co/mVjgYDBD/Cat-Artboard-5.jpg",
    link: "/category/fish-and-seafood"
  },
  {
    name: "Steaks & Fillets",
    image: "https://i.ibb.co/7H1tzBH/Cat-Artboard-1.jpg",
    link: "/category/steaks-&-fillets"
  },
  {
    name: "Chicken & Duck",
    image: "https://i.ibb.co/ZpB673dL/Cat-Artboard-4.jpg",
    link: "/category/chicken-&-duck"
  },
  {
    name: "Beef & Mutton",
    image: "https://i.ibb.co/mCdrBb0c/Cat-Artboard-2.jpg",
    link: "/category/beef-&-mutton"
  },
  {
    name: "Combo Pack",
    image: "https://i.ibb.co/G4hJKddV/Cat-Artboard-3.jpg",
    link: "/category/combo-pack"
  },
  {
    name: "Combo Pack",
    image: "https://i.ibb.co/G4hJKddV/Cat-Artboard-3.jpg",
    link: "/category/combo-pack"
  },
];

const CategoryShop = () => {
  return (
    <div className="px-4 py-8">
     <h1 className="text-center text-xl sm:text-2xl md:text-xl lg:text-4xl font-bold text-red-600 tracking-wide mb-6">
  <span className="inline-block border-b-4 border-yellow-400 pb-1 px-2">
    Shop by Category
  </span>
</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {categories.map((category, index) => (
          <a
            href={category.link}
            key={index}
            className="group w-[120px] sm:w-[140px] md:w-[150px] lg:w-[160px] xl:w-[180px] relative block rounded-full overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-70 transition duration-300">
              <p className="text-white text-sm sm:text-base md:text-lg text-center font-bold">
                {category.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryShop;
