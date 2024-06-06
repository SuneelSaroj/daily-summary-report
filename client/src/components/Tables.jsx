import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NoDataFound from "./NoDataFound";

const oddRowStyle = {
  backgroundColor: "#F0F0F0", // Background color for odd rows
};

const evenRowStyle = {
  backgroundColor: "#FFFFFF", // Background color for even rows
};

const cellStyle = {
  whiteSpace: "nowrap", // Prevent text from wrapping
  overflow: "hidden", // Hide overflowing content
  textOverflow: "ellipsis", // Add ellipsis (...) for overflowing text
};
const formatNumberWithCommas = (number) => {
  if (number !== null) {
    return number.toLocaleString();
  }
  return null;
};

const tableContainerStyle = {
  maxHeight: "400px",
  overflowY: "auto",
};
export default function Tables(props) {
  const rows = props.payment;
  // console.log(rows);
  if (rows !== null || rows[0] !== null) {
    return (
      <TableContainer
        component={Paper}
        style={{ maxHeight: "550px", overflowY: "auto" }}>
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          size="small"
          aria-label="customized table">
          <TableHead
            sx={{
              "& th": {
                // color: "white",
                // backgroundColor: "#282d3c",
                color: "black",
                backgroundColor: "#d2e0e8",
                fontWeight: "bold",
                fontSize: 14,
              },
            }}>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="left" style={cellStyle}>
                Sales Order
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                Payment Method
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                Credit Card #1
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                CC #1 Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                CC Auth#1
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                Last 4 digits of CC#1
              </TableCell>

              <TableCell align="left" style={cellStyle}>
                Credit Card #2
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                CC #2 Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                CC Auth#2
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                Last 4 digits of CC#2
              </TableCell>

              <TableCell align="left" style={cellStyle}>
                Credit Card #3
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                CC #3 Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                CC Auth#3
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                Last 4 digits of CC#3
              </TableCell>

              <TableCell align="right" style={cellStyle}>
                ACH Trace Number
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                ACH Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                VISA Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                MASTERCARD Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                AMEX Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                DISCOVER Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                OTHER Amount
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                Check Auth #
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                Check Amount
              </TableCell>

              <TableCell align="right" style={cellStyle}>
                Cash Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                key={row.SalesOrder}
                style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <TableCell component="th" scope="row" style={cellStyle}>
                  {row.CustomerID}- {row.Customer}
                </TableCell>

                <TableCell align="left" style={cellStyle}>
                  {row.SalesOrder}
                </TableCell>
                <TableCell align="left">{row.PaymentMethod}</TableCell>

                <TableCell align="left">{row.CreditCard1}</TableCell>

                <TableCell align="right">
                  {!isNaN(parseFloat(row?.CreditCard1Amount))
                    ? parseFloat(row?.CreditCard1Amount).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 3,
                        }
                      )
                    : ""}
                </TableCell>

                <TableCell align="right">{row.CCAuthorization1}</TableCell>
                <TableCell align="right">{row.Last4digitsofCC1}</TableCell>

                <TableCell align="left">{row.CreditCard2}</TableCell>
                <TableCell align="right">
                  {!isNaN(parseFloat(row?.CreditCard2Amount))
                    ? parseFloat(row?.CreditCard2Amount).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 3,
                        }
                      )
                    : ""}
                </TableCell>
                <TableCell align="right">{row.CCAuthorization2}</TableCell>
                <TableCell align="right">{row.Last4digitsofCC2}</TableCell>

                <TableCell align="left">{row.CreditCard3}</TableCell>
                <TableCell align="right">
                  {!isNaN(parseFloat(row?.CreditCard3Amount))
                    ? parseFloat(row?.CreditCard3Amount).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 3,
                        }
                      )
                    : ""}
                </TableCell>
                <TableCell align="right">{row.CCAuthorization3}</TableCell>
                <TableCell align="right">{row.Last4digitsofCC3}</TableCell>

                <TableCell align="right">{row.ACHTrackNo}</TableCell>
                <TableCell align="right">
                  {!isNaN(parseFloat(row?.ACHAmount))
                    ? parseFloat(row?.ACHAmount).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>
                <TableCell align="right">
                  {row?.VISA !== 0 && !isNaN(parseFloat(row?.VISA))
                    ? parseFloat(row?.VISA).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>

                <TableCell align="right">
                  {row?.MASTERCARD !== 0 && !isNaN(parseFloat(row?.MASTERCARD))
                    ? parseFloat(row?.MASTERCARD).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>
                <TableCell align="right">
                  {row?.AMEX !== 0 && !isNaN(parseFloat(row?.AMEX))
                    ? parseFloat(row?.AMEX).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>
                <TableCell align="right">
                  {row?.DISCOVER !== 0 && !isNaN(parseFloat(row?.DISCOVER))
                    ? parseFloat(row?.DISCOVER).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>
                <TableCell align="right">
                  {row?.OTHER !== 0 && !isNaN(parseFloat(row?.OTHER))
                    ? parseFloat(row?.OTHER).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>

                <TableCell align="right">
                  {row.CheckAuthorizationNumber}
                </TableCell>
                <TableCell align="right">
                  {!isNaN(parseFloat(row?.CheckAmount))
                    ? parseFloat(row?.CheckAmount).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>

                <TableCell align="right">
                  {!isNaN(parseFloat(row?.CashAmount))
                    ? parseFloat(row?.CashAmount).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3,
                      })
                    : ""}
                </TableCell>
              </TableRow>
            ))}

            <TableRow
              sx={{
                color: "white",
                backgroundColor: "#DDDDDD",
                fontWeight: "bold",
                fontSize: 13,
              }}>
              <TableCell align="left" style={cellStyle}>
                <span style={{ fontWeight: "bold" }}>Total Amount</span>
              </TableCell>

              <TableCell align="right" colSpan={16}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].TotalACHAmount !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.TotalACHAmount))
                          ? parseFloat(rows[0]?.TotalACHAmount).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 3,
                              }
                            )
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
              <TableCell align="right" colSpan={1}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].VisaTotal !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.VisaTotal))
                          ? parseFloat(rows[0]?.VisaTotal).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 3,
                              }
                            )
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
              <TableCell align="right" colSpan={1}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].MastercardTotal !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.MastercardTotal))
                          ? parseFloat(rows[0]?.MastercardTotal).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 3,
                              }
                            )
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
              <TableCell align="right" colSpan={1}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].AMEXTotal !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.AMEXTotal))
                          ? parseFloat(rows[0]?.AMEXTotal).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 3,
                              }
                            )
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
              <TableCell align="right" colSpan={1}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].DiscoverTotal !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.DiscoverTotal))
                          ? parseFloat(rows[0]?.DiscoverTotal).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 3,
                              }
                            )
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
              <TableCell align="right" colSpan={1}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].OtherTotal !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.OtherTotal))
                          ? parseFloat(rows[0]?.OtherTotal).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 3,
                              }
                            )
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
              <TableCell align="right" colSpan={2}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].TotalCheckAmount !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.TotalCheckAmount))
                          ? parseFloat(
                              rows[0]?.TotalCheckAmount
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 3,
                            })
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
              <TableCell align="right" colSpan={1}>
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].TotalCashAmount !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.TotalCashAmount))
                          ? parseFloat(rows[0]?.TotalCashAmount).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 3,
                              }
                            )
                          : ""
                      }`
                    : 0}
                </span>
              </TableCell>
            </TableRow>
            {/* <TableRow
              sx={{
                backgroundColor: "#DDDDDD",
              }}
            >
              <TableCell align="left" colSpan={13} style={cellStyle}>
                <span style={{ fontWeight: "bold" }}>Total Check Amount</span>
              </TableCell>
              <TableCell s align="right">
                <span style={{ fontWeight: "bold" }}>
                  {rows && rows[0] && rows[0].TotalCkeckAmount !== null
                    ? `${
                        !isNaN(parseFloat(rows[0]?.TotalCheckAmount))
                          ? parseFloat(
                              rows[0]?.TotalCheckAmount
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ""
                      }`
                    : null}
                </span>
              </TableCell>
              <TableCell align="right" />
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <NoDataFound />;
  }
}
