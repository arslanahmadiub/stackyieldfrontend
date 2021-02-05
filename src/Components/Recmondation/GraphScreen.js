import React from "react";
import { Grid } from "@material-ui/core";
import GraphScreenLeft from "./GraphScreenLeft";
import GraphScreenCenter from "./GraphScreenCenter";
import GraphScreenRight from "./GraphScreenRight";
import Switch from "@material-ui/core/Switch";

const GraphScreen = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <Grid container>
        {/* left grid */}
        <Grid item md={3}>
          <GraphScreenLeft />
        </Grid>
        {/* center grid */}
        <Grid item md={5}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <GraphScreenCenter />
        </Grid>
        {/* right grid */}
        <Grid item md={4}>
          <GraphScreenRight />
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          paddingTop: "10px",
          paddingLeft: "20px",
        }}
      >
        <Grid item xs={12} style={{ display: "flex", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <div>
                <p style={{ textAlign: "center", fontWeight: "600" }}>
                  Sell/Reinvest?<br></br>Compound Rewards
                </p>
              </div>
              <div>
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </div>
            </div>
          </div>
          <div style={{ marginRight: "25%" }}>
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
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphScreen;
