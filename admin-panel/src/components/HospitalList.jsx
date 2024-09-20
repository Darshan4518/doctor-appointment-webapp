import React from "react";
import HospitalItem from "./HospitalItem";

const HospitalList = ({ hospitals, fetchHospitals }) => {
  return (
    <div>
      <h5 className="mb-4">Hospital List</h5>
      {hospitals.map((hospital) => (
        <HospitalItem
          key={hospital._id}
          hospital={hospital}
          fetchHospitals={fetchHospitals}
        />
      ))}
    </div>
  );
};

export default HospitalList;
