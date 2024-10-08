import AdminLayout from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductForm from "@/components/forms/ProductForm";

const CreateProductPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateProduct = async (values) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/products", values);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AdminLayout title={"Create Product"} description={"Add new product here"}>
      <ProductForm
        title={"Add new product"}
        className={"text-3xl"}
        description={"fill the form below to add new product"}
        onSubmit={handleCreateProduct}
        isLoading={isLoading}
        btnText={"Create Product"}
        textLoading={"Creating product..."}
      />
    </AdminLayout>
  );
};

export default CreateProductPage;
