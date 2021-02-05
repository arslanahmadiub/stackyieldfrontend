import React from "react";
import { Grid } from "@material-ui/core";
import TabScreen from "./TabScreen";
import RecmondadPlatformList from "./RecmondadPlatformList";
import { useSelector } from "react-redux";

const MainRecmondationScreen = () => {
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      style={{ padding: "1%" }}
    >
      <Grid item xs={3} style={{ paddingRight: "10px" }}>
        <RecmondadPlatformList />
      </Grid>
      <Grid item xs={9}>
        <TabScreen />
      </Grid>
    </Grid>
  );
};

export default MainRecmondationScreen;
