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
import avtar from "../../assets/images/avtar.jpg";

const ProfileDropdown = () => {
  const { REACT_APP_API_URL } = process.env;
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  const session = localStorage.getItem("session");
  const user_name = value.username;
  const user_pass = value.password;
  const navigate = useNavigate();
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

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  const fetch = () => {
    var formdata = new FormData();
    formdata.append("_operation", "FetchProfile");
    formdata.append("username", user_name);
    formdata.append("password", user_pass);
    formdata.append("postdata", true);
    formdata.append("_session", session);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    axios
      .post(REACT_APP_API_URL, formdata, { headers })
      .then((response) => {
        if (response.error) {
          localStorage.clear()
          navigate("/login", { replace: true });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 10000);
    return () => clearInterval(interval);
  }, []);
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
                {/* {isLoading && contactDetails && contactDetails["cf_920"]} */}
                Astr
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {/* {isLoading && contactDetails && org["accountname"]} */}
                Designer
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
            <Link to={"/pages-profile-settings"} className="dropdown-item">
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
