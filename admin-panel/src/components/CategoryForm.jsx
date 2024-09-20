import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  CircularProgress,
  Backdrop,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const CategoryForm = ({ fetchCategories }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false); // Add submitting state

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start submitting

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post(
        "https://doctor-appointment-webapp-bakend.onrender.com/api/categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setImage(null);
      setSubmitting(false); // Finish submitting
      if (fetchCategories) fetchCategories();
    } catch (error) {
      console.error("Error uploading category:", error);
      setSubmitting(false); // Finish submitting on error
    }
  };

  return (
    <Container maxWidth="sm">
      <Backdrop
        open={submitting}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="mt-4 p-4 border border-gray-300 rounded-lg">
        <Typography variant="h5" gutterBottom>
          Category Form
        </Typography>
        <form onSubmit={handleSubmit} className="mt-4">
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-4"
          />
          <div
            {...getRootProps({
              className: "border-2 border-dashed p-4 mb-4 cursor-pointer",
            })}
          >
            <input {...getInputProps()} />
            {image ? (
              <div>
                <p>{image.name}</p>
                <Button
                  type="button"
                  onClick={() => setImage(null)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <p>Drag & drop an image here, or click to select one</p>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={submitting}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CategoryForm;
