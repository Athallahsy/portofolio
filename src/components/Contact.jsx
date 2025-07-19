import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Contact = () => (
  <section
    className="py-20 px-6 bg-white relative" // Changed background to white
    id="contact"
  >
    {/* Background Gradient Blobs */}
    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

    <div className="relative z-10 max-w-3xl mx-auto text-center">
      {/* Heading */}
      <h2
        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-dark-blue" // Changed text color to dark blue
        data-aos="fade-up"
      >
        Get In Touch
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">
        Feel free to reach out via email or connect with me through my social media platforms below.
      </p>

      {/* Email Contact */}
      <div
        className="flex items-center justify-center gap-2 text-dark-blue font-medium text-lg mb-8" // Changed text color to dark blue
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <FaEnvelope className="text-blue-600" />
        <a
          href="mailto:your.email@example.com"
          className="hover:underline transition"
        >
          yonzy1910@gmail.com
        </a>
      </div>

      {/* Social Icons */}
      <div
        className="flex justify-center gap-6 text-xl text-white"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <a
          href="https://github.com/athallahsy"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-tr from-gray-800 to-gray-700 p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-tr from-blue-600 to-blue-500 p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://instagram.com/a.m.syaffa"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-tr from-pink-500 to-purple-500 p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg"
        >
          <FaInstagram />
        </a>
      </div>
    </div>

    <style>{`
      .text-dark-blue {
        color: #003366; /* Dark blue color */
      }
    `}</style>
  </section>
);

export default Contact;
