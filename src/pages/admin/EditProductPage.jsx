/* eslint-disable react-hooks/exhaustive-deps */
import ProductForm from "@/components/forms/ProductForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProduct = async (values) => {
    try {
      setIsLoading(true);
      await axiosInstance.patch(`/products/${productId}`, {
        title: values.title || product?.title,
        description: values.description || product?.description,
        price: values.price || product?.price,
        stock: values.stock || product?.stock,
        imgUrl: values.imgUrl || product?.imgUrl,
      });
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <AdminLayout title={"Edit Product"} description={"Edit product here"}>
      {product?.id ? (
        <ProductForm
          title={"Edit product " + product?.title}
          className={"text-2xl"}
          description={"fill the form below to edit product"}
          onSubmit={handleEditProduct}
          isLoading={isLoading}
          btnText={"Edit Product"}
          textLoading={"Editing product..."}
          defaultTitle={product?.title}
          defaultDescription={product?.description}
          defaultPrice={product?.price}
          defaultStock={product?.stock}
          defaultImgUrl={product?.imgUrl}
        />
      ) : null}
    </AdminLayout>
  );
};

export default EditProductPage;
