import React from "react";
import ChatScreen from "./ChatScreen";
import { Paper, Grid } from "@material-ui/core";
import logo from "../../Assets/images/logo.png";
import cpu from "../../Assets/images/cpu.png";
const Chat = () => {
  return (
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
          <img src={logo} style={{ width: "40%" }} />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}
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
          <img src={cpu} style={{ width: "15%" }} />
        </div>
      </Grid>
      <Grid item xs={8}>
        <Paper elevation={3} variant="outlined" id="chatPaper">
          <ChatScreen />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
