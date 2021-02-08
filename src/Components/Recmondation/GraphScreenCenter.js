import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

const GraphScreenCenter = () => {
  const classes = useStyles();
  const profitData = useSelector((state) => state.chatScreen.cryptoData.profit);
  const cryptoDict = useSelector(
    (state) => state.chatScreen.cryptoData.crypto_dict
  );
  const profitDataList = useSelector(
    (state) => state.chatScreen.cryptoData.profit_dict
  );

  let series = [44, 55, 13, 43, 22];
  let options = {
    chart: {
      width: "2000px",
      type: "pie",
    },

    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
  };

  return (
    <>
      <Grid
        container
        direction="column"
        style={{
          paddingTop: "20px",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Change Rate</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {cryptoDict
                    ? Object.keys(cryptoDict)[0].charAt(0).toUpperCase() +
                      Object.keys(cryptoDict)[0].slice(1)
                    : null}
                </TableCell>
                <TableCell>
                  {cryptoDict ? cryptoDict.bitcoin.changerate : null}
                </TableCell>
                <TableCell>
                  {cryptoDict ? cryptoDict.bitcoin.price : null}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan="2"
                  style={{ textAlign: "center", fontSize: "30px" }}
                >
                  Profit List
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>At End Date Profit</TableCell>
                <TableCell>{profitData && "$ " + profitData}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Daily Profit</TableCell>
                <TableCell>
                  {profitDataList && "$ " + profitDataList.daily}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Weekly Profit</TableCell>
                <TableCell>
                  {profitDataList && "$ " + profitDataList.weekly}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monthly Profit</TableCell>
                <TableCell>
                  {profitDataList && "$ " + profitDataList.monthly}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Yearly Profit</TableCell>
                <TableCell>
                  {profitDataList && "$ " + profitDataList.yearly}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default GraphScreenCenter;
