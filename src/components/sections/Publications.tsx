
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { FileText, ExternalLink } from 'lucide-react';

const PublicationsSection: React.FC = () => {
  const publications = [
    {
      title: 'LEXi – AI-Driven Dyslexia Learning Platform',
      type: 'Research (in-progress)',
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Heuristic Evaluation in UX: Ensuring Accessibility & Usability',
      type: 'Blog',
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <section id="publications" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Publications
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Research & Writing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My research work and published articles in technology and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {publications.map((publication, index) => (
            <GlassCard
              key={index}
              className="overflow-hidden group"
              hover={false}
              blur="lg"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
                <img
                  src={publication.imageUrl}
                  alt={publication.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FileText size={18} className="text-accent mr-2" />
                  <span className="text-sm text-muted-foreground">{publication.type}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{publication.title}</h3>
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:text-accent/80 transition-colors"
                >
                  Read More
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
