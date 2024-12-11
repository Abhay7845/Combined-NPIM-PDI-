import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, CssBaseline, Drawer } from "@material-ui/core";
import { useParams } from "react-router-dom";
import AlertPopup from "../Components/AlertPopup";
import LazyLoadingDataGridForWishlist from "../Components/LazyLoadingDataGridForWishlist";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import StatusTabular from "../Components/StatusTabular";
import UpperHeader from "../Components/UpperHeader";
import useStyle from "../Style/ReportL3";
import { WislistLeHeaders } from "../DataCenter/DataList";
import Loader from "./Loader";
import { toast } from 'react-toastify';
import { APIDeleteUpdate, APIGetCatPBStoreWise, APIGetStatuL3, APIGetWishlistData, APIInsLimit, APIInsWishList, APIMoveToIndent } from "../HostManager/CommonApiCallL3";

const WishListedItems = () => {
  const classes = useStyle();
  const { storeCode, rsoName } = useParams();
  const getCatPbRow = JSON.parse(sessionStorage.getItem("catPbRow"));
  const [col, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [statusData, setStatusData] = useState({
    col: [],
    row: [],
  });

  const [reportLabel, setReportLabel] = useState("Item_Wise_Report");
  const [dataRowInformation, setDataRowInformation] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [modification, setModification] = useState(true);
  const [switchEnable, setSwitchEnable] = useState(false);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
  });
  const [allDataFromValidation, setAllDataFromValidation] = useState({
    sizeUomQuantityRes: [],
    sizeQuantityRes: [],
    stoneQualityRes: "",
    tegQuantityRes: [],
    typeSet2Res: "",
    quantityRes: "",
    findingsRes: "",
  });

  const [isConfirmed, setsConfirmed] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const handelOpen = () => setPopupOpen(true);
  const handelClose = () => setPopupOpen(false);

  const handelYes = () => {
    APIInsWishList(`/get/wishlisted/listdata/${storeCode}`, rows)
      .then(res => res).then(response => {
        if (response.data.code === "1000") {
          setPopupOpen(false);
          setsConfirmed(true);
        }
      });
  };

  const GetWhishlistData = (storeCode) => {
    setLoading(true);
    APIGetWishlistData(`/get/wishlisted/listdata/${storeCode}`)
      .then(res => res).then((response) => {
        if (response.data.Code === "1000") {
          setCol(WislistLeHeaders);
          setRows(response.data.value);
        }
        setSwitchEnable(true);
        setLoading(false);
      }).catch((error) => setLoading(false));
  }
  useEffect(() => {
    GetWhishlistData(storeCode);
    APIGetStatuL3(`/npim/get/status/L3/${storeCode}`)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          setStatusData({
            col: response.data.coloum,
            row: response.data.value,
          });
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }, [statusCloserOpener, reportLabel, modification, popupOpen, storeCode]);

  const LoadDataOnWishListing = (storeCode) => {
    APIGetWishlistData(`/get/wishlisted/listdata/${storeCode}`)
      .then((response) => {
        if (response.data.Code === "1000") {
          setCol(response.data.coloum);
          setRows(response.data.value);
        }
        setSwitchEnable(true);
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  const WishListToEndent = (itemCode, setWishListRowData) => {
    setLoading(true);
    APIMoveToIndent(`/npim/move/item/wishlist/to/indent/${itemCode}/${storeCode}/Indent`)
      .then(res => res).then((response) => {
        if (response.data.Code === "1000") {
          setAlertPopupStatus({
            status: true,
            main: 'Item Indented Successfully',
            contain: "",
          });
          LoadDataOnWishListing(storeCode);
          setWishListRowData({});
          setLoading(false);
        }
      }).catch((error) => setLoading(false));
  }

  function indentCall(data, itemCode, setWishListRowData) {
    // WishListToEndent(itemCode, setWishListRowData);
    const { limit, totalIndentAgainstCatPB } = data;
    if (limit >= totalIndentAgainstCatPB) {
      const alertMessage = `The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for indenting this Product. Instead you can also Wishlist this product !`
      const isConfirmed = window.confirm(alertMessage);
      if (isConfirmed === true) {
        WishListToEndent(itemCode, setWishListRowData);
      }
    } else if (limit === 0) {
      const alertMessage = `There is no Limit Available for this "CatPB" Do you still wish to Indent this Product. Click "OK" to continue or click on "Cancel" to wishlist this Product!`;
      const isConfirmed = window.confirm(alertMessage);
      if (isConfirmed === true) {
        WishListToEndent(itemCode, setWishListRowData);
      }
    } else {
      WishListToEndent(itemCode, setWishListRowData);
    }
  }

  function getCatPBLimit(catPB, itemCode, setWishListRowData) {
    APIGetCatPBStoreWise(`/get/catPB/limit/storewise/${storeCode}/${catPB}`)
      .then(res => res).then(response => {
        if (response.data.code === "1000") {
          indentCall(response.data.value, itemCode, setWishListRowData);
        } else if (response.data.code === "1001") {
          indentCall(response.data.value, itemCode, setWishListRowData);
        } else {
          setAlertPopupStatus({
            status: true,
            main: "unable to check limit",
            contain: "",
          });
        }
      }).catch(error => {
        setLoading(false);
        toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
      });
  }


  const InsertIntoLimitTable = (catPB, itemCode, setWishListRowData) => {
    if (catPB && itemCode) {
      setLoading(true);
      APIInsLimit(`/ins/limit/table/${storeCode}/${catPB ? catPB : "1"}`)
        .then((response) => {
          if (response.data.Code === "1000") {
            if (response.data.value.toUpperCase() === "SUCCESS") {
              getCatPBLimit(catPB, itemCode, setWishListRowData);
            }
          }
          setLoading(false);
        }).catch(error => setLoading(false));
    } else {
      WishListToEndent(itemCode, setWishListRowData);
    }
  }

  const MoveToWishlist = (event, setWishListRowData) => {
    const { itemCode, catPB } = event;
    InsertIntoLimitTable(catPB, itemCode, setWishListRowData);
    // WishListToEndent(itemCode, setWishListRowData);
  }


  const reportDropHandler = (input) => {
    setLoading(true);
    setShowInfo(false);
    DisplayValidationRunner();
    setReportLabel(input);
    setLoading(false);
  };

  function scrollTop() {
    window.scrollTo({ top: "0", behavior: "smooth" });
  }

  function closeHandler(params) {
    setAlertPopupStatus({
      status: false,
      main: "",
      contain: "",
    });
    setLoading(false);
  }
  const barHandler = () => {
    setBarOpener(!barOpener);
  };

  const statusOpener = () => {
    setStatusCloserOpener(!statusCloserOpener);
  };

  const rowDataHandler = (input) => {
    setLoading(true);
    setDataRowInformation(input);
    setShowInfo(true);
    setSwitchEnable(false);
    DisplayValidationRunner();
    scrollTop();
    setLoading(false);
  };

  const DeleteRowData = (event) => {
    setLoading(true);
    DisplayValidationRunner();
    const inputFiled = {
      itemCode: event.itemCode,
      strCode: storeCode,
      saleable: "",
      size: "0",
      uom: "0",
      reasons: "",
      findings: "",
      indQty: "0",
      indCategory: "0",
      submitStatus: "Wishlist",
      set2Type: "",
      stoneQuality: "0",
      stoneQualityVal: "0",
      rsoName: rsoName,
      npimEventNo: "",
      IndentLevelType: "",
      exSize: event.size,
      exUOM: event.uom,
      exIndCategory: event.indCategory,
      exStonequality: event.stoneQuality,
    };
    APIDeleteUpdate(`/npim/update/responses`, inputFiled)
      .then((response) => {
        if (response.data.code === "1000") {
          setAlertPopupStatus({
            status: true,
            main: 'Deleted Successfully',
            contain: "",
          });
        }
        GetWhishlistData(storeCode);
        setShowInfo(false);
        setModification(!modification);
        setLoading(true);
        reportDropHandler(reportLabel);
      }).catch((error) => setLoading(false));
  };

  function DisplayValidationRunner() {
    setAllDataFromValidation({
      sizeUomQuantityRes: [],
      sizeQuantityRes: [],
      stoneQualityRes: "",
      tegQuantityRes: [],
      typeSet2Res: "",
      quantityRes: "",
      findingsRes: "",
    });
  }

  const showInformationHandler = () => setShowInfo(!showInfo);

  const reportOption = [
    "Item_Wise_Report",
    "NeedState",
    "Collection",
    "ItGroup",
    "Category",
    "Cancel_Item_List",
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <AlertPopup
        status={alertPopupStatus.status}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={closeHandler}
      />
      <Drawer anchor="top" open={statusCloserOpener} onClick={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>
      <Container className={classes.root} maxWidth="xl">
        <Grid item xs={12}>
          <UpperHeader storeCode={storeCode} />
          <Loading flag={loading} />
          {loading === true && <Loader />}
          <ReportsAppBar
            reportDropHandler={reportDropHandler}
            reportOptions={reportOption}
            barHandler={barHandler}
            showInformationHandler={showInformationHandler}
            showInfo={showInfo}
            switchEnable={switchEnable}
            droptype="Wishlist"
            statusOpener={statusOpener}
          />
        </Grid>
        <Grid item xs={12}>
          {rows.length > 0 ? (
            <LazyLoadingDataGridForWishlist
              col={col}
              rows={rows}
              autoHeight={true}
              autoPageSize={true}
              reportLabel="Wishlist"
              rowDataHandler={rowDataHandler}
              handelOpen={handelOpen}
              handelClose={handelClose}
              handelYes={handelYes}
              popupOpen={popupOpen}
              isConfirmed={isConfirmed}
              dataRowInformation={dataRowInformation}
              allDataFromValidation={allDataFromValidation}
              DeleteRowData={DeleteRowData}
              MoveToWishlist={MoveToWishlist}
              getCatPbRow={getCatPbRow}
              showInfo={setShowInfo}
              switchEnable={setSwitchEnable}
            />
          ) : (
            <Typography align="center" variant="h5" color="secondary">
              DATA NOT AVAILABLE
            </Typography>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default WishListedItems;
