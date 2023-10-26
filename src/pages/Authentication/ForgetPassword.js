import PropTypes from "prop-types";
import React from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
//redux
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useEffect } from "react";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { ToastContainer, toast } from "react-toastify";
import { userForgetPassword } from "../../slices/auth/forgetpwd/thunk";
import { useState } from "react";
const ForgetPasswordPage = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const dispatch = useDispatch();
  // const [msg, setMsg] = useState("");
  const ip = localStorage.getItem("ip_add")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),

    onSubmit: async (values) => {
      dispatch(userForgetPassword(values, props.history));
      document.getElementById("loader").style.display = "flex";
      // document.getElementById("notSuccess").style.display = "none";
      // document.getElementById("success").style.display = "noen";
      var formdata = new FormData();
      // formdata.append("appKey", REACT_APP_API_KEY);
      formdata.append("_operation", "ForgotPassword");
      // formdata.append("mode", "forgotPassword");
      formdata.append("username", values.email);
      formdata.append("ip_address", ip);


      let data = {};
      formdata.forEach(function (value, key) {
        data[key] = value;
      });

      await axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${values.email}:''`)}`,
        },
        url: REACT_APP_API_URL,
        data: JSON.stringify(data),
      })
        .then((res) => {
          // let notSuccess = document.getElementById("notSuccess");
          // let success = document.getElementById("success");

          if (res.type === "success") {
            Swal.fire({
              // position: "top-end",
              icon: "success",
              title:
                "Thank you for submitting your password reset request. If you have an existing account with us, a new passwordill be sent to the email address you provided. Please make sure to check your spam folder if yodo not see the email in your inbox. If you need further assistance, feel free to reach out to our Ridge Security sales team.",
              showConfirmButton: true,
              timer: 5000,
            });
            // notSuccess.style.display = "none";
            // success.style.display = "block";
            document.getElementById("loader").style.display = "none";

            // setMsg(res.msg);
            // setTimeout(() => {
            //   history.push("/login");
            // }, 1500);
          } else {
            Swal.fire({
              icon: "success",
              showConfirmButton: true,
              timer: 5000,
              title:
                "Thank you for submitting your password reset request. If you have an existing account with us, a new passwordill be sent to the email address you provided. Please make sure to check your spam folder if yodo not see the email in your inbox. If you need further assistance, feel free to reach out to our Ridge Security sales team.",
            });
            // success.style.display = "none";
            // notSuccess.style.display = "block";
            document.getElementById("loader").style.display = "none";

            // setMsg(res.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  // const { forgetError, forgetSuccessMsg } = useSelector((state) => ({
  //   forgetError: state.ForgetPassword.forgetError,
  //   forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  // }));

  // document.title = "RidgeSecurity Reset Password";
  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={"logoLight"} alt="" style={{ height: "70px" }} />
                  </Link>
                </div>
                {/* <p className="mt-3 fs-15 fw-medium">
                  Premium Admin & Dashboard Template
                </p> */}
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">Reset password with CRM</p>

                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                      style={{ width: "120px", height: "120px" }}
                    ></lord-icon>
                  </div>

                  <Alert
                    className="alert-borderless alert-warning text-center mb-3 mx-2"
                    role="alert"
                  >
                    Enter your email and instructions will be sent to you!
                  </Alert>

                  {/* <Alert
                    id="notSuccess"
                    className="alert-borderless alert-danger text-center mb-2 mx-2"
                    role="alert"
                    style={{ display: "none" }}
                  >
                    {msg}
                  </Alert>
                  <Alert
                    id="success"
                    className="alert-borderless alert-success text-center mb-2 mx-2"
                    role="alert"
                    style={{ display: "none" }}
                  >
                    {msg}
                  </Alert> */}
                  <div
                    id="loader"
                    className="spinner-border mx-auto mt-2"
                    role="status"
                    style={{ display: "none" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>

                  <div className="p-2">
                    {/* {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null} */}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.email}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          {/* {!loading ? ( */}
                          Send Reset Link
                          {/* ) : (
                            <span className="spinner-grow spinner-grow-sm"></span>
                          )} */}
                        </button>
                        <ToastContainer />
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Click here to login
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default ForgetPasswordPage;
