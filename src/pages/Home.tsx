import { Suspense } from "react";
import { HomePage } from "@/features/home";

const Home = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomePage />
  </Suspense>
);

export default Home;
