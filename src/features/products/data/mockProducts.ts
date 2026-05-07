import type { Product } from "../types/product.types";

import shoe01 from "@/assets/images/products/shoes/shoe01.jpg";
import shoe02 from "@/assets/images/products/shoes/shoe02.jpg";
import shoe03 from "@/assets/images/products/shoes/shoe03.jpg";
import shoe04 from "@/assets/images/products/shoes/shoe04.jpg";
import shoe05 from "@/assets/images/products/shoes/shoe05.jpg";
import shoe06 from "@/assets/images/products/shoes/shoe06.jpg";

const SHOE_IMAGE_BY_ID: Record<number, string> = {
  1: shoe01,
  2: shoe02,
  3: shoe03,
  4: shoe04,
  5: shoe05,
  6: shoe06,
};

export const SHOP_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270 React",
    price: 129.99,
    rating: 4.7,
    description:
      "A blend of Nike Air and React foam for a smooth, lightweight ride.",
    category: "shoes",
    image: SHOE_IMAGE_BY_ID[1],
    images: [SHOE_IMAGE_BY_ID[1]],
    badges: ["Best Seller"],
    inStock: true,
    numReviews: 128,
    variants: {
      color: [
        { id: "black", label: "Color", value: "Black" },
        { id: "white", label: "Color", value: "White" },
      ],
      size: [
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
        { id: "11", label: "Size", value: "11" },
      ],
    },
    specs: {
      Cushioning: "React Foam + Air",
      Weight: "300g",
      Drop: "10mm",
      Use: "Running",
    },
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: 189.99,
    rating: 4.9,
    description:
      "Lightweight Boost midsole with energy return for long-distance comfort.",
    category: "shoes",
    image: SHOE_IMAGE_BY_ID[2],
    images: [SHOE_IMAGE_BY_ID[2]],
    badges: ["Premium"],
    inStock: true,
    numReviews: 245,
    variants: {
      color: [
        { id: "blue", label: "Color", value: "Blue" },
        { id: "grey", label: "Color", value: "Grey" },
      ],
      size: [
        { id: "8", label: "Size", value: "8" },
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
      ],
    },
    specs: {
      Cushioning: "Boost",
      Weight: "280g",
      Drop: "8mm",
      Use: "Daily Training",
    },
  },
  {
    id: 3,
    name: "New Balance Fresh Foam",
    price: 149.99,
    rating: 4.8,
    description: "Cloud-like cushioning with a breathable mesh upper.",
    category: "shoes",
    image: SHOE_IMAGE_BY_ID[3],
    images: [SHOE_IMAGE_BY_ID[3]],
    badges: [],
    inStock: true,
    numReviews: 89,
    variants: {
      color: [{ id: "green", label: "Color", value: "Green" }],
      size: [
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
      ],
    },
    specs: {
      Cushioning: "Fresh Foam",
      Weight: "265g",
      Drop: "8mm",
      Use: "Road Running",
    },
  },
  {
    id: 4,
    name: "Asics Gel-Kayano 29",
    price: 159.99,
    rating: 4.6,
    description:
      "Stability-oriented running shoe with rearfoot GEL cushioning.",
    category: "shoes",
    image: SHOE_IMAGE_BY_ID[4],
    images: [SHOE_IMAGE_BY_ID[4]],
    badges: ["Stability"],
    inStock: true,
    numReviews: 156,
    variants: {
      color: [
        { id: "purple", label: "Color", value: "Purple" },
        { id: "black", label: "Color", value: "Black" },
      ],
      size: [
        { id: "10", label: "Size", value: "10" },
        { id: "11", label: "Size", value: "11" },
      ],
    },
    specs: {
      Cushioning: "GEL",
      Weight: "310g",
      Drop: "10mm",
      Use: "Stability",
    },
  },
  {
    id: 5,
    name: "Puma RS-X3",
    price: 99.99,
    rating: 4.5,
    description: "Chunky retro-style sneaker for casual style and comfort.",
    category: "shoes",
    image: SHOE_IMAGE_BY_ID[5],
    images: [SHOE_IMAGE_BY_ID[5]],
    badges: ["Sale"],
    inStock: true,
    numReviews: 67,
    variants: {
      color: [{ id: "multi", label: "Color", value: "Multi" }],
      size: [
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
      ],
    },
    specs: {
      Cushioning: "RS Foam",
      Weight: "340g",
      Drop: "12mm",
      Use: "Casual",
    },
  },
  {
    id: 6,
    name: "Hoka One One Carbon X",
    price: 199.99,
    rating: 4.9,
    description: "Lightweight carbon-plated trainer for speed and efficiency.",
    category: "shoes",
    image: SHOE_IMAGE_BY_ID[6],
    images: [SHOE_IMAGE_BY_ID[6]],
    badges: ["Race Day"],
    inStock: false,
    numReviews: 203,
    variants: {
      color: [{ id: "red", label: "Color", value: "Red" }],
      size: [
        { id: "9", label: "Size", value: "9" },
        { id: "10", label: "Size", value: "10" },
      ],
    },
    specs: {
      Cushioning: "Meta-Rocker",
      Weight: "220g",
      Drop: "5mm",
      Use: "Racing",
    },
  },
];
