import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { MainColor, Background } from "../../Colors.json";
import { useSelector } from "react-redux";

const RecmondadPlatformList = () => {
  const cryptoData = useSelector(
    (state) => state.chatScreen.cryptoData.reward_dict
  );

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
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
        <p style={{ fontSize: "20px", color: "white", padding: "25px" }}>
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
        <Paper elevation={0} id="recmondedPlatFormPaper">
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
                <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>{key}</p>
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
  );
};

export default RecmondadPlatformList;
