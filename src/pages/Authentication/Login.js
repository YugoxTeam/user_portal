import React from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Spinner,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import withRouter from "../../Components/Common/withRouter";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";
const Login = (props) => {
  const { REACT_APP_API_URL } = process.env;
  const navigate = useNavigate();
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

  const phoneRegExp = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );

  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // phoneNo: "",
      // emailId: "",
      username:"",
      password: "",
    },
    validationSchema: Yup.object({
      // emailId: Yup.string()
      //   .email("Email id must be a valid email")
      //   .required("Please Enter Your Email Id"),
      username:Yup.string().required("Please Enter Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      if (captchaValue) {
        const headers = {
          "Content-Type": "application/form-data",
        };

        var formdata = new FormData();
        formdata.append("_operation", "login");
        // formdata.append("mode", "userLogin");
        formdata.append("username", values.username);
        formdata.append("password", values.password);
        formdata.append("captcha_value", captchaValue);
        formdata.append("ip_address", ip);
        formdata.append("postdata", true);

        axios({
          method: "post",
          headers: headers,
          url: REACT_APP_API_URL,
          data:formdata,
          redirect: 'follow'
        })
          .then((res) => {
            // console.log(res);
            if (res.success == true) {

              Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Login successfully",
                showConfirmButton: false,
                timer: 2000,
              });

              localStorage.setItem("Registered_User", JSON.stringify(values));
              localStorage.setItem("session", res.result.login.session);
              localStorage.setItem("ip_add", ip);

              navigate("/dashboard", { replace: true });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text:"Invalid Credentials",
              });
              setLoading(false);
              captchaRef.current["props"]["grecaptcha"].reset();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
       else {
        setLoading(false);
      }
    },
  });

  //toogle password
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  //recapthca value
  const [captchaValue, setCaptchaValue] = useState("");
  const captchaRef = useRef(null);
  const onChange = (value) => {
    setCaptchaValue(value);
  };

  document.title = "Login";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mt-5 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo"></Link>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to Portal.
                      </p>
                    </div>
                    <div className="p-2 mt-1">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                           Username
                          </Label>
                          <Input
                            name="username"
                            className="form-control"
                            placeholder="Enter Username"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              {validation.errors.username}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password}
                              type={passwordType}
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}

                            {validation.values.password !== "" && (
                              <button
                                id="password-addon"
                                type="button"
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                onClick={togglePassword}
                              >
                                {passwordType === "password" ? (
                                  <i className="ri-eye-fill align-middle"></i>
                                ) : (
                                  <i className="ri-eye-fill align-middle"></i>
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <ReCAPTCHA
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

                        <div className="mt-3">
                          <Button
                            color="success"
                            className="btn btn-success w-100"
                            type="submit"
                            onClick={() => {
                              setCheck(true);
                              setLoading(false);
                            }}
                            disabled={check && loading}
                          >
                            {check ? (
                              <span className="d-flex align-items-center">
                                <Spinner
                                  size="sm"
                                  className="flex-shrink-0"
                                  style={{
                                    display: !loading ? "none" : "block",
                                  }}
                                >
                                  Loading...
                                </Spinner>
                                <span className="flex-grow-1 ms-2">
                                  Sign In
                                </span>
                              </span>
                            ) : (
                              " Sign In"
                            )}
                          </Button>
                          <ToastContainer />
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account? &nbsp;
                    <Link
                      to="/register"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
