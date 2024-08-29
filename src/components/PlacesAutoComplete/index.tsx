import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "../ui/input";
import { FC } from "react";

type AutoCompleteProps = {
  handleSelectPlace: (place: any) => void;
}

const AutoComplete = ({ handleSelectPlace } : AutoCompleteProps) => {
  const { ref }: any = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GCP_PLACES_KEY || '',
    onPlaceSelected: handleSelectPlace,
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "br" },
    },
  });

  return (
    <Input
      ref={ref}
      className="w-full md:w-32 lg:w-[500px] h-[48px] focus-visible:ring-offset-0 focus-visible:ring-0"
    />
  );
};

export default AutoComplete;