import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import { Filter } from 'lucide-react';

const Cat = [
  {
    name: "c1",
    products: [
      {
        name: "p1",
        price: 20,
        deliveryTime: "2 days",
        stock: 50,
        serviceArea: ["US", "CA"]
      },
      {
        name: "p2",
        price: 15,
        deliveryTime: "3 days",
        stock: 30,
        serviceArea: ["US"]
      }
    ]
  },
  {
    name: "c2",
    products: [
      {
        name: "p1",
        price: 25,
        deliveryTime: "1 day",
        stock: 40,
        serviceArea: ["EU"]
      },
      {
        name: "p2",
        price: 18,
        deliveryTime: "4 days",
        stock: 20,
        serviceArea: ["EU", "UK"]
      }
    ]
  },
  {
    name: "c3",
    products: [
      {
        name: "p1",
        price: 22,
        deliveryTime: "2 days",
        stock: 60,
        serviceArea: ["US", "MX"]
      },
      {
        name: "p2",
        price: 14,
        deliveryTime: "5 days",
        stock: 10,
        serviceArea: ["MX"]
      }
    ]
  }
];

const CategoriesView = ({ categories, products }) => {

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Product Categories</h2>
      </div>

      {Cat.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No Products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Cat.map((item, index) => (
            <CategoryCard 
              key={index} 
              category={item.name} 
              products={item.products} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesView;
