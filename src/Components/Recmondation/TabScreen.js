import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import GraphScreen from "./GraphScreen";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core";
import { formCryptoApi } from "../../Services/ChatServices";

import { cryptoDataAction } from "../../action/chatScreenAction";

import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

const TabScreen = (props) => {
  const dispatch = useDispatch();
  const userCryptoDataFromStore = useSelector(
    (state) => state.chatScreen.userCryptoData
  );

  const [showDateInput, setShowDateInput] = useState(false);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getShow();
  }, [props.dateShow]);

  let getShow = (value) => {
    setShowDateInput(value);
  };
  let handelDayClick = async (e) => {
    let endDate = moment(e).format("yyyy-MM-DD");

    let apiTwoFormData = new FormData();

    let dataObject = {
      count_crypto: userCryptoDataFromStore.count_crypto,
      end_date: endDate,
      type_crypto: userCryptoDataFromStore.type_crypto,
    };

    let newData = JSON.stringify(dataObject);
    apiTwoFormData.append("data", newData);

    try {
      setLoading(true);

      let { data } = await formCryptoApi(apiTwoFormData);

      setLoading(false);

      dispatch(cryptoDataAction(data));
    } catch (error1) {
      console.log(error1);
      setLoading(false);
    }

    setShowDateInput(false);
  };
  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Tabs
        headers={[""]}
        dateShow={(value) => {
          getShow(value);
        }}
      >
        <GraphScreen />

        <h1>Hello 1 Week</h1>
      </Tabs>
      <div
        style={{
          position: "absolute",
          top: "10%",
          display: showDateInput ? "block" : "none",
        }}
      >
        <Calendar
          onClickDay={handelDayClick}
          // value={value}
          minDate={new Date()}
        />
      </div>
    </>
  );
};

export default TabScreen;
