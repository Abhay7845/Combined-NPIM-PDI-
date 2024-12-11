import { privateApiClientAdmin, privateApiClientImage, privateApiClientL1L2, privateApiClientL3 } from "./PrivateClient";

export const APILogin = (url, payload) => {
    return privateApiClientL1L2.post(url, payload);
}

export const APIGetHomeReligion = (url) => {
    return privateApiClientL1L2.get(url);
}

export const APIGetForAdvariant = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetDropdownList = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetDropdownCollectionList = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetDropdownConsumerBaseList = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetDropdownITGroupList = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetDropdownCategory = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetStatusPortal = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetCatPBStoreWise = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIAdminGetParameter = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetStatusReports = (url) => {
    return privateApiClientL1L2.get(url);
}

export const APIGetL1L2Reports = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetAllDropdownList = (url) => {
    return privateApiClientL3.get(url);
}
export const APIClosePortal = (url) => {
    return privateApiClientL1L2.get(url);
}
export const APIGetItemWiseRptL3 = (url) => {
    return privateApiClientL3.get(url);
}

export const APIDNPIMProductData = (url, payload) => {
    return privateApiClientL1L2.post(url, payload);
}

export const APIPNPIMProductData = (url, payload) => {
    return privateApiClientL1L2.post(url, payload);
}
export const APIGetPreNextProductData = (url, payload) => {
    return privateApiClientL1L2.post(url, payload);
}

export const APIInsertDataL1L2 = (url, payload) => {
    return privateApiClientL1L2.post(url, payload);
}
export const APIInsertDataL3 = (url, payload) => {
    return privateApiClientL1L2.post(url, payload);
}
export const APIYesItemWiseRtp = (url, payload) => {
    return privateApiClientL3.post(url, payload);
}

export const APIDeleteUpdate = (url, payload) => {
    return privateApiClientL3.post(url, payload);
}

export const APIUpdateFormL3 = (url, payload) => {
    return privateApiClientL3.post(url, payload);
}
export const APIMoveToWishList = (url) => {
    return privateApiClientL3.get(url);
}
export const APIMoveToIndent = (url) => {
    return privateApiClientL3.get(url);
}
export const APIUpdateStaus = (url) => {
    return privateApiClientL3.get(url);
}
export const APIMailContentIndent = (url) => {
    return privateApiClientL3.get(url);
}
export const APIMailContentWishList = (url) => {
    return privateApiClientL3.get(url);
}
export const APIGetSizeDropdown = (url) => {
    return privateApiClientL3.get(url);
}
export const APICoupleBandDropdown = (url) => {
    return privateApiClientL3.get(url);
}
export const APIGetStatuL3 = (url) => {
    return privateApiClientL3.get(url);
}

export const APIGetReportL3 = (url) => {
    return privateApiClientL3.get(url);
}
export const APISaveFormDataL3 = (url, payload) => {
    return privateApiClientL3.post(url, payload);
}
export const APIGetCollCatListL3 = (url) => {
    return privateApiClientL3.get(url);
}
export const APIInsWishList = (url, payload) => {
    return privateApiClientL3.post(url, payload);
}
export const APIGetWishlistData = (url) => {
    return privateApiClientL3.get(url);
}
export const APIInsLimit = (url) => {
    return privateApiClientL3.get(url);
}

// -----------------------------ADDMON ----------------------
export const APIGetCatList = (url) => {
    return privateApiClientAdmin.get(url);
}
export const APISetCatCode = (url) => {
    return privateApiClientAdmin.get(url);
}
export const APIGetMailerContent = (url) => {
    return privateApiClientAdmin.get(url);
}

export const APICopyIndentStore = (url) => {
    return privateApiClientAdmin.get(url);
}
export const APIOpenPortal = (url, payload) => {
    return privateApiClientAdmin.get(url, payload);
}
export const APIGetStoreList = (url) => {
    return privateApiClientAdmin.get(url);
}
export const APIGetStoreListFromDate = (url) => {
    return privateApiClientAdmin.get(url);
}
export const APISendTestMail = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}
export const APIInsSkuMaster = (url, payload) => {
    return privateApiClientImage.post({ url: url, data: payload });
}

export const APIGetSkuMaster = (url) => {
    return privateApiClientAdmin.get(url);
}
export const APIGetAdminLoginData = (url) => {
    return privateApiClientAdmin.get(url);
}

export const APIInsDataLogin = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}
export const APIInsSizeMaster = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}
export const APIUpdateGenderShape = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}
export const APIBulkMoveWhislist = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}

export const APIInsContentMailer = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}

export const APIInsObjStoreMaster = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}
export const APIGetEndDayRtp = (url) => {
    return privateApiClientAdmin.get(url);
}
export const APIGetWishEndDayRtp = (url) => {
    return privateApiClientL3.get(url);
}
export const APISendMail = (url, payload) => {
    return privateApiClientAdmin.post(url, payload);
}

