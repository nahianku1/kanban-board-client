import React from "react";

function Tile({ children, card, dragstart,  id }) {
  return (
    <div
      className={`bg-white py-2 px-2 mb-2 
            transition-shadow shadow-lg rounded-[11px] ${
              dragstart && id === card?._id ? "opacity-0" : "opacity-100"
            }`}
      data-id={card?._id}
      data-title={card?.title}
      data-description={card?.description}
    >
      {children}
    </div>
  );
}

export default Tile;
