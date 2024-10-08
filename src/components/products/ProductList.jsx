import { ProductCard } from "./ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
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
            .map((_, index) => (
              <ProductCard key={`loading-${index}`} isLoading={true} />
            ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              stock={product.stock}
              price={product.price}
              imgUrl={product.imgUrl}
              isLoading={false}
            />
          ))}
    </div>
  );
};

export default ProductList;
