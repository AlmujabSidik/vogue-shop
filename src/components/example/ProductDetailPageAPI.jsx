/* eslint-disable react-hooks/exhaustive-deps */
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";

const ProductDetailPageAPI = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState(0);

  const productId = searchParams.get("id");

  const handleAddQuantity = () => {
    if (product && quantity < product.acf.stock) {
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
      setLoading(true);
      const response = await axiosInstance.get(`/catalog/${productId}`);

      const productImage = await axiosInstance.get(
        `/media/${response.data.acf.image_product}`
      );
      const productData = {
        ...response.data,
        imgUrl: productImage.data.source_url,
      };

      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <main className="min-h-screen max-w-6xl px-4 sm:px-0 mx-auto container mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {loading ? (
          <Skeleton className="w-full aspect-square" />
        ) : (
          <img
            src={product.imgUrl}
            className="w-full"
            alt={product.title?.rendered || "Product"}
          />
        )}

        <div className="flex flex-col gap-4 justify-start">
          {loading ? (
            <Skeleton className="w-3/4 h-6" />
          ) : (
            <h1 className="text-lg tracking-tight">
              {product.title?.rendered || "No Title"}
            </h1>
          )}

          {loading ? (
            <Skeleton className="w-1/2 h-8" />
          ) : (
            <h3 className="text-2xl font-bold">
              Rp {Number(product.acf?.price || 0).toLocaleString("id-ID")}
            </h3>
          )}

          {loading ? (
            <>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {product.acf?.description || "No description available."}
            </p>
          )}

          {loading ? (
            <Skeleton className="w-1/4 h-4" />
          ) : (
            <p className="text-xs text-muted-foreground leading-6">
              stock : {product.acf?.stock || 0}
            </p>
          )}

          {loading ? (
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
                disabled={quantity === (product.acf?.stock || 0)}
                onClick={handleAddQuantity}
                size="icon"
                variant="outline"
              >
                <IoIosAdd />
              </Button>
            </div>
          )}

          {loading ? (
            <div className="flex gap-2">
              <Skeleton className="w-1/2 h-10" />
              <Skeleton className="w-10 h-10" />
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <Button
                className="w-1/2"
                size="sm"
                disabled={!product.acf?.stock}
              >
                {!product.acf?.stock ? "Out of stock" : "Add to cart"}
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

export default ProductDetailPageAPI;
