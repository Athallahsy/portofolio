import React from 'react';

const projects = [
  {
    name: "Inkwell",
    image: "`${process.env.PUBLIC_URL}/projects/Inkwell.png`",
    description: "Inkwell is a web-based blog and note-taking application built with Laravel. Designed to help users document their thoughts and reflections.",
    tech: ["Laravel", "Blade", "Bootstrap"],
    link: "#"
  },
  {
    name: "Finote",
    image: "`${process.env.PUBLIC_URL}`/projects/Finote.png",
    description: "Finote is a mobile app built with Flutter to help users manage and track their daily finances with a minimalist interface and powerful features.",
    tech: ["Flutter", "Dart"],
    link: "#"
  }
];

const Projects = () => (
  <section className="py-20 px-6 bg-white relative" id="projects">
    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

    <div className="relative z-10 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-dark-blue">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8 px-2 md:px-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-gray-200 hover:shadow-gray-300/40"
            data-aos="zoom-in-up"
            data-aos-delay={idx * 150}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-dark-blue mb-2">{proj.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{proj.description}</p>

              <div className="flex flex-wrap gap-2 text-xs font-medium text-blue-600 mb-4">
                {proj.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 px-2 py-1 rounded-full hover:bg-blue-200 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={proj.link}
                className="inline-block text-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-full shadow hover:shadow-md hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300"
              >
                🔗 View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .text-dark-blue {
        color: #003366; /* Dark blue color */
      }
    `}</style>
  </section>
);

export default Projects;
