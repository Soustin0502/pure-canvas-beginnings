
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Plus, ArrowRight, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  created_at: string;
  featured_image_url?: string;
}

const Blog = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [postsRef, postsVisible] = useScrollAnimation();
  const [heroStatsRef, heroStatsVisible] = useScrollAnimation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-primary/20 text-primary border-primary/30';
      case 'social': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'event': return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const scrollToNextSection = () => {
    const postsSection = document.querySelector('#blog-posts');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-6 relative heading-glow">
              <span className="text-cyber relative z-10">Blog</span>
            </h1>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto mb-8">
              Discover insights, announcements, and stories from the WarP Computer Club community
            </p>
          </motion.div>

          {/* Hero Stats Cards */}
          <div 
            ref={heroStatsRef}
            className={`grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8 stagger-children ${heroStatsVisible ? 'animate' : ''}`}
          >
            <Card className="bg-card/30 cyber-border hover:border-primary/60 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center mb-2">
                  <User className="text-primary" size={32} />
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold text-primary">
                  {blogPosts.length}
                </CardTitle>
                <p className="text-muted-foreground font-fira text-sm">Published Posts</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Sharing knowledge, experiences, and insights from our vibrant tech community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 cyber-border hover:border-secondary/60 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="text-secondary" size={32} />
                </div>
                <CardTitle className="text-2xl font-orbitron font-bold text-secondary">
                  Weekly
                </CardTitle>
                <p className="text-muted-foreground font-fira text-sm">New Content</p>
              </CardHeader>
              <CardContent>
                <p className="text-center font-fira text-sm text-foreground/80">
                  Regular updates with fresh content, tutorials, and community highlights.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
              <Link to="/blog/new" className="flex items-center gap-2">
                <Plus size={16} />
                Write a Post
              </Link>
            </Button>
          </div>
        </div>

        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to blog posts"
        >
          <ChevronDown className="text-primary" size={24} />
        </button>
      </section>

      {/* Blog Posts Section */}
      <section id="blog-posts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative heading-glow">
              <span className="text-cyber relative z-10">Latest Posts</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-card/50 cyber-border animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
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
              <motion.div 
                ref={postsRef}
                className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full stagger-children ${postsVisible ? 'animate' : ''}`}
                initial={{ opacity: 0 }}
                animate={postsVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, staggerChildren: 0.1 }}
              >
                {blogPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={postsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`text-xs border ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            <span className="font-fira">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-orbitron text-primary line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <User size={14} />
                          <span className="font-fira">{post.author}</span>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-foreground/80 font-fira text-sm line-clamp-4 mb-4">
                          {post.excerpt}
                        </p>
                        
                        <Button 
                          variant="ghost" 
                          className="text-primary hover:text-primary/80 hover:bg-primary/10 font-fira p-0"
                        >
                          Read More <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {blogPosts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-foreground/60 font-fira text-lg mb-6">
                No blog posts available yet. Be the first to share your thoughts!
              </p>
              <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground font-fira">
                <Link to="/blog/new" className="flex items-center gap-2">
                  <Plus size={16} />
                  Write the First Post
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
