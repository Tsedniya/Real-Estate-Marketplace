import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const primaryColor = "#022222";

  return (
    <div className="bg-slate-50">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075')",
            filter: "brightness(0.65)"
          }}
        />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center text-white z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-tight mb-6">
              <span className="text-blue-500">Find Your</span> <span className='text-slate-900'>Dream Home</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-xl mx-auto">
              Premium properties • Expert service • Trusted by thousands
            </p>

            {/* Main CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <Link
              to="/create-listing"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all shadow-lg hover:shadow-xl"
            >
              Let's Start Now
              <span className="text-2xl">→</span>
            </Link>

            {/* Secondary Button */}
            <Link
              to="/search"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-white text-white hover:bg-white/10 transition-all"
            >
              Browse Properties
            </Link>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center">
          <span className="text-xs tracking-[3px] uppercase">Scroll to explore</span>
          <div className="w-px h-10 bg-white/40 mt-3"></div>
        </div>
      </section>

      {/* WHY US / FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
              Why Tsehay Estate?
            </h2>
            <p className="text-slate-600 mt-3">Excellence in every property</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl hover:shadow-xl transition-all">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6" 
                   style={{ backgroundColor: primaryColor, color: "white" }}>
                🏡
              </div>
              <h3 className="text-2xl font-semibold mb-3">Premium Selection</h3>
              <p className="text-slate-600">Curated luxury homes and investment opportunities.</p>
            </div>

            <div className="text-center p-8 rounded-3xl hover:shadow-xl transition-all">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6" 
                   style={{ backgroundColor: primaryColor, color: "white" }}>
                ✅
              </div>
              <h3 className="text-2xl font-semibold mb-3">Verified Listings</h3>
              <p className="text-slate-600">All properties are legally verified and authenticated.</p>
            </div>

            <div className="text-center p-8 rounded-3xl hover:shadow-xl transition-all">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6" 
                   style={{ backgroundColor: primaryColor, color: "white" }}>
                👥
              </div>
              <h3 className="text-2xl font-semibold mb-3">Personal Support</h3>
              <p className="text-slate-600">Dedicated team to help you every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900">Featured Properties</h2>
            <Link to="/search" className="font-medium text-[#022222] hover:underline flex items-center gap-2">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition-all group">
                <div className="relative h-64">
                  <img 
                    src={`https://picsum.photos/id/${70 + i}/600/400`} 
                    alt="property" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-2xl text-sm font-semibold shadow" 
                       style={{ color: primaryColor }}>
                    Featured
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-sm text-slate-500">Addis Ababa • Villa</p>
                  <h3 className="font-semibold text-xl mt-1">Luxury 5 Bedroom Villa with Garden</h3>
                  <p className="text-2xl font-bold mt-3 text-slate-900">ETB 45,000,000</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#022222] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-semibold tracking-tight mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Start your journey with Tsehay Estate today.
          </p>
          
          <Link
            to="/create-listing"
            className="inline-flex items-center gap-4 px-12 py-6 rounded-3xl text-xl font-semibold bg-white text-[#022222] hover:bg-slate-100 active:scale-95 transition-all"
          >
            Let's Start Now
            <span className="text-3xl">🚀</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;