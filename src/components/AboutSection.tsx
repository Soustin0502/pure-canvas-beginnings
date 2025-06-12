
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Calendar, Users } from 'lucide-react';

const AboutSection = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation();
  const [cardsRef, cardsVisible] = useScrollAnimation();

  return (
    <section id="about-us" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={sectionRef}
          className={`text-center mb-16 scroll-fade-in ${sectionVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative heading-glow">
            <span className="text-cyber relative z-10">About WarP</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl font-fira text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            WarP Computer Club is more than just a tech community—we're architects of the digital future. 
            Founded with a vision to bridge the gap between theoretical knowledge and practical innovation, 
            we've been nurturing tech enthusiasts and creating tomorrow's industry leaders.
          </p>
        </div>

        {/* Stats Cards */}
        <div 
          ref={cardsRef}
          className={`grid md:grid-cols-3 gap-8 mb-16 stagger-children ${cardsVisible ? 'animate' : ''}`}
        >
          <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-8 text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-orbitron font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-300">5</h3>
              <p className="text-sm font-fira text-foreground/70 uppercase tracking-wider">Years of Legacy</p>
              <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 cyber-border hover:border-secondary/60 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-8 text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-orbitron font-bold text-secondary mb-2 group-hover:scale-105 transition-transform duration-300">2</h3>
              <p className="text-sm font-fira text-foreground/70 uppercase tracking-wider">Annual Events</p>
              <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 cyber-border hover:border-accent/60 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-8 text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-3xl font-orbitron font-bold text-accent mb-2 group-hover:scale-105 transition-transform duration-300">75+</h3>
              <p className="text-sm font-fira text-foreground/70 uppercase tracking-wider">Active Members</p>
              <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-8 cyber-box">
            <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">Our Mission</h3>
            <p className="font-fira text-foreground/80 leading-relaxed">
              To cultivate a dynamic ecosystem where technology meets creativity, where students transform 
              from learners to innovators, and where every line of code written contributes to building 
              a better digital tomorrow. We believe in hands-on learning, collaborative growth, and 
              pushing the boundaries of what's possible in the realm of computer science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
