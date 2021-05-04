import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import CurrencySystem from "./CurrencySystem";
import randomColor from "randomcolor";
import { useSelector, useDispatch } from "react-redux";
import CustomCircleCrypto from "./CustomCircleCrypto";
import { Hidden } from "@material-ui/core";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { formCryptoApi } from "../../Services/ChatServices";
import moment from "moment";
import { cryptoDataAction } from "../../action/chatScreenAction";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

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

const GraphScreenLeft = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.conversion_dict
  );
  let history = useHistory();

  const cryptoDict = useSelector((state) =>
    state.chatScreen.cryptoData ? state.chatScreen.cryptoData.crypto_dict : null
  );
  const cryptoDictInput = useSelector((state) =>
    state.chatScreen.userCryptoData
      ? state.chatScreen.userCryptoData.count_crypto
      : null
  );

  const [amountText, setAmountText] = useState(null);

  const currencyWithAmount = useSelector((state) => state.currency.currency);

  let covertAmount = () => {
    let currency = Object.keys(cryptoDict)[0];

    let coinPriceWithoutDolor = cryptoDict[currency].price.replace("$", "");
    let coinPriceWithoutComa = coinPriceWithoutDolor.replace(",", "");
    let amount = parseFloat(cryptoDictInput) * parseFloat(coinPriceWithoutComa);

    setAmountText("$" + amount.toFixed(2));
  };
  useEffect(() => {
    if (cryptoDict) {
      covertAmount();
    }
  }, []);
  let handelAgain = () => {
    history.push("/");
  };

  const [endDate, setEndDate] = useState("");
  const [activeButton, setActiveButton] = useState("1D");

  const userCryptoData = useSelector(
    (state) => state.chatScreen.userCryptoData.count_crypto
  );
  let getEndDate = (days) => {
    const today = new Date();

    let nextDate = new Date();
    let finalNext = nextDate.setDate(today.getDate() + days);
    let finalDate = moment(finalNext).format("yyyy-MM-DD");
    setEndDate(finalDate);
  };
  const userCryptoDataFromStore = useSelector(
    (state) => state.chatScreen.userCryptoData
  );
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

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction="column">
        {/* top circle full screen */}

        <Hidden only={["xs", "sm"]}>
          <div style={{ display: "flex", position: "relative" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div style={{ display: "flex", position: "relative" }}>
                <CustomCircleCrypto
                  currency={currencyWithAmount && currencyWithAmount}
                  amount={amountText && amountText}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "1%",
                }}
              >
                <h3>
                  Total <br></br> Investment
                </h3>
              </div>
            </Grid>
          </div>
        </Hidden>

        {/* top circle bottom screen */}

        <Hidden only={["lg", "md", "xl"]}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              width: "100vw",
              justifyContent: "center",
              flexDirection: "column",
              overflowY: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                overflowY: "hidden",
              }}
            >
              <CustomCircleCrypto
                currency={currencyWithAmount && currencyWithAmount}
                amount={amountText && amountText}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "10px",
                overflowY: "hidden",
              }}
            >
              <h2>Total Investment</h2>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <ButtonGroup>
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
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                background: "#19469A",
                color: "white",
                marginTop: "25px",
              }}
              onClick={handelAgain}
            >
              Try again with different options
            </Button>
          </Grid>
        </Hidden>

        <Hidden only={["xs", "sm"]}>
          <Grid container style={{ marginTop: "20px", paddingLeft: "10px" }}>
            <Grid item xs={12}>
              <h3> Conversion Rates</h3>

              <Paper elevation={0} id="conversionRatePaper">
                {cryptoData &&
                  Object.entries(cryptoData).map(([key, value]) => (
                    <CurrencySystem
                      color={randomColor()}
                      key={key}
                      currency={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                    />
                  ))}
              </Paper>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden only={["lg", "md", "xl"]}>
          <Grid container style={{ marginTop: "20px", paddingLeft: "10px" }}>
            <Grid item xs={12}>
              <h3> Conversion Rates</h3>

              <Paper elevation={0} id="conversionRatePaper">
                {cryptoData &&
                  Object.entries(cryptoData).map(([key, value]) => (
                    <CurrencySystem
                      color={randomColor()}
                      key={key}
                      currency={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                    />
                  ))}
              </Paper>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default GraphScreenLeft;
