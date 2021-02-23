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
          textAlign: "center",
        }}
      >
        {currency && currency.length <= 15 ? (
          <p
            style={{
              fontSize: "14px",
              fontWeight: "606",
              color: "#19469a",
              overflow: "auto",
              textAlign: "center",
            }}
          >
            {currency}
          </p>
        ) : currency && currency.length <= 20 ? (
          <p
            style={{
              fontSize: "12px",
              fontWeight: "606",
              color: "#19469a",
              overflow: "auto",
              textAlign: "center",
            }}
          >
            {currency}
          </p>
        ) : currency && currency.length <= 30 ? (
          <p
            style={{
              fontSize: "9px",
              fontWeight: "606",
              color: "#19469a",
              overflow: "auto",
              textAlign: "center",
            }}
          >
            {currency}
          </p>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          height: "100%",
          top: 67,
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: "606",
            color: "#19469a",
            overflow: "auto",
            textAlign: "center",
          }}
        >
          {amount}
        </p>
      </div>
    </div>
  );
};

export default CustomCircleCrypto;
