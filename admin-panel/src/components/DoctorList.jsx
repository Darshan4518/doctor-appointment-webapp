import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { getDoctors } from "../services/DoctorService";

const DoctorList = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://doctor-appointment-webapp-bakend.onrender.com/api/doctors/${id}`
      );
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== id)
      );
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctor List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Years of Experience</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>About</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors?.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.address}</TableCell>
                  <TableCell>{doctor.yearsOfExperience}</TableCell>
                  <TableCell>{doctor.startTime}</TableCell>
                  <TableCell>{doctor.endTime}</TableCell>
                  <TableCell>{doctor.about}</TableCell>
                  <TableCell>{doctor.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        navigate(`/doctors/update/${doctor._id}`);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: "8px" }}
                      onClick={() => handleDelete(doctor._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default DoctorList;
