import React from 'react';
import { Leaf, Droplet, Heart } from 'lucide-react';
export function About() {
  const features = [{
    icon: <Leaf className="h-10 w-10 text-aqua" />,
    title: 'Eco-Friendly',
    description: 'Our products are made from 100% pure silicone with no harmful additives or microplastics.'
  }, {
    icon: <Droplet className="h-10 w-10 text-aqua" />,
    title: 'Pure Materials',
    description: 'We use only the highest quality Platinum grade FDA approved silicone for all our products.'
  }, {
    icon: <Heart className="h-10 w-10 text-aqua" />,
    title: 'Better For All',
    description: 'Our commitment to microplastic-free products protects both your health and our oceans.'
  }];
  return <section id="about" className="py-20 bg-mist">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate">
              About <span className="text-aqua">Nothing</span>
            </h2>
            <p className="text-xl text-slate">
              We're on a mission to create everyday products without the
              environmental cost.
            </p>
            <div className="mt-4 inline-block border-b-2 border-aqua pb-1">
              <span className="text-slate font-medium">
                Free From Microplastics
              </span>
            </div>
          </div>
          <div className="mb-16">
            <div className="prose prose-lg mx-auto text-slate">
              <p>
                At Nothing, we believe that everyday products shouldn't come at
                the expense of our planet. Founded with a simple mission—to
                create high-quality silicone products with absolutely no
                microplastics—we're challenging the industry standard and
                proving that sustainable alternatives don't require compromise.
              </p>
              <p>
                Our name represents our philosophy: nothing harmful, nothing
                unnecessary, nothing but pure silicone. Every product we make is
                thoughtfully designed to be functional, beautiful, and most
                importantly, free from the microplastics that are polluting our
                oceans and harming wildlife.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => <div key={index} className="bg-aqua-light p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-slate">
                  {feature.title}
                </h3>
                <p className="text-slate">{feature.description}</p>
              </div>)}
          </div>
          <div className="mt-16 text-center">
            <img src="/ChatGPT_Image_Oct_7%2C_2025%2C_09_21_21_PM.png" alt="Nothing brand" className="mx-auto max-w-full h-auto rounded-lg shadow-lg" />
            <p className="text-slate mt-4 italic">
              Our commitment to pure, microplastic-free silicone products
            </p>
          </div>
        </div>
      </div>
    </section>;
}