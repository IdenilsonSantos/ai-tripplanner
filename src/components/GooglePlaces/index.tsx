import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "../ui/input";

const AutoComplete = ({handleSelectPlace} : any) => {
  const { ref } = usePlacesWidget({
    apiKey: process.env.GCP_PLACES_KEY,
    onPlaceSelected: (place) => {
      handleSelectPlace(place)
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "br" },
    },
  });

  return <Input ref={ref} className="w-full md:w-32 lg:w-[500px] h-[48px] focus-visible:ring-offset-0 focus-visible:ring-0"/>;
};

export default AutoComplete