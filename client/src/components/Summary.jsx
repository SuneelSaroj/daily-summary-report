import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Tables from "./Tables";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ResponsiveAppBar from "./ResonsiveAppBar";
import { Autocomplete } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";

import LinearProgress from "@mui/material/LinearProgress";

import Footer from "./Footer";

// const URL = "http://localhost:3060/str-dl-smry-rpt";
// const URL = "http://172.20.20.66:3050/str-dl-smry-rpt";
const URL = "http://10.60.1.22:3060/str-dl-smry-rpt";

const Summary = () => {
  const [payments, setPayments] = useState([]);
  const [paymentsUnique, setPaymentsUnique] = useState([]);
  // const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [paymentTypes, setPaymentTypes] = useState([]);
  const [startDate, setstartDate] = React.useState();
  const [endDate, setendDate] = React.useState();
  const [loading, setsetLoading] = React.useState(true);

  const [uniqueData, setUniqueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(URL, {
          data: {
            searchTerm: null,
          },
        });
        console.log(response);
        if (response.data.success === true) {
          setsetLoading(false);
          if (response.data.data !== undefined) {
            const newUniqueData = response.data.data.reduce(
              (acc, currentItem) => {
                if (
                  !acc.some(
                    (item) =>
                      item.CustomerID === currentItem.CustomerID &&
                      item.Customer === currentItem.Customer
                  )
                ) {
                  acc.push(currentItem);
                }
                return acc;
              },
              []
            );
            setUniqueData(newUniqueData);
          } else {
            // Handle the case when 'payments' is undefined or an empty array
            // You can set a default value or display an error message
            setUniqueData([]);
          }

          // setPayments(response.data.data);
        } else {
          Swal.fire({
            type: "warning",
            text: "Data Not Found.",
          });
        }

        // console.log(" fetching data:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getData = async () => {
    setsetLoading(true);
    try {
      let formattedStartDate;
      let formattedEndDate;
      if (startDate) {
        formattedStartDate = startDate.format("YYYY-MM-DD");
      }
      if (endDate) {
        formattedEndDate = endDate.format("YYYY-MM-DD");
      }

      // const formattedEndDate = endDate.format("YYYY-MM-DD");
      // console.log("formattedStartDate:", formattedStartDate);
      // console.log("formattedEndDate:", formattedEndDate);
      const response = await axios.post(URL, {
        data: {
          searchTerm: searchTerm,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });

      if (response.data.success === true) {
        setsetLoading(false);
        setPayments([]);
        setPayments(response.data.data);
        console.log("data :", response.data.data);
      } else {
        setPayments([]);
        Swal.fire({
          type: "warning",
          text: "Data Not Found.",
        });
        setsetLoading(false);
      }

      // console.log(" fetching data:", response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const clearData = () => {
    setstartDate(null);
    setendDate(null);
    setSearchTerm(null);
  };

  // useEffect(() => {
  //   if (paymentsUnique !== undefined) {
  //     const newUniqueData = paymentsUnique.reduce((acc, currentItem) => {
  //       if (
  //         !acc.some(
  //           (item) =>
  //             item.CustomerID === currentItem.CustomerID &&
  //             item.Customer === currentItem.Customer
  //         )
  //       ) {
  //         acc.push(currentItem);
  //       }
  //       return acc;
  //     }, []);
  //     setUniqueData(newUniqueData);
  //   } else {
  //     // Handle the case when 'payments' is undefined or an empty array
  //     // You can set a default value or display an error message
  //     setUniqueData([]);
  //   }
  // }, []);

  const exportToExcel = () => {
    // Your existing code to create the Excel file
    if (typeof payments === "undefined") {
      // Handle the case where 'payments' is undefined
      console.error("The 'data' is not found.");
      return;
    }
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const fileName = `Daily_Summary_Report-${formattedDate}.xlsx`;

    const data = payments; // Assuming 'payments' is your array of JSON data

    // Iterate through the data, including the first row

    for (let i = 0; i < data.length; i++) {
      if (data[i].VISA === 0) {
        data[i].VISA = null;
      }
      if (data[i].AMEX === 0) {
        data[i].AMEX = null;
      }
      if (data[i].MASTERCARD === 0) {
        data[i].MASTERCARD = null;
      }
      if (data[i].OTHER === 0) {
        data[i].OTHER = null;
      }
      if (data[i].DISCOVER === 0) {
        data[i].DISCOVER = null;
      }
      const dataLength = data.length;

      if (i > 0) {
        delete data[i].VisaTotal;
        // Delete other fields in a similar manner
        delete data[i].AMEXTotal;
        delete data[i].MastercardTotal;
        delete data[i].OtherTotal;
        delete data[i].DiscoverTotal;
        delete data[i].TotalCheckAmount;
        delete data[i].TotalCashAmount;
        delete data[i].TotalACHAmount;
      }
    }
    // console.log(data);

    const columnsToExport = [
      "Customer",
      "Customer ID",
      "Sales Order",
      "Payment Method",
      "Credit Card #1",
      "CC #1 Amount",
      "CC Auth#1",
      "Last 4 digits of CC#1",
      "Credit Card #2",
      "CC #2 Amount",
      "CC Auth#2",
      "Last 4 digits of CC#2",
      "Credit Card #3",
      "CC #3 Amount",
      "CC Auth#3",
      "Last 4 digits of CC#3",
      "ACH Trace Number",
      "ACH Amount",
      "ACH Total",
      "VISA",
      "VISA Total",
      "AMEX",
      "AMEX Total",
      "MASTERCARD",
      "MASTERCARD Total",
      "DISCOVER",
      "DISCOVER Total",
      "OTHER",
      "OTHER Total",
      "Check Authorization Number",
      "Check Amount",
      "Check Total",
      "Cash Amount",
      "Cash Total",
    ];

    // Mapping object for renaming keys
    const keyMapping = {
      Customer: "Customer",
      "Customer ID": "CustomerID",
      "Sales Order": "SalesOrder",
      "Payment Method": "PaymentMethod",
      "Credit Card #1": "CreditCard1",
      "CC #1 Amount": "CreditCard1Amount",
      "CC Auth#1": "CCAuthorization1",
      "Last 4 digits of CC#1": "Last4digitsofCC1",
      "Credit Card #2": "CreditCard2",
      "CC #2 Amount": "CreditCard2Amount",
      "CC Auth#2": "CCAuthorization2",
      "Last 4 digits of CC#2": "Last4digitsofCC2",
      "Credit Card #3": "CreditCard3",
      "CC #3 Amount": "CreditCard3Amount",
      "CC Auth#3": "CCAuthorization3",
      "Last 4 digits of CC#3": "Last4digitsofCC3",
      "ACH Trace Number": "ACHTrackNo",
      "ACH Amount": "ACHAmount",
      "ACH Total": "TotalACHAmount",
      VISA: "VISA",
      "VISA Total": "VisaTotal",
      AMEX: "AMEX",
      "AMEX Total": "AMEXTotal",
      MASTERCARD: "MASTERCARD",
      "MASTERCARD Total": "MastercardTotal",
      DISCOVER: "DISCOVER",
      "DISCOVER Total": "DiscoverTotal",
      OTHER: "OTHER",
      "OTHER Total": "OtherTotal",
      "Check Authorization Number": "CheckAuthorizationNumber",
      "Check Amount": "CheckAmount",
      "Check Total": "TotalCheckAmount",
      "Cash Amount": "CashAmount",
      "Cash Total": "TotalCashAmount",
    };

    // Assuming data is your provided object
    const newData = data.map((row) => {
      const newRow = {};
      columnsToExport.forEach((columnName) => {
        newRow[columnName] = row[keyMapping[columnName]];
      });
      return newRow;
    });

    // Create a worksheet from your existing 'payments' data
    const ws = XLSX.utils.json_to_sheet(newData);

    // Manually set the row height to simulate text wrapping

    // Set the row height for the header row

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1", true);

    // Save the file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <ResponsiveAppBar />

      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",
        }}>
        <FormControl sx={{ m: 1, width: 2 }}>
          <Autocomplete
            size="small"
            options={uniqueData}
            getOptionLabel={(option) =>
              `${option.CustomerID.trim()}-${option.Customer.trim()}`
            }
            sx={{ width: 300, fontSize: 5 }}
            isOptionEqualToValue={(option, value) =>
              option.CustomerID === (value?.CustomerID ?? "")
            }
            onChange={(event, value) => {
              if (value && value.CustomerID) {
                setSearchTerm(value.CustomerID);
              } else {
                setSearchTerm(null);
              }
            }}
            onInputChange={(event, value) => {
              if (!value) {
                setSearchTerm(null);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer Id"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1 }}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Start Date"
              size="small"
              value={startDate}
              onChange={(newValue) => setstartDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              size="small"
              onChange={(newValue) => setendDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Box
          sx={{
            display: "flex",

            justifyContent: "flex-end",
          }}>
          <Button
            variant="contained"
            sx={{
              mt: 1,
              mr: 2,
              mb: 3,
              ml: "auto",

              backgroundColor: "darkcyan",
              color: "white",
            }}
            onClick={getData}
            startIcon={<SearchIcon />}>
            Search
          </Button>
          <Button
            variant="contained"
            sx={{
              mt: 1,
              mr: 2,
              mb: 3,
              backgroundColor: "darkcyan",
              color: "white",
            }}
            onClick={clearData}
            startIcon={<ClearIcon />}>
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{
              mt: 1,
              mr: 2,
              mb: 3,
              backgroundColor: "darkcyan",
              color: "white",
            }}
            onClick={exportToExcel}
            startIcon={<SaveIcon />}>
            Save
          </Button>
        </Box>
      </Box>
      {!loading ? (
        <Tables payment={payments} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <Footer />
    </div>
  );
};

export default Summary;
