import React from "react";

import logoicon from "../../Assets/images/logoicon2.png";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const CurrencySystem = (props) => {
  let { color, currency, value } = props;
  return (
    <Grid container spacing={1}>
      <Grid item xs={10}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: color ? color : "red",
              borderRadius: "5px",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", marginTop: "-3px", fontWeight: "600" }}
            >
              {currency ? currency : "local Currency"}
            </p>
            <p style={{ fontSize: "14px", fontWeight: "600" }}>
              {value ? value : "$500"}
            </p>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={2}
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      >
        {props.button ? (
          <div>
            <Button
              style={{
                minWidth: "30px",
                minHeight: "30px",
                background: "#19469A",
                borderRadius: "5px",
                padding: "5px",
              }}
              onClick={props.handelClick}
            >
              <img
                src={logoicon}
                style={{ height: "20px", cursor: "pointer" }}
              />
            </Button>
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CurrencySystem;
