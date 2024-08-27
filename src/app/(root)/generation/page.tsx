"use client";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ReactSelect from "react-select";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CardGrid = {
  id: any;
  title: String;
  description: String;
  handleSelect: Function;
  selectedId: any;
  type: String;
};

const options = [
  {
    id: 1,
    value: "low",
    title: "Pouca Grana",
    image: "",
    description: "Vai com calma fatura",
  },
  {
    id: 2,
    value: "moderate",
    title: "Moderado",
    image: "",
    description: "Ainda de olho no cartão",
  },
  {
    id: 3,
    value: "high",
    title: "A vontade",
    image: "",
    description: "A cara da riqueza",
  },
];

const optionsPeople = [
  {
    id: 1,
    value: "alone",
    title: "Sozinho",
    image: "",
    description: "Você vai divertir com certeza",
  },
  {
    id: 2,
    value: "couple",
    title: "Casal",
    image: "",
    description: "Você e seu amor precisam",
  },
  {
    id: 3,
    value: "friends",
    title: "Amigos",
    image: "",
    description: "Com amigos tudo fica melhor",
  },
  {
    id: 4,
    value: "family",
    title: "Familia",
    image: "",
    description: "Junte a criançada e bora viajar",
  },
];

const Generation = () => {
  const [budget, setBudget] = useState<Number>();
  const [people, setPeople] = useState<Number>();

  const handleSelect = (id: number, type: "budget" | "people") => {
    if (type === "budget") {
      setBudget(id);
    } else if (type === "people") {
      setPeople(id);
    }
  };

  const renderCard = ({
    id,
    title,
    description,
    handleSelect,
    selectedId,
    type,
  }: CardGrid) => (
    <Card
      key={id}
      className={cn(
        "cursor-pointer",
        selectedId === id ? "border-gray border transition-all" : ""
      )}
      onClick={() => handleSelect(id, type)}
    >
      <CardHeader>
        <Image width="24" height="24" alt="" src="" />
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray">{description}</CardDescription>
      </CardHeader>
    </Card>
  );

  return (
    <div className="generation-screen flex flex-col items-start gap-8">
      <section className="destiny-selection w-full flex flex-col items-start gap-4">
        <Heading
          title="Para qual destino deseja ir ?"
          subtitle="Selecione um destino e vamos juntos"
        />
        <ReactSelect className="w-full md:w-32 lg:w-[500px] h-[56px]" />
      </section>

      <section className="days w-full flex flex-col items-start gap-4">
        <Heading
          title="Quantos dias deseja viajar ?"
          subtitle="Aproveite todos os dias"
        />
        <Input className="w-full md:w-32 lg:w-[500px] h-[48px] focus-visible:ring-offset-0 focus-visible:ring-0" />
      </section>

      <section className="budget w-full flex flex-col items-start gap-4">
        <Heading title="Quanto pode pagar ?" subtitle="Gaste com sabedoria" />
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {options.map((option) =>
            renderCard({
              ...option,
              handleSelect,
              selectedId: budget,
              type: "budget",
            })
          )}
        </div>
      </section>

      <section className="people w-full flex flex-col items-start gap-4">
        <Heading
          title="Quem vai com você para este destino incrível?"
          subtitle="Sendo sozinho ou com a galera, o importante é se divertir"
        />
        <div className="grid grid-cols-4 gap-4">
          {optionsPeople.map((option) =>
            renderCard({
              ...option,
              handleSelect,
              selectedId: people,
              type: "people",
            })
          )}
        </div>
      </section>

      <div className="generate-btn w-full flex justify-end">
        <Button className="text-white">
            Gerar
        </Button>
      </div>
    </div>
  );
};

export default Generation;
