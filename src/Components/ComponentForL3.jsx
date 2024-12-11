import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import SingleImgCreator from "./SingleImgCreator";
import Blink from "react-blink-text";
import "../Style/CssStyle/LowerHeader.css";
import useStyles from "../Style/ComponentForL3";
import { imageUrl } from "../DataCenter/DataList";

function DataGridReport(props) {
  const classes = useStyles();
  const { col, rows, reportLabel, rowDataHandler } = props;

  const column = col.map((element) => {
    let fieldRes;
    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Action",
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <Button
              onClick={(data) => {
                rowDataHandler(params.row);
              }}
            >
              Edit
            </Button>
          );
        },
      };
    } else if (element === "Image") {
      fieldRes = {
        field: "Image",
        headerName: "Image",
        sortable: false,
        innerHeight: 500,
        flex: 1,
        renderCell: (params) => {
          return (
            <SingleImgCreator
              itemCode={params.row.itemCode ? params.row.itemCode : ""}
              link={imageUrl}
            />
          );
        },
      };
    } else {
      fieldRes = {
        field: element,
        flex: 1,
        sortable: false,
      };
    }
    return fieldRes;
  });
  return (
    <Container maxWidth="xl" className={classes.report}>
      <Typography align="center" variant="h5" color="secondary">
        {reportLabel}
      </Typography>
      <DataGrid
        rows={rows}
        columns={column}
        autoHeight={true}
        autoPageSize={true}
        pageSize={100}
        disableColumnSelector
      />
    </Container>
  );
}


function ProductDetailsTabularL3(props) {
  const classes = useStyles();
  return (
    <div>
      <h6 className="text-center">
        <b>PRODUCT SPECIFICATION</b>
      </h6>
      <table className="w-100">
        <tbody>
          {props.information.collection && (
            <tr>
              <th>COLLECTION</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.collection}
              </td>
            </tr>
          )}
          {props.information.consumerBase ? (
            <tr>
              <th>NEED STATE</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.consumerBase}
              </td>
            </tr>
          ) : null}
          {props.information.itGroup ? (
            <tr>
              <th>GROUP</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.itGroup}</td>
            </tr>
          ) : null}
          {props.information.category ? (
            <tr>
              <th>CATEGORY</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.category}</td>
            </tr>
          ) : null}
          {props.information.gender && (
            <tr>
              <th>GENDER</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.gender}</td>
            </tr>
          )}
          {props.information.complexity && (
            <tr>
              <th className={classes.hadding}>COMPLEXCITY</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.complexity}
              </td>
            </tr>
          )}
          {props.information.stdWt ? (
            <tr>
              <th>STD Wt</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.stdWt}</td>
            </tr>
          ) : null}
          {props.information.stdUCP || props.information.stdUcp ? (
            <tr>
              <th>STD UCP</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.stdUCP ? props.information.stdUCP : props.information.stdUcp}
              </td>
            </tr>
          ) : null}
          {props.information.indCategory ? (
            <tr>
              <th>IND-CATEGORY</th>
              <td>-</td>
              <td className={classes.rowData}>
                {props.information.indCategory}
              </td>
            </tr>
          ) : null}
          {props.information.colourWt ? (
            <tr>
              <th>METAL COLOR</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.colourWt}</td>
            </tr>
          ) : null}
          {props.information.findings && (
            <tr>
              <th>FINDING</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.findings}</td>
            </tr>
          )}
          {props.information.size && (
            <tr>
              <th>SIZE</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.size}</td>
            </tr>
          )}
          {props.information.uom && (
            <tr>
              <th>UOM</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.uom}</td>
            </tr>
          )}
          {props.information.itemQty &&
            <tr>
              <th>QUANTITY</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.itemQty}</td>
            </tr>}
          {props.information.catPB &&
            <tr>
              <th>CAT PB</th>
              <td>-</td>
              <td className={classes.rowData}>{props.information.catPB}</td>
            </tr>}
        </tbody>
      </table>
    </div>
  );
}

function SmallDataTable(props) {
  let digit = props.itemCode[6];
  if (digit) {
    if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7" ||
      digit === "N" ||
      digit === "T" ||
      digit === "G"
    ) {
      if (props.childNodesE || props.childNodesN) {
        return (
          <table className="table table-bordered mt-3" style={{ marginLeft: "0%" }}>
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>StdWt</th>
                <th>UCP</th>
              </tr>
            </thead>
            <tbody>
              {props.childNodeF &&
                <tr>
                  <td>FINGER RING</td>
                  <td>{parseFloat(props.stdWtF).toFixed(3)}</td>
                  <td>{parseFloat(props.stdUcpF).toFixed(3)}</td>
                </tr>
              }
              {props.childNodesE &&
                <tr>
                  <td>EAR RING</td>
                  <td>{parseFloat(props.stdWtE).toFixed(3)}</td>
                  <td>{parseFloat(props.stdUcpE).toFixed(3)}</td>
                </tr>
              }
              {props.childNodesN &&
                <tr>
                  <td>NECKWEAR</td>
                  <td>{parseFloat(props.stdWtN).toFixed(3)}</td>
                  <td>{parseFloat(props.stdUcpN).toFixed(3)}</td>
                </tr>
              }
              {props.childNodeH &&
                <tr>
                  <td>HARAM</td>
                  <td>{parseFloat(props.stdWtH).toFixed(3)}</td>
                  <td>{parseFloat(props.stdUcpH).toFixed(3)}</td>
                </tr>
              }
              {props.childNodeK &&
                <tr>
                  <td>TIKKA</td>
                  <td>{parseFloat(props.stdWtK).toFixed(3)}</td>
                  <td>{parseFloat(props.stdUcpK).toFixed(3)}</td>
                </tr>
              }
              {props.childNodeV &&
                <tr>
                  <td>BANGLE</td>
                  <td>{parseFloat(props.stdWtV).toFixed(3)}</td>
                  <td>{parseFloat(props.stdUcpV).toFixed(3)}</td>
                </tr>
              }
              {props.childNodeO &&
                <tr>
                  <td>OTHER</td>
                  <td>{parseFloat(props.stdWtO).toFixed(3)}</td>
                  <td>{parseFloat(props.stdUcpO).toFixed(3)}</td>
                </tr>
              }
            </tbody>
          </table>
        );
      }
    }
  }
}

function BlinkingComponent(props) {
  const { color, text, fontSize } = props;
  return (
    <Blink color={color} text={text} fontSize={fontSize}>
      Testing the Blink
    </Blink>
  );
}

export default DataGridReport;
export {
  ProductDetailsTabularL3,
  SmallDataTable,
  BlinkingComponent,
};