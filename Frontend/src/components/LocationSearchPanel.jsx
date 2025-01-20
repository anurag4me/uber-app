import React from "react";

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen }) => {
  // Sample array of locations
  const locations = [
    "C.K. pithawala college of engineering and technology",
    "Near Surat Railway Station, Rajahansh complex, Surat ",
    "Sachin GIDC Police Station BRTS Bus Stop 392345",
    "ONGC Colony Bus Stop, Surat - Hazira Road",
  ];
  return (
    <div>
      {/* this is just a sample data */}
      {locations.map((location, index) => {
        return (
          <div
            className="flex gap-4 border-2 active:border-black p-3 rounded-xl my-2 items-center justify-start"
            onClick={() => {
              setVehiclePanelOpen(true);
              setPanelOpen(false);
            }}
            key={index}
          >
            <h2 className="bg-[#eeeeee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
