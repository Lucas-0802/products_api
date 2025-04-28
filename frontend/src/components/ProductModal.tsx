import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "./Multi-select";
import { ProductProps } from "./Product";
import {
  validateProduct,
  ValidateProductDTO,
} from "@/validation/validateProduct";
import { formatPrice, parsePriceToNumber } from "@/utils/maskPrice";
import { toast } from "sonner";
import { apiService } from "@/services/apiService";
import { AxiosError } from "axios";

export interface Category {
  value: string;
  label: string;
}

interface ProductModalProps {
  onSave: (newProduct: ProductProps) => Promise<void>;
  onEdit: (updatedProduct: ProductProps) => Promise<void>;
  productToEdit: ProductProps | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ProductModal({
  onSave,
  onEdit,
  productToEdit,
  open,
  setOpen,
}: ProductModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState<string>("");
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategoriesSelected(productToEdit.categories.map((c) => c.value));
      setPrice(formatPrice(productToEdit.price.toString()));
      setQuantity(productToEdit.qty.toString());
      setPhoto(productToEdit.photo);
      setOpen(true);
    }
  }, [productToEdit, setOpen]);

  useEffect(() => {
    if (!open) {
      setName("");
      setCategoriesSelected([]);
      setPrice("");
      setQuantity("");
      setPhoto("");
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const { get } = apiService();
      const data = await get<Category[]>("/categories");
      setCategories(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleSaveProduct = async () => {
    const productData: ValidateProductDTO = {
      name,
      categories: categoriesSelected,
      price: parsePriceToNumber(price.toString()),
      qty: Number(quantity),
      photo,
    };

    const validationResult = validateProduct(productData);

    if (!validationResult.isValid) return;

    const newProduct: ProductProps = {
      id: productToEdit ? productToEdit.id : Date.now().toString(),
      name,
      categories: categoriesSelected.map((value) => ({
        value,
        label: categories.find((c) => c.value === value)?.label || "",
      })),
      price: parsePriceToNumber(price.toString()),
      qty: Number(quantity),
      photo,
    };

    if (productToEdit) {
      await onEdit(newProduct);
    } else {
      await onSave(newProduct);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {productToEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {productToEdit
              ? "Update the details of the product."
              : "Fill in the details of the new product and click save to add it to the inventory."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categories" className="text-right">
              Categories
            </Label>
            <MultiSelect
              className="w-83"
              options={categories}
              onValueChange={(value) => setCategoriesSelected(value)}
              defaultValue={categoriesSelected}
              placeholder="Select categories"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(formatPrice(e.target.value))}
              type="text"
              placeholder="Enter price"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              placeholder="Enter quantity"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
              Photo URL
            </Label>
            <Input
              id="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Enter photo URL"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-green-500 hover:bg-green-400 cursor-pointer"
            type="submit"
            onClick={handleSaveProduct}
          >
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
