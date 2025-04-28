import { useEffect, useState } from "react";
import { ProductModal } from "@/components/ProductModal";
import { Header } from "@/components/Header";
import { ProductProps } from "@/components/Product";
import { apiService } from "@/services/apiService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loading } from "@/components/Loading";
import { ProductsList } from "@/components/ProductsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

interface DefaultResponse {
  message: string;
}

interface GetProductsResponse {
  code: number;
  message: string;
  products: ProductProps[];
}

interface GetProductByIdResponse {
  code: number;
  message: string;
  product: ProductProps;
}

export const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [productToEdit, setProductToEdit] = useState<ProductProps | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { get } = apiService();
      const { products } = await get<GetProductsResponse>("/product");
      setProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string) => {
    setLoading(true);
    try {
      const { get } = apiService();
      const { product } = await get<GetProductByIdResponse>(`/product/${id}`);
      setProductToEdit(product);
      setOpenModal(true);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNewProductModal = () => {
    setProductToEdit(null);
    setOpenModal(true);
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred");
    }
  };

  const handleSaveProduct = async (newProduct: ProductProps) => {
    setLoading(true);
    try {
      const { post } = apiService();
      const data = await post<DefaultResponse>("/product", newProduct);
      fetchProducts();
      toast.success(data.message);
      setProductToEdit(null);
      setOpenModal(false);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (updatedProduct: ProductProps) => {
    setLoading(true);
    try {
      const { patch } = apiService();
      const data = await patch<DefaultResponse>(
        `/product/${updatedProduct.id}`,
        updatedProduct
      );
      fetchProducts();
      toast.success(data.message);
      setProductToEdit(null);
      setOpenModal(false);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    try {
      const { deleteRequest } = apiService();
      const data = await deleteRequest<DefaultResponse>(`/product/${id}`);
      toast.success(data.message);
      fetchProducts();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterProducts = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex flex-col p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-semibold">Product list</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter product name..."
                className="pl-10"
                onInput={(e) =>
                  handleFilterProducts((e.target as HTMLInputElement).value)
                }
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <Button
              className="bg-green-500 hover:bg-green-400 cursor-pointer"
              onClick={handleOpenNewProductModal}
            >
              Add Product
            </Button>
          </div>

          <ProductModal
            onSave={handleSaveProduct}
            onEdit={handleEditProduct}
            productToEdit={productToEdit}
            open={openModal}
            setOpen={(isOpen: boolean) => {
              if (!loading) setOpenModal(isOpen);
            }}
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <ProductsList
            products={filteredProducts}
            onEdit={(product) => fetchProductById(product.id!)}
            onDelete={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};
