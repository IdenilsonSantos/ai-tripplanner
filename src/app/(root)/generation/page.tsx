"use client";

import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AutoComplete from "@/components/GooglePlaces";
import { options, optionsTravelers } from "@/app/utils/options";
import { AI_PROMPT } from "@/app/utils/prompt";
import { chatSession } from "@/app/utils/aimodel";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type CardGridProps = {
  id: any;
  title: string;
  description: string;
  image: string;
  handleSelect: (id: number, type: "budget" | "travelers") => void;
  selectedId: any;
  type: "budget" | "travelers";
};

const Generation = () => {
  const [budget, setBudget] = useState<Number>();
  const [travelers, setTravelers] = useState<Number>();
  const [values, setValues] = useState({
    days: "0",
    traveler: "",
    budget: "",
  });
  const [selectPlace, setSelectPlace] = useState<any>()
  const [loadingGenerate, setLoadingGenerate] = useState(false)

  const handleSelect = (id: number, type: "budget" | "travelers") => {
    if (type === "budget") {
      setBudget(id);
    } else if (type === "travelers") {
      setTravelers(id);
    }
  };

  const handleSelectPlace = (place: any) => {
    setSelectPlace(place)
  }

  const handleInputChange = (field: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const generatePlanner = async () => {
    if (!selectPlace || !values.days || !budget || !travelers) {
      console.error("Please fill out all fields before generating the planner.");
      return;
    }
  
    const travelerType = travelers === 1 ? "alone" : travelers === 2 ? "couple" : travelers === 3 ? "friends" : "group";
    const budgetType = budget === 1 ? "low" : budget === 2 ? "moderate" : "high";
  
    const finalPrompt = AI_PROMPT
      .replace("{location}", selectPlace?.address_components[0]?.short_name || "")
      .replace("{days}", values.days)
      .replace("{traveler}", travelerType)
      .replace("{budget}", budgetType);
  
    try {
      setLoadingGenerate(true)
      const result = await chatSession.sendMessage(finalPrompt);
      console.log("Generated Plan:", result?.response?.text());
      setLoadingGenerate(false)
      toast("Plano de viagem gerado com sucesso.")
    } catch (error) {
      console.error("Error generating planner:", error);
    }
  };

  const renderCard = ({
    id,
    title,
    description,
    image,
    handleSelect,
    selectedId,
    type,
  }: CardGridProps) => (
    <Card
      key={id}
      className={cn(
        "cursor-pointer",
        selectedId === id ? "border-gray border transition-all" : ""
      )}
      onClick={() => handleSelect(id, type)}
    >
      <CardHeader>
        <Image width="36" height="36" alt="" src={image} className="mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray">{description}</CardDescription>
      </CardHeader>
    </Card>
  );

  return (
    <div className="generation-screen flex flex-col items-start gap-8">
      <section className="destiny-selection w-full flex flex-col items-start gap-4">
        <Heading
          title="Para qual destino deseja ir?"
          subtitle="Selecione um destino e vamos juntos"
        />
        <AutoComplete handleSelectPlace={handleSelectPlace} />
      </section>

      <section className="days w-full flex flex-col items-start gap-4">
        <Heading
          title="Quantos dias deseja viajar?"
          subtitle="Aproveite todos os dias"
        />
        <Input
          onChange={(e) => handleInputChange("days", e.target.value)}
          type="number"
          placeholder="0"
          minLength={1}
          className="w-full md:w-32 lg:w-[500px] h-[48px] focus-visible:ring-offset-0 focus-visible:ring-0"
        />
      </section>

      <section className="budget w-full flex flex-col items-start gap-4">
        <Heading title="Quanto pode pagar?" subtitle="Gaste com sabedoria" />
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

      <section className="travelers w-full flex flex-col items-start gap-4">
        <Heading
          title="Quem vai com você para este destino incrível?"
          subtitle="Sendo sozinho ou com a galera, o importante é se divertir"
        />
        <div className="grid grid-cols-4 gap-4">
          {optionsTravelers.map((option) =>
            renderCard({
              ...option,
              handleSelect,
              selectedId: travelers,
              type: "travelers",
            })
          )}
        </div>
      </section>

      <div className="generate-btn w-full flex justify-end">
        <Button className="text-white" onClick={generatePlanner}>
          {loadingGenerate ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gerando plano</> : "Gerar"}
        </Button>
      </div>
    </div>
  );
};

export default Generation;
