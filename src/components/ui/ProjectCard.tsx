
import React from 'react';
import GlassCard from './GlassCard';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tools: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tools,
  githubUrl,
  liveUrl,
  image,
}) => {
  return (
    <GlassCard
      className="p-6 flex flex-col h-full transition-all duration-300 group"
      hover={true}
      blur="lg"
    >
      {image && (
        <div className="w-full h-48 mb-4 overflow-hidden rounded-lg relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}

      <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
      
      <p className="text-muted-foreground mb-4 flex-1">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tools.map((tool, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
          >
            {tool}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4 mt-auto">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
            aria-label={`View ${title} on GitHub`}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
            aria-label={`View ${title} live demo`}
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
