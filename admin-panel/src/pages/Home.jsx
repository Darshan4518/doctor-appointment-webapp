// src/pages/HomePage.js
import React from "react";

import DashboardCard from "../components/DashboardCard";
import Layout from "./Layout";

const HomePage = () => {
  return (
    <Layout>
      <main className="flex-grow p-6 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Dashboard"
            icon="Dashboard"
            imageUrl="https://via.placeholder.com/150"
          />
          <DashboardCard
            title="Users"
            icon="Users"
            imageUrl="https://via.placeholder.com/150"
          />
          <DashboardCard
            title="Settings"
            icon="Settings"
            imageUrl="https://via.placeholder.com/150"
          />
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
