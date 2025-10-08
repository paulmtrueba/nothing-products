import React from 'react';
import { AlertTriangle, CheckCircle, Droplet, Waves, Recycle, Leaf, Package, Factory, ArrowRight } from 'lucide-react';
export function MicroplasticsInfo() {
  const dangers = ['Microplastics are now found in human blood, lungs, and organs', 'Marine animals ingest microplastics, causing harm throughout the food chain', 'Plastics can take 450+ years to decompose in the environment', 'Over 14 million tons of plastic end up in our oceans every year'];
  const approach = ['Using 100% pure Platinum grade FDA approved silicone with zero plastic additives', 'Rigorous testing to ensure no microplastic shedding during use', 'Sustainable packaging made from recycled and biodegradable materials', 'Transparent supply chain and manufacturing processes'];
  const sustainableMaterials = [{
    title: 'AllPHA (Polyhydroxyalkanoates)',
    points: ['100% bio-based, produced by bacterial fermentation', 'Compostable and biodegradable in both industrial and natural environments', 'Does not form microplastics: PHA degrades into CO₂, water, and biomass rather than fragmenting', 'Suitable for injection or compression molding when temperature-controlled'],
    icon: <Leaf className="h-8 w-8 text-aqua" />
  }, {
    title: 'Platinum-Cure Silicone',
    points: ['An addition-cure silicone that crosslinks via platinum catalysis (not tin or condensation)', "Chemically inert, non-reactive, and non-shedding — won't break down into micro-particles", 'Once cured, it remains stable for years and can often be recycled into industrial silicone reclaim streams'],
    icon: <Droplet className="h-8 w-8 text-aqua" />
  }];
  const packagingBenefits = ["Zero microplastic generation: Paper and cardboard fibers don't create synthetic micro-fragments", 'Closed-loop recyclability: Post-consumer recycled paperboard can be recycled up to 5-7 times', 'Low embodied energy: Requires ~70% less energy and water than virgin plastic packaging', 'Compostable and printable: Compatible with soy-based or water-based inks', 'Cushioning and protection: Molded pulp or honeycomb paper structures replace foam or bubble wrap'];
  const comparisonData = [{
    stage: 'Mold Creation',
    conventional: 'PLA / ABS',
    eco: 'allPHA',
    reduction: 'High'
  }, {
    stage: 'Casting',
    conventional: 'Tin-cure Silicone',
    eco: 'Platinum-cure Silicone',
    reduction: 'Very High'
  }, {
    stage: 'Demolding',
    conventional: 'PET release agent',
    eco: 'Bio-based release (e.g., soy)',
    reduction: 'Very High'
  }, {
    stage: 'Packaging',
    conventional: 'Poly film / Foam',
    eco: 'Recycled paper / Cardboard',
    reduction: 'Very High'
  }, {
    stage: 'Disposal',
    conventional: 'Landfill plastics',
    eco: 'Compostable / Recyclable',
    reduction: 'Very High'
  }];
  return <section id="microplastics" className="py-20 bg-mist">
      <div className="container mx-auto px-4 md:px-6">
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate">
              The <span className="text-aqua">Microplastics</span> Crisis
            </h2>
            <p className="text-xl text-slate max-w-3xl mx-auto">
              Tiny plastic particles are causing massive environmental damage.
              Here's why it matters and how we're addressing it.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-sand bg-opacity-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-10 w-10 text-slate mr-4" />
                <h3 className="text-2xl font-bold text-slate">The Dangers</h3>
              </div>
              <div className="space-y-4">
                {dangers.map((danger, index) => <div key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center min-w-6 h-6 w-6 rounded-full bg-sand text-slate mr-3 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-slate">{danger}</p>
                  </div>)}
              </div>
              <div className="mt-8 p-4 bg-mist rounded-lg border border-sand">
                <p className="text-slate">
                  Microplastics are plastic particles less than 5mm in size that
                  come from larger plastic items breaking down or are
                  intentionally added to products. They're now found
                  everywhere—from the deepest oceans to mountain peaks, and even
                  in human blood and organs. Their long-term health impacts are
                  still being studied, but early research suggests potential
                  hormonal disruption and other health concerns.
                </p>
              </div>
            </div>
            <div className="bg-aqua-light p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-10 w-10 text-aqua mr-4" />
                <h3 className="text-2xl font-bold text-slate">Our Approach</h3>
              </div>
              <div className="space-y-4">
                {approach.map((item, index) => <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-aqua mr-3 mt-1 flex-shrink-0" />
                    <p className="text-slate">{item}</p>
                  </div>)}
              </div>
              <div className="mt-8 p-4 bg-mist rounded-lg border border-aqua-light">
                <p className="text-slate">
                  At Nothing, we've made a commitment to create products that
                  are truly microplastic-free. Our pure silicone formulation is
                  rigorously tested to ensure it doesn't shed microparticles
                  during use or breakdown. We believe that by setting a new
                  standard for everyday products, we can help reduce the amount
                  of microplastics entering our environment and our bodies.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate">
                Our <span className="text-aqua">Sustainable Materials</span>{' '}
                Solution
              </h2>
              <p className="text-lg text-slate max-w-3xl mx-auto mt-4">
                We've developed a comprehensive system to eliminate
                microplastics at every stage of our product lifecycle.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {sustainableMaterials.map((material, index) => <div key={index} className="bg-mist p-6 rounded-lg shadow-md border-l-4 border-aqua">
                  <div className="flex items-center mb-4">
                    {material.icon}
                    <h3 className="text-xl font-bold text-slate ml-4">
                      {material.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {material.points.map((point, idx) => <li key={idx} className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-aqua mr-2 mt-1 flex-shrink-0" />
                        <span className="text-slate">{point}</span>
                      </li>)}
                  </ul>
                </div>)}
            </div>
            <div className="bg-aqua bg-opacity-10 p-8 rounded-lg mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-aqua rounded-full p-3">
                  <Package className="h-6 w-6 text-mist" />
                </div>
                <h3 className="text-2xl font-bold text-slate ml-4">
                  Sustainable Packaging Strategy
                </h3>
              </div>
              <p className="text-slate mb-6">
                Our recycled cardboard and paper packaging complements our
                sustainable materials approach, creating a full-spectrum
                sustainability loop with low waste, low toxicity, and minimal
                microplastic risk.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {packagingBenefits.map((benefit, index) => <div key={index} className="bg-mist p-4 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-aqua mb-2" />
                    <p className="text-slate text-sm">{benefit}</p>
                  </div>)}
              </div>
              <div className="bg-mist p-4 rounded-lg">
                <h4 className="font-semibold text-slate mb-2">
                  Our Packaging Workflow:
                </h4>
                <ol className="space-y-2 text-slate">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center min-w-6 h-6 w-6 rounded-full bg-aqua text-mist mr-3">
                      1
                    </span>
                    <span>Cast silicone parts in allPHA molds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center min-w-6 h-6 w-6 rounded-full bg-aqua text-mist mr-3">
                      2
                    </span>
                    <span>
                      Package in kraft recycled cardboard boxes with molded pulp
                      inserts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center min-w-6 h-6 w-6 rounded-full bg-aqua text-mist mr-3">
                      3
                    </span>
                    <span>Use paper-based tape and compostable labels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center min-w-6 h-6 w-6 rounded-full bg-aqua text-mist mr-3">
                      4
                    </span>
                    <span>
                      Ship in recyclable outer cartons — no plastic film, no
                      tape residue
                    </span>
                  </li>
                </ol>
              </div>
            </div>
            <div className="bg-sand bg-opacity-30 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-sand rounded-full p-3">
                  <Factory className="h-6 w-6 text-slate" />
                </div>
                <h3 className="text-2xl font-bold text-slate ml-4">
                  System-Wide Microplastic Reduction
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-slate">
                  <thead>
                    <tr className="border-b border-sand">
                      <th className="py-3 text-left">Process Stage</th>
                      <th className="py-3 text-left">Conventional Materials</th>
                      <th className="py-3 text-left">Our Eco-Alternative</th>
                      <th className="py-3 text-left">Microplastic Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => <tr key={index} className={index % 2 === 0 ? 'bg-mist' : ''}>
                        <td className="py-3 font-medium">{row.stage}</td>
                        <td className="py-3">{row.conventional}</td>
                        <td className="py-3 text-aqua font-medium">
                          {row.eco}
                        </td>
                        <td className="py-3">
                          <span className="bg-aqua text-mist text-xs px-2 py-1 rounded-full">
                            {row.reduction}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-mist p-4 rounded-lg">
                <h4 className="font-semibold text-slate mb-2">
                  Environmental and Marketing Implications:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-aqua mr-2 mt-1 flex-shrink-0" />
                    <span className="text-slate">
                      <span className="font-medium">
                        Certifiable sustainability:
                      </span>{' '}
                      Our approach qualifies for certifications like Cradle to
                      Cradle, USDA BioPreferred, and Compostable Packaging
                      Alliance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-aqua mr-2 mt-1 flex-shrink-0" />
                    <span className="text-slate">
                      <span className="font-medium">Consumer trust:</span> From
                      product to packaging, every layer supports circular
                      economy principles
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-aqua mr-2 mt-1 flex-shrink-0" />
                    <span className="text-slate">
                      <span className="font-medium">Lifecycle coherence:</span>{' '}
                      All inputs safely return to the biosphere, from bacterial
                      polymer synthesis to compostable cardboard
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 bg-gradient-to-r from-aqua to-aqua-light rounded-lg overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-2xl md:text-3xl font-bold text-mist mb-4">
                  Join Our Mission
                </h3>
                <p className="text-mist text-opacity-90 mb-6">
                  Every purchase of a Nothing product helps reduce the amount of
                  microplastics in our environment. Together, we can make a
                  difference one silicone product at a time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#products" className="px-6 py-3 bg-mist text-aqua rounded-full font-medium hover:bg-opacity-90 transition-colors">
                    Shop Products
                  </a>
                  <a href="#contact" className="px-6 py-3 bg-transparent border-2 border-mist text-mist rounded-full font-medium hover:bg-mist hover:bg-opacity-10 transition-colors">
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative">
                  <Waves className="h-24 w-24 text-mist opacity-30 absolute -top-4 -left-4" />
                  <Droplet className="h-32 w-32 text-mist" />
                  <Waves className="h-24 w-24 text-mist opacity-30 absolute -bottom-4 -right-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}