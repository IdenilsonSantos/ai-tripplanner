import React from "react";
import Typography from "../Typography";

type Subtitle = {
    title: String;
    variant?: any
}
const Subtitle = ({title, variant = "p"} : Subtitle) => {
  return (
    <Typography variant={variant} className="text-sm text-gray">
      {title}
    </Typography>
  );
};

export default Subtitle;
