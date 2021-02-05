import React from "react";

const CurrencySystemRound = (props) => {
  let { color, currency, value } = props;
  return (
    <div
      style={{
        display: "flex",
        marginTop: "10px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          background: color ? color : "red",
          borderRadius: "50px",
        }}
      ></div>
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}
      >
        <p style={{ fontSize: "14px", marginTop: "-3px", fontWeight: "600" }}>
          {currency ? currency : "local Currency"}
        </p>
        <p style={{ fontSize: "18px", fontWeight: "600" }}>
          {value ? value : "$500"}
        </p>
      </div>
    </div>
  );
};

export default CurrencySystemRound;
