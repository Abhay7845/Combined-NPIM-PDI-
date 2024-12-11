import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  drop_multi: {
    width: "100%",
    minWidth: "100%",
  },
  inputField: {
    width: "100%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #484850",
      borderRadius: "5px 5px 0 0",
    },
  },
  formControl: {
    minWidth: "100%",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #484850",
      borderRadius: "5px 5px 0 0",
    },
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
  },
  header: {
    backgroundColor: "red",
  },
  report: {
    minWidth: "100%",
    margin: "0%",
    padding: "0%",
  },
  hedgingCss: {
    fontWeight: "bolder",
    fontStretch: "normal",
    fontSize: "16px",
    lineHeight: "normal",
    fontFamily: "Raleway, sans - serif",
    letterSpacing: "2px",
  },
  hading: {
    fontWeight: 500,
    fontSize: "18px",
    fontStretch: "normal",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "1px",
    textAlign: "left",
  },
  rowData: {
    fontWeight: 500,
    fontFamily: "Playfair Display,seri",
    fontSize: "18px",
    letterSpacing: "1px",
    textAlign: "left",
  },
});
