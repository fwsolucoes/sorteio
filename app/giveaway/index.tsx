import { useEffect, useState } from "react";
import { styled } from "@linaria/react";
import { useFetcher } from "react-router";
import { Button, Container, Input, SuccessBox, Title } from "./styles";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const payload = {
    name: formData.get("name"),
    city: formData.get("city"),
    state: formData.get("state"),
    email: formData.get("email"),
  };

  const response = await fetch("https://sua-api.com/sorteio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar inscrição");
  }

  const data = await response.json();
  return { numero: data.numero };
}

function Giveaway() {
  const fetcher = useFetcher<{ numero?: number }>();
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("drawn_number");
    if (saved) {
      setDrawnNumber(Number(saved));
    }
  }, []);

  // Salva quando a API retornar
  useEffect(() => {
    if (fetcher.data?.numero) {
      localStorage.setItem("sorteio_numero", String(fetcher.data.numero));
      setDrawnNumber(fetcher.data.numero);
    }
  }, [fetcher.data]);

  return (
    <Container>
      <Title>Participe do Sorteio</Title>

      {drawnNumber ? (
        <SuccessBox>
          <p>🎉 Obrigado por participar!</p>
          <p>
            Seu número de participação é: <strong>{drawnNumber}</strong>
          </p>
        </SuccessBox>
      ) : (
        <fetcher.Form method="post">
          <Input type="text" name="name" placeholder="Nome" required />
          <Input type="text" name="city" placeholder="Cidade" required />
          <Input type="text" name="state" placeholder="Estado" required />
          <Input type="email" name="email" placeholder="Email" required />

          <Button type="submit" disabled={fetcher.state === "submitting"}>
            {fetcher.state === "submitting"
              ? "Enviando..."
              : "Participar do sorteio"}
          </Button>
        </fetcher.Form>
      )}
    </Container>
  );
}

export { Giveaway };
