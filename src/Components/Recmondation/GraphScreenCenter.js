import React, { useState, useEffect } from "react";

import { Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";

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
import { formCryptoApi } from "../../Services/ChatServices";
import moment from "moment";
import { cryptoDataAction } from "../../action/chatScreenAction";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  mobileTable: {
    minWidth: 100,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

const GraphScreenCenter = () => {
  let buttonGroup = {
    border: "1px solid #19469A",
    color: "#19469A",
  };
  let buttonGroupActive = {
    border: "1px solid #19469A",
    color: "white",
    background: "#19469A",
  };
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const profitData = useSelector((state) => state.chatScreen.cryptoData.profit);
  const cryptoDict = useSelector(
    (state) => state.chatScreen.cryptoData.crypto_dict
  );
  let history = useHistory();

  const userCryptoDataFromStore = useSelector(
    (state) => state.chatScreen.userCryptoData
  );

  const [activeButton, setActiveButton] = useState("1D");

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

  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.reward_dict
  );
  let handelAgain = () => {
    history.push("/");
  };

  const [endDate, setEndDate] = useState("");

  let getEndDate = (days) => {
    const today = new Date();

    let nextDate = new Date();
    let finalNext = nextDate.setDate(today.getDate() + days);
    let finalDate = moment(finalNext).format("yyyy-MM-DD");
    setEndDate(finalDate);
  };

  let handelClickInput = (e) => {
    if (e === "1D") {
      getEndDate(1);
      setActiveButton("1D");
    } else if (e === "1W") {
      getEndDate(7);
      setActiveButton("1W");
    } else if (e === "1M") {
      getEndDate(30);
      setActiveButton("1M");
    } else if (e === "3M") {
      getEndDate(90);
      setActiveButton("3M");
    } else if (e === "6M") {
      getEndDate(180);
      setActiveButton("6M");
    } else if (e === "12M") {
      getEndDate(365);
      setActiveButton("12M");
    }
  };

  let getNewCryptoStacking = async () => {
    let apiTwoFormData = new FormData();

    let dataObject = {
      count_crypto: userCryptoDataFromStore.count_crypto,
      end_date: endDate,
      type_crypto: userCryptoDataFromStore.type_crypto,
    };

    let newData = JSON.stringify(dataObject);
    apiTwoFormData.append("data", newData);

    try {
      setLoading(true);

      let { data } = await formCryptoApi(apiTwoFormData);

      setLoading(false);

      dispatch(cryptoDataAction(data));
    } catch (error1) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endDate !== "") {
      getNewCryptoStacking();
    }
  }, [endDate]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Hidden only={["xs", "sm"]}>
        <ButtonGroup
          style={{
            marginLeft: "10%",
          }}
        >
          <Button
            style={activeButton === "1D" ? buttonGroupActive : buttonGroup}
            onClick={() => handelClickInput("1D")}
          >
            1D
          </Button>
          <Button
            style={activeButton === "1W" ? buttonGroupActive : buttonGroup}
            onClick={() => handelClickInput("1W")}
          >
            1W
          </Button>
          <Button
            style={activeButton === "1M" ? buttonGroupActive : buttonGroup}
            onClick={() => handelClickInput("1M")}
          >
            1M
          </Button>
          <Button
            style={activeButton === "3M" ? buttonGroupActive : buttonGroup}
            onClick={() => handelClickInput("3M")}
          >
            3M
          </Button>
          <Button
            style={activeButton === "6M" ? buttonGroupActive : buttonGroup}
            onClick={() => handelClickInput("6M")}
          >
            6M
          </Button>
          <Button
            style={activeButton === "12M" ? buttonGroupActive : buttonGroup}
            onClick={() => handelClickInput("12M")}
          >
            12M
          </Button>
        </ButtonGroup>
        <br />
        <br />

        <Grid
          container
          direction="column"
          style={{
            paddingTop: "20px",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <Button
            style={{
              background: "#19469A",
              color: "white",
            }}
            onClick={handelAgain}
          >
            Try again with different options
          </Button>
          <br />
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
