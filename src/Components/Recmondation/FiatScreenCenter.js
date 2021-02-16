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

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#31BDF4",
    background: "rgba(182,172,162,0.2)",
  },
  table: {
    minWidth: 400,
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

  const fiatDate = useSelector(
    (state) =>
      state.chatScreen.userFiatData && state.chatScreen.userFiatData.end_date
  );

  const [loading, setLoading] = useState(null);

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

      dispatch(userCryptoDataSaveAction(formCryptoData));
      setLoading(false);
      dispatch(cryptoDataAction(data));
      dispatch(changeTabAction(0));
    } catch (error1) {
      setLoading(false);
    }
  };

  let handelStacking = () => {
    secondApi();
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        direction="column"
        style={{
          paddingTop: "20px",
          paddingLeft: "10%",
          paddingRight: "10%",
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
    </>
  );
};

export default FiatScreenCenter;