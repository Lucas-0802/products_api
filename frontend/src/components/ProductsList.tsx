import { ProductProps } from "@/components/Product";
import { Product } from "@/components/Product";
import { ListEmpty } from "./ListEmpty";
import { useState } from "react";

interface ProductsListProps {
  products: ProductProps[];
  onEdit: (product: ProductProps) => void;
  onDelete: (id: string) => void;
}

export const ProductsList = ({
  products,
  onEdit,
  onDelete,
}: ProductsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return products.length === 0 ? (
    <ListEmpty />
  ) : (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {currentProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-md cursor-pointer border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
