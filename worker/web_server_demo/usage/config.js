"use strict";
(function(root) {
    var options = {
        domain: "localhost.cloudec.huaweicloud.com",
        isWSS: 1,
        confCtrlProtocol: 1,
        isTlsSupport: 0,
        uiPluginAppDisplayName : "eSDK-Desktop",

        uiPluginlLanguage : 0,
        uiPluginResourcesPath: "",
        uiPluginUserFilesPath:"",
        uiPluginHasFrameInfo:1,
        uiPluginFrameInfoX:300,
        uiPluginFrameInfoY:200,
        uiPluginFrameInfoWidth:1920,
        uiPluginFrameInfoHeight:1080,
        uiPluginHasParentInfo:1,
        uiPluginParentInfoIsNeedAttach:1,
        uiPluginParentInfoXOffsetRate:20,
        uiPluginParentInfoYOffsetRate:15,

        uiPluginHideTopToolBar:0,
        uiPluginHideBottomToolBar:0,
        uiPluginHideInviteButton:1,
        uiPluginHideAttendeesButton:1,
        uiPluginHideShareButton:1,
        uiPluginHideShareConfLink:1,
        uiPluginDataHideInviteButton:1,
        uiPluginDataHideAttendeesButton:1,
        uiPluginDataHideRequestRemotecontrolButton:1,

        pageTitle:"High-Level-API"
    }
    cloudEC.configure(options);

})(this);