/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

export const ProductCard = ({ imgUrl, title, price, stock, id, isLoading }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddQuantity = () => {
    if (stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (quantity === 0) {
      alert("Please add quantity");
      return;
    }
    alert(`${quantity} product ${title} added to cart`);
  };

  const productName = title ? title.split(" ").join("-").toLowerCase() : "";

  const badgeOutOfStock = () => {
    if (stock === 0) {
      return (
        <div className="bg-red-500 absolute top-2 left-2 text-white min-w-20 text-xs px-2 py-1 rounded">
          Out of stock
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="md:max-w-96 flex flex-col gap-4">
        <Skeleton className="aspect-square w-full rounded-sm" />
        <div>
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="md:max-w-96 flex flex-col gap-4">
      <Link
        to={`/product/${id}`}
        className="aspect-square w-full rounded-sm overflow-hidden relative"
      >
        {badgeOutOfStock()}
        <img
          className={
            stock === 0
              ? "cursor-not-allowed"
              : "w-full rounded-sm object-cover cursor-pointer hover:scale-110 transition-all duration-300"
          }
          src={imgUrl}
          alt={title}
        />
      </Link>
      <div>
        <Link to={`/product/${productName}?id=${id}`}>
          <p className="text-sm tracking-tighter font-normal capitalize">
            {title}
          </p>
        </Link>
        <p className="text-sm font-semibold text-gray-700 tracking-tight">
          Rp {price}
        </p>
        <p className="text-muted-foreground text-xs">In stock: {stock}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Button
            disabled={quantity === 0}
            onClick={handleRemoveQuantity}
            size="icon"
            variant="ghost"
          >
            <IoIosRemove />
          </Button>
          <p>{quantity}</p>
          <Button
            disabled={quantity === stock}
            onClick={handleAddQuantity}
            size="icon"
            variant="ghost"
          >
            <IoIosAdd />
          </Button>
        </div>

        <Button
          className="w-full"
          size="sm"
          disabled={!stock}
          onClick={addToCart}
        >
          {!stock ? "Out of stock" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};
export default ProductCard;
