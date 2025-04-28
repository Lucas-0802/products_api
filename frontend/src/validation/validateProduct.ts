import { z } from "zod";
import { productSchema } from "./productValidation";
import { toast } from "sonner";

export interface ValidateProductDTO {
  name: string;
  categories: string[];
  price: number;
  qty: number;
  photo: string;
}

export const validateProduct = (data: ValidateProductDTO) => {
  try {
    productSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      err.errors.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      const message = Object.values(errors)[0];
      toast.error(message);
      return { isValid: false };
    }
    return { isValid: false };
  }
};
