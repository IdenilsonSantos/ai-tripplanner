"use client";

import Heading from "@/components/Heading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { optionsTravelers } from "@/app/utils/options";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";
import Header from "@/components/Header";
import { useParams } from "next/navigation";
import { GetServerSideProps } from 'next';
import { getImages } from "@/app/utils/services/getImages";
import { LocalCards, VisitationCards } from "@/components/LocalCards";


const ViewPlanner = () => {
  const [budget, setBudget] = useState<Number>();
  const [travelers, setTravelers] = useState<Number>();
  const [data, setData] = useState<any>()
  const { id }: string | any = useParams();

  const handleSelect = (id: number, type: "budget" | "travelers") => {
    if (type === "budget") {
      setBudget(id);
    } else if (type === "travelers") {
      setTravelers(id);
    }
  };

const getData = async (id: string) => {
    const docRef = doc(db, "aiplanner", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = await getDataImages(docSnap.data())
        setData(data)
    } else {
        toast('No trip found!')
    }
}

const getDataImages = async (data: any) => {
    const hotelOptions = await Promise.all(
      data.planner.hotelOptions.map(async (hotel: any) => {
        const hotelImageUrl = await getImages(hotel.hotelName);
        return { ...hotel, hotelImageUrl };
      })
    );
  
    const plan = await Promise.all(
      data.planner.itinerary.map(async (hotel: any) => {
        const res = await Promise.all(
          hotel.plan.map(async (plan: any) => {
            const placeImageUrl = await getImages(plan.placeName)

            return { ...plan, placeImageUrl}
        }))

        return {...hotel, 
            plan: res}
        })
    );
  
    return {
      ...data,
      planner: {
        ...data.planner,
        hotelOptions,
        itinerary: plan,
      },
    };
  };

 useEffect(() => {
    if(id){
        getData(id)
    }
  }, [id])

  console.log("DTA", data)

  const capitalize = (s: string) => {
    return s[0].toUpperCase() + s.slice(1);
  }

  const iti = [{"day": 1, "plan": [{"placeName": "Jardim Botânico de Curitiba", "placeDetails": "Um dos cartões postais de Curitiba, com paisagismo impecável e uma variedade de espécies de plantas.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jardim_Bot%C3%A2nico_de_Curitiba.jpg/1024px-Jardim_Bot%C3%A2nico_de_Curitiba.jpg", "geoCoordinates": "-25.4988° S, 49.2747° W", "ticketPricing": "Entrada gratuita", "rating": "5 estrelas", "time": "Manhã (9h às 12h)", "travelTime": "15 minutos de carro do centro"}, {"placeName": "Museu Oscar Niemeyer (MON)", "placeDetails": "Construção icônica de Oscar Niemeyer, abrigando exposições de arte, design e arquitetura.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Museu_Oscar_Niemeyer_Curitiba.jpg/1024px-Museu_Oscar_Niemeyer_Curitiba.jpg", "geoCoordinates": "-25.4371° S, 49.2687° W", "ticketPricing": "R$ 20 por pessoa", "rating": "4,5 estrelas", "time": "Tarde (14h às 17h)", "travelTime": "10 minutos de carro do Jardim Botânico"}]}, {"day": 2, "plan": [{"placeName": "Mercado Municipal de Curitiba", "placeDetails": "Local vibrante com variedade de produtos frescos, lanches e restaurantes, ideal para experimentar a culinária local.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Mercado_Municipal_de_Curitiba.jpg/1280px-Mercado_Municipal_de_Curitiba.jpg", "geoCoordinates": "-25.4264° S, 49.2718° W", "ticketPricing": "Entrada gratuita", "rating": "4 estrelas", "time": "Manhã (10h às 12h)", "travelTime": "5 minutos de carro do MON"}, {"placeName": "Parque da Água Verde", "placeDetails": "Um dos maiores parques da cidade, com áreas verdes, lago, pista de corrida e espaços para relaxar.", "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Parque_da_%C3%81gua_Verde%2C_Curitiba.jpg/1024px-Parque_da_%C3%81gua_Verde%2C_Curitiba.jpg", "geoCoordinates": "-25.4582° S, 49.2749° W", "ticketPricing": "Entrada gratuita", "rating": "4,5 estrelas", "time": "Tarde (15h às 18h)", "travelTime": "15 minutos de carro do Mercado Municipal"}]}]

  return (
    <>
      <Header />
      <div className="h-[90vh] py-8 w-full container">
        {data && (
          <div className="generation-screen flex flex-col items-start gap-8">
            <section className="destiny-selection w-full flex flex-col items-start gap-4">
              <Heading
                title={data.selection.location}
                subtitle={`${capitalize(data.selection.traveler)}, ${
                  data.selection.budget
                }, para ${
                  data.selection.days > 1
                    ? `${data.selection.days} dias`
                    : `${data.selection.days} dia`
                } `}
                variant="h2"
              />
            </section>

            <section className="travelers w-full flex flex-col items-start gap-4">
              <Heading
                title="Hotéis recomendados"
                subtitle="Selecionamos as melhores recomendações"
                variant="h4"
              />
              <div className="grid grid-cols-5 gap-4">
                {data.planner.hotelOptions.map((option: any) => {
                  return (
                    <div key={option.id}>
                      <LocalCards
                        {...{
                          ...option,
                          handleSelect,
                          selectedId: travelers,
                          type: "travelers",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="travelers w-full flex flex-col items-start gap-4">
              <Heading
                title="Lugares para visitar"
                subtitle="Lugares próximos aos hotéis recomendados"
                variant="h4"
              />
              {data.planner.itinerary?.map((option: any) => (
                <div key={option.id} className="mb-4">
                  <p className="font-bold text-sm text-gray mb-2 ">
                    Para visitar no dia {option.day}
                  </p>
                  <div className="grid grid-cols-5 gap-4">
                    {option.plan
                      .filter((plan: any) => plan.geoCoordinates)
                      .map((plan: any) => (
                        <VisitationCards
                          key={plan.placeName}
                          {...{
                            ...plan,
                            handleSelect,
                            selectedId: travelers,
                            type: "travelers",
                          }}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewPlanner;
