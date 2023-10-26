import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/auth/login/thunk";
//redux
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Logout = (props) => {
  const dispatch = useDispatch();
  const { REACT_APP_API_URL } = process.env;
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  const session = localStorage.getItem("session")
  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    if (value) {
      const headers = {
        "Content-Type": "application/form-data",
        // "Cookie": `PHPSESSID=${session}`
      };

      var formdata = new FormData();
      formdata.append("_operation", "logout");
      formdata.append("username", value.username);
      formdata.append("password", value.password);
      // formdata.append("Cookie", `PHPSESSID=${session}`);
      formdata.append("_session", session);


      axios({
        method: "post",
        headers: headers,
        url: REACT_APP_API_URL,
        data: formdata,
        withCredentials:true
      })
        .then((res) => {
          // console.log(res)
          if (res.success == true) {
            localStorage.clear();
            <Navigate to="/login" />;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    localStorage.clear();
    return <Navigate to="/login" />;
  }
  // else{
  //   if (value) {
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Basic ${btoa(`${value.emailId}:${value.password}`)}`,
  //     };

  //     var formdata = new FormData();
  //     formdata.append("_operation", "PortalLog");
  //     formdata.append("username", value.emailId);
  //     formdata.append("password", value.password);
  //     formdata.append("token", localStorage.getItem("token"));
  //     formdata.append("cf_3297", "Logout Success");

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
  //         if (res.status == 200) {
  //           localStorage.clear();
  //           <Navigate to="/login" />;
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
