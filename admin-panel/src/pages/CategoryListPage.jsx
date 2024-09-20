import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import { getCategories } from "../services/CategoryService";
import { Container, Typography, Skeleton, Box } from "@mui/material";
import Layout from "./Layout";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <Container className="py-8">
        <Typography variant="h4" className="mb-8">
          Category Management
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
          <CategoryList
            categories={categories}
            fetchCategories={fetchCategories}
          />
        )}
      </Container>
    </Layout>
  );
};

export default CategoryListPage;
