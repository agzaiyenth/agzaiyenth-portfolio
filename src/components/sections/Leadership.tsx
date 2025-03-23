
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Users, Brain, Coins, FileQuestion, Rocket } from 'lucide-react';

const LeadershipSection: React.FC = () => {
  const leadershipRoles = [
    {
      title: 'Java Guild Mentor',
      description: 'Taught 1500+ students Java, Python & OOP',
      icon: <Users size={24} className="text-accent" />
    },
    {
      title: 'Technical Lead',
      description: 'HULT Prize Sri Lanka 2025',
      icon: <Brain size={24} className="text-accent" />
    },
    {
      title: 'Treasurer',
      description: 'IEEE EMBS Chapter, IIT',
      icon: <Coins size={24} className="text-accent" />
    },
    {
      title: 'Question Creator',
      description: 'PrologueX Hackathon',
      icon: <FileQuestion size={24} className="text-accent" />
    },
    {
      title: 'Project Lead',
      description: 'LEXi (SDGP)',
      icon: <Rocket size={24} className="text-accent" />
    }
  ];

  return (
    <section id="leadership" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Community Contribution</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Roles where I've contributed to the community and led technical initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {leadershipRoles.map((role, index) => (
            <GlassCard
              key={index}
              className="p-6 transition-all duration-300"
              hover={true}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-accent/10 mb-4">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-muted-foreground">{role.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
