import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getCategories } from "../services/CategoryService";

const DoctorUpdate = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // Add loading state

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://doctor-appointment-webapp-bakend.onrender.com/api/doctors/${id}`
        );
        setName(data.name);
        setAddress(data.address);
        setYearsOfExperience(data.yearsOfExperience);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setAbout(data.about);
        setCategory(data.category);
      } catch (error) {
        console.error("There was an error!", error);
      }
      setLoading(false);
    };

    fetchDoctor();
  }, [id]);

  useState(() => {
    setLoading(true);
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "yearsOfExperience":
        setYearsOfExperience(value);
        break;
      case "startTime":
        setStartTime(value);
        break;
      case "endTime":
        setEndTime(value);
        break;
      case "about":
        setAbout(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("address", address);
    data.append("yearsOfExperience", yearsOfExperience);
    data.append("startTime", startTime);
    data.append("endTime", endTime);
    data.append("about", about);
    data.append("category", category);
    if (image) {
      data.append("image", image);
    }

    try {
      setLoading(true);

      await axios.put(
        `https://doctor-appointment-webapp-bakend.onrender.com/api/doctors/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Backdrop
        open={loading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Doctor
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="yearsOfExperience"
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={yearsOfExperience}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="startTime"
              label="Start Time"
              name="startTime"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={startTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="endTime"
              label="End Time"
              name="endTime"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={endTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="about"
              label="About"
              name="about"
              multiline
              rows={4}
              value={about}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <legend id="category-label">Category</legend>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={category || "smaple"}
                onChange={handleChange}
              >
                {categories.map((cat) => {
                  return (
                    <MenuItem
                      value={cat.name}
                      onClick={() => setCategory(cat)}
                      key={cat._id}
                    >
                      {cat.name}
                    </MenuItem>
                  );
                })}

                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Upload Image
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default DoctorUpdate;
