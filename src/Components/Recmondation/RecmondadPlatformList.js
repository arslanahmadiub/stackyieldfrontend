import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { MainColor, Background } from "../../Colors.json";
import { useSelector } from "react-redux";
import CurrencySystem from "./CurrencySystem";
import randomColor from "randomcolor";
import { Hidden } from "@material-ui/core";

const RecmondadPlatformList = () => {
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.reward_dict
  );
  const tabName = useSelector((state) => state.tab.tabNumber);
  const fiatPriceDict = useSelector(
    (state) =>
      !Array.isArray(state.chatScreen.fiatData) &&
      state.chatScreen.fiatData.recommended_fiat_dict.price_dict
  );

  const fiatChangeRate = useSelector(
    (state) =>
      !Array.isArray(state.chatScreen.fiatData) &&
      state.chatScreen.fiatData.recommended_fiat_dict.changerate_cryptos
  );

  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <Grid container>
          {tabName === "Crypto" ? (
            <>
              <Grid
                item
                xs={12}
                style={{
                  background: MainColor,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{ fontSize: "20px", color: "white", padding: "25px" }}
                >
                  Recommended Platform
                </p>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  background: Background,
                  width: "100%",

                  height: "80vh",
                  overflow: "auto",
                }}
              >
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
            </>
          ) : (
            <>
              <Grid
                item
                xs={12}
                style={{
                  background: MainColor,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{ fontSize: "16px", color: "white", padding: "12px" }}
                >
                  Price
                </p>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  background: Background,
                  width: "100%",

                  height: "38vh",
                  overflow: "auto",
                }}
              >
                <Paper elevation={0} className="recmondedPlatFormPaper">
                  {fiatPriceDict &&
                    Object.entries(fiatPriceDict).map(([key, value]) => (
                      <CurrencySystem
                        color={randomColor()}
                        key={key}
                        currency={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                      />
                    ))}
                </Paper>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  background: MainColor,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{ fontSize: "16px", color: "white", padding: "12px" }}
                >
                  Change rate per 24 hours
                </p>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  background: Background,
                  width: "100%",

                  height: "38vh",
                  overflow: "auto",
                }}
              >
                <Paper elevation={0} className="recmondedPlatFormPaper">
                  {fiatChangeRate &&
                    Object.entries(fiatChangeRate).map(([key, value]) => (
                      <CurrencySystem
                        color={randomColor()}
                        key={key}
                        currency={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                      />
                    ))}
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </Hidden>
    </>
  );
};

export default RecmondadPlatformList;
