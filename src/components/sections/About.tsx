
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Briefcase, GraduationCap, Code, HeartHandshake } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="snap-section py-20 min-h-screen flex items-center">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Who I Am
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate full-stack and AI engineer dedicated to building meaningful technology that solves real problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-accent/10 mr-4">
                  <GraduationCap className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold">Education</h3>
              </div>
              <div className="space-y-4 flex-1">
                <p>
                  Computer Science undergraduate at IIT Sri Lanka (University of Westminster, UK) with a current average of 84.2%.
                </p>
                <p>
                  Specializing in building scalable systems and AI-powered applications that make a difference.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-accent/10 mr-4">
                  <Briefcase className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold">Experience</h3>
              </div>
              <div className="space-y-4 flex-1">
                <p>
                  Co-founder of Psycode Labs, creating innovative solutions at the intersection of psychology and technology.
                </p>
                <p>
                  Creator of LEXi, an award-winning assistive learning platform for individuals with dyslexia.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-accent/10 mr-4">
                  <Code className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold">Expertise</h3>
              </div>
              <div className="space-y-4 flex-1">
                <p>
                  Skilled in full-stack development with a focus on creating robust, scalable applications.
                </p>
                <p>
                  Experienced in integrating AI and machine learning to solve complex problems and enhance user experiences.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-accent/10 mr-4">
                  <HeartHandshake className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold">Passion</h3>
              </div>
              <div className="space-y-4 flex-1">
                <p>
                  Dedicated to building inclusive, meaningful tech that solves real-world problems.
                </p>
                <p>
                  Committed to mentoring others and growing as a community contributor through knowledge sharing.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default About;
