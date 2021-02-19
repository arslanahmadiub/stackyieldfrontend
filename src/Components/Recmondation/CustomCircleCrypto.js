import React from "react";

const CustomCircleCrypto = ({ currency, amount }) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="customCircle"></div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          height: "100%",
          top: 45,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: "606",
            color: "#19469a",
            overflow: "auto",
          }}
        >
          {currency}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          height: "100%",
          top: 67,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: "606",
            color: "#19469a",
            overflow: "auto",
          }}
        >
          {amount}
        </p>
      </div>
    </div>
  );
};

export default CustomCircleCrypto;
