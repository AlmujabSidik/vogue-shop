/* eslint-disable react-hooks/exhaustive-deps */
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const { productId } = useParams();
  const handleAddQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (error) return <div>{error}</div>;

  return (
    <main className="min-h-screen max-w-6xl px-4 sm:px-0 mx-auto container mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {isLoading ? (
          <Skeleton className="w-full aspect-square" />
        ) : (
          <img
            src={product.imgUrl}
            className="w-full"
            alt={product.title || "Product"}
          />
        )}

        <div className="flex flex-col gap-2 justify-start">
          {isLoading ? (
            <Skeleton className="w-3/4 h-6" />
          ) : (
            <h1 className="text-lg tracking-tight">
              {product.title || "No Title"}
            </h1>
          )}

          {isLoading ? (
            <Skeleton className="w-1/2 h-8" />
          ) : (
            <h3 className="text-2xl font-bold">
              Rp {Number(product.price || 0).toLocaleString("id-ID")}
            </h3>
          )}

          {isLoading ? (
            <>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {product.description || "No description available."}
            </p>
          )}

          {isLoading ? (
            <Skeleton className="w-1/4 h-4" />
          ) : (
            <p className="text-xs text-muted-foreground leading-6">
              stock : {product.stock || 0}
            </p>
          )}

          {isLoading ? (
            <Skeleton className="w-1/2 h-10" />
          ) : (
            <div className="flex items-center gap-8 mt-2">
              <Button
                disabled={quantity === 0}
                onClick={handleRemoveQuantity}
                size="icon"
                variant="outline"
              >
                <IoIosRemove />
              </Button>
              <p>{quantity}</p>
              <Button
                disabled={quantity === (product.stock || 0)}
                onClick={handleAddQuantity}
                size="icon"
                variant="outline"
              >
                <IoIosAdd />
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="flex gap-2">
              <Skeleton className="w-1/2 h-10" />
              <Skeleton className="w-10 h-10" />
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <Button className="w-1/2" size="sm" disabled={!product.stock}>
                {!product.stock ? "Out of stock" : "Add to cart"}
              </Button>

              <Button size="icon" variant="ghost">
                <IoHeartOutline className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
