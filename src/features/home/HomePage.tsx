import { memo } from "react";
import {
  Hero,
  TrustBar,
  Categories,
  BestSellers,
  Testimonials,
  Newsletter,
} from "./index";

export const HomePage = memo(() => (
  <main className="w-full font-sans antialiased" role="main">
    <Hero />
    <TrustBar />
    <Categories />
    <BestSellers />
    <Testimonials />
    <Newsletter />
  </main>
));
HomePage.displayName = "HomePage";
