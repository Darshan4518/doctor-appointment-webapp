import React from "react";
import HospitalForm from "../components/HospitalForm";
import Layout from "./Layout";

const HospitalUploadPage = ({ fetchHospitals }) => {
  return (
    <Layout>
      <div>
        <h3 className="text-center mb-4">Upload Hospital</h3>
        <HospitalForm fetchHospitals={fetchHospitals} />
      </div>
    </Layout>
  );
};

export default HospitalUploadPage;
