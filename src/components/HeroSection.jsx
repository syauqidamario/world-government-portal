export default function HeroSection() {
  return (
    <div className="relative h-[70vh] min-h-125 flex items-center justify-center overflow-hidden border-b-2 border-slate-800">
      {/* Background Image Setup */}
      {/* Note: We are using a temporary placeholder image of majestic clouds/mountains. 
          You can swap this URL with an actual image of Mary Geoise or Marineford later. */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: `url('/Users/asabovesobelow/Desktop/new_project/wg-portal/public/images/6ux2v9ogpqke1.jpeg')`,
        }}
      >
        {/* Dark gradient overlay to ensure text remains perfectly readable */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-900/60 to-slate-950"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-12">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-black text-slate-100 uppercase tracking-widest drop-shadow-2xl mb-8 leading-tight">
          Absolute <br />
          <span className="text-red-700 text-shadow-sm">Justice</span>
        </h1>

        <p className="font-mono text-sm md:text-lg text-slate-300 tracking-[0.2em] uppercase border-t border-b border-red-900/30 py-5 max-w-3xl mx-auto backdrop-blur-md bg-slate-950/40">
          Uniting over 170 nations under the shield of the law
        </p>
      </div>
    </div>
  );
}
