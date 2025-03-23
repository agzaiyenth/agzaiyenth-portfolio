
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { CheckCircle2 } from 'lucide-react';

const CertificationsSection: React.FC = () => {
  const certifications = [
    {
      title: 'Spring Boot 2.0 Essentials',
      issuer: 'LinkedIn Learning'
    },
    {
      title: 'Parallel & Concurrent Programming with Java',
      issuer: 'LinkedIn Learning'
    },
    {
      title: 'Java, JS Intermediate, SQL',
      issuer: 'Hackerrank'
    },
    {
      title: 'Microsoft Azure Cloud Challenge',
      issuer: 'Microsoft'
    },
    {
      title: 'Intro to Cybersecurity, Network Essentials',
      issuer: 'Cisco'
    },
    {
      title: 'Pentesting Principles',
      issuer: 'TryHackMe'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Certifications
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Professional Development</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Certifications and courses I've completed to enhance my technical skills.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold mb-1">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
