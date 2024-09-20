import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { getCategory, updateCategory } from "../services/CategoryService";
import Layout from "./Layout";

const CategoryUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [originalCategory, setOriginalCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getCategory(id);
      setName(category.name);
      setOriginalCategory(category);
    };

    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await updateCategory(id, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Layout>
      <Container className="py-8">
        <Typography variant="h4" className="mb-8">
          Update Category
        </Typography>
        <Box className="p-4 border border-gray-300 rounded-lg">
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-4"
          />
          <Box className="mt-4">
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default CategoryUpdatePage;
