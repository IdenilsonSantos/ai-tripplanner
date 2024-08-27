import React from "react";
import Subtitle from "../Subtilte";

type Heading = {
  title: String;
  subtitle: String;
};
const Heading = ({ title, subtitle }: Partial<Heading>) => {
  return (
    <div className="flex-col">
      <h4 className="heading text-lg font-bold">{title}</h4>
      {subtitle && <Subtitle title={subtitle} />}
    </div>
  );
};

export default Heading;
