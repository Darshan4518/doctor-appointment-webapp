import React from "react";
import CategoryItem from "./CategoryItem";
import { Box, Typography, Skeleton } from "@mui/material";

const CategoryList = ({ categories, fetchCategories, isLoading }) => {
  return (
    <Box>
      <Typography variant="h5" className="mb-4">
        Category List
      </Typography>
      {isLoading ? (
        <Box>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            className="mb-4"
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            className="mb-4"
          />
        </Box>
      ) : (
        categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            fetchCategories={fetchCategories}
          />
        ))
      )}
    </Box>
  );
};

export default CategoryList;
