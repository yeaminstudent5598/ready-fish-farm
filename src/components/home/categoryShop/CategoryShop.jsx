import React from 'react';

const categories = [
  {
    name: "Fish & Seafood",
    image: "https://api.freshtoday.com.bd/media/650eb01b83568.jpeg",
    link: "/category/fish-and-seafood"
  },
  {
    name: "Steaks & Fillets",
    image: "https://api.freshtoday.com.bd/media/650ed23093228.jpeg",
    link: "/category/steaks-&-fillets"
  },
  {
    name: "Chicken & Duck",
    image: "https://api.freshtoday.com.bd/media/650ed27805496.jpeg",
    link: "/category/chicken-&-duck"
  },
  {
    name: "Beef & Mutton",
    image: "https://api.freshtoday.com.bd/media/650ed2ac62a3a.jpeg",
    link: "/category/beef-&-mutton"
  },
  {
    name: "Combo Pack",
    image: "https://api.freshtoday.com.bd/media/650ed2d39150f.jpeg",
    link: "/category/combo-pack"
  },
  {
    name: "Dried Fish",
    image: "https://api.freshtoday.com.bd/media/650ed2f581dc9.jpeg",
    link: "/category/dried-fish"
  },
  {
    name: "Marinated & Cooked",
    image: "https://api.freshtoday.com.bd/media/650ed3218efc8.jpeg",
    link: "/category/marinated-&-cooked"
  },
  {
    name: "Paste Spice",
    image: "https://api.freshtoday.com.bd/media/650ed34e4074f.jpeg",
    link: "/category/paste-spice"
  },
  {
    name: "Fruit & Veggies",
    image: "https://api.freshtoday.com.bd/media/650c359d6b2b9.jpeg",
    link: "/category/fruit-&-veggies"
  }
];

const CategoryShop = () => {
  return (
    <div className="px-4 py-8">
      <h1 className="text-red-600 font-bold text-4xl text-center mb-8">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <a href={category.link} key={index} className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <img src={category.image} alt={category.name} className="w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-70 transition duration-300">
              <p className="text-white text-xl font-bold">{category.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryShop;
