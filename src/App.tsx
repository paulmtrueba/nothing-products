import React from 'react';
import {
  About,
  ContactForm,
  Footer,
  Header,
  Hero,
  MicroplasticsInfo,
  Products,
  ProductContextProvider,
} from "./components";
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