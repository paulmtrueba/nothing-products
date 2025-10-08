import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { MicroplasticsInfo } from './components/MicroplasticsInfo';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
export function App() {
  return <div className="w-full min-h-screen bg-mist text-slate font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <MicroplasticsInfo />
        <ContactForm />
      </main>
      <Footer />
    </div>;
}