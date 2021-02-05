import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import GraphScreen from "./GraphScreen";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TabScreen = (props) => {
  const [value, onChange] = useState(new Date());
  const [showDateInput, setShowDateInput] = useState(false);

  useEffect(() => {
    getShow();
  }, [props.dateShow]);

  let getShow = (value) => {
    setShowDateInput(value);
  };
  return (
    <>
      <Tabs
        headers={["1 Day", "1 Week", "1 Month", "1 Year"]}
        dateShow={(value) => {
          getShow(value);
        }}
      >
        <GraphScreen />
        {/* <GraphScreen />
      <GraphScreen />
      <GraphScreen /> */}
        <h1>Hello 1 Week</h1>
        <h1>Hello 1 Month</h1>
        <h1>Hello 1 Year</h1>
        {/* <GraphScreen />
      <GraphScreen /> */}
      </Tabs>
      <div
        style={{
          position: "absolute",
          top: "10%",
          display: showDateInput ? "block" : "none",
        }}
      >
        <Calendar onChange={onChange} value={value} />
      </div>
    </>
  );
};

export default TabScreen;
