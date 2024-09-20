// src/components/DashboardCard.js
import React from "react";
import { HomeIcon, UserGroupIcon, CogIcon } from "@heroicons/react/outline";

const icons = {
  Dashboard: HomeIcon,
  Users: UserGroupIcon,
  Settings: CogIcon,
};

const DashboardCard = ({ title, icon, imageUrl }) => {
  const IconComponent = icons[icon];
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4 flex items-center">
        <IconComponent className="text-gray-500 mr-4 h-6 w-6" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default DashboardCard;
