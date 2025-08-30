import type { Route } from "./+types/home";
import { Giveaway } from "../giveaway/index";

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

export default function Home() {
  return <Giveaway />;
}
