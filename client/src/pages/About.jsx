import React from "react";
import { Link } from "react-router-dom";
import { Building2, Home, ShieldCheck, Users } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
                About Us
              </p>

              <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                Find your next <span className="text-blue-500">home with confidence.</span>
              </h1>

              <p className="mt-5 text-sm md:text-base leading-7 text-slate-600">
                We help buyers, sellers, and renters discover trusted properties with a smooth,
                modern, and transparent experience.
              </p>

            </div>

            <div className="relative min-h-[320px] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"
                alt="Real estate"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Modern Properties</h3>
            <p className="mt-2 text-sm text-slate-600">Carefully selected homes and apartments.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Home className="h-6 w-6 text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Easy Search</h3>
            <p className="mt-2 text-sm text-slate-600">Find the right property faster.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Trusted Service</h3>
            <p className="mt-2 text-sm text-slate-600">Transparent and reliable property support.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Client Focused</h3>
            <p className="mt-2 text-sm text-slate-600">Built around your goals and budget.</p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
  <div className="grid md:grid-cols-2 items-center">
    <div className="p-8 md:p-12">
      <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
        We Offer
      </p>

      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
        Trusted real estate <span className="text-blue-500">made simple.</span>
      </h2>

      <p className="mt-5 text-sm md:text-base leading-7 text-slate-600">
      Discover properties that match your lifestyle and goals with a simple,
      reliable platform designed to make buying, selling, and renting easier.
    </p>

      

    </div>

      <div className="h-full min-h-[320px]">
        <img
          src="https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b29dee03c527340ac948cfc9269277ad6dad0760.jpg"
          alt="Real estate"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
      </div>
    </main>
  );
};

export default About;