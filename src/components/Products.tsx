import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from "../utils/products";

export function Products() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  
  return <section id="products" className="py-20 bg-aqua-light">
      <div className="container mx-auto px-4 md:px-6">
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate">
              Our <span className="text-aqua">Products</span>
            </h2>
            <p className="text-xl text-slate max-w-3xl mx-auto">
              Discover our range of pure silicone products, designed with both
              functionality and sustainability in mind.
            </p>
            <div className="mt-4 inline-block bg-slate bg-opacity-10 px-3 py-1 rounded-full">
              <span className="text-slate font-medium">
                Free From Microplastics
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => <div key={index} className="bg-mist rounded-lg overflow-hidden shadow-lg" onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
                <Link to={`/product/${product.id}`} className="block h-64 overflow-hidden relative">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </Link>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <Link to={`/product/${product.id}`} className="hover:text-aqua transition-colors">
                      <h3 className="text-xl font-bold text-slate">
                        {product.name}
                      </h3>
                    </Link>
                    <span className="text-aqua font-semibold">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-slate mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-aqua text-mist px-2 py-1 rounded-full">
                      Free From Microplastics
                    </span>
                    <button className="flex items-center justify-center bg-aqua hover:bg-opacity-90 text-mist py-2 px-4 rounded-md transition-colors">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-block px-8 py-3 bg-aqua text-mist rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-md">
              View All Products
            </a>
          </div>
        </div>
      </div>
    </section>;
}