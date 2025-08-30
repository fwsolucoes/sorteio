import { Form, useActionData, useNavigation } from "react-router";

import {
  Button,
  FieldLabel,
  FieldWrapper,
  FormProvider,
  Input,
  PhoneInput,
} from "@arkyn/components";
import { brazilianStates } from "@arkyn/templates";
import { Select } from "~/components/Select";
import giveawayImage from "./giveaway-image.svg";
import { Container, SuccessBox, Title } from "./styles";

type ActionData = {
  fieldErrors?: Record<string, string>;
  luckyNumber?: string;
  error?: string;
};

function Giveaway() {
  const navigation = useNavigation();

  const actionData = useActionData<ActionData>();
  const { fieldErrors, luckyNumber: drawnNumber, error } = actionData ?? {};

  const loading = navigation.state !== "idle";

  return (
    <Container>
      <img
        src={giveawayImage}
        alt="Sorteio Frei Gilson 40 dias com São Miguel"
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
        <FormProvider form={<Form method="post" />} fieldErrors={fieldErrors}>
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </FormProvider>
      )}
    </Container>
  );
}

export { Giveaway };
