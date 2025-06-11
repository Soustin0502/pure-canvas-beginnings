import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Index from './pages/Index';
import Events from './pages/Events';
import Blog from './pages/Blog';
import BlogForm from './pages/BlogForm';
import Members from './pages/Members';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import BlogAdmin from './pages/BlogAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import Feedbacks from './pages/Feedbacks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from '@/components/ui/sonner';
import EventsAdmin from './pages/EventsAdmin';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events" element={<Events />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogForm />} />
                <Route path="/members" element={<Members />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/events-admin" element={
                  <ProtectedRoute>
                    <EventsAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/blog-admin" element={
                  <ProtectedRoute>
                    <BlogAdmin />
                  </ProtectedRoute>
                } />
                <Route path="/feedbacks" element={
                  <ProtectedRoute>
                    <Feedbacks />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
