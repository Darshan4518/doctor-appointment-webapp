import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { getHospital } from "../services/HospitalService";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { getCategories } from "../services/CategoryService";

const HospitalUpdatePage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const data = await getHospital(id);
        setHospital(data);
        setName(data.name);
        setWebsite(data.website);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setDescription(data.description);
        setSelectedCategories(data.category);
        setIsPremium(data.isPremium);
        setImages(data.images);
        setEmail(data.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital:", error);
      }
    };
    fetchHospital();
  }, [id]);

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("isPremium", isPremium);
    formData.append("email", email);
    selectedCategories.forEach((category) => {
      formData.append("category", category);
    });
    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images`, image);
      }
    });

    try {
      await axios.put(
        `https://doctor-appointment-webapp-bakend.onrender.com/api/hospitals/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Redirect or update state after successful update
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h4 className="text-center mb-4">Update Hospital</h4>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="p-4 border border-gray-300 rounded-lg">
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
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  multiple
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label="Category" />}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (value) =>
                          categories.find((cat) => cat.name === value)?.name ||
                          ""
                      )
                      .join(", ")
                  }
                >
                  {categories?.map((cat) => (
                    <MenuItem key={cat._id} value={cat.name}>
                      <Checkbox
                        checked={selectedCategories.indexOf(cat.name) > -1}
                      />
                      <ListItemText primary={cat.name} />
                    </MenuItem>
                  ))}
                </Select>

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
                <FormHelperText>
                  Select if the hospital is premium
                </FormHelperText>
              </FormControl>
            </div>
            <div className="mb-4">
              {hospital?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={hospital.name}
                  width="100"
                  className="mt-4 mb-4"
                />
              ))}
            </div>
            <div>
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HospitalUpdatePage;
