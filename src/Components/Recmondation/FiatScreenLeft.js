import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CurrencySystem from "./CurrencySystem";
import randomColor from "randomcolor";
import { useSelector, useDispatch } from "react-redux";
import { formCryptoApi } from "../../Services/ChatServices";
import { userCryptoDataSaveAction } from "../../action/chatScreenAction";
import { cryptoDataAction } from "../../action/chatScreenAction";
import { changeTabAction } from "../../action/tabAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CustomCircle from "./CustomCircle";
import { Hidden } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

const FiatScreenLeft = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.conversion_dict
  );

  const fiatDate = useSelector(
    (state) =>
      state.chatScreen.userFiatData && state.chatScreen.userFiatData.end_date
  );

  const fiatConversionDict = useSelector(
    (state) =>
      !Array.isArray(state.chatScreen.fiatData) &&
      state.chatScreen.fiatData.recommended_fiat_dict.converted_cryptos
  );

  const fiatChangeRate = useSelector(
    (state) =>
      state.chatScreen.fiatData &&
      state.chatScreen.fiatData.recommended_fiat_dict.changerate_cryptos
  );

  const fiatAmount = useSelector(
    (state) =>
      state.chatScreen.userFiatData && state.chatScreen.userFiatData.count_fiat
  );

  const cryptoDict = useSelector((state) =>
    state.chatScreen.cryptoData ? state.chatScreen.cryptoData.crypto_dict : null
  );
  const cryptoDictInput = useSelector((state) =>
    state.chatScreen.userCryptoData
      ? state.chatScreen.userCryptoData.count_crypto
      : null
  );

  const [amountText, setAmountText] = useState(null);
  let history = useHistory();

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

  let secondApi = async (t, c) => {
    let apiTwoFormData = new FormData();
    let formCryptoData = {
      type_crypto: t,
      count_crypto: c.toString(),
      end_date: fiatDate && fiatDate,
    };
    let newData = JSON.stringify(formCryptoData);
    apiTwoFormData.append("data", newData);
    try {
      setLoading(true);
      let { data } = await formCryptoApi(apiTwoFormData);

      if (
        data.conversion_dict === "Cryptocurrency not availbale" ||
        data.conversion_dict === "Invalid end date"
      ) {
        setLoading(false);

        emailToast();
      } else {
        dispatch(userCryptoDataSaveAction(formCryptoData));
        setLoading(false);
        dispatch(cryptoDataAction(data));
        dispatch(changeTabAction(0));
      }
    } catch (error1) {
      setLoading(false);
    }
  };

  let conversionClick = (v, k) => {
    secondApi(k, v);
  };

  const emailToast = () => {
    toast.error("Cryptocurrency not availbale..", {
      position: "top-right",
      autoClose: 5000,
      draggable: false,
    });
  };

  let handelAgain = () => {
    history.push("/");
  };
  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />

      <Grid container direction="column">
        {/* top circle full screen */}

        <Hidden only={["xs", "sm"]}>
          <div style={{ display: "flex", position: "relative" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div style={{ display: "flex", position: "relative" }}>
                <CustomCircle text={fiatAmount && "$" + fiatAmount} />
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
              <CustomCircle text={fiatAmount && "$" + fiatAmount} />
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
                {fiatConversionDict &&
                  Object.entries(fiatConversionDict).map(([key, value]) => (
                    <CurrencySystem
                      color={randomColor()}
                      key={key}
                      currency={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                      button={true}
                      handelClick={() => {
                        conversionClick(value, key);
                      }}
                    />
                  ))}
              </Paper>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden only={["lg", "md", "xl"]}>
          <Grid container style={{ marginTop: "20px", padding: "10px" }}>
            <Grid item xs={12}>
              <h3> Conversion Rates</h3>

              <Paper elevation={0} id="conversionRatePaper">
                {fiatConversionDict &&
                  Object.entries(fiatConversionDict).map(([key, value]) => (
                    <CurrencySystem
                      color={randomColor()}
                      key={key}
                      currency={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                      button={true}
                      handelClick={() => {
                        conversionClick(value, key);
                      }}
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

export default FiatScreenLeft;
