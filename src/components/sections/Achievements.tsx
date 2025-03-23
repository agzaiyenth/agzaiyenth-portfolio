
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { Award, Medal } from 'lucide-react';

const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      title: 'IEEEXtreme 18.0',
      description: 'Achieved Global Rank #7 | Sri Lanka #58',
      icon: <Award size={24} className="text-accent" />,
      highlight: true
    },
    {
      title: 'IEEEXtreme 17.0',
      description: 'Achieved Global Rank #1572 | SL #121',
      icon: <Award size={24} className="text-accent" />
    },
    {
      title: 'Coderally 2024',
      description: '6th Place at IIT Algorithmic Competition',
      icon: <Award size={24} className="text-accent" />
    },
    {
      title: 'Best Marketing Website – SDGP 2024',
      description: 'Recognized for excellence in web design and marketing strategy',
      icon: <Medal size={24} className="text-accent" />,
      highlight: true
    }
  ];

  return (
    <section id="achievements" className="py-20 min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Achievements
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Awards & Recognition</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Competitions and recognitions that highlight my problem-solving abilities and technical skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <GlassCard
              key={index}
              className={`p-8 transition-all duration-500 ${
                achievement.highlight ? 'border-accent/30 shadow-glow-sm' : ''
              }`}
              hover={true}
            >
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-accent/10 mr-4">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
