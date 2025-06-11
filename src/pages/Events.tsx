
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ChevronDown, Trophy, Target } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SkillsDisplay from '@/components/SkillsDisplay';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string | null;
  venue: string | null;
  event_type: string;
  status: string;
  max_participants: number | null;
  current_participants: number;
  featured_image_url: string | null;
  registration_link: string | null;
}

const Events = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [upcomingEventsRef, upcomingEventsVisible] = useScrollAnimation();
  const [pastEventsRef, pastEventsVisible] = useScrollAnimation();
  const [heroStatsRef, heroStatsVisible] = useScrollAnimation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToNextSection = () => {
    const eventsSection = document.querySelector('#upcoming-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'completed');

  const getEventImage = (title: string) => {
    const imageMap: { [key: string]: string } = {
      "WarP Intra '25": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      "WarP Inter '25": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      "WarP Intra '24": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop",
      "WarP Intra '23": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
      "WarP Inter '23": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop",
      "WarP Intra '22": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
      "WarP Inter '22": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop"
    };
    return imageMap[title] || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop";
  };

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

          {/* Hero Stats Cards */}
          <div 
            ref={heroStatsRef}
            className={`grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8 stagger-children ${heroStatsVisible ? 'animate' : ''}`}
          >
            <Card className="bg-card/30 cyber-border hover:border-primary/60 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center mb-2">
                  <Target className="text-primary" size={32} />
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold text-primary">
                  {upcomingEvents.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira text-sm">Upcoming Events</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Exciting competitions and workshops planned for this year to challenge and inspire our community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 cyber-border hover:border-secondary/60 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="text-secondary" size={32} />
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold text-secondary">
                  {pastEvents.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira text-sm">Successful Events</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Years of organizing memorable events that have shaped the tech community at our school.
                </p>
              </CardContent>
            </Card>
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

          {loading ? (
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                {[...Array(2)].map((_, i) => (
                  <Card key={i} className="bg-card/50 cyber-border animate-pulse h-96">
                    <div className="h-48 bg-muted"></div>
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div 
                ref={upcomingEventsRef}
                className={`grid md:grid-cols-2 gap-8 max-w-4xl w-full stagger-children ${upcomingEventsVisible ? 'animate' : ''}`}
              >
                {upcomingEvents.map((event) => (
                  <Card 
                    key={event.id} 
                    className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden h-96 flex flex-col"
                  >
                    <div className="relative h-48 flex-shrink-0">
                      <img 
                        src={event.featured_image_url || getEventImage(event.title)} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">
                          Open
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-orbitron text-primary line-clamp-1">
                          {event.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3 flex-1 flex flex-col">
                        <p className="text-foreground/80 font-fira text-sm line-clamp-2 flex-shrink-0">
                          {event.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-sm flex-shrink-0">
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
                            <span className="font-fira text-xs">{event.max_participants || "170+"}+</span>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
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
          )}
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
                  className="bg-card/30 border-muted/30 hover:border-muted/50 transition-all duration-300 overflow-hidden opacity-80 h-80 flex flex-col"
                >
                  <div className="relative h-48 flex-shrink-0">
                    <img 
                      src={event.featured_image_url || getEventImage(event.title)} 
                      alt={event.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/80">
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-orbitron text-muted-foreground line-clamp-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 flex-1">
                      <p className="text-muted-foreground font-fira text-sm line-clamp-2">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-sm">
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

                      <div className="flex flex-wrap gap-2">
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
