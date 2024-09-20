import React, { useEffect, useState } from "react";
import HospitalList from "../components/HospitalList";
import { getHospitals } from "../services/HospitalService";
import Layout from "./Layout";

const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState([]);

  const fetchHospitals = async () => {
    const data = await getHospitals();
    setHospitals(data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <Layout>
      <div>
        <h3 className="text-center mb-4">Hospital List</h3>
        <HospitalList hospitals={hospitals} fetchHospitals={fetchHospitals} />
      </div>
    </Layout>
  );
};

export default HospitalListPage;
