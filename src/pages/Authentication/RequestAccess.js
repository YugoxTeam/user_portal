import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  Spinner,
} from "reactstrap";
import axios from "axios";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUserFailed } from "../../slices/auth/register/reducer";
//redux
import { useDispatch } from "react-redux";

//import images

import ReCAPTCHA from "react-google-recaptcha";

const RequestAccess = () => {
  const { REACT_APP_API_URL } = process.env;

  const dispatch = useDispatch();
  const phoneReg = /^(0|91)?[6-9][0-9]{9}$/;
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorEmailMsg, setErrorEmailMsg] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  // const [msg, setMsg] = useState("");
  const [ip, setIp] = useState("");
  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((resp) => setIp(resp.ip))
      .catch((error) => console.log("Error:", error));
  }, []);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstname: "",
      lastname: "",
      cf_3012: "",
      email: "",
      company: "",
      leadSource: "request_access",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
      // cf_3012: Yup.string(),
      email: Yup.string().email().required("Please Enter Your Email"),
      company: Yup.string().required("Please Enter Your Company Name"),
    }),

    onSubmit: (values, action) => {
      // setIsLoading(true);
      let date = new Date().toJSON().slice(0, 10);
      if (captchaValue && !emailLoading) {
        setIsLoading(true)
        action.resetForm();
        const access_form = document.getElementById("request_access");
        var formdata = new FormData(access_form);
        let data = {};
        formdata.forEach(function (value, key) {
          data[`values[${key}]`] = value;
        });
        data["_operation"] = "UserRegister";
        data["captcha_value"] = "captchaValue";
        data["ip_address"] = ip;
        data["values[assigned_user_id]"] = "51";
        data["values[leadstatus]"] = "Hot";
        data["values[leadsource]"] = "Portal Request Access";
        data[
          "values[description]"
        ] = `Portal Request Access received on ${date}`;
        // formdata.append("ip_address", ip);

        axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${values.email}:''`)}`,
          },
          url: REACT_APP_API_URL,
          data: JSON.stringify(data),
        })
          .then((res) => {
            setIsLoading(false);
            captchaRef.current.reset();
            if (res.type == "success") {
              // setMsg(res.msg);
              Swal.fire({
                // position: "top-end",
                icon: "success",
                title:
                  "Thank you for your interest in accessing the Ridge Security partner/customer portal. We have received your access request and will now proceed to verify your account information. Please note that portal access is granted to partners who have signed a Non-Disclosure Agreement (NDA) or agreement with Ridge Security, as well as existing Ridge Security customers. If you do not receive the account activation email within 48 hours, kindly reach out to your Ridge Security sales team for further assistance. They will be able to provide you with the necessary support to ensure your access to the portal.",
                showConfirmButton: true,
                // timer: 2000,
              });
              // setLoading(true);
            } else {
              // setMsg(res.msg);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.msg,
              });
              // setLoading(false);
              setIsLoading(false);

              // document.getElementById("alert2").style.display="block"
            }
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      }
    },
  });

  // document.title = "Basic SignUp | VIP Numbers Seller";
  const [captchaValue, setCaptchaValue] = useState("");

  const captchaRef = useRef(null);
  const onChange = (value) => {
    setCaptchaValue(value);
    setLoading(false);
  };

  //email business validation

  const emailRef = useRef(null);
  if (!validation.values.email) {
  } else if (
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(validation.values.email)
  ) {
    var checkEmail = () => {
      var formdata = new FormData();
      formdata.append("_operation", "EmailFilter");
      formdata.append("email", validation.values.email);

      let data = {};
      formdata.forEach(function (value, key) {
        data[key] = value;
      });
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${validation.values.email}:''`)}`,
        },
        url: REACT_APP_API_URL,
        data: JSON.stringify(data),
      }).then((res) => {
        if (res.type == "error") {
          setEmailLoading(true);
          setErrorEmailMsg(res.msg);
        }
        if (res.type == "success") {
          setEmailLoading(false);
        } else {
          setEmailLoading(true);
        }
      });
    };
  }

  return (
    <React.Fragment>
      <div className="auth-page-content">
        <Container>
          <div className="mt-2">
            <Form
              id="request_access"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
              className="needs-validation"
              action="#"
            >
              {/* {loading ? (
                <Alert color="success" id="alert1">
                  {msg}
                </Alert>
              ) : null}
              {!loading ? (
                <Alert color="danger" id="alert2" style={{display:"none"}}>
                  {msg}
                </Alert>
              ) : null} */}

              <input
                name="leadSource"
                type="hidden"
                value={validation.values.leadSource || ""}
              />
              <div className="mb-3">
                <Label htmlFor="email" className="form-label">
                  Email address<span className="text-danger">*</span>
                </Label>
                <Input
                  ref={emailRef}
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                  type="email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  onBlurCapture={checkEmail}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {emailLoading ? (
                  <div
                    style={{
                      fontSize: "0.875em",
                      color: "#f06548",
                    }}
                  >
                    {errorEmailMsg}
                  </div>
                ) : validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.email}</div>
                  </FormFeedback>
                ) : null}
                {/* {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.email}</div>
                  </FormFeedback>
                ) : null} */}
              </div>
              <div className="mb-3">
                <Label htmlFor="firstname" className="form-label">
                  First Name <span className="text-danger">*</span>
                </Label>
                <Input
                  name="firstname"
                  type="text"
                  placeholder="Enter First Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.firstname || ""}
                  invalid={
                    validation.touched.firstname && validation.errors.firstname
                      ? true
                      : false
                  }
                />
                {validation.touched.firstname && validation.errors.firstname ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.firstname}</div>
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="lastname" className="form-label">
                  Last Name <span className="text-danger">*</span>
                </Label>
                <Input
                  name="lastname"
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.lastname || ""}
                  invalid={
                    validation.touched.lastname && validation.errors.lastname
                      ? true
                      : false
                  }
                />
                {validation.touched.lastname && validation.errors.lastname ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.lastname}</div>
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="cf_3012" className="form-label">
                  Job Title
                </Label>
                <Input
                  name="cf_3012"
                  type="text"
                  placeholder="Enter Job Title"
                  onChange={validation.handleChange}
                  value={validation.values.cf_3012 || ""}
                />
              </div>
              <div className="mb-3">
                <Label htmlFor="company" className="form-label">
                  Company <span className="text-danger">*</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  className="form-control"
                  placeholder="Enter Company Name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.company || ""}
                  invalid={
                    validation.touched.company && validation.errors.company
                      ? true
                      : false
                  }
                />
                {validation.touched.company && validation.errors.company ? (
                  <FormFeedback type="invalid">
                    <div>{validation.errors.company}</div>
                  </FormFeedback>
                ) : null}
              </div>
              <ReCAPTCHA
                // className="recaptcha"
                sitekey="6LdNfQMmAAAAANrbrw0N_fHRA_ivroctMzrcVsJn"
                onChange={onChange}
                ref={captchaRef}
              />
              <div id="g-recaptcha-error">
                {check && (
                  <span
                    style={{
                      color: "red",
                      display: captchaValue !== "" ? "none" : "block",
                    }}
                  >
                    Please verify that you are not a robot.
                  </span>
                )}
              </div>
              <div className="mt-4">
                <button
                  className="btn btn-success w-100"
                  type="submit"
                  onClick={() => {
                    setCheck(true);
                    setIsLoading(false);
                  }}
                  disabled={check && isLoading}
                >
                  {check ? (
                    <span className="d-flex align-items-center">
                      <Spinner
                        size="sm"
                        className="flex-shrink-0"
                        style={{
                          display: !isLoading ? "none" : "block",
                        }}
                      >
                        Loading...
                      </Spinner>
                      <span className="flex-grow-1 ms-2">Sign Up</span>
                    </span>
                  ) : (
                    " Sign Up"
                  )}
                </button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RequestAccess;
