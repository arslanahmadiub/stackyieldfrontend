import React from "react";
import ChatScreen from "./ChatScreen";
import { Paper, Grid } from "@material-ui/core";
import logo from "../../Assets/images/logo.png";
import cpu from "../../Assets/images/cpu.png";
import Styled from "styled-components";
import { Hidden } from "@material-ui/core";

const Img = Styled.img`
    height: 110px;
    
    padding:4px;
`;
const ImgNew = Styled.img`
    height: 60px;
    
    padding:4px;
`;
const MobImg = Styled.img`
    height: 70px;
    
    
`;

const Chat = () => {
  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          id="chatScreen"
        >
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* <img src={logo} style={{ width: "40%" }} /> */}
              <Img src={logo} alt="apple" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "4%",
              }}
            >
              <h3>Ai powered recommendation system</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
              }}
            >
              <ImgNew src={cpu} alt="apple" />
            </div>
          </Grid>
          <Grid item xs={8}>
            <Paper elevation={3} variant="outlined" id="chatPaper">
              <ChatScreen />
            </Paper>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MobImg src={logo} alt="apple" />
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} variant="outlined" id="chatPaperMobile">
              <ChatScreen />
            </Paper>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default Chat;
