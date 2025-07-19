import React from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaGithub,
  FaGitAlt, FaLaravel, FaReact
} from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';
import { MdSchool, MdOutlineManageAccounts, MdTimer, MdPsychologyAlt } from 'react-icons/md';
import { BiCodeAlt } from 'react-icons/bi';

const skills = [
  { name: "HTML", icon: <FaHtml5 className="text-red-600" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-600" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-500" /> },
  { name: "React", icon: <FaReact className="text-blue-600" /> },
  { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
  { name: "Tailwind CSS", icon: <FaCss3Alt className="text-blue-400" /> },
  { name: "GitHub", icon: <FaGithub className="text-gray-800" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
  { name: "Laravel", icon: <FaLaravel className="text-red-600" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
  { name: "Communication", icon: <MdOutlineManageAccounts className="text-blue-600" /> },
  { name: "Marketplace Handling", icon: <BiCodeAlt className="text-gray-800" /> },
  { name: "Time Management", icon: <MdTimer className="text-yellow-600" /> },
  { name: "Problem Solving", icon: <MdPsychologyAlt className="text-purple-600" /> },
  { name: "Frontend Dev", icon: <BiCodeAlt className="text-gray-800" /> }
];

const Skills = () => {
  const half = Math.ceil(skills.length / 2);
  const loopCount = 4; // more loops for seamless infinite look
  const firstRow = Array(loopCount).fill(skills.slice(0, half)).flat();
  const secondRow = Array(loopCount).fill(skills.slice(half)).flat();

  return (
    <section className="py-20 px-0 bg-white text-dark-blue overflow-hidden relative" id="skills">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-full text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-dark-blue">
          Skills
        </h2>

        {/* Top Row */}
        <div className="overflow-hidden mb-8">
          <div className="flex gap-8 animate-scroll-left min-w-max">
            {firstRow.map((skill, idx) => (
              <div
                key={`first-${idx}`}
                className="w-36 sm:w-40 bg-gray-100 rounded-2xl border border-blue-400 shadow-lg p-6 flex-shrink-0 flex flex-col items-center hover:scale-105 hover:shadow-blue-400 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <p className="text-sm text-dark-blue text-center font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-scroll-right min-w-max">
            {secondRow.map((skill, idx) => (
              <div
                key={`second-${idx}`}
                className="w-36 sm:w-40 bg-gray-100 rounded-2xl border border-blue-400 shadow-lg p-6 flex-shrink-0 flex flex-col items-center hover:scale-105 hover:shadow-blue-400 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <p className="text-sm text-dark-blue text-center font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        .text-dark-blue {
          color: #003366; /* Dark blue color */
        }
      `}</style>
    </section>
  );
};

export default Skills;
