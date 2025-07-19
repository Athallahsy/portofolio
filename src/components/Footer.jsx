import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-white text-dark-blue py-6 px-4 border-t border-gray-300 mt-20 relative z-10"> {/* Changed background to white and text color to dark blue */}
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} <span className="font-semibold">Athallah Muhammad Syaffa</span>. All rights reserved.
      </p>

      <div className="flex gap-4 items-center justify-center">
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors" // Changed hover color to dark blue
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors" // Changed hover color to dark blue
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="mailto:your.email@example.com"
          className="hover:text-blue-600 transition-colors" // Changed hover color to dark blue
        >
          <FaEnvelope size={20} />
        </a>
      </div>
    </div>

    <style>{`
      .text-dark-blue {
        color: #003366; /* Dark blue color */
      }
    `}</style>
  </footer>
);

export default Footer;
