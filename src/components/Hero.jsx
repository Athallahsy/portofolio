import React from 'react';

const Hero = () => {
  return (
    <section
      className="text-center py-32 px-4 bg-white relative overflow-hidden min-h-screen flex items-center justify-center"
      id="home"
      data-aos="fade-up"
    >
      {/* Floating background elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-2xl animate-bounce" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-900 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-900 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-blue-900 rounded-full animate-ping" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Profile Photo */}
        <div className="relative group w-fit mx-auto mb-8">
          <div className="absolute -inset-4 bg-blue-900/30 rounded-full blur-lg group-hover:opacity-60 animate-pulse transition-all duration-500" />
          <img
            src="`${process.env.PUBLIC_URL}/ghibli-me.jpg`"
            alt="Athallah Muhammad Syaffa"
            className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-110 border-4 border-blue-900/40"
            data-aos="zoom-in"
          />
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-black to-blue-900 bg-clip-text text-transparent drop-shadow-lg">
            Athallah Muhammad Syaffa
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-700 mt-6 max-w-3xl mx-auto leading-relaxed font-light">
          I'm a passionate{' '}
          <span className="text-blue-900 font-bold bg-gradient-to-r from-black to-blue-900 bg-clip-text text-transparent">
            Software Engineer
          </span>{' '}
          specializing in{' '}
          <span className="text-blue-900 font-bold bg-gradient-to-r from-blue-900 to-black bg-clip-text text-transparent">
            web development
          </span>
          . I craft{' '}
          <span className="italic text-black font-medium">innovative</span>,{' '}
          <span className="italic text-black font-medium">scalable</span>, and{' '}
          <span className="italic text-black font-medium">user-centered</span> applications.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-900 rounded-full shadow-2xl hover:shadow-blue-900/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            🚀 View My Projects
          </a>

          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            💬 Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
