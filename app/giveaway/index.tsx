import { useState } from "react";
import { Container, SuccessBox, Title } from "./styles";

import { brazilianStates } from "@arkyn/templates";

import {
  Button,
  FieldLabel,
  FieldWrapper,
  FormProvider,
  Input,
  PhoneInput,
} from "@arkyn/components";
import { Select } from "~/components/Select";
import giveawayImage from "./giveaway-image.svg";
import { type FormDataType, formSchema } from "./schema";

function Giveaway() {
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  const apiUrl =
    "https://micro-oracao-play-dev.vw6wo7.easypanel.host/draw/participant/public/create";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("aqui");
    event.preventDefault();
    setError(null);
    setLoading(true);
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") || ""),
      city: String(formData.get("city") || ""),
      state: String(formData.get("state") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      country: String(formData.get("country") || ""),
    };

    const parseResult = formSchema.safeParse(values);
    if (!parseResult.success) {
      const errors: Partial<Record<keyof FormDataType, string>> = {};
      parseResult.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormDataType;
        errors[field] = err.message;
      });
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parseResult.data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar inscrição");
      }

      const data = await response.json();

      console.log(data);
      setDrawnNumber(data.numero);
    } catch (err) {
      setError("Não foi possível enviar sua participação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <img
        src={giveawayImage}
        alt="Sorteio Frei Gilson 40 dias com São Miguel
          "
      />
      <Title>SORTEIO 40 DIAS COM SÃO MIGUEL</Title>
      <span className="description">
        Participe do sorteio para rezar o Rosário com Frei Gilson no dia 05 de
        setembro preenchendo o formulário abaixo:
      </span>

      {drawnNumber ? (
        <SuccessBox>
          <p>🎉 Obrigado por participar!</p>
          <p>
            Seu número de participação é: <strong>{drawnNumber}</strong>
          </p>
        </SuccessBox>
      ) : (
        <FormProvider
          form={<form onSubmit={handleSubmit} />}
          fieldErrors={fieldErrors}
        >
          <Input type="text" label="Nome" name="name" showAsterisk />
          <Input type="email" label="E-mail" name="email" showAsterisk />
          <PhoneInput label="Número de telefone" name="phone" showAsterisk />
          <Input type="text" label="Cidade" name="city" showAsterisk />
          <FieldWrapper>
            <FieldLabel>Estado</FieldLabel>
            <Select name="state" options={brazilianStates} />
          </FieldWrapper>
          <Input
            type="text"
            label="País"
            defaultValue="Brasil"
            name="country"
            showAsterisk
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Participar do sorteio"}
          </Button>
        </FormProvider>
      )}
    </Container>
  );
}

export { Giveaway };
