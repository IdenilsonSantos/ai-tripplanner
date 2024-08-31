import React from "react";
import Subtitle from "../Subtilte";
import Typography from "../Typography";

type Heading = {
  title: String;
  subtitle: String;
  variant: any
};

const Heading = ({ title, subtitle, variant = 'p' }: Partial<Heading>) => {
  return (
    <div className="flex-col">
      <Typography variant={variant}>
        {title}
      </Typography>
      {subtitle && <Subtitle title={subtitle} />}
    </div>
  );
};

export default Heading;
