
import React from 'react';
import ProjectCard from '../ui/ProjectCard';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: 'LEXi – Assistive Learning Platform',
      description: 'AI-based mobile and web platform with dyslexia detection, gamified recovery, and therapist marketplace.',
      tools: ['React Native', 'Spring Boot', 'MySQL', 'Azure'],
      githubUrl: '#',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Vendora – Real-time Event Ticketing',
      description: 'A comprehensive real-time event ticketing system built with Java Spring Boot, Angular, and MySQL.',
      tools: ['Spring Boot', 'Angular', 'MySQL'],
      githubUrl: '#',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'LEXi Web – Marketing Website',
      description: 'Award-winning marketing website recognized as Best Marketing Website (SDGP Year).',
      tools: ['Next.js', 'React', 'Three.js'],
      githubUrl: '#',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Dice Mobile Game',
      description: 'Kotlin and Jetpack Compose mobile game featuring Human vs. AI logic.',
      tools: ['Kotlin', 'Jetpack Compose'],
      githubUrl: '#',
      image: 'https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'PropQuest',
      description: 'Real estate web application for property browsing with comprehensive filters.',
      tools: ['JavaScript', 'React', 'Node.js'],
      githubUrl: '#',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Password Generator',
      description: 'Python CLI tool that generates unique passwords securely.',
      tools: ['Python', 'CLI'],
      githubUrl: '#',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <section id="projects" className="py-20 min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">My Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my projects, ranging from AI-powered platforms to mobile games and web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tools={project.tools}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
