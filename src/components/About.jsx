import React, { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden"
      id="about"
    >
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-slate-800/10 to-blue-900/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-900/10 to-slate-800/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-800/5 to-slate-700/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* TEXT SECTION - LEFT */}
        <div className={`flex-1 text-center lg:text-left transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <div className="relative mb-10">
            <h2 className="text-5xl lg:text-6xl font-black mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-700 bg-clip-text text-transparent drop-shadow-sm">
                About Me
              </span>
              <div className="absolute -bottom-3 left-0 w-28 h-1.5 bg-gradient-to-r from-blue-900 to-slate-800 rounded-full"></div>
              <div className="absolute -bottom-2 left-0 w-20 h-1.5 bg-gradient-to-r from-slate-800 to-blue-900 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 left-0 w-12 h-1.5 bg-blue-800 rounded-full blur-sm animate-pulse delay-300"></div>
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-slate-600 font-medium mb-2">
              Software Engineer & Web Developer
            </p>
            <div className="w-32 h-0.5 bg-gradient-to-r from-blue-800 to-slate-700 mx-auto lg:mx-0 opacity-60"></div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-900/20 to-slate-800/20 rounded-3xl blur-xl opacity-30"></div>
            <p className="text-slate-700 text-lg lg:text-xl leading-relaxed backdrop-blur-sm bg-white/70 p-8 rounded-2xl shadow-xl border border-slate-200/50 relative z-10">
              I am a <span className="font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded-lg">Software Engineer</span> with a strong focus on <span className="font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded-lg">web development</span>. With a passion for continuous growth, I am dedicated to creating <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">innovative, scalable, and user-centered</span> applications.
              <br /><br />
              I actively explore modern technologies to improve my skills and deliver effective digital solutions. My journey is driven by <span className="italic font-semibold text-blue-800 hover:text-blue-900 transition-colors duration-300 underline decoration-blue-300">curiosity</span> and the desire to craft <span className="italic font-semibold text-slate-800 hover:text-slate-900 transition-colors duration-300 underline decoration-slate-300">seamless, high-quality user experiences</span>.
            </p>
            
            {/* Professional stats */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-black text-blue-900 mb-1">5+</div>
                <div className="text-sm text-slate-600 font-medium">Projects</div>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-2xl font-black text-slate-800 mb-1">1+</div>
                <div className="text-sm text-slate-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 col-span-2 lg:col-span-1">
                <div className="text-2xl font-black text-blue-900 mb-1">∞</div>
                <div className="text-sm text-slate-600 font-medium">Learning</div>
              </div>
            </div>
          </div>
        </div>

        {/* PHOTO + GIF SECTION - RIGHT */}
        <div className={`flex-1 relative flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          {/* Enhanced animated background rings */}
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
            <div className="w-56 h-56 md:w-80 md:h-80 border-2 border-slate-300/40 rounded-full animate-spin slow-spin"></div>
            <div className="absolute w-52 h-52 md:w-72 md:h-72 border-2 border-blue-300/40 rounded-full animate-spin slow-spin-reverse"></div>
            <div className="absolute w-60 h-60 md:w-88 md:h-88 border border-slate-200/30 rounded-full animate-pulse"></div>
            <div className="absolute w-48 h-48 md:w-64 md:h-64 border border-blue-200/30 rounded-full animate-pulse delay-700"></div>
          </div>

          {/* MAIN PHOTO */}
          <div className="relative z-10 group">
            <div className="relative overflow-hidden rounded-full">
              {/* Enhanced photo container */}
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-800 to-blue-900 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-900 to-slate-800 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <img
                src="`${process.env.PUBLIC_URL}/foto-portofolio.jpg`"
                alt="Athallah"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl z-10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-3xl border-4 border-white/80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-blue-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Professional badge */}
            <div className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-blue-900 to-slate-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
              Available
            </div>
          </div>

          {/* ANIMATED GIF */}
          <div className="absolute bottom-0 right-0 md:-right-6 md:-bottom-6 z-20 group">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-slate-800/30 to-blue-900/30 rounded-full blur-lg animate-bounce"></div>
              <img
                src="`${process.env.PUBLIC_URL}/cat-ngoding.gif`"
                alt="Athallah animated"
                className="w-28 h-28 md:w-32 md:h-32 object-contain transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 bg-white/80 rounded-full p-2 shadow-xl"
              />
            </div>
          </div>

          {/* Enhanced floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded-full animate-float ${
                  i % 2 === 0 
                    ? 'bg-gradient-to-r from-blue-900 to-slate-800' 
                    : 'bg-gradient-to-r from-slate-800 to-blue-900'
                } shadow-lg`}
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${5 + i * 15}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${4 + i * 0.3}s`
                }}
              ></div>
            ))}
          </div>

          {/* Professional geometric shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-4 h-4 bg-blue-900/20 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-6 h-6 bg-slate-800/20 rotate-12 animate-pulse delay-500"></div>
            <div className="absolute top-1/2 left-0 w-2 h-8 bg-gradient-to-b from-blue-900/30 to-transparent animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes slow-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slow-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .slow-spin {
          animation: slow-spin 25s linear infinite;
        }
        
        .slow-spin-reverse {
          animation: slow-spin-reverse 20s linear infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  );
};

export default About;