import type { Product } from "../types/product.types";

import bestSeller1 from "@/assets/images/products/bestSellers/bestSeller01.jpg";
import bestSeller2 from "@/assets/images/products/bestSellers/bestSeller02.jpg";
import bestSeller3 from "@/assets/images/products/bestSellers/bestSeller03.jpg";
import bestSeller4 from "@/assets/images/products/bestSellers/bestSeller04.jpg";

const BEST_SELLER_IMAGE_BY_ID: Record<number, string> = {
  1: bestSeller1,
  2: bestSeller2,
  3: bestSeller3,
  4: bestSeller4,
};

export const BEST_SELLER_ITEMS: Product[] = [
  {
    id: 1,
    name: "AirRunner Pro",
    price: 150,
    rating: 4.8,
    description: "High-performance shoe built for serious runners.",
    category: "shoes",
    image: BEST_SELLER_IMAGE_BY_ID[1],
    images: [BEST_SELLER_IMAGE_BY_ID[1]],
    badges: ["Best Seller", "Top Rated"],
    inStock: true,
    numReviews: 123,
    variants: {
      color: [
        { id: "black", label: "Color", value: "Black" },
        { id: "blue", label: "Color", value: "Blue" },
      ],
      size: [
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
        { id: "11", label: "Size", value: "11" },
      ],
    },
    specs: {
      Cushioning: "AirZoom",
      Weight: "290g",
      Drop: "9mm",
      Use: "Road Racing",
    },
  },
  {
    id: 2,
    name: "SpeedX Trainer",
    price: 180,
    rating: 4.9,
    description: "Fast, responsive trainer for interval and tempo runs.",
    category: "shoes",
    image: BEST_SELLER_IMAGE_BY_ID[2],
    images: [BEST_SELLER_IMAGE_BY_ID[2]],
    badges: ["Best Seller"],
    inStock: true,
    numReviews: 187,
    variants: {
      color: [
        { id: "red", label: "Color", value: "Red" },
        { id: "white", label: "Color", value: "White" },
      ],
      size: [
        { id: "8", label: "Size", value: "8" },
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
      ],
    },
    specs: {
      Cushioning: "ReactX",
      Weight: "260g",
      Drop: "7mm",
      Use: "Speed Work",
    },
  },
  {
    id: 3,
    name: "TrailBlazer Max",
    price: 200,
    rating: 4.7,
    description: "Durable trail-running shoe with aggressive grip.",
    category: "shoes",
    image: BEST_SELLER_IMAGE_BY_ID[3],
    images: [BEST_SELLER_IMAGE_BY_ID[3]],
    badges: ["Best Seller", "Trail"],
    inStock: true,
    numReviews: 94,
    variants: {
      color: [{ id: "orange", label: "Color", value: "Orange" }],
      size: [
        { id: "10", label: "Size", value: "10" },
        { id: "11", label: "Size", value: "11" },
        { id: "12", label: "Size", value: "12" },
      ],
    },
    specs: {
      Cushioning: "MaxStack",
      Weight: "350g",
      Drop: "4mm",
      Use: "Trail",
    },
  },
  {
    id: 4,
    name: "Urban Jogger",
    price: 130,
    rating: 4.6,
    description: "Lightweight, everyday jogger for city streets.",
    category: "shoes",
    image: BEST_SELLER_IMAGE_BY_ID[4],
    images: [BEST_SELLER_IMAGE_BY_ID[4]],
    badges: ["Best Seller"],
    inStock: true,
    numReviews: 112,
    variants: {
      color: [
        { id: "grey", label: "Color", value: "Grey" },
        { id: "navy", label: "Color", value: "Navy" },
      ],
      size: [
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
      ],
    },
    specs: {
      Cushioning: "Soft Foam",
      Weight: "275g",
      Drop: "10mm",
      Use: "Daily",
    },
  },
];
