import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTrash, FaEdit, FaImage } from "react-icons/fa";
import { Category } from "./ProductModal";
import { formatPrice } from "@/utils/maskPrice";
import { Alert } from "./Alert";

export interface ProductProps {
  id?: string;
  name: string;
  price: number;
  qty: number;
  photo: string;
  categories: Category[];
}

interface ProductPropsWithHandlers {
  product: ProductProps;
  onEdit: (product: ProductProps) => void;
  onDelete: (id: string) => void;
}

export const Product = ({
  product,
  onEdit,
  onDelete,
}: ProductPropsWithHandlers) => {
  const { id, name, price, qty, photo, categories } = product;
  const [imageError, setImageError] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (id) {
      onDelete(id);
    }
    setIsAlertOpen(false);
  };

  const handleCancelDelete = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <Card className="flex flex-col shadow-xl rounded-lg hover:scale-105 transition-all duration-300 max-w-xs mx-auto w-90">
        <CardHeader className="flex justify-center items-center mb-4">
          {imageError ? (
            <FaImage className="text-gray-400 w-36 h-36" />
          ) : (
            <img
              src={photo}
              alt={name}
              className="w-36 h-36 object-cover rounded-lg"
              onError={handleImageError}
            />
          )}
        </CardHeader>

        <CardContent className="flex flex-col items-center text-center flex-grow">
          <CardTitle className="font-semibold text-lg">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500 mb-2">
            {formatPrice(price.toString())}
          </CardDescription>
          <p className="text-gray-700">Quantity: {qty}</p>
          <div className="flex justify-center items-center gap-2 mt-2 mb-4 flex-wrap">
            {categories.map((category) => (
              <span
                key={category.value}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {category.label}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-3 mt-4">
          <Button
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
            onClick={() => onEdit(product)}
          >
            <FaEdit className="mr-2" /> Edit
          </Button>
          <Button
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white"
            onClick={handleDeleteClick}
          >
            <FaTrash className="mr-2" /> Remove
          </Button>
        </CardFooter>
      </Card>

      <Alert
        title="Are you absolutely sure?"
        isOpen={isAlertOpen}
        message="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmTextButton="Delete"
        colorConfirmButton="danger"
      />
    </>
  );
};
