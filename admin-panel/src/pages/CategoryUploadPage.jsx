import React from "react";
import CategoryForm from "../components/CategoryForm";
import { Container, Typography } from "@mui/material";
import Layout from "./Layout";

const CategoryUploadPage = () => {
  return (
    <Layout>
      <Container className="py-8">
        <Typography variant="h4" className="mb-8">
          Upload Category
        </Typography>
        <CategoryForm />
      </Container>
    </Layout>
  );
};

export default CategoryUploadPage;
