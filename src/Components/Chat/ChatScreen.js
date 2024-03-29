import React, { useState, useEffect } from "react";
import { Paper, Grid, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { animateScroll } from "react-scroll";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { cryptoDataAction } from "../../action/chatScreenAction";
import { fiatDataAction } from "../../action/chatScreenAction";
import { userCryptoDataSaveAction } from "../../action/chatScreenAction";
import { userFiatDataSaveAction } from "../../action/chatScreenAction";
import { formFiatApi } from "../../Services/ChatServices";
import { formCryptoApi } from "../../Services/ChatServices";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { resetUser } from "../../action/chatScreenAction";
import Alert from "@material-ui/lab/Alert";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
}));

const ChatScreen = () => {
  const [showDateBox, setShowDateBox] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const classes = useStyles();

  let history = useHistory();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  let handelDayClick = (e) => {
    let endDate = moment(e).format("yyyy-MM-DD");
    setDateValue(endDate);
    setShowDateBox(false);
  };

  const [error, setError] = useState(null);
  useEffect(() => {
    dispatch(resetUser());
  }, []);

  const [tomorrowDate, setTomorrowDate] = useState("");

  let getTomorrow = () => {
    const today = new Date();

    let tomorrow = new Date();
    let tomorrowDate = tomorrow.setDate(today.getDate() + 1);
    let finalDate = moment(tomorrowDate).format("yyyy-MM-DD");
    setTomorrowDate(finalDate);
  };

  useEffect(() => {
    getTomorrow();
  }, []);

  let questionList = [
    {
      type: "system",

      message: "Do you want to stake a cryptocurrency?",
    },
    {
      type: "system",

      message: "Which cryptocurrency do you want to stake?",
    },
    {
      type: "system",

      message: "How much of this cryptocurrency do you want to stake?",
    },
    {
      type: "system",

      message: "Do you also want to invest in fiat money?",
    },
    {
      type: "system",

      message: "How much fiat money in dollars you have?",
    },
  ];

  let [messages, setMessages] = useState([
    {
      type: "system",
      ansType: "bol",
      message: "Do you own a cryptocurrency?",
    },
  ]);

  const [firstAnswer, setFirstAnswer] = useState(null);

  const [messageInput, setMessageInput] = useState("");

  let handelReload = () => {
    setError(null);
    setMessages([
      {
        type: "system",
        ansType: "bol",
        message: "Do you own a cryptocurrency?",
      },
    ]);
    setFirstAnswer(null);
    setMessageInput("");
  };

  let renderAnswer = () => {
    switch (messages.length) {
      case 1:
        return boleanQuestionAnswerComponent();

      case 3:
        return textQuestionAnswerComponent("Enter Crypto Currency Name...");

      case 5:
        return textQuestionAnswerComponent(
          "Enter Amount of cryptocurrency",
          "number"
        );

      case 7:
        return boleanQuestionAnswerComponent();

      case 9:
        return textQuestionAnswerComponent(
          "Enter Fiat Money in USD...",
          "number"
        );
      case 10:
        return submitAnswerComponent();

      default:
        return goodBy();
    }
  };

  let updateScroll = () => {
    var element = document.getElementById("inSidePaperMobile");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  let boleanQuestionAnswerComponent = () => {
    return (
      <Grid container style={{ marginTop: "2%" }} id="messageContainer">
        <Grid
          item
          xs={10}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <ButtonGroup disableElevation variant="contained" color="default">
            <Button
              style={{
                background: firstAnswer === "Yes" ? "#19469A" : "#757575",
                color: "white",
              }}
              onClick={() => setFirstAnswer("Yes")}
              startIcon={<CheckIcon />}
            >
              Yes
            </Button>
            <Button
              style={{
                background: firstAnswer === "No" ? "#19469A" : "#757575",
                color: "white",
              }}
              onClick={() => setFirstAnswer("No")}
              endIcon={<CloseIcon />}
            >
              No
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            style={{ background: "#19469a" }}
            onClick={handelSend}
          >
            <SendIcon style={{ color: "white" }} />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  let handelDateInput = () => {
    setShowDateBox(!showDateBox);
    let item = document.getElementById("datemessageTextInput");
    item.blur();
  };

  let goodBy = () => {
    if (messages.length === 10) {
      return (
        <Grid container style={{ marginTop: "2%" }} id="messageContainer">
          <Grid item xs={10}>
            <h3>Good By...</h3>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              style={{
                background: "#19469a",
                position: "absolute",
                bottom: "0",
              }}
              onClick={handelSend}
            >
              <SendIcon style={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>
      );
    }
  };

  let handelDate = () => {};
  let dateInputAnswerComponent = (placeholderValue) => {
    if (messages[1].message === "Yes" || messages[7].message === "Yes") {
      return (
        <>
          <Grid container style={{ marginTop: "2%" }} id="messageContainer">
            <Grid item xs={10}>
              <div style={{ display: showDateBox ? "flex" : "none" }}>
                <Calendar onClickDay={handelDayClick} minDate={new Date()} />
              </div>

              <input
                id="datemessageTextInput"
                placeholder={placeholderValue || ""}
                style={{ marginTop: "10px" }}
                onClick={handelDateInput}
                value={dateValue}
                onChange={handelDate}
                onKeyDown={handelMessageSendDate}
                autoFocus
                autoComplete="off"
              />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                style={{
                  background: "#19469a",
                  position: "absolute",
                  bottom: "0",
                }}
                onClick={handelSend}
              >
                <SendIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      );
    } else {
      return null;
    }
  };

  let textQuestionAnswerComponent = (placeholderValue, typeValue) => {
    return (
      <Grid container style={{ marginTop: "2%" }} id="messageContainer">
        <Grid
          item
          xs={10}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <input
            id="messageTextInput"
            onChange={handelMessageInput}
            onKeyDown={handelMessageSend}
            type={typeValue || "text"}
            placeholder={placeholderValue || ""}
            value={messageInput}
            autoFocus
            autoComplete="off"
          />
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            style={{ background: "#19469a" }}
            onClick={handelSend}
          >
            <SendIcon style={{ color: "white" }} />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  let firstApi = async () => {
    let messageData = [...messages];
    let apiOneFormData = new FormData();
    let formFiatData = {
      count_fiat: messageData[9].message,
    };

    let dispatchUserData = {
      count_fiat: messageData[9].message,
      end_date: tomorrowDate,
    };

    let newData2 = JSON.stringify(formFiatData);
    apiOneFormData.append("data", newData2);

    try {
      setLoading(true);
      let { data } = await formFiatApi(apiOneFormData);

      setLoading(false);
      dispatch(userFiatDataSaveAction(dispatchUserData));

      dispatch(fiatDataAction(data));
      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  let secondApi = async () => {
    let messageData = [...messages];
    let apiTwoFormData = new FormData();
    let formCryptoData = {
      type_crypto: messageData[3].message,
      count_crypto: messageData[5].message,
      end_date: tomorrowDate,
    };
    let newData = JSON.stringify(formCryptoData);
    apiTwoFormData.append("data", newData);

    try {
      setLoading(true);

      let { data } = await formCryptoApi(apiTwoFormData);

      if (data.conversion_dict === "Cryptocurrency not available") {
        setLoading(false);
        return data;
      } else {
        dispatch(userCryptoDataSaveAction(formCryptoData));
        setLoading(false);
        dispatch(cryptoDataAction(data));
        return data;
      }
    } catch (error1) {
      setLoading(false);
    }
  };

  let handelSubmit = async () => {
    let messageData = [...messages];

    let q1Answer = messageData[1].message;
    let q2Answer = messageData[7].message;

    if (q1Answer === "Yes" && q2Answer === "No") {
      let firstData = await secondApi();

      if (firstData.conversion_dict === "Cryptocurrency not availbale") {
        setError("Cryptocurrency not available");
      } else {
        history.push("/crypto");
      }
    } else if (q1Answer === "No" && q2Answer === "Yes") {
      await firstApi();

      history.push("/crypto");
    } else {
      await firstApi();
      let newData = await secondApi();

      if (newData.conversion_dict === "Cryptocurrency not availbale") {
        setError("Cryptocurrency not available");
      } else {
        history.push("/crypto");
      }
    }
  };

  let submitAnswerComponent = () => {
    return (
      <Grid container style={{ marginTop: "2%" }} id="messageContainer">
        <Grid
          item
          xs={12}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Button variant="contained" color="primary" onClick={handelSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  };
  let reloadComponent = () => {
    return (
      <Grid container style={{ marginTop: "2%" }} id="messageContainer">
        <Grid
          item
          xs={12}
          style={{
            display: error ? "flex" : "none",
            width: "100%",
            justifyContent: "center",
            marginBottom: "10px",
            paddingRight: "5%",
          }}
        >
          <Alert variant="filled" severity="error">
            {error && error}
          </Alert>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Button variant="contained" color="primary" onClick={handelReload}>
            Try Again
          </Button>
        </Grid>
      </Grid>
    );
  };

  let addQuestionFunction = (value) => {
    if (
      messages.length === 10 &&
      messages[1].message === "No" &&
      messages[7].message === "No"
    ) {
      let previousMessages = [...messages];
      let newMessageObject = {
        type: "system",

        message: "GoodBy....",
      };
      previousMessages.push(newMessageObject);
      setMessages(previousMessages);
    } else if (messages.length < 10) {
      let previousMessages1 = [...messages];
      let newMessageObject1 = questionList[value];
      previousMessages1.push(newMessageObject1);
      setMessages(previousMessages1);
    }
  };

  let addQuestion = () => {
    switch (messages.length) {
      case 2:
        addQuestionFunction(1);
        break;
      case 4:
        addQuestionFunction(2);
        break;
      case 6:
        addQuestionFunction(3);
        break;
      case 8:
        addQuestionFunction(4);
        break;
      case 10:
        addQuestionFunction();
        break;
    }
  };

  useEffect(() => {
    if (messages.length === 10) {
      addQuestion();
    } else {
      setTimeout(() => {
        addQuestion();
      }, 2000);
    }
  }, [messages]);

  let scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "inSidePaper",
    });
  };

  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      updateScroll();
    }, 300);
  }, [messages]);

  let handelMessageInput = (e) => {
    setMessageInput(e.target.value);
  };

  let handelMessageSend = (e) => {
    if (e.key === "Enter") {
      let senderObject = {
        type: "user",
        message: messageInput,
      };
      let newMessage = [...messages];
      newMessage.push(senderObject);
      setMessages(newMessage);
      setMessageInput("");
    }
  };

  let handelMessageSendDate = (e) => {
    if (e.key === "Enter") {
      let senderObject = {
        type: "user",
        message: dateValue,
      };
      let newMessage = [...messages];
      newMessage.push(senderObject);
      setMessages(newMessage);
      setDateValue("");
    }
  };

  let handelSend = () => {
    if (
      firstAnswer !== null &&
      firstAnswer === "Yes" &&
      messages.length === 1
    ) {
      let senderObject = {
        type: "user",
        message: firstAnswer,
      };
      let newMessage = [...messages];
      newMessage.push(senderObject);
      setMessages(newMessage);
      setFirstAnswer(null);
    } else if (
      firstAnswer !== null &&
      firstAnswer === "No" &&
      messages.length === 1
    ) {
      let senderObject = {
        type: "user",
        message: firstAnswer,
      };
      let empty1 = {
        type: "user",
        message: "",
      };
      let empty2 = {
        type: "user",
        message: "",
      };
      let empty3 = {
        type: "user",
        message: "",
      };
      let empty4 = {
        type: "user",
        message: "",
      };
      let newMessage = [...messages];
      newMessage.push(senderObject);
      newMessage.push(empty1);
      newMessage.push(empty2);
      newMessage.push(empty3);
      newMessage.push(empty4);
      setMessages(newMessage);
      setFirstAnswer(null);
    } else if (
      firstAnswer !== null &&
      firstAnswer === "Yes" &&
      messages.length === 7
    ) {
      let senderObject = {
        type: "user",
        message: firstAnswer,
      };
      let newMessage = [...messages];
      newMessage.push(senderObject);
      setMessages(newMessage);
      setFirstAnswer(null);
    } else if (
      firstAnswer !== null &&
      firstAnswer === "No" &&
      messages.length === 7
    ) {
      let empty5 = {
        type: "user",
        message: "",
      };
      let empty6 = {
        type: "user",
        message: "",
      };
      let senderObject = {
        type: "user",
        message: firstAnswer,
      };
      let newMessage = [...messages];
      newMessage.push(senderObject);
      newMessage.push(empty5);
      newMessage.push(empty6);
      setMessages(newMessage);
      setFirstAnswer(null);
    } else {
      if (
        messages.length === 3 ||
        messages.length === 5 ||
        messages.length === 9
      ) {
        if (messageInput.length > 0) {
          let senderObject = {
            type: "user",
            message: messageInput,
          };
          let newMessage = [...messages];
          newMessage.push(senderObject);
          setMessages(newMessage);
          setMessageInput("");
        }
      } else if (messages.length === 11) {
        if (dateValue.length > 0) {
          let senderObject = {
            type: "user",
            message: tomorrowDate,
          };
          let newMessage = [...messages];
          newMessage.push(senderObject);
          setMessages(newMessage);
          setDateValue("");
        }
      }
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Hidden only={["xs", "sm"]}>
        <Grid container direction="column">
          <Paper elevation={0} id="inSidePaper">
            {messages.map((item, index) => {
              return item.message.length > 0 ? (
                <div
                  className={item.type === "system" ? "left" : "right"}
                  key={index}
                >
                  <p>{item.message}</p>
                </div>
              ) : null;
            })}
          </Paper>
        </Grid>
        {messages.length === 11 && messages[10].message === "GoodBy...."
          ? reloadComponent()
          : renderAnswer()}
      </Hidden>
      <Hidden only={["lg", "md", "xl"]}>
        <Grid container direction="column">
          <Paper elevation={0} id="inSidePaperMobile">
            {messages.map((item, index) => {
              return item.message.length > 0 ? (
                <div
                  className={
                    item.type === "system" ? "leftMobile" : "rightMobile"
                  }
                  key={index}
                >
                  <p>{item.message}</p>
                </div>
              ) : null;
            })}
          </Paper>
        </Grid>
        {(messages.length === 11 && messages[10].message === "GoodBy....") ||
        (messages.length === 12 && error)
          ? reloadComponent()
          : renderAnswer()}
      </Hidden>
    </>
  );
};

export default ChatScreen;
