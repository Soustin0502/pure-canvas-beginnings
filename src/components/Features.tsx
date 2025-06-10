
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Smartphone, Palette, Code, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with modern build tools and efficient code splitting for instant loading."
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Built-in security best practices and regular updates to keep your application safe."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Responsive design that looks perfect on all devices, from phones to desktops."
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Modern UI components with thoughtful animations and micro-interactions."
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Clean, maintainable code with TypeScript support and excellent developer experience."
    },
    {
      icon: Globe,
      title: "Global Ready",
      description: "Built for scale with CDN support and international accessibility standards."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you build better, faster, and more efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
