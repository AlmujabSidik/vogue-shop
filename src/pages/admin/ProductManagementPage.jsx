/* eslint-disable react-hooks/exhaustive-deps */
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
const ProductManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [productName, setProductName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentSearch = searchParams.get("search") || "";
  const itemsPerPage = 10;
  const continousId = (currentPage - 1) * itemsPerPage + 1;

  useEffect(() => {
    const validateAndFetchProducts = async () => {
      if (!searchParams.has("page")) {
        setSearchParams({ page: "1" }, { replace: true });
      } else {
        await fetchProduct();
      }
    };

    validateAndFetchProducts();
  }, [searchParams]);

  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: itemsPerPage,
          _page: currentPage,
          title: currentSearch,
        },
      });
      setProducts(response.data.data);
      setHasNextPage(response.data.next);
      setTotalPages(response.data.pages);

      if (currentPage > response.data.pages && response.data.pages > 0) {
        // Redirect to the last available page
        setSearchParams(
          {
            ...Object.fromEntries(searchParams),
            page: response.data.pages.toString(),
          },
          { replace: true }
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: nextPage.toString(),
    });
  };

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: prevPage.toString(),
    });
  };

  const truncateByWords = (str, maxWords) => {
    const words = str.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return str;
  };

  const searchProduct = () => {
    const newParams = new URLSearchParams(searchParams);
    if (productName) {
      newParams.set("search", productName);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${selectedProductIds.length}  product?`
    );

    if (!confirmDelete) return;

    const deletePromises = selectedProductIds.map((productId) =>
      axiosInstance.delete(`/products/${productId}`)
    );

    try {
      await Promise.all(deletePromises);
      alert(`Successfully deleted ${selectedProductIds.length} product`);
      searchParams.set("page", 1);
      setSearchParams(searchParams, { replace: true });
      setSelectedProductIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnCheckedProduct = (productId, checked) => {
    if (checked) {
      setSelectedProductIds([...selectedProductIds, productId]);
    } else {
      const productIdIndex = selectedProductIds.findIndex(
        (id) => id === productId
      );
      selectedProductIds.splice(productIdIndex, 1);
      setSelectedProductIds([...selectedProductIds]);
    }
  };

  useEffect(() => {
    setProductName(currentSearch);
  }, [currentSearch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout
      title={"Products Management"}
      description={"Manage our store's products"}
      rightSection={
        <div className="flex space-x-2 items-center">
          {selectedProductIds.length ? (
            <Button
              onClick={handleDeleteProduct}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Delete {selectedProductIds.length} Product
            </Button>
          ) : null}
          <Link to={"/admin/products/create"}>
            <Button size="sm">
              <IoAdd className="h-5 w-5 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      }
    >
      <div className="mb-2 flex justify-between items-center">
        <Label>List of Products</Label>
        <div className="flex gap-2">
          <Input
            className="max-w-sm h-8 text-muted-foreground"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Search Product..."
          />
          <Button onClick={searchProduct} size="sm">
            Search
          </Button>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {products.length === 0 ? (
        <div className="text-center py-8">No products found.</div>
      ) : (
        <>
          <Table className="p-4 border rounded-sm">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>No.</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={(checked) =>
                        handleOnCheckedProduct(product.id, checked)
                      }
                      checked={selectedProductIds.includes(product.id)}
                    />
                  </TableCell>
                  <TableCell>{continousId + index}.</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>
                    Rp {product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="max-w-sm">
                    {truncateByWords(product.description, 10)}
                  </TableCell>
                  <TableCell>
                    <Link to={"/admin/products/edit/" + product.id}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-5 w-5 text-blue-800" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination className={"mt-4 "}>
            <PaginationContent>
              <PaginationItem>
                <Button
                  disabled={currentPage <= 1}
                  onClick={handlePrevPage}
                  size="sm"
                  variant="secondary"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem className="mx-8 text-xs font-semibold">
                Page {currentPage} of {totalPages}
              </PaginationItem>
              <PaginationItem>
                <Button
                  disabled={!hasNextPage}
                  onClick={handleNextPage}
                  size="sm"
                  variant="secondary"
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </AdminLayout>
  );
};

export default ProductManagementPage;
