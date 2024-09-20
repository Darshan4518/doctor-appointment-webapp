import React from "react";
import axios from "axios";
import { Button, Box, Typography, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category, fetchCategories, isLoading }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://doctor-appointment-webapp-bakend.onrender.com/api/categories/${category._id}`
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (isLoading) {
    return (
      <Box className="p-4 border border-gray-300 rounded-lg mb-4">
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={100}
          className="mb-4"
        />
        <Box>
          <Skeleton variant="rectangular" width="30%" height={40} />
          <Skeleton
            variant="rectangular"
            width="30%"
            height={40}
            className="ml-2"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="p-4 border border-gray-300 rounded-lg mb-4">
      <Typography variant="h6">{category.name}</Typography>
      <img
        src={category.imageUrl}
        alt={category.name}
        width="100"
        className="mt-4 mb-4"
      />
      <Box>
        <Button
          onClick={() => navigate(`/categories/update/${category._id}`)}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
        <Button onClick={handleDelete} className="ml-2">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryItem;
