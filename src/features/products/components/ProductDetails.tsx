import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/features/products/api/productsApi";

import { ProductImageGallery } from "./ProductImageGallery";
import { ProductPrice } from "./ProductPrice";
import { ProductSkeleton } from "./ProductSkeleton";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (isError || !product) {
    return <div className="p-6 text-red-500">Failed to load product.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* LEFT: Images */}
      <ProductImageGallery images={product.images || [product.image]} />

      {/* RIGHT: Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>

        <ProductPrice price={product.price} />

        <p className="text-gray-600">{product.description}</p>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 bg-black text-white rounded">
            Add to Cart
          </button>

          <button className="px-4 py-2 border rounded">Wishlist</button>
        </div>
      </div>
    </div>
  );
}
