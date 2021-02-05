import React from "react";
import ChatScreen from "./ChatScreen";
import { Paper, Grid } from "@material-ui/core";
const Chat = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      id="chatScreen"
    >
      <Grid item xs={4}>
        <h1>Hello Pakistan</h1>
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
