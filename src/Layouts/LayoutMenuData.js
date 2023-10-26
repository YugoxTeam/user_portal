import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../pages/Authentication/DecryptionFunc";
import { useSelector } from "react-redux";
const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const [deals, setDeals] = useState(false);
  const [salesOrder, setSalesOrder] = useState(false);
  const [poc, setPoc] = useState(false);
  const [demoAccess, setDemoAccess] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [mdf, setMdf] = useState(false);
  const [featureRequest, setFeatureRequest] = useState(false);
  const [library, setLibrary] = useState(false);
  const [resources, setResources] = useState(false);
  const [ridgeAcademy, setRidgeAcademy] = useState(false);
  const [softwareDownload, setSoftwareDownload] = useState(false);
  const [partnership, setPartnership] = useState(false);
  const [faq, setFaq] = useState(false);
  const [certificate, setCertificate] = useState(false)

  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Admin Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Accounts") {
      setIsAccount(false);
    }
    if (iscurrentState !== "Deals") {
      setDeals(false);
    }
    if (iscurrentState !== "Sales Order") {
      setSalesOrder(false);
    }
    if (iscurrentState !== "PoC") {
      setPoc(false);
    }
    if (iscurrentState !== "Demo Access") {
      setDemoAccess(false);
    }
    if (iscurrentState !== "Ticket") {
      setTicket(false);
    }
    if (iscurrentState !== "MDF") {
      setMdf(false);
    }
    if (iscurrentState !== "Feature Request") {
      setFeatureRequest(false);
    }
    if (iscurrentState !== "Library") {
      setLibrary(false);
    }
    if (iscurrentState !== "Resource") {
      setResources(false);
    }
    if (iscurrentState !== "RidgeAcademy") {
      setRidgeAcademy(false);
    }
    if (iscurrentState !== "SoftwareDownload") {
      setSoftwareDownload(false);
    }
    if (iscurrentState !== "Partnership") {
      setPartnership(false);
    }
    if (iscurrentState !== "FAQ") {
      setFaq(false);
    }
    if (iscurrentState !== "Certificate") {
      setCertificate(false);
    }

    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isAccount,
    deals,
    salesOrder,
    poc,
    demoAccess,
    ticket,
    mdf,
    featureRequest,
    library,
    resources,
    ridgeAcademy,
    softwareDownload,
    partnership,
    faq,
    certificate,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);
  // const asetRole = JSON.parse(decryptData("role"));
  const asetRole = localStorage.getItem("role");
  const dynamicValue1 = "Resource = Marketing Collateral";
  const dynamicValue2 = "Ridge Academy = Ridge Academy";
  const dynamicValue3 = "Software Download = Software Download";
  const dynamicValue4 = "Partnership = Partnership and Programs";
  const encodedValue1 = encodeURIComponent(dynamicValue1);
  const encodedValue2 = encodeURIComponent(dynamicValue2);
  const encodedValue3 = encodeURIComponent(dynamicValue3);
  const encodedValue4 = encodeURIComponent(dynamicValue4);
  // console.log(encodedValue);
  //**partner menu */
  const partnersMenu = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "isdashboard",
      label: "Dashboard",
      icon: "ri-dashboard-fill",
      link: "/dashboard",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Dashboard");
      },
    },

  ];

  //**end user menu */
  const endUserMenu = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "isdashboard",
      label: "Dashboard",
      icon: "ri-dashboard-fill",
      link: "/dashboard",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Dashboard");
      },
    },
  ];

  // let menu = null;
  // switch (asetRole) {
  //   case "Partner":
  //     menu = partnersMenu;
  //     break;
  //   // case "Employee and Portal Admin":
  //   //   menu = adminMenuItem;
  //   //   break;
  //   // case "Employee":
  //   //   menu = employeeMenuItems;
  //   //   break;

  //   case "End-User":
  //     menu = endUserMenu;
  //     break;
  // }
  return <React.Fragment>{partnersMenu}</React.Fragment>;
};
export default Navdata;
