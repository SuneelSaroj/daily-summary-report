import React from "react";
import Typography from "@mui/material/Typography";
const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The requested page does not exist.
      </Typography>
    </div>
  );
};

export default PageNotFound;
