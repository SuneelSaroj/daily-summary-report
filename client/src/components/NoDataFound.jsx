// NoDataFound.js
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NoDataFound = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 4,
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" color="textPrimary">
        No Data Found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Sorry, but there is no data to display.
      </Typography>
    </Box>
  );
};

export default NoDataFound;
