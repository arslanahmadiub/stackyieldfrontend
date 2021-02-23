import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { changeTabAction } from "../../action/tabAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { userCryptoDataSaveAction } from "../../action/chatScreenAction";
import { cryptoDataAction } from "../../action/chatScreenAction";
import { formCryptoApi } from "../../Services/ChatServices";
import { Hidden } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
  table: {
    minWidth: 400,
  },
  mobileTable: {
    minWidth: 200,
  },
}));
const FiatScreenCenter = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const fiatData = useSelector(
    (state) =>
      state.chatScreen.fiatData &&
      state.chatScreen.fiatData.recommended_fiat_dict.recommended_crypto
  );
  let history = useHistory();

  const fiatDate = useSelector(
    (state) =>
      state.chatScreen.userFiatData && state.chatScreen.userFiatData.end_date
  );

  const [loading, setLoading] = useState(false);

  let secondApi = async () => {
    let apiTwoFormData = new FormData();
    let formCryptoData = {
      type_crypto: fiatData && fiatData.Name,
      count_crypto: fiatData && fiatData.conversionrate.toString(),
      end_date: fiatDate && fiatDate,
    };
    let newData = JSON.stringify(formCryptoData);
    apiTwoFormData.append("data", newData);

    try {
      setLoading(true);
      let { data } = await formCryptoApi(apiTwoFormData);
      if (data.conversion_dict === "Cryptocurrency not availbale") {
        setError("Cryptocurrency not availbale");
      } else {
        dispatch(userCryptoDataSaveAction(formCryptoData));
        setLoading(false);
        dispatch(cryptoDataAction(data));
        dispatch(changeTabAction(0));
      }

      setTimeout(() => {
        setError(null);
      }, 4000);
    } catch (error1) {
      setLoading(false);
    }
  };

  let handelStacking = () => {
    secondApi();
  };
  const [error, setError] = useState(null);

  let handelAgain = () => {
    history.push("/");
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Hidden only={["sm", "xs"]}>
        <Button
          style={{
            background: "#19469A",
            color: "white",
            float: "right",
            marginRight: "10%",
          }}
          onClick={handelAgain}
        >
          Try again with different options
        </Button>
        <Grid
          container
          direction="column"
          style={{
            paddingTop: "20px",
            paddingLeft: "10%",
            paddingRight: "10%",
            marginTop: "12%",
          }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "24px" }}
                  >
                    Recommended Cryptocurrency
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>
                    {fiatData &&
                      fiatData.Name.charAt(0).toUpperCase() +
                        fiatData.Name.slice(1)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reward Rate</TableCell>
                  <TableCell>{fiatData && fiatData.changerate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversion Rate</TableCell>
                  <TableCell>{fiatData && fiatData.conversionrate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price of Crypto</TableCell>
                  <TableCell>{fiatData && fiatData.price}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <br></br>
          <br></br>
          <Grid
            item
            xs={12}
            style={{
              display: error ? "flex" : "none",
              width: "100%",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Alert variant="filled" severity="error">
              {error && error}
            </Alert>
          </Grid>

          <Button
            style={{
              background: "#19469A",
              color: "white",
            }}
            onClick={handelStacking}
          >
            Get Stacking
          </Button>
        </Grid>
      </Hidden>
      <Hidden only={["lg", "md", "xl"]}>
        <Grid
          container
          direction="column"
          style={{
            padding: "2%",
            marginTop: "5%",
          }}
        >
          <TableContainer component={Paper} style={{ width: "100vw" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan="2"
                    style={{ textAlign: "center", fontSize: "24px" }}
                  >
                    Recommended Cryptocurrency
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>
                    {fiatData &&
                      fiatData.Name.charAt(0).toUpperCase() +
                        fiatData.Name.slice(1)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reward Rate</TableCell>
                  <TableCell>{fiatData && fiatData.changerate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversion Rate</TableCell>
                  <TableCell>{fiatData && fiatData.conversionrate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price of Crypto</TableCell>
                  <TableCell>{fiatData && fiatData.price}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <br></br>
          <Grid
            item
            xs={12}
            style={{
              display: error ? "flex" : "none",
              width: "100%",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Alert variant="filled" severity="error">
              {error && error}
            </Alert>
          </Grid>
          <br></br>

          <Button
            style={{
              background: "#19469A",
              color: "white",
            }}
            onClick={handelStacking}
          >
            Get Stacking
          </Button>
        </Grid>
      </Hidden>
    </>
  );
};

export default FiatScreenCenter;
