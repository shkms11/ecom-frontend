import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, TrendingUp, Zap, Lock, Truck, Award } from "lucide-react";
import { Button } from "@/shared/components";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Experience blazing-fast checkout and instant order processing",
  },
  {
    icon: Lock,
    title: "Secure & Safe",
    description:
      "Bank-level security with encrypted transactions and data protection",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over a minimum amount",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description:
      "Competitive pricing with regular discounts and exclusive deals",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description:
      "Premium products from verified sellers with quality guarantees",
  },
  {
    icon: ShoppingBag,
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days of purchase",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: "$199.99",
    rating: 4.8,
    reviews: 245,
    image: "🎧",
  },
  {
    id: 2,
    name: "Professional Camera Kit",
    price: "$899.99",
    rating: 4.9,
    reviews: 128,
    image: "📷",
  },
  {
    id: 3,
    name: "Smart Watch Ultra",
    price: "$349.99",
    rating: 4.7,
    reviews: 342,
    image: "⌚",
  },
  {
    id: 4,
    name: "Premium Laptop Stand",
    price: "$79.99",
    rating: 4.6,
    reviews: 156,
    image: "💻",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Customer",
    content:
      "Outstanding shopping experience! Fast delivery and excellent customer service.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Verified Buyer",
    content:
      "Great product quality and competitive prices. Smooth checkout process.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Loyal Customer",
    content:
      "Best online store I've used. Amazing deals and helpful support team.",
    rating: 5,
  },
];

const Home: React.FC = () => {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <FeaturesSection />
      <ProductsPreviewSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </main>
  );
};

const HeroSection = memo(() => (
  <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
    <div className="text-center max-w-4xl">
      <span className="inline-block mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
        🎉 Welcome to our Premium Store
      </span>

      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
        Discover Amazing{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Products
        </span>
      </h1>

      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Shop premium products with unbeatable prices, fast shipping and
        world-class support.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/login">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            <ShoppingBag className="inline mr-2" size={18} />
            Start Shopping
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 px-8 py-3"
          >
            Join Now
          </Button>
        </Link>
      </div>
    </div>
  </section>
));

const FeaturesSection = memo(() => (
  <section className="py-20 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
      <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
        We deliver premium experience with top-quality products and fast
        delivery.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={i} feature={feature} />
        ))}
      </div>
    </div>
  </section>
));

interface Feature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const FeatureCard = memo(({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <div className="p-6 rounded-xl bg-gray-50 border hover:shadow-lg transition">
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
        <Icon size={22} className="text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
});

const ProductsPreviewSection = memo(() => (
  <section className="py-20 px-6 bg-gray-50">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
      <p className="text-gray-600 mb-14">
        Discover our most popular and trending items.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
));

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

const ProductCard = memo(({ product }: { product: Product }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
      {product.image}
    </div>

    <div className="p-5 text-left">
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-400">
          {"★".repeat(Math.floor(product.rating))}
        </span>
        <span className="text-sm text-gray-500">
          {product.rating} ({product.reviews})
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">{product.price}</span>
        <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center">
          <ShoppingBag size={18} />
        </button>
      </div>
    </div>
  </div>
));

const TestimonialsSection = memo(() => (
  <section className="py-20 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Customer Reviews</h2>
      <p className="text-gray-600 mb-14">
        Trusted by thousands of happy customers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </div>
  </section>
));

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const TestimonialCard = memo(
  ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="p-6 bg-gray-50 border rounded-xl">
      <div className="text-yellow-400 mb-3">
        {"★".repeat(testimonial.rating)}
      </div>
      <p className="italic text-gray-700 mb-4">"{testimonial.content}"</p>
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  ),
);

const NewsletterSection = memo(() => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-8 text-blue-100">
          Subscribe for exclusive deals and offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 rounded-lg text-gray-900"
          />
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50">
            Subscribe
          </button>
        </form>

        {success && (
          <p className="mt-4 font-medium">✓ Thanks for subscribing!</p>
        )}
      </div>
    </section>
  );
});

const CTASection = memo(() => (
  <section className="py-20 px-6 bg-gray-900 text-center text-white">
    <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
    <p className="mb-8 text-gray-300">
      Join today and discover premium products.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/login">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
          Get Started
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="outline" className="border-white text-white px-8 py-3">
          Create Account
        </Button>
      </Link>
    </div>
  </section>
));

export default memo(Home);
