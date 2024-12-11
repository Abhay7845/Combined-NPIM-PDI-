import React, { useState, useEffect } from "react";
import { Button, Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import { Grid } from "@material-ui/core";
import ImgShow from "./ImgShow";
import { useStyles } from "../Style/ProductInfo";
import { imageUrl } from "../DataCenter/DataList";
import MuliSelectDropdownField from "./MuliSelectDropdownField";
import { toast } from "react-toastify";
import moment from 'moment';
import { useParams } from "react-router-dom";
import { L1L2ProductsInfo } from "./NewComponents/L1L2ProductsInfo";

const NewEditProductL1L2 = ({ productInfo }) => {
    const classes = useStyles();
    const { storeCode, rsoName } = useParams();
    const [feedValueQ1, setFeedValueQ1] = useState(0);
    const [feedValueQ2, setFeedValueQ2] = useState(0);
    const [feedValueQ3, setFeedValueQ3] = useState(0);
    const [feedValueQ4, setFeedValueQ4] = useState(0);
    const [multiSelectDrop, setMultiSelectDrop] = useState([]);
    const [feedbackMsg, setFeedbackMsg] = useState("");

    const WeightageQ1 = 4 * Number(feedValueQ1);
    const WeightageQ2 = 7 * Number(feedValueQ2);
    const WeightageQ3 = 7 * Number(feedValueQ3);
    const WeightageQ4 = 2 * Number(feedValueQ4);
    const onMultiSelect = (multiSelectData) => { setMultiSelectDrop(multiSelectData) };
    const multiSelectValues = multiSelectDrop.map((item) => item === 'Others(Free Text)' ? feedbackMsg : item);

    const RecetAllFeildData = () => {
        setFeedbackMsg("");
        setFeedValueQ1(0);
        setFeedValueQ2(0);
        setFeedValueQ3(0);
        setFeedValueQ4(0);
        setMultiSelectDrop([]);
    }

    useEffect(() => {
        RecetAllFeildData();
    }, [productInfo.id, productInfo.itemCode]);

    const onClickSubmitBtnHandler = () => {
        if (feedValueQ1 && feedValueQ2 && feedValueQ3 && feedValueQ4) {
            const feedbackPayload = {
                DoE: moment().format("YYYY-MM-DD"),
                StrCode: storeCode,
                Region: productInfo.region,
                Needstate: productInfo.consumerBase,
                Collection: productInfo.collection,
                ItGroup: productInfo.itGroup,
                Category: productInfo.category,
                CatPB: productInfo.catPB,
                ItemCode: productInfo.itemCode,
                Activity: productInfo.activity,
                Q1_Rating: feedValueQ1,
                Q2_Rating: feedValueQ2,
                Q3_Rating: feedValueQ3,
                Q4_Rating: feedValueQ4,
                Specific_Feedback: multiSelectValues.toString(),
                RSOName: rsoName,
                NpimEventNo: productInfo.npimEventNo,
                IndentLevelType: "L1L2",
                SubmitStatus: "feedback",
                Overall_Product_percentage: WeightageQ1 + WeightageQ2 + WeightageQ3 + WeightageQ4
            }
            console.log("feedbackPayload==>", feedbackPayload);
        } else {
            toast.error("Please Insure All The Questions Are Answered", { theme: "colored" })
        }
    };

    return (
        <React.Fragment>
            <Grid container style={{ marginTop: "2%" }}>
                <div className="col-md-5">
                    <ImgShow
                        itemCode={productInfo.itemCode}
                        videoLink=""
                        imgLink={imageUrl}
                    />
                </div>
                <Divider />
                <div className="col-md-7">
                    <Typography className={classes.headingColor} align="center">{productInfo.itemCode}</Typography>
                    <div className="row my-3">
                        <div className="col-md-5">
                            <L1L2ProductsInfo feedShowState={productInfo} />
                        </div>
                        <div className="col-md-7">
                            <h5 className="text-center"><b>FEEDBACK</b></h5>
                            <div style={{ border: "1px solid gray", padding: "5px" }}>
                                <div className="mt-3">
                                    <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How relevent is this product to your market/region?</h6>
                                    <div className="d-flex justify-content-center">
                                        <Rating
                                            name="simple-controlled"
                                            value={feedValueQ1}
                                            onChange={(event, newValue) => setFeedValueQ1(newValue)}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                            sx={{
                                                '& .MuiRating-iconFilled': { color: feedValueQ1 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                            }}
                                        />
                                        <b className="mx-4 mt-1">{WeightageQ1}%</b>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How would you rate this product in terms of look to price?</h6>
                                    <div className="d-flex justify-content-center">
                                        <Rating
                                            name="simple-controlled"
                                            value={feedValueQ2}
                                            onChange={(event, newValue) => setFeedValueQ2(newValue)}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                            sx={{
                                                '& .MuiRating-iconFilled': { color: feedValueQ2 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                            }}
                                        />
                                        <b className="mx-4 mt-1">{WeightageQ2}%</b>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How would you rate this product in terms of differentiation fit for Tanishq brand?</h6>
                                    <div className="d-flex justify-content-center">
                                        <Rating
                                            name="simple-controlled"
                                            value={feedValueQ3}
                                            onChange={(event, newValue) => setFeedValueQ3(newValue)}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                            sx={{
                                                '& .MuiRating-iconFilled': { color: feedValueQ3 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                            }}
                                        />
                                        <b className="mx-4 mt-1">{WeightageQ3}%</b>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How would you rate quality of the product?</h6>
                                    <div className="d-flex justify-content-center">
                                        <Rating
                                            name="simple-controlled"
                                            value={feedValueQ4}
                                            onChange={(event, newValue) => setFeedValueQ4(newValue)}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                            sx={{
                                                '& .MuiRating-iconFilled': { color: feedValueQ4 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                            }}
                                        />
                                        <b className="mx-4 mt-1">{WeightageQ4}%</b>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <MuliSelectDropdownField
                                        onMultiSelect={onMultiSelect}
                                        value={multiSelectDrop}
                                        feedShowState={productInfo}
                                    />
                                </div>
                                {multiSelectDrop.includes("Others(Free Text)") && <div className="mt-3">
                                    <textarea type="text" className="w-100" placeholder="Write your Feedback (Max 50 Character)" onChange={(e) => setFeedbackMsg(e.target.value)} />
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="row-cols-1 btn_feed_show">
                        <Button
                            onClick={onClickSubmitBtnHandler}
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            className={classes.buttonStyle}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </Grid>
        </React.Fragment>
    );
};
export default NewEditProductL1L2;
