import React from "react";
import { Grid, Paper } from "@material-ui/core";
import GraphScreenLeft from "./GraphScreenLeft";
import GraphScreenCenter from "./GraphScreenCenter";

import { Hidden } from "@material-ui/core";
import randomColor from "randomcolor";
import { useSelector } from "react-redux";
import CurrencySystem from "./CurrencySystem";
import { MainColor, Background } from "../../Colors.json";

const GraphScreen = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.reward_dict
  );

  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",

          overflowY: "hidden",
        }}
      >
        {/* left grid */}
        <Grid item md={3} xs={12}>
          <GraphScreenLeft />
        </Grid>
        {/* center grid */}
        <Grid item md={9} xs={12}>
          <GraphScreenCenter />
        </Grid>

        <Hidden only={["sm", "xs"]}>
          <Grid
            item
            style={{
              paddingLeft: "50px",
              paddingRight: "200px",
              paddingTop: "50px",
              paddingBottom: "50px",
            }}
          >
            <p
              style={{
                textAlign: "justify",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              The Effective earnings depend on ay dynamic variables. Even the
              presented results are based on proprietary predication formulas.
              We do not guarantee any kind of earning. Please read our
              <span style={{ color: "red" }}> Disclaimer</span> for further
              information.
            </p>
          </Grid>
        </Hidden>

        <Hidden only={["md", "lg", "xl"]}>
          <Grid
            item
            style={{
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingTop: "5%",
              paddingBottom: "10%",
            }}
          >
            <p
              style={{
                textAlign: "justify",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              The Effective earnings depend on ay dynamic variables. Even the
              presented results are based on proprietary predication formulas.
              We do not guarantee any kind of earning. Please read our
              <span style={{ color: "red" }}> Disclaimer</span> for further
              information.
            </p>
          </Grid>
        </Hidden>
        <Hidden only={["lg", "md", "xl"]}>
          <Grid container style={{ marginTop: "20px", paddingLeft: "10px" }}>
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
              <h3> Recommended Platform</h3>

              <Paper elevation={0} className="recmondedPlatFormPaper">
                {cryptoData &&
                  Object.entries(cryptoData).map(([key, value]) => (
                    <div
                      style={{
                        paddingLeft: "25px",
                        paddingTop: "15px",
                        paddingBottom: "5px",
                        overflow: "hidden",
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
      </Grid>
    </>
  );
};

export default GraphScreen;
