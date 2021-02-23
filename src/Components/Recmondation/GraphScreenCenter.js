import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "../../action/currencyAction";
import { makeStyles } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";
import { MainColor, Background } from "../../Colors.json";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  mobileTable: {
    minWidth: 100,
  },
});

const GraphScreenCenter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profitData = useSelector((state) => state.chatScreen.cryptoData.profit);
  const cryptoDict = useSelector(
    (state) => state.chatScreen.cryptoData.crypto_dict
  );
  let history = useHistory();

  const userCryptoData = useSelector(
    (state) => state.chatScreen.userCryptoData.count_crypto
  );

  const profitDataList = useSelector(
    (state) => state.chatScreen.cryptoData.profit_dict
  );

  const [rateSetting, setRateSetting] = useState(null);

  let currencyFunction = () => {
    let currency = Object.keys(cryptoDict)[0];
    let cryptoObject = {
      currency: Object.keys(cryptoDict)[0],
      changeRate: cryptoDict[currency].changerate,
      price: cryptoDict[currency].price,
    };

    setRateSetting(cryptoObject);
  };

  useEffect(() => {
    setCryptoCurrencyName();
  }, [rateSetting]);

  let setCryptoCurrencyName = () => {
    let currency =
      rateSetting &&
      rateSetting.currency.charAt(0).toUpperCase() +
        rateSetting.currency.slice(1);

    if (currency) {
      dispatch(setCurrency(currency + ":" + userCryptoData));
    }
  };

  useEffect(() => {
    if (cryptoDict !== undefined) {
      currencyFunction();
    }
  }, [cryptoDict, profitDataList, profitData]);

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
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.reward_dict
  );
  let handelAgain = () => {
    history.push("/");
  };
  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <Button
          style={{
            background: "#19469A",
            color: "white",
            float: "right",
            marginRight: "10%",
          }}
          onClick={handelAgain}
        >
          Try again with different options
        </Button>

        <Grid
          container
          direction="column"
          style={{
            paddingTop: "20px",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <Grid item>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Cryptocurrency </TableCell>
                    <TableCell>Change Rate / 24 hours</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {rateSetting &&
                        rateSetting.currency.charAt(0).toUpperCase() +
                          rateSetting.currency.slice(1)}
                    </TableCell>
                    <TableCell>
                      {rateSetting && rateSetting.changeRate}
                    </TableCell>
                    <TableCell>{rateSetting && rateSetting.price}</TableCell>
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
                    <TableCell>Profit at End Date </TableCell>
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
        </Grid>
      </Hidden>

      <Hidden only={["md", "lg", "xl"]}>
        <Grid
          container
          direction="column"
          style={{
            paddingTop: "20px",
          }}
        >
          <Grid item xs={12} style={{ padding: "2%" }}>
            <TableContainer component={Paper}>
              <Table className={classes.mobileTable} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Cryptocurrency
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {rateSetting &&
                        rateSetting.currency.charAt(0).toUpperCase() +
                          rateSetting.currency.slice(1)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Change Rate / 24 hours
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {rateSetting && rateSetting.changeRate}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>Price</TableCell>

                    <TableCell style={{ fontSize: "12px" }}>
                      {" "}
                      {rateSetting && rateSetting.price}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Hidden only={["sm", "xs"]}>
              <br />
              <br />
              <br />
            </Hidden>
            <Hidden only={["lg", "md", "xl"]}>
              <Grid
                container
                style={{ marginTop: "20px", paddingLeft: "10px" }}
              >
                <Grid
                  item
                  xs={12}
                  style={{
                    background: Background,
                    width: "100%",

                    height: "30",
                    overflow: "auto",
                  }}
                >
                  <h3
                    style={{
                      background: "#19469A",
                      padding: "10px",
                      color: "white",
                    }}
                  >
                    Recommended Platform
                  </h3>

                  <Paper elevation={0} className="recmondedPlatFormPaper">
                    {cryptoData &&
                      Object.entries(cryptoData).map(([key, value]) => (
                        <div
                          style={{
                            paddingLeft: "25px",
                            paddingTop: "15px",
                            paddingBottom: "5px",
                            overflow: "hidden",
                            borderBottom: "1px solid black",
                          }}
                          key={key}
                        >
                          <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                            {key}
                          </p>
                          <a
                            href={value.Link}
                            target="_blank"
                            style={{
                              fontSize: "1rem",
                              fontWeight: "600",
                              color: MainColor,
                            }}
                          >
                            {value.Link}
                          </a>
                          <p style={{ fontSize: "1rem", fontWeight: "400" }}>
                            Reward: {value.Reward}
                          </p>
                        </div>
                      ))}
                  </Paper>
                </Grid>
              </Grid>
            </Hidden>

            <TableContainer component={Paper}>
              <Table className={classes.mobileTable} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan="2"
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      Profit List
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Profit at End Date{" "}
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {profitData && "$ " + profitData}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Daily Profit
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {profitDataList && "$ " + profitDataList.daily}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Weekly Profit
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {profitDataList && "$ " + profitDataList.weekly}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Monthly Profit
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {profitDataList && "$ " + profitDataList.monthly}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Yearly Profit
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {profitDataList && "$ " + profitDataList.yearly}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default GraphScreenCenter;
