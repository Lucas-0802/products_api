import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" })
    .max(20, { message: "Product name must be at most 20 characters" })
    .refine((val) => val.trim().length > 0, {
      message: "Product name cannot be empty",
    }),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required" }),
  price: z.number().min(1, { message: "Price is required" }),
  qty: z.number().min(1, { message: "Quantity is required" }),
  photo: z.string().url({ message: "Photo URL must be a valid URL" }),
});
