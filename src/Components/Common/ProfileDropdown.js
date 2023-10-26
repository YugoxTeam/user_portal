import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import images
import avtar from '../../assets/images/avtar.jpg'

const ProfileDropdown = () => {
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  // const value =  JSON.parse(decryptData("Registered_User"))
  const user_email = value.emailId;
  const user_pass = value.password;
  if (localStorage.getItem("download")) {
    localStorage.setItem(
      "download",
      localStorage.getItem("download") +
        "&u=" +
        btoa(user_email) +
        "&p=" +
        btoa(user_pass)
    );

    setTimeout(() => {
      window.open(localStorage.getItem("download"), "_blank");
      localStorage.removeItem("download");
    }, 100);
  }
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));

  const [userName, setUserName] = useState("Admin");
  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      setUserName(
        process.env.REACT_APP_DEFAULTAUTH === "fake"
          ? obj.username === undefined
            ? user.first_name
              ? user.first_name
              : obj.data.first_name
            : "Admin" || "Admin"
          : process.env.REACT_APP_DEFAULTAUTH === "firebase"
          ? obj.email && obj.email
          : "Admin"
      );
    }
  }, [userName, user]);

  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    let logoutTime;

    const resetIdleTime = () => {
      setIdleTime(0);
    };

    const handleMouseMove = () => {
      resetIdleTime();
    };

    const handleKeyPress = () => {
      resetIdleTime();
    };

    const checkIdleTimeout = () => {
      setIdleTime((prevIdleTime) => prevIdleTime + 1);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keypress", handleKeyPress);

    logoutTime = setInterval(() => {
      checkIdleTimeout();
    }, 1000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keypress", handleKeyPress);
      clearInterval(logoutTime);
    };
  }, []);

  useEffect(() => {
    const idleTimeoutInSeconds = 1800; // 30 minutes
    if (idleTime > idleTimeoutInSeconds) {
      // Call your logout function or navigate to the "/logout" page here
      // For demonstration purposes, we'll just log a message.
     navigate('/logout')
    }
  }, [idleTime]);

  const [contactDetails, setContactDetails] = useState([]);
  const [org, setOrg] = useState([]);
  const { REACT_APP_API_URL } = process.env;
  const [isLoading, setIsLoading] = useState(false);
  const profile_img_change=localStorage.getItem("profile_img_change")


  // useEffect(() => {
  //   const fetchProfile = ()=>{
  //     const value = JSON.parse(localStorage.getItem("Registered_User"));
  //     // const value =  JSON.parse(decryptData("Registered_User"))
  //     const user_email = value.emailId;
  //     const user_pass = value.password;
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
  //     };
  
  //     var formdata = new FormData();
  //     formdata.append("_operation", "FetchProfile");
  //     formdata.append("username", user_email);
  //     formdata.append("password", user_pass);
  //     formdata.append("token", localStorage.getItem("token"));
  
  //     let data = {};
  //     formdata.forEach(function (value, key) {
  //       data[key] = value;
  //     });
  
  //     axios({
  //       method: "post",
  //       headers: headers,
  //       url: REACT_APP_API_URL,
  //       data: JSON.stringify(data),
  //     })
  //       .then((res) => {
  //         if (res.success == true) {
  //           setIsLoading(true);
  //           //** details */
  //           setContactDetails(res.result.contact);
  //           setOrg(res.result.organization);
  //           localStorage.setItem("fullName", res.result.contact.cf_920);
  //           localStorage.setItem("orgName", res.result.organization.accountname);
  //         } else {
  //           navigate("/login",{redirect:true})
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   fetchProfile();
  //   // Set up the interval to call the API every 30 minutes
  //   const interval = setInterval(fetchProfile,60000 );

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, [profile_img_change]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  // const [idleTime, setIdleTime] = useState(0);
  const navigate = useNavigate();
  // console.log(contactDetails)
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={
                // contactDetails && contactDetails.imagedata !== null
                //   ? `data:${contactDetails.imagetype};base64,${contactDetails.imagedata}`
                  // :
                   avtar
              }
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {/* {isLoading && contactDetails && contactDetails["cf_920"]} */}Astr
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {/* {isLoading && contactDetails && org["accountname"]} */}Designer
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <h6 className="dropdown-header">Welcome {userName}!</h6> */}
          {/* <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/profile"} className="dropdown-item">
                            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">Profile</span>
                        </Link>
                    </DropdownItem> */}
          {/* <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/apps-chat"} className="dropdown-item">
                            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Messages</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className='p-0'>
                        <Link to={"#"} className="dropdown-item">
                            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Taskboard</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/pages-faqs"} className="dropdown-item">
                            <i
                                className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle">Help</span>
                        </Link>
                    </DropdownItem> */}
          {/* <div className="dropdown-divider"></div> */}
          {/* <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/pages-profile"} className="dropdown-item">
                            <i
                                className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                                    className="align-middle">Balance : <b>$5971.67</b></span>
                        </Link>
                    </DropdownItem > */}
          <DropdownItem className="p-0">
            <Link
              to={process.env.PUBLIC_URL + "/pages-profile-settings"}
              className="dropdown-item"
            >
              {/* <span className="badge bg-soft-success text-success mt-1 float-end">New</span> */}
              <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Profile</span>
            </Link>
          </DropdownItem>
          {/* <DropdownItem className='p-0'>
                        <Link to={process.env.PUBLIC_URL + "/auth-lockscreen-basic"} className="dropdown-item">
                            <i
                                className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span>
                        </Link>
                    </DropdownItem> */}
          <DropdownItem className="p-0">
            <Link to="/logout" className="dropdown-item">
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
