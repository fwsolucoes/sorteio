import type { Route } from "./+types/home";
import { Giveaway } from "../giveaway/index";
import { formSchema, type FormDataType } from "~/giveaway/schema";
import { decodeRequestBody } from "@arkyn/server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sorteio 40 dias com São Miguel" },
    {
      name: "description",
      content:
        "Participe do sorteio para rezar o Rosário com Frei Gilson no dia 05 de setembro",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const body = await decodeRequestBody(request);

  const parseResult = formSchema.safeParse(body);

  if (!parseResult.success) {
    const errors: Partial<Record<keyof FormDataType, string>> = {};
    parseResult.error.issues.forEach((err) => {
      const field = err.path[0] as keyof FormDataType;
      errors[field] = err.message;
    });

    return { fieldErrors: errors };
  }

  const bodyData = {
    draw_id: "0198a3b3-0c8f-7a60-99f1-90df18e73022",
    ...parseResult.data,
  };

  const apiUrl = process.env.API_URL;

  try {
    const response = await fetch(`${apiUrl}/draw/participant/public/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) throw new Error("Erro ao enviar inscrição");

    const data = await response.json();
    return JSON.stringify({ success: true, numero: data.numero });
  } catch {
    return JSON.stringify({
      success: false,
      error: "Não foi possível enviar sua participação.",
    });
  }
}

export default function Home() {
  return <Giveaway />;
}
