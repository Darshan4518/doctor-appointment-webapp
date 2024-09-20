import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Skeleton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { getCategories } from "../services/CategoryService";

const HospitalForm = ({ fetchHospitals }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [images, setImages] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [submitting, setSubmitting] = useState(false); // Add submitting state

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start submitting

    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("isPremium", isPremium);
    formData.append("email", email); // Add email to formData
    selectedCategories.forEach((category) => {
      formData.append("category", category);
    });
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      await axios.post(
        "https://doctor-appointment-webapp-bakend.onrender.com/api/hospitals/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setWebsite("");
      setPhoneNumber("");
      setAddress("");
      setDescription("");
      setSelectedCategories([]);
      setIsPremium(false);
      setImages([]);
      setEmail("");
      setSubmitting(false); // Finish submitting
      if (fetchHospitals) fetchHospitals();
    } catch (error) {
      console.error("Error uploading hospital:", error);
      setSubmitting(false); // Finish submitting on error
    }
  };

  return (
    <div className="flex justify-center items-center h-[100%]">
      <Backdrop
        open={submitting || loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form
        onSubmit={handleSubmit}
        className="p-4 border border-gray-300 rounded-lg"
      >
        <div className="mb-4">
          <TextField
            label="Hospital Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Hospital Website"
            variant="outlined"
            fullWidth
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Hospital Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Hospital Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <TextareaAutosize
            aria-label="Hospital Description"
            minRows={4}
            placeholder="Hospital Description"
            style={{ width: "100%", padding: "10px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            {loading ? (
              <Skeleton variant="rectangular" height={56} />
            ) : (
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Category" />}
                renderValue={(selected) =>
                  selected
                    .map(
                      (value) =>
                        categories.find((cat) => cat.name === value)?.name || ""
                    )
                    .join(", ")
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    <Checkbox
                      checked={selectedCategories.indexOf(cat.name) > -1}
                    />
                    <ListItemText primary={cat.name} />
                  </MenuItem>
                ))}
              </Select>
            )}
            <FormHelperText>Select one or more categories</FormHelperText>
          </FormControl>
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <legend>Is Premium</legend>
            <Select
              value={isPremium}
              onChange={(e) => setIsPremium(e.target.value)}
              required
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Select if the hospital is premium</FormHelperText>
          </FormControl>
        </div>
        <div className="mb-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div
          {...getRootProps({
            className: "border-2 border-dashed p-4 mb-4 cursor-pointer",
          })}
        >
          <input {...getInputProps()} />
          {images.length > 0 ? (
            <div>
              {images.map((image, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{image.name}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Drag & drop images here, or click to select them</p>
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
  );
};

export default HospitalForm;
