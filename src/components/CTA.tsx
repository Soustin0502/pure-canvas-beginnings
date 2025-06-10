
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-36 translate-y-36 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Rating */}
          <div className="flex justify-center items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-white/90 text-sm">Rated 5/5 by 10,000+ users</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Ready to transform your
            <br />
            <span className="text-yellow-300">digital presence?</span>
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have already revolutionized their web experience with our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg rounded-full transition-all duration-300">
              Contact Sales
            </Button>
          </div>

          <p className="text-white/70 text-sm">
            ✨ No credit card required • ✨ 14-day free trial • ✨ Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
