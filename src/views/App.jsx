import React from "react";
import Box from "@mui/material/Box";
import ButtonBases from "../components/ButtonBases";

const images = [
  {
    url: "/images/buttons/bird.jpg",
    href: "/landing",
    title: "Find a Tree",
    width: "60%"
  },
  {
    url: "/images/buttons/tree2.JPG",
    href: "/id/0",
    title: "Build a Tree",
    width: "40%"
  }
];

export default function App() {
  return (
    <>
      <Box
        sx={{
          background: "repeat-x url('/images/background01.jpg')",
          display: "flex",
          flexWrap: "wrap",
          minWidth: 300,
          width: "100%",
          boxShadow: 3
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            border: "1px solid #edebeb",
            padding: "10%",
            margin: "5%"
          }}
        >
        <h3>
          Build family tree with friends and family for FREE. Enjoy this beta
          version. User control is disabled, you have access to most features.
          If you have any suggestion please contact me in the contact section.
          </h3>
        </Box>
        <ButtonBases Images={images}/>
      </Box>
    </>
  );
}
