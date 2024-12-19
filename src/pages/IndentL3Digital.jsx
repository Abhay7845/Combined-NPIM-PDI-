import React, { useEffect, useState } from "react";
import 'setimmediate';
import { Container, Grid, Typography, CssBaseline } from "@material-ui/core";
import ImgShow from "../Components/ImgShow";
import LowerHeader from "../Components/LowerHeader";
import LowerHeaderDigital from "../Components/LowerHeaderDigital";
import ProductDetailsTabular from "../Components/ProductDetailsTabular";
import UpperHeader from "../Components/UpperHeader";
import Heart from "react-heart"
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import AlertPopup from "../Components/AlertPopup";
import { BlinkingComponent, SmallDataTable } from "../Components/ComponentForL3";
import { useStyles } from "../Style/IndentL3";
import { imageUrl } from "../DataCenter/DataList";
import Loader from "../Components/Loader";
import { APICheckItemCode, APIGetCatList, APIGetCatPBStoreWise, APIGetPreNextProductData, APIGetStatuL3, APIInsLimit, APIPNPIMProductData, APISaveFormDataL3, APISetCatCode } from "../HostManager/CommonApiCallL3";
import CoupleBandStoneTable from "../Components/NewComponents/CoupleBandStoneTable";
import { toast } from "react-toastify";
import { sizeUCPToKey } from "../DataCenter/DataList";

const IndentL3 = () => {
    const { storeCode, rsoName } = useParams();
    const [isClick, setClick] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();
    const getItemByCard = JSON.parse(sessionStorage.getItem("CardItemCode"));
    const getCartItemCode = sessionStorage.getItem("CartItemCode");
    const roleType = sessionStorage.getItem("store_value");
    const loginData = JSON.parse(sessionStorage.getItem("loginData"));
    const [feedShowState, setFeedShowState] = useState({
        ...NpimDataDisplay,
        strCode: storeCode,
    });
    console.log("feedShowState==>", feedShowState)
    const [loading, setLoading] = useState(false);
    const [resetDrop, SetResetDrop] = useState(true);
    const [alertPopupStatus, setAlertPopupStatus] = useState({
        status: false,
        main: "",
        contain: "",
        mode: false,
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

    const [productDetails, setProductDetails] = useState({
        storeCode: storeCode,
        collection: "ALL",
        consumerBase: "ALL",
        group: "ALL",
        category: "ALL",
        itemCode: "",
        setDropState: "",
    });
    const [productDetailsDigital, setProductDetailsDigital] = useState({
        storeCode: storeCode,
        collection: "ALL",
        consumerBase: "ALL",
        group: "ALL",
        category: "ALL",
    });

    const [statusData, setStatusData] = useState({
        col: [],
        row: [],
    });

    const [digit, setDigit] = useState("");
    const [setSelectState, setSetSelectState] = useState([]);

    const onSearchClick = (dropState, setDropState) => {
        setProductDetails({
            storeCode: storeCode,
            collection: "ALL",
            consumerBase: "ALL",
            group: "ALL",
            category: "ALL",
            itemCode: dropState,
            setDropState: setDropState,
        });
        setProductDetailsDigital({
            storeCode: storeCode,
            collection: dropState.collection,
            consumerBase: dropState.consumerBase,
            group: dropState.groupData,
            category: dropState.category,
        });
    };

    const onClickNextPreBtnHandler = (direction) => {
        setLoading(true);
        allDataFromValidation.quantityRes = "";
        const NextProductPayload = {
            storeCode: storeCode,
            collection: productDetails.collection,
            consumerBase: productDetails.consumerBase,
            group: productDetails.group,
            category: productDetails.category,
            itemCode: feedShowState.itemCode,
            direction: direction,
        };
        APIGetPreNextProductData(`/NPIM/base/npim/get/product/details/PreNex`, NextProductPayload)
            .then(res => res).then((response) => {
                if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "No more data available for the selected category",
                        contain: "",
                        mode: true,
                    });
                } else if (response.data.code === "1003") {
                    document.getElementById("result").style.visibility = "hidden";
                } else if (response.data.code === "1000") {
                    document.getElementById("result").style.visibility = "visible";
                    setFeedShowState(response.data.value);
                    setDigit(response.data.value.itemCode[6]);
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
    };

    // const GetProductDetailsBySearchDNpim = (productDetailsDigital) => {
    //     setLoading(true);
    //     APIDNPIMProductData(`/dnpim/get/product/details/`, productDetailsDigital)
    //         .then(res => res).then((response) => {
    //             if (response.data.code === "1001") {
    //                 document.getElementById("result").style.visibility = "hidden";
    //                 setAlertPopupStatus({
    //                     status: true,
    //                     main: "No more data available for the selected category",
    //                     contain: "",
    //                     mode: true,
    //                 });
    //                 productDetails.setDropState("");
    //             } else if (response.data.code === "1003") {
    //                 document.getElementById("result").style.visibility = "hidden";
    //                 setAlertPopupStatus({
    //                     status: true,
    //                     main: response.data.value,
    //                     contain: "",
    //                     mode: true,
    //                 });
    //                 productDetails.setDropState("");
    //             } else if (response.data.code === "1000") {
    //                 document.getElementById("result").style.visibility = "visible";
    //                 setFeedShowState(response.data.value);
    //                 setDigit(response.data.value.itemCode[6]);
    //             }
    //             setLoading(false);
    //             setTimeout(() => sessionStorage.removeItem("CardItemCode"));
    //         }).catch((error) => setLoading(false));
    // }

    const GetProductDetailsBySearchPnpim = (productDetails) => {
        setLoading(true);
        APIPNPIMProductData(`/NPIM/base/npim/get/product/details`, productDetails)
            .then(res => res).then((response) => {
                console.log("response==>", response.data);
                sessionStorage.removeItem("CardItemCode");
                if (response.data.code === "1001") {
                    document.getElementById("result").style.visibility = "hidden";
                    setAlertPopupStatus({
                        status: true,
                        main: "ItemCode not in Master",
                        contain: "",
                        mode: true,
                    });
                    productDetails.setDropState("");
                    setProductDetails({
                        storeCode: storeCode,
                        collection: "ALL",
                        consumerBase: "ALL",
                        group: "ALL",
                        category: "ALL",
                        itemCode: "",
                        setDropState: "",
                    });
                } else if (response.data.code === "1003") {
                    document.getElementById("result").style.visibility = "hidden";
                    if ((sessionStorage.getItem("Npim-type") === "DNPIM")) {
                        const isIndented = window.confirm(response.data.value);
                        if (isIndented) {
                            navigate(`/NpimPortal/get/products/home/${storeCode}/${rsoName}`)
                        }
                    } else {
                        setAlertPopupStatus({
                            status: true,
                            main: response.data.value,
                            contain: "",
                            mode: true,
                        });
                        setProductDetails({
                            storeCode: storeCode,
                            collection: "ALL",
                            consumerBase: "ALL",
                            group: "ALL",
                            category: "ALL",
                            itemCode: "",
                            setDropState: "",
                        });
                    }
                    productDetails.setDropState("");
                } else if (response.data.code === "1000") {
                    if (productDetails.itemCode === "") {
                        document.getElementById("result").style.visibility = "hidden";
                    } else if (productDetails.itemCode !== "") {
                        document.getElementById("result").style.visibility = "visible";
                    }
                    setFeedShowState(response.data.value);
                    setDigit(response.data.value.itemCode[6]);
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    const CheckItemCode = (itemCode) => {
        setLoading(true);
        APICheckItemCode(`/api/NPIM/l1l2/get/check/itemCode?itemcode=${itemCode}`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    GetProductDetailsBySearchPnpim(productDetails);
                } else {
                    setAlertPopupStatus({
                        status: true,
                        main: "ItemCode Not In Master",
                        contain: "",
                        mode: true,
                    });
                    setLoading(false);
                }
            }).then(err => setLoading(false));
    }


    const GetStatusReport = (storeCode) => {
        setLoading(true);
        APIGetStatuL3(`/NPIML3/npim/get/status/L3/${storeCode}`)
            .then(res => res).then((response) => {
                if (response.data.code === "1000") {
                    setStatusData({
                        col: response.data.coloum,
                        row: response.data.value,
                    });
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    useEffect(() => {
        if (sessionStorage.getItem("Npim-type") === "PNPIM") {
            if (getItemByCard) {
                const getItemByCardDataNpim = {
                    storeCode: storeCode,
                    collection: "ALL",
                    consumerBase: "ALL",
                    group: "ALL",
                    category: "ALL",
                    itemCode: getItemByCard.itemCode,
                }
                GetProductDetailsBySearchPnpim(getItemByCardDataNpim);
            }
        } else if (sessionStorage.getItem("Npim-type") === "DNPIM") {
            if (getItemByCard) {
                const getItemByCardData = {
                    storeCode: storeCode,
                    collection: "ALL",
                    consumerBase: "ALL",
                    group: "ALL",
                    category: "ALL",
                    itemCode: getItemByCard.itemCode,
                }
                GetProductDetailsBySearchPnpim(getItemByCardData);
            } else if (getCartItemCode) {
                const getItemByCardDataNpim = {
                    storeCode: storeCode,
                    collection: "ALL",
                    consumerBase: "ALL",
                    group: "ALL",
                    category: "ALL",
                    itemCode: getCartItemCode,
                }
                GetProductDetailsBySearchPnpim(getItemByCardDataNpim);
            }
        }
        GetStatusReport(storeCode);
    }, [productDetails, productDetailsDigital, getItemByCard]);

    useEffect(() => {
        if (productDetails.itemCode) {
            CheckItemCode(productDetails.itemCode);
        }
    }, [productDetails.itemCode]);

    const navBarList = [
        {
            id: 1,
            name: "Home",
            link: `/NpimPortal/IndentL3Digital/${storeCode}/${rsoName}`,
            icon: "HomeIcon",
        },
        {
            id: 3,
            name: "Report",
            link: `/NpimPortal/reportL3/${storeCode}/${rsoName}`,
            icon: "ReportIcon",
        },
        {
            id: 4,
            name: "Wishlist",
            link: `/NpimPortal/wishlist/${storeCode}/${rsoName}`,
            icon: "CheckList",
        },
    ];

    const InsertIntoLimitCatPb = () => {
        const catPB = feedShowState.catPB ? feedShowState.catPB : "1";
        APIInsLimit(`/NPIML3/ins/limit/table/${storeCode}/${catPB}`)
            .then(res => res).then((response) => {
            }).catch(err => setLoading(false));
    }

    const WishlistYourProducts = (Wishlist) => {
        const WishlistPayload = {
            category: productDetails.category,
            childNodesE: feedShowState.childNodesE,
            childNodesN: feedShowState.childNodesN,
            childNodeF: feedShowState.childNodeF,
            childNodeO: feedShowState.childNodeO,
            childNodeV: feedShowState.childNodeV,
            childNodeK: feedShowState.childNodeK,
            childNodeH: feedShowState.childNodeH,
            collection: productDetails.collection,
            karatageRange: feedShowState.karatageRange,
            consumerbase: productDetails.consumerBase,
            findings: allDataFromValidation.findingsRes,
            indCategory: feedShowState.category,
            indQty: "1",
            indentLevelType: feedShowState.itemLevelType,
            itemCode: feedShowState.itemCode,
            itgroup: productDetails.group,
            npimEventNo: feedShowState.npimEventNo,
            reasons: "",
            rsoName: rsoName,
            saleable: "",
            set2Type: allDataFromValidation.typeSet2Res,
            sizeQuantitys: allDataFromValidation.sizeQuantityRes,
            sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
            stoneQuality: allDataFromValidation.stoneQualityRes,
            stoneQualityVal: null,
            strCode: storeCode,
            submitStatus: Wishlist,
            tagQuantitys: allDataFromValidation.tegQuantityRes,
        };
        setLoading(true);
        APISaveFormDataL3(`/NPIML3/npim/insert/responses/from/L3`, WishlistPayload)
            .then(res => res).then((response) => {
                setClick(false);
                if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "Sorry Data Not Saved",
                        contain: "",
                        mode: true,
                    });
                } else if (response.data.code === "1000") {
                    InsertIntoLimitCatPb();
                    if (sessionStorage.getItem("Npim-type") === "DNPIM") {
                        if (roleType === "L3" && getCartItemCode) {
                            setAlertPopupStatus({
                                status: true,
                                main: "Product Wishlited Successfully",
                                contain: "",
                                mode: true,
                            });
                            setTimeout(() => {
                                navigate(`/NpimPortal/cart/product/L3/${storeCode}/${rsoName}`);
                            }, 2000);
                        } else {
                            onClickNextPreBtnHandler("next");
                        }
                    }
                    document.getElementById("result").style.visibility = "hidden";
                    setAlertPopupStatus({
                        status: true,
                        main: "Product Wishlited Successfully",
                        contain: "",
                        mode: true,
                    });
                    setFeedShowState(response.data.value);
                    setAllDataFromValidation({
                        sizeUomQuantityRes: [],
                        sizeQuantityRes: [],
                        stoneQualityRes: "",
                        tegQuantityRes: [],
                        typeSet2Res: "",
                        quantityRes: "",
                        findingsRes: "",
                    });
                    productDetails.setDropState("");
                } else if (response.data.code === "1005") {
                    setAlertPopupStatus({
                        status: true,
                        main: response.data.value,
                        contain: "",
                        mode: true,
                    });
                }
                sessionStorage.removeItem("CardItemCode");
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    const IndentYourProduct = (Indent) => {
        const itemsToExclude = ['Only_MANGALSUTRA', 'Only_BANGLE', 'Only_FINGERRING'];
        const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));

        const IndentPdtPayload = {
            category: productDetails.category,
            childNodesE: feedShowState.childNodesE,
            childNodesN: feedShowState.childNodesN,
            childNodeF: feedShowState.childNodeF,
            childNodeO: feedShowState.childNodeO,
            childNodeV: feedShowState.childNodeV,
            childNodeK: feedShowState.childNodeK,
            childNodeH: feedShowState.childNodeH,
            collection: productDetails.collection,
            karatageRange: feedShowState.karatageRange,
            consumerbase: productDetails.consumerBase,
            findings: allDataFromValidation.findingsRes,
            indCategory: feedShowState.category,
            indQty: allDataFromValidation.quantityRes,
            indentLevelType: feedShowState.itemLevelType,
            itemCode: feedShowState.itemCode,
            itgroup: productDetails.group,
            npimEventNo: feedShowState.npimEventNo,
            reasons: "",
            rsoName: rsoName,
            saleable: "",
            set2Type: allDataFromValidation.typeSet2Res,
            sizeQuantitys: allDataFromValidation.sizeQuantityRes,
            sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
            stoneQuality: allDataFromValidation.stoneQualityRes,
            stoneQualityVal: null,
            strCode: storeCode,
            submitStatus: Indent,
            tagQuantitys: filteredTags,
        };
        console.log("IndentPdtPayload==>", IndentPdtPayload);
        setLoading(true);
        APISaveFormDataL3(`/NPIML3/npim/insert/responses/from/L3`, IndentPdtPayload)
            .then(res => res).then((response) => {
                console.log("response==>", response.data);
                if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "Sorry Data Not Saved",
                        contain: "",
                        mode: true,
                    });
                } else if (response.data.code === "1000") {
                    document.getElementById("result").style.visibility = "hidden";
                    InsertIntoLimitCatPb();
                    if (sessionStorage.getItem("Npim-type") === "DNPIM") {
                        if (roleType === "L3" && getCartItemCode) {
                            setAlertPopupStatus({
                                status: true,
                                main: "Data has been saved Successfully",
                                contain: "",
                                mode: true,
                            });
                            setTimeout(() => {
                                navigate(`/NpimPortal/cart/product/L3/${storeCode}/${rsoName}`);
                            }, 2000);
                        }
                        sessionStorage.removeItem("CartItemCode");
                    }
                    setAlertPopupStatus({
                        status: true,
                        main: "Data has been saved Successfully",
                        contain: "",
                        mode: true,
                    });
                    setFeedShowState(response.data.value);
                    setAllDataFromValidation({
                        sizeUomQuantityRes: [],
                        sizeQuantityRes: [],
                        stoneQualityRes: "",
                        tegQuantityRes: [],
                        typeSet2Res: "",
                        quantityRes: "",
                        findingsRes: "",
                    });
                    productDetails.setDropState("");
                    setProductDetails({
                        storeCode: storeCode,
                        collection: "ALL",
                        consumerBase: "ALL",
                        group: "ALL",
                        category: "ALL",
                        itemCode: "",
                        setDropState: "",
                    });
                } else if (response.data.code === "1005") {
                    setAlertPopupStatus({
                        status: true,
                        main: "All Products has been Indented Successfully",
                        contain: "",
                        mode: true,
                    });
                }
                sessionStorage.removeItem("CardItemCode");
                setLoading(false);
                setClick(false);
            }).catch((error) => setLoading(false));
    }

    const FinalSubmit = (inputData, data) => {
        const { limit, totalIndentAgainstCatPB } = data;
        console.log("inputData.indQty==>", inputData.indQty);
        console.log("Number(feedShowState.stdUCP)==>", Number(feedShowState.stdUCP));
        console.log("data==>", data);
        console.log("inputData.indQty * Number(feedShowState.stdUCP)==>", inputData.indQty * Number(feedShowState.stdUCP));
        console.log("inputData.indQty * Number(feedShowState.stdUCP) < limit==>", inputData.indQty * Number(feedShowState.stdUCP) < limit);
        if (limit >= totalIndentAgainstCatPB) {
            if (inputData.indQty * Number(feedShowState.stdUCP) < limit) {
                const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
                const isConfirmed = window.confirm(alertMessage);
                if (isConfirmed === true) {
                    IndentYourProduct("Indent");
                }
            } else {
                IndentYourProduct("Indent");
            }
        } else if (limit === 0) {
            const alertMessage = `There is no Limit Available for this "CatPB" Do you still wish to Indent this Product. Click "OK" to continue or click on "Cancel" to wishlist this Product!`;
            const isConfirmed = window.confirm(alertMessage);
            if (isConfirmed === true) {
                IndentYourProduct("Indent");
            }
        } else {
            IndentYourProduct("Indent");
        }
    }

    const GetCatPBLimit = (inputData) => {
        setLoading(true);
        APIGetCatPBStoreWise(`/NPIM/base/get/catPB/limit/storewise/${storeCode}/${feedShowState.catPB}`)
            .then(res => res).then((response) => {
                console.log("response==>", response.data.value);
                if (response.data.code === "1000") {
                    FinalSubmit(inputData, response.data.value);
                } else {
                    FinalSubmit(inputData, response.data.value);
                }
            }).catch(error => {
                setLoading(false);
                toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
            });
    }

    const InsertIntoLimitTable = (inputData) => {
        setLoading(true);
        const catPB = feedShowState.catPB ? feedShowState.catPB : "1";
        APIInsLimit(`/NPIML3/ins/limit/table/${storeCode}/${catPB}`)
            .then(res => res).then((response) => {
                if (response.data.Code === "1000") {
                    if (response.data.value.toUpperCase() === "SUCCESS") {
                        GetCatPBLimit(inputData);
                    }
                }
            }).catch(err => setLoading(false));
    }

    const onClickSubmitBtnHandler = (value) => {
        const itemsToExclude = ['Only_MANGALSUTRA', 'Only_BANGLE', 'Only_FINGERRING'];
        const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));
        const SelectedTag = allDataFromValidation.tegQuantityRes.map(item => item.size);

        const QuantitySum = (data) => {
            let totalSum = 0;
            data.forEach(item => {
                Object.values(item).forEach(value => {
                    const number = parseFloat(value);
                    if (!isNaN(number)) {
                        totalSum += number;
                    }
                });
            });
            return totalSum;
        }
        /// for SET TAG 
        const TagQunatityData = filteredTags.map(item => {
            const costKey = sizeUCPToKey[item.size];
            const unitCost = Number(feedShowState[costKey]);
            const quantity = Number(item.quantity);
            const set2TagUnitCost = item.size === "Set2Tag" && Number(feedShowState.stdUcpN) + Number(feedShowState.stdUcpE);
            const set2Tag_HUnitCost = item.size === "Set2Tag_H" && Number(feedShowState.stdUcpH) + Number(feedShowState.stdUcpE);
            return {
                size: item.size,
                quantity: (item.size === "Set2Tag" && set2TagUnitCost * quantity) || (item.size === "Set2Tag_H" && set2Tag_HUnitCost * quantity) || unitCost * quantity,
            };
        });
        console.log("TagQunatityData==>", TagQunatityData);

        // FOR BANGLE 
        const bangle11Digit = feedShowState.category === "BANGLE" ? feedShowState.itemCode.charAt(10) : feedShowState.childNodeV.charAt(10);
        const singleBanglePrice = Number(feedShowState.stdUcpV) / Number(bangle11Digit);
        const sizeUomQuantityPrise = allDataFromValidation.sizeUomQuantityRes.map(item => {
            const updatedItem = { size: item.size };
            for (const key in item) {
                if (key.startsWith('uom') && item[key] !== "") {
                    updatedItem[key] = Number(item[key]) * singleBanglePrice;
                } else if (key !== "size") {
                    updatedItem[key] = item[key];
                }
            }
            return updatedItem;
        });

        console.log("sizeUomQuantityPrise==>", sizeUomQuantityPrise);

        const tagSizeLimit = QuantitySum(TagQunatityData);
        console.log("tagSizeLimit==>", tagSizeLimit);
        const SizeQuantitySum = QuantitySum(allDataFromValidation.sizeQuantityRes);
        const UmoSizeLimit = QuantitySum(sizeUomQuantityPrise);
        console.log("UmoSizeLimit==>", UmoSizeLimit);
        const sizeLimit = SizeQuantitySum * Number(feedShowState.stdUcpF)
        console.log("sizeLimit==>", sizeLimit);

        const TotalLimit = tagSizeLimit + sizeLimit + UmoSizeLimit + Number(allDataFromValidation.quantityRes);
        console.log("TotalLimit==>", TotalLimit);

        const inputDataPayload = {
            category: productDetails.category,
            childNodesE: feedShowState.childNodesE,
            childNodesN: feedShowState.childNodesN,
            childNodeF: feedShowState.childNodeF,
            childNodeO: feedShowState.childNodeO,
            childNodeV: feedShowState.childNodeV,
            childNodeK: feedShowState.childNodeK,
            childNodeH: feedShowState.childNodeH,
            collection: productDetails.collection,
            karatageRange: feedShowState.karatageRange,
            consumerbase: productDetails.consumerBase,
            findings: allDataFromValidation.findingsRes,
            indCategory: feedShowState.category,
            indQty: TotalLimit,
            indentLevelType: feedShowState.itemLevelType,
            itemCode: feedShowState.itemCode,
            itgroup: productDetails.group,
            npimEventNo: feedShowState.npimEventNo,
            reasons: "",
            rsoName: rsoName,
            saleable: "",
            set2Type: allDataFromValidation.typeSet2Res,
            sizeQuantitys: allDataFromValidation.sizeQuantityRes,
            sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
            stoneQuality: allDataFromValidation.stoneQualityRes,
            stoneQualityVal: null,
            strCode: storeCode,
            submitStatus: value,
            tagQuantitys: filteredTags,
        };
        console.log("inputDataPayload==>", inputDataPayload);
        if (value === "Wishlist") {
            WishlistYourProducts("Wishlist");
        } else if (value === "Indent") {
            // IndentYourProduct("Indent");
            InsertIntoLimitTable(inputDataPayload);
        }
        window.scrollTo({ top: "0", behavior: "smooth" });
    };

    function closeHandler() {
        setAlertPopupStatus({
            status: false,
            main: "",
            contain: "",
            mode: false,
        });
        setLoading(false);
    }

    function closeHandlerForRest() {
        setAlertPopupStatus({
            status: false,
            main: "",
            contain: "",
            mode: false,
        });
        SetResetDrop(!resetDrop);
        setLoading(false);
        SetResetDrop(true);
    }

    function allDataChangeHandler(allValidationInput) {
        setAllDataFromValidation(allValidationInput);
    }

    function sizeUomQuantityResHandler(sizeUomQuantityData) {
        setImmediate(() => {
            setAllDataFromValidation({
                sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                stoneQualityRes: allDataFromValidation.stoneQualityRes,
                tegQuantityRes: allDataFromValidation.tegQuantityRes,
                typeSet2Res: allDataFromValidation.typeSet2Res,
                quantityRes: allDataFromValidation.quantityRes,
                findingsRes: allDataFromValidation.findingsRes,
                sizeUomQuantityRes: sizeUomQuantityData,
            });
        });
    }

    function sizeQuantityResHandler(sizeQuantityData) {
        setAllDataFromValidation({
            sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantityRes: sizeQuantityData,
            stoneQualityRes: allDataFromValidation.stoneQualityRes,
            tegQuantityRes: allDataFromValidation.tegQuantityRes,
            typeSet2Res: allDataFromValidation.typeSet2Res,
            quantityRes: allDataFromValidation.quantityRes,
            findingsRes: allDataFromValidation.findingsRes,
        });
    }

    function stoneQualityResHandler(stoneQualityData) {
        setAllDataFromValidation({
            sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
            stoneQualityRes: stoneQualityData,
            tegQuantityRes: allDataFromValidation.tegQuantityRes,
            typeSet2Res: allDataFromValidation.typeSet2Res,
            quantityRes: allDataFromValidation.quantityRes,
            findingsRes: allDataFromValidation.findingsRes,
        });
    }

    function tegQuantityResHandler(tegQuantityData) {
        setAllDataFromValidation({
            sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
            stoneQualityRes: allDataFromValidation.stoneQualityRes,
            tegQuantityRes: tegQuantityData,
            typeSet2Res: allDataFromValidation.typeSet2Res,
            quantityRes: allDataFromValidation.quantityRes,
            findingsRes: allDataFromValidation.findingsRes,
        });
    }

    function typeSet2ResHandler(typeSet2Data) {
        setAllDataFromValidation({
            sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
            stoneQualityRes: allDataFromValidation.stoneQualityRes,
            tegQuantityRes: allDataFromValidation.tegQuantityRes,
            typeSet2Res: typeSet2Data,
            quantityRes: allDataFromValidation.quantityRes,
            findingsRes: allDataFromValidation.findingsRes,
        });
    }

    function quantityResHandler(quantityData) {
        setAllDataFromValidation({
            sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
            stoneQualityRes: allDataFromValidation.stoneQualityRes,
            tegQuantityRes: allDataFromValidation.tegQuantityRes,
            typeSet2Res: allDataFromValidation.typeSet2Res,
            quantityRes: quantityData,
            findingsRes: allDataFromValidation.findingsRes,
        });
    }

    function findingsResHandler(findingsData) {
        setAllDataFromValidation({
            sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
            stoneQualityRes: allDataFromValidation.stoneQualityRes,
            tegQuantityRes: allDataFromValidation.tegQuantityRes,
            typeSet2Res: allDataFromValidation.typeSet2Res,
            quantityRes: allDataFromValidation.quantityRes,
            findingsRes: findingsData,
        });
    }

    function tegSelectionResHandler(tegSelectionData) {
        if (tegSelectionData.target.value === "Separate") {
            APIGetCatList(`/npim/get/set/category/list/${feedShowState.itemCode}`)
                .then((response) => {
                    if (response.data.code === 1000) {
                        setSetSelectState(response.data.value.map((element) => element.category));
                    }
                }).catch(error => setLoading(false));
        } else if (tegSelectionData.target.value === "Set") {
            APISetCatCode(`/npim/item/set/category/code/${feedShowState.itemCode}`)
                .then((response) => {
                    if (response.data.code === 1000) {
                        setSetSelectState(response.data.value);
                    }
                }).catch(error => setLoading(false));
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" className={classes.root}>
                <AlertPopup
                    status={alertPopupStatus.status}
                    mainLable={alertPopupStatus.main}
                    containLable={alertPopupStatus.contain}
                    procideHandler=""
                    discardHandler=""
                    closeHandler={() => alertPopupStatus.mode ? closeHandlerForRest() : closeHandler()}
                />
                <Grid container className={classes.main}>
                    <Grid item xs={12}>
                        <UpperHeader
                            itemCode={feedShowState.itemCode}
                            storeCode={storeCode}
                        />
                        <Loading flag={loading} />
                        {loading === true && < Loader />}
                        {sessionStorage.getItem("Npim-type") === "DNPIM" ?
                            resetDrop ? (
                                <LowerHeaderDigital
                                    onSear={onSearchClick}
                                    navBarList={navBarList}
                                    statusData={statusData}
                                    setAllDataFromValidation={setAllDataFromValidation}
                                    L3={true}
                                />
                            ) : "Loading...!" : ""
                        }
                        {sessionStorage.getItem("Npim-type") === "PNPIM" ?
                            resetDrop ? (
                                <LowerHeader
                                    onSear={onSearchClick}
                                    navBarList={navBarList}
                                    statusData={statusData}
                                    setAllDataFromValidation={setAllDataFromValidation}
                                    L3={true}
                                />
                            ) : "Loading...!" : ""
                        }
                    </Grid>
                    <div
                        id="result"
                        style={{ visibility: "hidden" }}
                        className="w-100"
                    >
                        <Grid direction="row" container>
                            <Grid item xs={12} md={5} style={{ marginTop: "3%" }}>
                                {feedShowState.itemCode && (
                                    <ImgShow
                                        itemCode={feedShowState.itemCode}
                                        videoLink={feedShowState.videoLink || ""}
                                        imgLink={imageUrl}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} md={7} style={{ marginTop: "1%" }}>
                                <div className={classes.productInfo}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12}>
                                            <Typography className={classes.headingColor} align="center">{feedShowState.itemCode}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <h5 className="text-center my-1"><b>Product Specification</b></h5>
                                            {feedShowState.adVariant && (
                                                <BlinkingComponent
                                                    color="red"
                                                    text="AD-Variant"
                                                    fontSize={15}
                                                />
                                            )}
                                            <ProductDetailsTabular information={feedShowState} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className="mx-2">
                                                <h5 className="text-center my-1"><b>Indent Details</b></h5>
                                                {feedShowState.btqCount && (
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <BlinkingComponent
                                                            color="red"
                                                            text={`${feedShowState.btqCount} Btqs Indented`}
                                                            fontSize={15}
                                                        />
                                                        <b style={{ marginLeft: "34%", color: "red" }} >Wishlist</b>
                                                        <Heart isActive={isClick} onClick={() => {
                                                            setClick(true);
                                                            WishlistYourProducts("Wishlist");
                                                        }}
                                                            style={{ width: "22px", marginRight: "30px" }}
                                                        />
                                                    </div>)}
                                                <br />
                                                <Grid>
                                                    {digit && (
                                                        <DisplayValidationComponent
                                                            digit={feedShowState.itemCode[6]}
                                                            itemCode={feedShowState.itemCode}
                                                            setType2option={["Chain", "Dori"]}
                                                            setSelectOptions={setSelectState}
                                                            allDataChangeHandler={allDataChangeHandler}
                                                            sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                                                            sizeQuantityResHandler={sizeQuantityResHandler}
                                                            stoneQualityResHandler={stoneQualityResHandler}
                                                            tegQuantityResHandler={tegQuantityResHandler}
                                                            typeSet2ResHandler={typeSet2ResHandler}
                                                            quantityResHandler={quantityResHandler}
                                                            findingsResHandler={findingsResHandler}
                                                            tegSelectionResHandler={tegSelectionResHandler}
                                                            allDataFromValidation={allDataFromValidation}
                                                            feedShowState={feedShowState}
                                                        />
                                                    )}
                                                </Grid>
                                                {SmallDataTable(feedShowState)}
                                            </div>
                                        </Grid>
                                        {feedShowState.si2Gh || feedShowState.vsGh || feedShowState.vvs1 || feedShowState.i2Gh || feedShowState.si2Ij ? (
                                            <StaticTabularInformation
                                                si2Gh={feedShowState.si2Gh}
                                                vsGh={feedShowState.vsGh}
                                                vvs1={feedShowState.vvs1}
                                                i2Gh={feedShowState.i2Gh}
                                                si2Ij={feedShowState.si2Ij}
                                            />
                                        ) : null}
                                        {feedShowState.category === "COUPLE BAND" && (
                                            <CoupleBandStoneTable />
                                        )}
                                    </Grid>
                                    <div className="d-flex mt-5 mb-2">
                                        {loginData.role === "L1" && <Button
                                            className={classes.btn}
                                            onClick={() => onClickNextPreBtnHandler("pre")}
                                            startIcon={<ArrowBackIosIcon />}
                                            variant="outlined"
                                        >
                                            Previous
                                        </Button>}
                                        <Button
                                            className={classes.btnSub}
                                            onClick={() => onClickSubmitBtnHandler("Indent")}
                                        >
                                            Submit
                                        </Button>
                                        {loginData.role === "L1" && <Button
                                            className={classes.btn}
                                            onClick={() => onClickNextPreBtnHandler("next")}
                                            endIcon={<ArrowForwardIosIcon />}
                                            variant="outlined"
                                        >
                                            Next
                                        </Button>}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default IndentL3;
