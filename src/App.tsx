import React from 'react';
import { usePageTracking } from "./hooks";
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
  usePageTracking();
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