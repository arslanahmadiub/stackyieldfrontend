import React from "react";
import { Grid } from "@material-ui/core";

const CustomCircle = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="customCircle"></div>
      <div
        style={{
          position: "absolute",
          display: "flex",

          top: 62,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "606", color: "#19469a" }}>
          {props.text}
        </p>
      </div>
    </div>
  );
};

export default CustomCircle;
