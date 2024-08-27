import React from "react";

type Subtitle = {
    title: String
}
const Subtitle = ({title} : Subtitle) => {
  return (
    <h4 className="subtitle text-sm text-gray">{title}</h4>
  );
};

export default Subtitle;
