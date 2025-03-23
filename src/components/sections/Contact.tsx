
import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import { Phone, Mail, Linkedin, Github, FileText, Copy, Check } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('agzaiyenth2@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center group">
                    <div className="p-3 rounded-full bg-accent/10 mr-4 group-hover:bg-accent/20 transition-colors">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">+94 76 686 7362</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="p-3 rounded-full bg-accent/10 mr-4 group-hover:bg-accent/20 transition-colors">
                      <Mail size={20} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">agzaiyenth2@gmail.com</p>
                        <button
                          onClick={copyEmail}
                          className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
                          aria-label="Copy email address"
                        >
                          {copiedEmail ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} className="text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-10 mb-6">Social Profiles</h3>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                  
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                  
                  <a
                    href="https://medium.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    aria-label="Medium Article"
                  >
                    <FileText size={18} />
                    <span>Medium</span>
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center p-6 rounded-2xl bg-accent/5 w-full">
                  <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                  <p className="text-muted-foreground mb-6">
                    Open to exciting opportunities and collaborations in software development and AI.
                  </p>
                  <a
                    href="mailto:agzaiyenth2@gmail.com"
                    className="inline-block px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-all shadow-glow-sm hover:shadow-glow-md"
                  >
                    Send Message
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
