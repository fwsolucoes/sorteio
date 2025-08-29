import { validatePhone } from "@arkyn/shared";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  country: z.string().min(1, "O país é obrigatório"),
  state: z.string().optional(),
  email: z.email("Informe um email válido"),
  phone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((val) => validatePhone(val), { message: "Telefone inválido" }),
});

export type FormDataType = z.infer<typeof formSchema>;
