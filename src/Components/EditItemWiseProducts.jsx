/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import ImgShow from "./ImgShow";
import { imageUrl } from "../DataCenter/DataList";
import { Button, Typography } from "@material-ui/core";
import { ProductDetailsTabularL3 } from "./ComponentForL3";
import StaticTabularInformation from "./StaticTabularInformation";
import DisplayValidationComponent from "./DisplayValidationForL3";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { APIDeleteUpdate, APIGetCatList, APISetCatCode, APIUpdateFormL3 } from "../HostManager/CommonApiCallL3";

const EditItemWiseProducts = ({ productsData, AlertPopupStatus, ItemWiseReport, editProductsData }) => {
    const { storeCode, rsoName } = useParams();
    const [loading, setLoading] = useState(false);
    const [setSelectState, setSetSelectState] = useState([]);
    const [allDataFromValidation, setAllDataFromValidation] = useState({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
    });

    function tegSelectionResHandler(tegSelectionData) {
        if (tegSelectionData === "Separate") {
            APIGetCatList(`/npim/get/set/category/list/${productsData.itemCode}`)
                .then(res => res).then((response) => {
                    if (response.data.code === "1000") {
                        setSetSelectState(response.data.value.map((element) => element.category));
                    }
                }).catch(error => setLoading(false));
        } else if (tegSelectionData === "Set") {
            APISetCatCode(`/npim/item/set/category/code/${productsData.itemCode}`).then((response) => {
                if (response.data.code === "1000") {
                    setSetSelectState(response.data.value);
                }
            }).catch((error) => setLoading(false));
        }
    }

    function sizeUomQuantityResHandler(sizeUomQuantityData) {
        setAllDataFromValidation({
            sizeUomQuantityRes: sizeUomQuantityData,
            sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
            stoneQualityRes: allDataFromValidation.stoneQualityRes,
            tegQuantityRes: allDataFromValidation.tegQuantityRes,
            typeSet2Res: allDataFromValidation.typeSet2Res,
            quantityRes: allDataFromValidation.quantityRes,
            findingsRes: allDataFromValidation.findingsRes,
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

    useEffect(() => {
        setAllDataFromValidation({
            sizeUomQuantityRes: [],
            sizeQuantityRes: [],
            stoneQualityRes: "",
            tegQuantityRes: [],
            typeSet2Res: "",
            quantityRes: "",
            findingsRes: "",
        });
    }, [productsData.itemCode, productsData.id]);

    const UpdateReportsPdtDetails = () => {
        const itemsToExclude = ['Only_MANGALSUTRA', 'Only_BANGLE', 'Only_FINGERRING'];
        const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));

        const updatePdtPayload = {
            itemCode: productsData.itemCode,
            strCode: storeCode,
            saleable: "",
            reasons: "",
            childNodesE: productsData.childNodesE,
            childNodesN: productsData.childNodesN,
            childNodeF: productsData.childNodeF,
            childNodeH: productsData.childNodeH,
            childNodeK: productsData.childNodeK,
            childNodeV: productsData.childNodeV,
            childNodeO: productsData.childNodeO,
            findings: allDataFromValidation.findingsRes,
            indQty: allDataFromValidation.quantityRes,
            indCategory: productsData.category,
            submitStatus: "report",
            set2Type: allDataFromValidation.typeSet2Res,
            stoneQuality: allDataFromValidation.stoneQualityRes,
            stoneQualityVal: productsData.stoneQualityVal,
            rsoName: rsoName,
            npimEventNo: "1",
            indentLevelType: "L3",
            collection: "",
            consumerbase: productsData.needState,
            itgroup: productsData.itGroup,
            category: productsData.category,
            exSize: productsData.size,
            exUOM: productsData.uom,
            exIndCategory: productsData.indCategory,
            exStonequality: productsData.stoneQuality,
            sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantitys: allDataFromValidation.sizeQuantityRes,
            tagQuantitys: filteredTags,
        };
        console.log("updatePdtPayload==>", updatePdtPayload);
        setLoading(true);
        APIUpdateFormL3(`/NPIML3/npim/update/responses/from/L3/`, updatePdtPayload)
            .then(res => res).then((response) => {
                if (response.data.code === "1000") {
                    AlertPopupStatus({
                        status: true,
                        main: 'Updated Successfully',
                        contain: "",
                    });
                }
                ItemWiseReport(storeCode);
                editProductsData({});
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    const onClickCancelBtnHandler = (event) => {
        setLoading(true);
        const CancelIndentPayload = {
            itemCode: productsData.itemCode,
            strCode: storeCode,
            saleable: "",
            size: "0",
            uom: "0",
            reasons: "",
            findings: allDataFromValidation.findingsRes,
            indQty: "0",
            indCategory: "0",
            submitStatus: "report",
            set2Type: allDataFromValidation.typeSet2Res,
            stoneQuality: "0",
            stoneQualityVal: "0",
            rsoName: rsoName,
            npimEventNo: "1",
            IndentLevelType: "L3",
            exSize: productsData.size,
            exUOM: productsData.uom,
            exIndCategory: productsData.indCategory,
            exStonequality: productsData.stoneQuality,
        };
        APIDeleteUpdate(`/NPIML3/npim/update/responses`, CancelIndentPayload)
            .then(res => res).then((response) => {
                if (response.data.code === "1000") {
                    AlertPopupStatus({
                        status: true,
                        main: "Cancel Indent Successfully",
                        contain: "",
                    });
                }
                ItemWiseReport(storeCode);
                editProductsData({});
                setLoading(false);
            }).catch((error) => setLoading(false));
    };

    return (
        <div className="my-4">
            {loading === true && <Loader />}
            <div className="row g-3">
                <div className="col-md-5">
                    <ImgShow
                        itemCode={productsData.itemCode}
                        videoLink=""
                        imgLink={imageUrl}
                    />
                </div>
                <div className="col-md-7">
                    <Typography style={{ backgroundColor: "#832729", color: "#ffff", fontWeight: "bold", textAlign: "center", padding: "2px", marginBottom: "2%" }}>
                        {productsData.itemCode}
                    </Typography>
                    <div className="row g-3">
                        <div className="col-md-7">
                            <ProductDetailsTabularL3 information={productsData} />
                        </div>
                        <div className="col-md-5">
                            <h6 className="text-center my-1"><b>INDENT DETAILS</b></h6>
                            <DisplayValidationComponent
                                digit={productsData.itemCode[6]}
                                itemCode={productsData.itemCode}
                                setType2option={["Chain", "Dori"]}
                                setSelectOptions={setSelectState}
                                sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                                sizeQuantityResHandler={sizeQuantityResHandler}
                                stoneQualityResHandler={stoneQualityResHandler}
                                tegQuantityResHandler={tegQuantityResHandler}
                                typeSet2ResHandler={typeSet2ResHandler}
                                quantityResHandler={quantityResHandler}
                                findingsResHandler={findingsResHandler}
                                tegSelectionResHandler={tegSelectionResHandler}
                                allDataFromValidation={allDataFromValidation}
                                feedShowState={productsData}
                            />
                        </div>
                    </div>
                    {productsData.si2Gh || productsData.vsGh || productsData.vvs1 || productsData.i2Gh ? (
                        <StaticTabularInformation
                            si2Gh={productsData.si2Gh}
                            vsGh={productsData.vsGh}
                            vvs1={productsData.vvs1}
                            i2Gh={productsData.i2Gh}
                            si2Ij={productsData.si2Ij}
                        />
                    ) : null}
                    <div className="row my-2">
                        <div className="col">
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={onClickCancelBtnHandler}
                            >CANCEL INDENT</Button>
                        </div>
                        <div className="col">
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                style={{
                                    backgroundColor: "#832729",
                                    color: "#ffff",
                                }}
                                onClick={UpdateReportsPdtDetails}
                            >UPDATE</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default EditItemWiseProducts;