
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ChevronDown, Trophy, Target } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SkillsDisplay from '@/components/SkillsDisplay';
import Navbar from '@/components/Navbar';

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [upcomingEventsRef, upcomingEventsVisible] = useScrollAnimation();
  const [pastEventsRef, pastEventsVisible] = useScrollAnimation();

  const scrollToNextSection = () => {
    const eventsSection = document.querySelector('#upcoming-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hardcoded events data as it was originally
  const upcomingEvents = [
    {
      id: '1',
      title: "WarP Intra '25",
      description: "Our flagship intra-school competition where students showcase their programming prowess, innovative thinking, and technical skills across multiple domains.",
      event_date: "2025-08-02",
      venue: "KG Hall",
      event_type: "Intra School Competition",
      status: "upcoming",
      max_participants: 170,
      current_participants: 0,
      featured_image_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      registration_link: null
    },
    {
      id: '2',
      title: "WarP Inter '25",
      description: "The ultimate battleground where schools compete in the digital arena. A prestigious event that brings together the brightest minds from across the region.",
      event_date: null,
      venue: "KG Hall",
      event_type: "Inter School Competition",
      status: "upcoming",
      max_participants: 170,
      current_participants: 0,
      featured_image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      registration_link: null
    }
  ];

  const pastEvents = [
    {
      id: '3',
      title: "WarP Intra '24",
      description: "A successful intra-school programming competition that challenged students across various technical domains.",
      event_date: "2024-08-05",
      venue: "KG Hall",
      event_type: "Intra School Competition",
      status: "completed",
      max_participants: 150,
      current_participants: 142,
      featured_image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop",
      registration_link: null
    },
    {
      id: '4',
      title: "WarP Intra '23",
      description: "Another successful year of intra-school competition showcasing exceptional programming talents.",
      event_date: "2023-08-07",
      venue: "KG Hall",
      event_type: "Intra School Competition",
      status: "completed",
      max_participants: 130,
      current_participants: 128,
      featured_image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
      registration_link: null
    },
    {
      id: '5',
      title: "WarP Inter '23",
      description: "Inter-school competition that brought together talented students from multiple institutions.",
      event_date: "2023-09-15",
      venue: "KG Hall",
      event_type: "Inter School Competition",
      status: "completed",
      max_participants: 200,
      current_participants: 185,
      featured_image_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      registration_link: null
    },
    {
      id: '6',
      title: "WarP Intra '22",
      description: "A memorable intra-school event that set new standards for programming competitions.",
      event_date: "2022-08-10",
      venue: "KG Hall",
      event_type: "Intra School Competition",
      status: "completed",
      max_participants: 120,
      current_participants: 115,
      featured_image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      registration_link: null
    },
    {
      id: '7',
      title: "WarP Inter '22",
      description: "Inter-school competition that showcased the best programming talents from the region.",
      event_date: "2022-09-20",
      venue: "KG Hall",
      event_type: "Inter School Competition",
      status: "completed",
      max_participants: 180,
      current_participants: 167,
      featured_image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop",
      registration_link: null
    }
  ];

  const getEventTags = (title: string, eventType: string) => {
    if (title.includes('Intra')) {
      return ["Competition", "Programming", "Prizes"];
    } else if (title.includes('Inter')) {
      return ["Inter School", "Competition", "Tech Expo"];
    }
    return [eventType, "Competition", "Innovation"];
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'animate' : ''} mb-8`}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Our Events</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Discover amazing opportunities to learn, compete, and innovate with fellow tech enthusiasts
            </p>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to events"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming-events" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative heading-glow">
              <span className="text-cyber relative z-10">Upcoming Events</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4"></div>
          </div>

          <div className="flex justify-center">
            <div 
              ref={upcomingEventsRef}
              className={`grid md:grid-cols-2 gap-8 max-w-4xl w-full stagger-children ${upcomingEventsVisible ? 'animate' : ''}`}
            >
              {upcomingEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden flex flex-col h-[500px]"
                >
                  <div className="relative h-48 flex-shrink-0">
                    <img 
                      src={event.featured_image_url || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop"} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Open
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <CardHeader className="pb-2 px-0">
                      <CardTitle className="text-xl font-orbitron text-primary line-clamp-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 flex-1 flex flex-col px-0">
                      <div className="h-12 flex-shrink-0">
                        <p className="text-foreground/80 font-fira text-sm line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm flex-shrink-0 h-16">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={14} />
                          <span className="font-fira text-xs">
                            {event.event_date ? new Date(event.event_date).toLocaleDateString() : "T.B.D."}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock size={14} />
                          <span className="font-fira text-xs">07:30 - 13:45</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={14} />
                          <span className="font-fira text-xs">{event.venue || "KG Hall"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users size={14} />
                          <span className="font-fira text-xs">{event.max_participants || "170"}+</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 h-8">
                        <SkillsDisplay 
                          skills={getEventTags(event.title, event.event_type)} 
                          maxVisible={3} 
                          primaryColor="secondary"
                        />
                      </div>

                      <div className="mt-auto">
                        <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
                          Register Now
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h3 className="text-2xl md:text-4xl font-orbitron font-bold mb-4 relative heading-glow">
              <span className="text-cyber relative z-10">Past Events</span>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mt-4"></div>
          </div>

          <div className="flex justify-center">
            <div 
              ref={pastEventsRef}
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full stagger-children ${pastEventsVisible ? 'animate' : ''}`}
            >
              {pastEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="bg-card/30 border-muted/30 hover:border-muted/50 transition-all duration-300 overflow-hidden opacity-80 flex flex-col h-[400px]"
                >
                  <div className="relative h-48 flex-shrink-0">
                    <img 
                      src={event.featured_image_url || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop"} 
                      alt={event.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/80">
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <CardHeader className="pb-2 px-0">
                      <CardTitle className="text-lg font-orbitron text-muted-foreground line-clamp-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 flex-1 px-0">
                      <div className="h-12">
                        <p className="text-muted-foreground font-fira text-sm line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm h-12">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={14} />
                          <span className="font-fira text-xs">
                            {event.event_date ? new Date(event.event_date).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users size={14} />
                          <span className="font-fira text-xs">{event.current_participants}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 h-8">
                        {getEventTags(event.title, event.event_type).map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs border-muted/30 text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
