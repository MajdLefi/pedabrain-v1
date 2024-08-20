"use client";
import * as React from 'react';
import { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Box, Button, Typography, Tabs, Tab } from "@mui/material";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTab(props: { image: string, label?: string, index: number, selected: boolean }) {
  const { image, label, index, selected, ...other } = props;

  return (
    <Tab
      sx={{
        '&.Mui-selected': { borderBottom: 'none', boxShadow: 'none' },
      }}
      icon={
        <Box
          sx={{
            '&.Mui-selected': {
              borderBottom: 'none',
              boxShadow: 'none',
            },
            width: { xs: '165px', sm: "225px", lg: "236px" },
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "7px",
            backgroundColor: selected ? '#F2F2F2' : 'transparent',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.17)',
          }}
        >
          <Box component="img" src={image} alt={`tab icon ${index}`} sx={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Box>
      }
      label={label}
      {...a11yProps(index)}
      {...other}
    />
  );
}

export default function ContactForm() {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({ fullName: "", email: '', message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/dima", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setIsModalOpen(true); // Open the modal
        setFormData({ fullName: "", email: '', message: "" }); // Clear the form
      } else {
        console.error("Error submitting form:", response);
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <Box sx={{ borderRadius: "25px" }}>
      <Box sx={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ mb: "25px" }}>
            <Typography
              sx={{
                fontSize: "26px",
                fontWeight: "600",
                lineHeight: "40px",
                color: "primary.light",
              }}
            >
              N'hésitez pas à nous contacter !
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "14px",
                color: "black",
              }}
            >
              Nous sommes là pour vous écouter.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ "& > :not(style)": { width: "100%" } }}>
            <Box>
              <TextField
                onChange={handleChange}
                name="fullName"
                value={formData.fullName}
                required
                sx={{ width: "100%", mb: "12px" }}
                id="outlined-basic"
                label="Prénom et nom"
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                onChange={handleChange}
                name="email"
                value={formData.email}
                required
                sx={{ width: "100%", mb: "12px" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                onChange={handleChange}
                name="sujet"
                value={formData.email}
                required
                sx={{ width: "100%", mb: "12px" }}
                id="outlined-basic"
                label="Sujet"
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                onChange={handleChange}
                name="message"
                value={formData.message}
                required
                multiline
                rows={4}
                sx={{ width: "100%", mb: "12px" }}
                id="outlined-basic"
                label="Message"
                variant="outlined"
              />
            </Box>
          
          </Box>
          <Button
              type="submit"
              sx={{ backgroundColor: "primary.light", width:"150px" }}
              variant="contained"
            >
              Envoyer
            </Button>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ mb: "25px" }}>
            <Typography
              sx={{
                fontSize: "26px",
                fontWeight: "600",
                lineHeight: "40px",
                color: "primary.main",
              }}
            >
              N'hésitez pas à nous contacter !
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "14px",
                color: "black",
              }}
            >
              Nous sommes là pour vous écouter.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ "& > :not(style)": { width: "100%" } }}>
            <Box>
              <TextField
                onChange={handleChange}
                name="fullName"
                value={formData.fullName}
                required
                sx={{ width: "100%", mb: "12px" }}
                id="outlined-basic"
                label="Prénom et nom"
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                onChange={handleChange}
                name="email"
                type='email'
                value={formData.email}
                required
                sx={{ width: "100%", mb: "12px" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                onChange={handleChange}
                name="message"
                value={formData.message}
                required
                multiline
                rows={4}
                sx={{ width: "100%", mb: "12px" }}
                id="outlined-basic"
                label="Message"
                variant="outlined"
              />
            </Box>
            <Button
              type="submit"
              sx={{ backgroundColor: "primary.light" }}
              variant="contained"
            >
              Envoyer
            </Button>
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
