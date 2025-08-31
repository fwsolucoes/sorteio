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
import googlePlay from "./google-play-availability.svg";
import appStore from "./app-store-availability.svg";
import donationImage from "./donation-image.svg";
import { type FormDataType, formSchema } from "./schema";
import { Link } from "react-router";

function Giveaway() {
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormDataType, string>>
  >({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    const bodyData = {
      draw_id: "0198a3b3-0c8f-7a60-99f1-90df18e73022",
      ...parseResult.data,
    };

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

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/draw/participant/public/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar inscrição");
      }

      const data = await response.json();

      console.log("cliente", data);
      setDrawnNumber(data.lucky_number);
    } catch (err) {
      setError("Não foi possível enviar sua participação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      {!drawnNumber && (
        <>
          <img
            src={giveawayImage}
            alt="Sorteio Frei Gilson 40 dias com São Miguel"
          />
          <Title>SORTEIO 40 DIAS COM SÃO MIGUEL</Title>
          <span className="description">
            Participe do sorteio para rezar o Rosário com Frei Gilson no dia 05
            de setembro preenchendo o formulário abaixo:
          </span>
        </>
      )}

      {drawnNumber ? (
        <>
          <SuccessBox>
            <p>🎉 Obrigado por participar!</p>
            <p>
              Seu número de participação é: <strong>{drawnNumber}</strong>
            </p>
          </SuccessBox>

          <div className="oracaoPlayDownload">
            <p style={{ marginTop: "16px", textAlign: "center" }}>
              Aproveite e baixe o aplicativo <strong>Oração Play</strong>:
            </p>

            <div className="buttonLinks">
              <Link
                to={
                  "https://play.google.com/store/apps/details?id=org.carmelitasmensageiros.benfeitor&hl=pt_BR&pli=1"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={googlePlay} alt="Google play download" />
              </Link>
              <Link
                to={
                  "https://apps.apple.com/br/app/ora%C3%A7%C3%A3o-play-carmelitas/id1436660924"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={appStore} alt="Google play download" />
              </Link>
            </div>
          </div>

          <div className="donationBanner">
            <div className="message">
              <img src={donationImage} alt="donation image" />
              <span>
                Torne-se um(a) benfeitor(a) dos Freis Carmelitas Mensageiros! É
                com a sua contribuição que podemos continuar essa obra e levar o
                Evangelho a todos!
              </span>
            </div>
            <Link
              to={"https://doacoes.sancton.com.br/project/seja-um-mensageiro"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button">Contribua aqui</Button>
            </Link>
          </div>
        </>
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
