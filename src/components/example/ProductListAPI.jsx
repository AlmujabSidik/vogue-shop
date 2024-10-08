import { ProductCard } from "../products/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useState, useEffect } from "react";

const ProductListAPI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/catalog");

      const catalogWithImages = await Promise.all(
        response.data.map(async (product) => {
          const imageId = product.acf.image_product;
          if (imageId) {
            const imageResponse = await axiosInstance.get(`/media/${imageId}`);
            return {
              ...product,
              imgUrl: imageResponse.data.source_url,
            };
          }
          return product;
        })
      );

      setProducts(catalogWithImages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full h-full grid-cols-1 sm:grid-cols-2 pb-20 md:grid-cols-3 gap-4">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, index) => <ProductCard key={index} isLoading={true} />)
        : products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.acf.title}
              stock={product.acf.stock}
              price={product.acf.price.toLocaleString("id-ID")}
              imgUrl={product.imgUrl}
              isLoading={false}
            />
          ))}
    </div>
  );
};

export default ProductListAPI;
