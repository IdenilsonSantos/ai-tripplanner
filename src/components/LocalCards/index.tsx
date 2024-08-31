import Image from "next/image";

import star from "@/assets/icons/star.svg";

type CardGridProps = {
  id: any;
  title: string;
  description: string;
  hotelImageUrl: string;
  hotelName: string;
  price: string;
  rating: string;
  handleSelect: (id: number, type: "budget" | "travelers") => void;
  selectedId: any;
  type: "budget" | "travelers";
};

type VisitationCardsProps = {
  id: any;
  placeName: string;
  placeImageUrl: string;
  placeDetails: string;
  ticketPricing: string;
  time: string
};

const RatingIcon = ({ text }: string | any) => {
  const number = parseInt(text.match(/\d+/)[0], 10);

  return (
    <span className="flex mr-2">
      {Array.from({ length: number }).map((_, index) => (
        <Image key={index} src={star} width={16} height={16} alt="rating" />
      ))}
    </span>
  );
};

export const LocalCards = ({
  id,
  title,
  description,
  hotelImageUrl,
  price,
  hotelName,
  rating,
  handleSelect,
  selectedId,
  type,
}: CardGridProps) => (
  <>
    <div
      key={id}
      className="bg-white border border-gray-200 rounded-lg max-w-[500px] h-[350px] dark:bg-gray-800 dark:border-border"
    >
      <a href="#">
        <Image
          className="rounded-t-md h-[215px]"
          src={hotelImageUrl}
          alt=""
          width="500"
          height="100"
        />
      </a>
      <div className="p-4">
        <p className="font-bold text-gray-700 mb dark:text-gray-400">
          {hotelName}
        </p>
        <p className="font-normal flex items-center text-sm text-gray mb-2 dark:text-gray-400">
          <RatingIcon text={rating} />
          {rating}
        </p>
        <p className="font-normal flex items-center text-sm text-gray mb-3 dark:text-gray-400">
          {price}
        </p>
      </div>
    </div>
  </>
);

export const VisitationCards = ({
  id,
  placeName,
  placeImageUrl,
  placeDetails,
  ticketPricing,
  time
}: VisitationCardsProps) => (
  <>
    <div
      key={id}
      className="bg-white border border-gray-200 rounded-lg max-w-[500px] h-[350px] dark:bg-gray-800 dark:border-border"
    >
      <a href="#">
        <Image
          className="rounded-t-md h-[215px]"
          src={placeImageUrl}
          alt=""
          width="500"
          height="100"
        />
      </a>
      <div className="p-4">
        <p className="font-bold text-gray-700 mb dark:text-gray-400">
          {placeName}
        </p>
        <p className="font-normal flex items-center text-[12px] text-gray mb-2 dark:text-gray-400">
          {ticketPricing} / {time}
        </p>
        <p className="font-normal flex items-center text-sm text-gray overflow-hidden text-ellipsis mb-2 dark:text-gray-400">
          {placeDetails}
        </p>
        {/* <p className="font-normal flex items-center text-sm text-gray mb-3 dark:text-gray-400">
            {price}
          </p> */}
      </div>
    </div>
  </>
);
