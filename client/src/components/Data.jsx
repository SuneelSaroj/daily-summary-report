import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import Summary from "./Summary";

const Data = () => {
  //   const params = useParams();
  //   const { p } = params;
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch data for the specific image using the index
    axios
      .get(`http://localhost:3001/users`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        console.log(response.data[0]);
        // console.log(users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return loading ? <h1>Loading</h1> : <Summary users={users} />;
};

export default Data;
