import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ShoppingBag, Heart, Share2, ChevronLeft, Star, ChevronRight, Minus, Plus, Image as ImageIcon } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { GLTFViewer } from '../components';
import { usePageTracking } from "../hooks";
import { products } from "../utils/products";
export function ProductDetail() {
  usePageTracking();
  const {
    productId
  } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');
  // This would typically come from an API or data store
  // For demo purposes, we're hardcoding a product
  const product = products.find(product => product.id === productId);
  const availableRelatedProducts = products.filter(product => product.id !== productId);
  const sortDir = Math.floor(Math.random() * 2);
  let relatedProducts = availableRelatedProducts.sort((a,b) => a.id - b.id);
  if (sortDir === 1)
    relatedProducts = availableRelatedProducts.sort((a,b) => b.id - a.id);
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  const handleNextImage = () => {
    setActiveImage(prev => (prev + 1) % product.images.length);
  };
  const handlePrevImage = () => {
    setActiveImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };
  const toggleViewMode = () => {
    setViewMode(viewMode === 'image' ? '3d' : 'image');
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  return <div className="w-full min-h-screen bg-mist text-slate font-sans">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm">
            <Link to="/" className="text-slate hover:text-aqua transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/#products" className="text-slate hover:text-aqua transition-colors">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-aqua">{product.name}</span>
          </nav>
          {/* Back button */}
          <Link to="/#products" className="inline-flex items-center text-slate hover:text-aqua mb-6 transition-colors">
            <ChevronLeft size={16} />
            <span>Back to Products</span>
          </Link>
          {/* Product Detail Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Product Images/3D Viewer */}
            <div className="space-y-4">
              <div className="flex justify-end mb-2">
                <button onClick={toggleViewMode} className="flex items-center bg-aqua text-mist px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                  {viewMode === 'image' ? <>
                      <div size={16} className="mr-1" /> View 3D Model
                    </> : <>
                      <ImageIcon size={16} className="mr-1" /> View Images
                    </>}
                </button>
              </div>
              <div className="relative bg-mist rounded-lg overflow-hidden h-96 shadow-lg">
                {viewMode === 'image' ? <>
                    <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-contain" />
                    {product.images.length > 1 && <>
                        <button onClick={handlePrevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all" aria-label="Previous image">
                          <ChevronLeft size={20} className="text-slate" />
                        </button>
                        <button onClick={handleNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all" aria-label="Next image">
                          <ChevronRight size={20} className="text-slate" />
                        </button>
                      </>}
                  </> : <GLTFViewer gltfFile={product.glbFile} height="100%" backgroundColor="#F5F7F7" modelColor="#3FA7B6" className="rounded-lg" />}
              </div>
              {viewMode === 'image' && <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => <button key={index} onClick={() => setActiveImage(index)} className={`w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-aqua' : 'border-transparent'}`}>
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>)}
                </div>}
              {viewMode === '3d' && <div className="bg-aqua-light p-3 rounded-lg">
                  <p className="text-slate text-sm text-center">
                    <div size={16} className="inline-block mr-1" />
                    Interact with the 3D model: click and drag to rotate, scroll
                    to zoom
                  </p>
                </div>}
            </div>
            {/* Product Info */}
            <div>
              <div className="bg-aqua inline-block px-3 py-1 rounded-full mb-2">
                <p className="text-mist font-medium text-sm tracking-wider">
                  FREE FROM MICROPLASTICS
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
                </div>
                <span className="ml-2 text-slate">{product.rating}</span>
                <span className="mx-2 text-slate">|</span>
                <span className="text-slate">
                  {product.reviewCount} Reviews
                </span>
              </div>
              <div className="text-2xl font-bold text-aqua mb-6">
                {product.price}
              </div>
              <div className="mb-6">
                <p className="text-slate mb-4">{product.description}</p>
                <div className="inline-block bg-slate bg-opacity-10 px-3 py-1 rounded-full">
                  <span className="text-slate font-medium text-sm">
                    In Stock: {product.stock} available
                  </span>
                </div>
              </div>
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={decrementQuantity} className="px-3 py-2 text-slate hover:text-aqua transition-colors" disabled={quantity <= 1}>
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 text-slate">{quantity}</span>
                    <button onClick={incrementQuantity} className="px-3 py-2 text-slate hover:text-aqua transition-colors" disabled={quantity >= product.stock}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="flex-1 flex items-center justify-center bg-aqua hover:bg-opacity-90 text-mist py-3 px-6 rounded-md transition-colors shadow-md">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </button>
                  <button className="p-3 border border-gray-300 rounded-md hover:border-aqua text-slate hover:text-aqua transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 border border-gray-300 rounded-md hover:border-aqua text-slate hover:text-aqua transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="flex space-x-6 mb-4">
                  <button className={`pb-2 font-medium ${activeTab === 'description' ? 'text-aqua border-b-2 border-aqua' : 'text-slate hover:text-aqua'}`} onClick={() => handleTabChange('description')}>
                    Description
                  </button>
                  <button className={`pb-2 font-medium ${activeTab === 'features' ? 'text-aqua border-b-2 border-aqua' : 'text-slate hover:text-aqua'}`} onClick={() => handleTabChange('features')}>
                    Features
                  </button>
                  <button className={`pb-2 font-medium ${activeTab === 'specifications' ? 'text-aqua border-b-2 border-aqua' : 'text-slate hover:text-aqua'}`} onClick={() => handleTabChange('specifications')}>
                    Specifications
                  </button>
                </div>
                <div className="py-4">
                  {activeTab === 'description' && <div className="text-slate">
                      <p>{product.description}</p>
                    </div>}
                  {activeTab === 'features' && <ul className="list-disc pl-5 space-y-2 text-slate">
                      {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>}
                  {activeTab === 'specifications' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.specifications.map((spec, index) => <div key={index} className="border-b border-gray-200 pb-2">
                          <span className="font-medium text-slate">
                            {spec.name}:
                          </span>{' '}
                          {spec.value}
                        </div>)}
                    </div>}
                </div>
              </div>
            </div>
          </div>
          {/* Related Products */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate">
              Related <span className="text-aqua">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0,3).map(product => <Link to={`/product/${product.id}`} key={product.id} className="bg-mist rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden relative group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-aqua text-mist px-3 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <div size={16} className="inline-block mr-1" />
                        View 3D Model
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-slate">
                        {product.name}
                      </h3>
                      <span className="text-aqua font-semibold">
                        {product.price}
                      </span>
                    </div>
                    <span className="text-xs bg-aqua text-mist px-2 py-1 rounded-full">
                      Free From Microplastics
                    </span>
                  </div>
                </Link>)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}