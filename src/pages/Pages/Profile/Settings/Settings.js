// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardBody,
//   FormFeedback,
//   CardHeader,
//   Col,
//   Container,
//   Form,
//   Input,
//   Label,
//   Nav,
//   NavItem,
//   NavLink,
//   Row,
//   TabContent,
//   TabPane,
// } from "reactstrap";
// import classnames from "classnames";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// //import images
// const { REACT_APP_API_URL } = process.env;
// import { ToastContainer } from "react-toastify";
// import Loader from "../../../../Components/Common/Loader";
// // import "../../../components/ProofOfConcept/loader.css";
// import ProfileDropdown from "../../../../Components/Common/ProfileDropdown";
// // import { decryptData } from '../../../Authentication/DecryptionFunc';
// const Settings = () => {
//   const [contactDetails, setContactDetails] = useState([]);
//   const [contactField, setContactField] = useState([]);
//   const [orgField, setOrgField] = useState([]);
//   const [orgDetails, setOrgDetails] = useState([]);
//   const [countryField, setCountryField] = useState([]);
//   const [countryDetails, setCountryDetails] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   // const [refreshCount, setRefreshCount] = useState(0);
//   const ip = localStorage.getItem("ip_add")

//   const [loadDoc, setLoadDoc] = useState("");
//   const value = JSON.parse(localStorage.getItem("Registered_User"));
//   // const value =  JSON.parse(decryptData("Registered_User"))
//   const user_email = value.emailId;
//   const user_pass = value.password;
//   useEffect(() => {
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
//     };

//     var formdata = new FormData();
//     formdata.append("_operation", "FetchProfile");
//     // formdata.append("mode", "userProfile");
//     formdata.append("username", user_email);
//     formdata.append("password", user_pass);
//     formdata.append("token", localStorage.getItem("token"));
//     formdata.append("ip_address", ip);

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
//         setIsLoading(true);
//         // console.log(res)
//         if (res.success == true) {
//           setIsLoading(true);
//           //**field label */
//           setContactField([res.result.field_contact]);
//           setOrgField([res.result.fields_account]);
//           setCountryField([res.result.fields_country]);
//           //** details */
//           setContactDetails([res.result.contact]);
//           setOrgDetails([res.result.organization]);
//           setCountryDetails([res.result.country]);
//         } else {
//           setIsLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [loadDoc]);

//   const getContactLabel = (fname) => {
//     if (typeof contactField[0][fname] !== "undefined") {
//       return contactField[0][fname]["label"];
//     }
//     return fname;
//   };
//   const getOrgLabel = (fname) => {
//     if (typeof orgField[0][fname] !== "undefined") {
//       return orgField[0][fname]["label"];
//     }
//     return fname;
//   };
//   const getCountryLabel = (fname) => {
//     if (typeof countryField[0][fname] !== "undefined") {
//       return countryField[0][fname]["label"];
//     }
//     return fname;
//   };
//   //** selected details */
//   const personal_details = [
//     "firstname",
//     "lastname",
//     "cf_920",
//     "account_id",
//     "email",
//     "title",
//     "cf_922",
//     "assigned_user_id",
//     "cf_1672",
//     "cf_1321",
//     "cf_1265",
//     "cf_1008",
//     "cf_1010",
//     "cf_1616",
//     "cf_2032",
//     "cf_2034",
//     "cf_2036",
//     "cf_2038",
//   ];
//   const org_details = [
//     "accountname",
//     "assigned_user_id",
//     "cf_1670",
//     "accounttype",
//     "cf_2627",
//     "cf_990",
//     "cf_992",
//     "cf_996",
//     "cf_998",
//     "cf_1000",
//     "cf_1004",
//     "cf_1002",
//     "cf_864",
//     "cf_870",
//     "cf_876",
//     "cf_1610",
//     "cf_2025",
//   ];
//   const country_details = [
//     "countrycodename",
//     "cf_1634",
//     "cf_1636",
//     "cf_1638",
//     "cf_1640",
//     "cf_1822",
//     "cf_1646",
//     "cf_1648",
//     "cf_1684",
//     "cf_1686",
//   ];
//   const profile_main = ["cf_920", "cf_922"];

//   const [activeTab, setActiveTab] = useState("1");
//   const tabChange = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   //**change password */
//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       newPassword: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       newPassword: Yup.string().required("Please Enter Your New Password"),
//       confirmPassword: Yup.string()
//         .required("Please Confirm Your Password")
//         .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
//     }),
//     onSubmit: (values, action) => {
     
//       var formdata = new FormData();
//       formdata.append("_operation", "ChangePassword");
//       formdata.append("newPassword", values.newPassword);
//       formdata.append("password", user_pass);
//       formdata.append("username", user_email);
//       formdata.append("token", localStorage.getItem("token"));
//       formdata.append("ip_address", ip);
//       let data = {};
//       formdata.forEach(function (value, key) {
//         data[key] = value;
//       });
//       // return
//       axios({
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
//         },
//         url: REACT_APP_API_URL,
//         data: JSON.stringify(data),
//         redirect: "follow",
//       })
//         .then((res) => {
//           if (res.type == "success") {
//             Swal.fire({
//               // position: "top-end",
//               icon: "success",
//               title: res.msg,
//               showConfirmButton: false,
//               timer: 2000,
//             });
//             const updatedUserData = JSON.parse(localStorage.getItem("Registered_User"));
//             updatedUserData.password = values["newPassword"];
          
//             // Stringify the object back to JSON
//             const updatedUserDataString = JSON.stringify(updatedUserData);
          
//             // Update the data in local storage
//             localStorage.setItem("Registered_User", updatedUserDataString);
//             action.resetForm();
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: res.msg,
//             });
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     },
//   });
//   //toogle password
//   const [passwordType, setPasswordType] = useState("password");
//   const [passwordType1, setPasswordType1] = useState("password");
//   const togglePassword = () => {
//     if (passwordType === "password") {
//       setPasswordType("text");
//       return;
//     }
//     setPasswordType("password");
//   };
//   const togglePassword1 = () => {
//     if (passwordType1 === "password") {
//       setPasswordType1("text");
//       return;
//     }
//     setPasswordType1("password");
//   };
//   document.title = "Profile Settings";

//   const handleProfileChange = (event) => {
//     setIsLoading(false);
//     const file = event.target.files[0];

//     // Validate file format
//     const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
//     if (file) {
//       if (allowedFormats.includes(file.type)) {
//         var formdata1 = new FormData();
//         formdata1.append("_operation", "SaveRecord");
//         formdata1.append("username", user_email);
//         formdata1.append("password", user_pass);
//         formdata1.append("module", "Contacts");
//         formdata1.append("attachmentType", "Image");
//         formdata1.append(
//           "recordId",
//           `12x${localStorage.getItem("contact_id")}`
//         );
//         formdata1.append("ip_address", ip);
//         formdata1.append("file", file);
//         formdata1.append("token", localStorage.getItem("token"));
//         axios({
//           method: "post",
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
//           },
//           url: REACT_APP_API_URL,
//           data: formdata1,
//         })
//           .then((res) => {
//             setIsLoading(true);
//             // console.log(res);
//             if (res.success == true) {
//               // setRefreshCount(refreshCount + 1);
//               setIsLoading(true);
//               // window.location.reload()
//               setLoadDoc((old) => [...old, "true"]);
//               localStorage.setItem("profile_img_change",loadDoc)
//             } else {
//               setIsLoading(false);
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//         // Handle the valid file
//       } else {
//         // Handle invalid file format
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Invalid file format. Please select a PNG, JPEG, or JPG file.",
//         });
//         event.target.value = null;
//       }
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <div className="position-relative mx-n4 mt-n4">
//             <div className="profile-wid-bg profile-setting-img">
//               {/* <img src={progileBg} className="profile-wid-img" alt="" /> */}
//               <div className="overlay-content">
//                 <div className="text-end p-3">
//                   <div className="p-0 ms-auto rounded-circle profile-photo-edit">
//                     <Input
//                       id="profile-foreground-img-file-input"
//                       type="file"
//                       className="profile-foreground-img-file-input"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Row>
//             <Col xxl={3}>
//               <Card className="mt-n5">
//                 <CardBody className="p-4">
//                   <div className="text-center">
//                     <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
//                       <img
//                         style={{ width: "200px", height: "200px" }}
//                         src={
//                           contactDetails[0] &&
//                           contactDetails[0].imagedata !== null
//                             ? `data:${contactDetails[0].imagetype};base64,${contactDetails[0].imagedata}`
//                             : ""
//                         }
//                         className="rounded-circle avatar-xl img-thumbnail user-profile-image"
//                         alt="user-profile"
//                       />
//                       {!isLoading && (
//                         <div
//                           className="icon-container"
//                           style={{
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                             transform: "translate(-50%, -50%)",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: "100%",
//                             height: "100%",
//                           }}
//                         >
//                           <i className="loader"></i>
//                         </div>
//                       )}
//                       <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
//                         <Input
//                           id="profile-img-file-input"
//                           type="file"
//                           className="profile-img-file-input"
//                           accept=".png,.jpeg,.jpg"
//                           onChange={handleProfileChange}
//                         />
//                         <Label
//                           htmlFor="profile-img-file-input"
//                           className="profile-photo-edit avatar-xs"
//                         >
//                           <span className="avatar-title rounded-circle bg-light text-body">
//                             <i
//                               className="ri-camera-fill"
//                               // onClick={handleUploadDoc}
//                             ></i>
//                           </span>
//                         </Label>
//                       </div>
//                     </div>
//                     {contactDetails[0] ? (
//                       profile_main.map((key) => (
//                         <div className="" key={key}>
//                           <span>{getContactLabel(key)} : </span>
//                           <span>
//                             {contactDetails[0][key]["label"] ||
//                               contactDetails[0][key]}
//                           </span>
//                         </div>
//                       ))
//                     ) : (
//                       <Loader />
//                     )}
//                   </div>
//                 </CardBody>
//               </Card>

//               <Card>
//                 <CardBody>
//                   <div className="d-flex align-items-center mb-3">
//                     <div className="flex-grow-1">
//                       <h6 className="card-title mb-0">
//                         Organization Details -
//                       </h6>
//                     </div>
//                   </div>
//                   {orgDetails[0] &&
//                     org_details.slice(0, 3).map((key) => (
//                       <div className="d-flex" key={key}>
//                         <span>{getOrgLabel(key)}</span>-
//                         <div>
//                           <span style={{ fontWeight: "200" }}>
//                             {orgDetails[0][key]["label"] || orgDetails[0][key]}
//                           </span>{" "}
//                           <br />
//                         </div>
//                       </div>
//                     ))}
//                 </CardBody>
//               </Card>
//               <Card>
//                 <CardBody>
//                   <div className="d-flex align-items-center mb-3">
//                     <div className="flex-grow-1">
//                       <h6 className="card-title mb-0">Country Details -</h6>
//                     </div>
//                   </div>
//                   {countryDetails[0] &&
//                     country_details.slice(0, 3).map((key) => (
//                       <div className="d-flex" key={key}>
//                         <span>{getCountryLabel(key)}</span>-
//                         <div>
//                           <span style={{ fontWeight: "200" }}>
//                             {countryDetails[0][key]["label"] ||
//                               countryDetails[0][key]}
//                           </span>{" "}
//                           <br />
//                         </div>
//                       </div>
//                     ))}
//                 </CardBody>
//               </Card>
//             </Col>

//             <Col xxl={9}>
//               <Card className="mt-xxl-n5">
//                 <CardHeader>
//                   <Nav
//                     className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
//                     role="tablist"
//                   >
//                     <NavItem>
//                       <NavLink
//                         className={classnames({ active: activeTab === "1" })}
//                         type="button"
//                         onClick={() => {
//                           tabChange("1");
//                         }}
//                       >
//                         <i className="fas fa-home"></i>
//                         Personal Details
//                       </NavLink>
//                     </NavItem>
//                     <NavItem>
//                       <NavLink
//                         to="#"
//                         className={classnames({ active: activeTab === "2" })}
//                         onClick={() => {
//                           tabChange("2");
//                         }}
//                         type="button"
//                       >
//                         <i className="far fa-user"></i>
//                         Org Details
//                       </NavLink>
//                     </NavItem>
//                     <NavItem>
//                       <NavLink
//                         to="#"
//                         className={classnames({ active: activeTab === "3" })}
//                         onClick={() => {
//                           tabChange("3");
//                         }}
//                         type="button"
//                       >
//                         <i className="far fa-envelope"></i>
//                         Country Details
//                       </NavLink>
//                     </NavItem>
//                     <NavItem>
//                       <NavLink
//                         to="#"
//                         className={classnames({ active: activeTab === "4" })}
//                         onClick={() => {
//                           tabChange("4");
//                         }}
//                         type="button"
//                       >
//                         <i className="far fa-envelope"></i>
//                         Change Password
//                       </NavLink>
//                     </NavItem>
//                   </Nav>
//                 </CardHeader>
//                 <CardBody className="p-4">
//                   <TabContent activeTab={activeTab}>
//                     <div
//                       id="loader"
//                       className="spinner-border mx-auto mt-2"
//                       role="status"
//                       style={{ display: "none" }}
//                     >
//                       <span className="sr-only">Loading...</span>
//                     </div>
//                     <TabPane tabId="1">
//                       <Form>
//                         <Row>
//                           {contactDetails[0] ? (
//                             personal_details.map((key) => (
//                               <Col lg={6} key={key}>
//                                 <div className="mb-3">
//                                   <Label
//                                     htmlFor={`${key}Input`}
//                                     className="form-label"
//                                   >
//                                     {getContactLabel(key)}
//                                   </Label>
//                                   <Input
//                                     type="text"
//                                     className="form-control"
//                                     id={`${key}Input`}
//                                     value={
//                                       key == "cf_1321" || key == "cf_1265"
//                                         ? Boolean(
//                                             Number(contactDetails[0][key])
//                                           ) == false
//                                           ? "No"
//                                           : "Yes"
//                                         : contactDetails[0][key]["label"] ||
//                                           contactDetails[0][key] ||
//                                           ""
//                                     }
//                                     readOnly
//                                   />
//                                 </div>
//                               </Col>
//                             ))
//                           ) : (
//                             <Loader />
//                           )}
//                         </Row>
//                       </Form>
//                     </TabPane>

//                     <TabPane tabId="4">
//                       <Form
//                         onSubmit={(e) => {
//                           e.preventDefault();
//                           validation.handleSubmit();
//                           return false;
//                         }}
//                       >
//                         <Row className="g-2">
//                           <Col lg={4}>
//                             <div>
//                               <Label
//                                 htmlFor="newPassword"
//                                 className="form-label"
//                               >
//                                 New Password{" "}
//                                 <span className="text-danger">*</span>
//                               </Label>
//                               <div className="position-relative auth-pass-inputgroup mb-3">
//                                 <Input
//                                   // id="email"
//                                   name="newPassword"
//                                   className="form-control"
//                                   placeholder="Enter New Password"
//                                   type={passwordType}
//                                   onChange={validation.handleChange}
//                                   onBlur={validation.handleBlur}
//                                   value={validation.values.newPassword || ""}
//                                   invalid={
//                                     validation.touched.newPassword &&
//                                     validation.errors.newPassword
//                                       ? true
//                                       : false
//                                   }
//                                 />
//                                 {validation.touched.newPassword &&
//                                 validation.errors.newPassword ? (
//                                   <FormFeedback type="invalid">
//                                     <div>{validation.errors.newPassword}</div>
//                                   </FormFeedback>
//                                 ) : null}
//                                 {validation.values.newPassword !== "" && (
//                                   <button
//                                     id="password-addon"
//                                     type="button"
//                                     className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
//                                     onClick={togglePassword}
//                                   >
//                                     {passwordType === "password" ? (
//                                       <i className="ri-eye-fill align-middle"></i>
//                                     ) : (
//                                       <i className="ri-eye-fill align-middle"></i>
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </Col>

//                           <Col lg={4}>
//                             <div>
//                               <Label
//                                 htmlFor="confirmPassword"
//                                 className="form-label"
//                               >
//                                 Confirm Password{" "}
//                                 <span className="text-danger">*</span>
//                               </Label>
//                               <div className="position-relative auth-pass-inputgroup mb-3">
//                                 <Input
//                                   // id="email"
//                                   name="confirmPassword"
//                                   className="form-control"
//                                   placeholder="Confirm Password"
//                                   type={passwordType1}
//                                   onChange={validation.handleChange}
//                                   onBlur={validation.handleBlur}
//                                   value={
//                                     validation.values.confirmPassword || ""
//                                   }
//                                   invalid={
//                                     validation.touched.confirmPassword &&
//                                     validation.errors.confirmPassword
//                                       ? true
//                                       : false
//                                   }
//                                 />
//                                 {validation.touched.confirmPassword &&
//                                 validation.errors.confirmPassword ? (
//                                   <FormFeedback type="invalid">
//                                     <div>
//                                       {validation.errors.confirmPassword}
//                                     </div>
//                                   </FormFeedback>
//                                 ) : null}
//                                 {validation.values.confirmPassword !== "" && (
//                                   <button
//                                     id="password-addon"
//                                     type="button"
//                                     className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
//                                     onClick={togglePassword1}
//                                   >
//                                     {passwordType1 === "password" ? (
//                                       <i
//                                         className="ri-eye-fill align-middle"
//                                         style={{
//                                           marginRight:
//                                             validation.touched
//                                               .confirmPassword &&
//                                             validation.errors.confirmPassword
//                                               ? "15px"
//                                               : "0px",
//                                         }}
//                                       ></i>
//                                     ) : (
//                                       <i
//                                         className="ri-eye-fill align-middle"
//                                         style={{
//                                           marginRight:
//                                             validation.touched
//                                               .confirmPassword &&
//                                             validation.errors.confirmPassword
//                                               ? "15px"
//                                               : "0px",
//                                         }}
//                                       ></i>
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </Col>

//                           <Col lg={12}>
//                             <div className="text-end">
//                               <button type="submit" className="btn btn-success">
//                                 Change Password
//                               </button>
//                             </div>
//                             <ToastContainer />
//                           </Col>
//                         </Row>
//                       </Form>
//                     </TabPane>

//                     <TabPane tabId="2">
//                       <form>
//                         <div id="newlink">
//                           <div id="1">
//                             <Row>
//                               {orgDetails[0] &&
//                               Object.keys(countryDetails[0]).length > 0 ? (
//                                 org_details.map((key) => (
//                                   <Col lg={6} key={key}>
//                                     <div className="mb-3">
//                                       <Label
//                                         htmlFor={`${key}Input`}
//                                         className="form-label"
//                                       >
//                                         {getOrgLabel(key)}
//                                       </Label>
//                                       <Input
//                                         type="text"
//                                         className="form-control"
//                                         id={`${key}Input`}
//                                         value={
//                                           key !== "cf_876"
//                                             ? orgDetails[0][key]["label"] ||
//                                               orgDetails[0][key] ||
//                                               ""
//                                             : parseFloat(orgDetails[0][key])
//                                         }
//                                         readOnly
//                                       />
//                                     </div>
//                                   </Col>
//                                 ))
//                               ) : (
//                                 <div className="d-flex justify-content-center">
//                                   No record found
//                                 </div>
//                               )}
//                             </Row>
//                           </div>
//                         </div>
//                         <div id="newForm" style={{ display: "none" }}></div>
//                       </form>
//                     </TabPane>

//                     <TabPane tabId="3">
//                       <Form>
//                         <Row>
//                           {countryDetails[0] &&
//                           Object.keys(countryDetails[0]).length > 0 ? (
//                             country_details.map((key) => (
//                               <Col lg={6} key={key}>
//                                 <div className="mb-3">
//                                   <Label
//                                     htmlFor={`${key}Input`}
//                                     className="form-label"
//                                   >
//                                     {getCountryLabel(key)}
//                                   </Label>
//                                   <Input
//                                     type="text"
//                                     className="form-control"
//                                     id={`${key}Input`}
//                                     value={
//                                       countryDetails[0][key]["label"] ||
//                                       countryDetails[0][key] ||
//                                       ""
//                                     }
//                                     readOnly
//                                   />
//                                 </div>
//                               </Col>
//                             ))
//                           ) : (
//                             <div className="d-flex justify-content-center">
//                               No record found
//                             </div>
//                           )}
//                         </Row>
//                       </Form>
//                     </TabPane>
//                   </TabContent>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Settings;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  FormFeedback,
} from "reactstrap";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import * as Yup from "yup";
//import images
import progileBg from "../../../../assets/images/profile.jpg";
import avatar1 from "../../../../assets/images/avtar.jpg";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [loading, setLoading] = useState(true);
  const hiddenIDS = useRef();

  //**update profile */

  const UpdateProfile = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstName: "",
      lastName: "",
      phoneNum:  "",
      emailId:  "",
      skills: "",
      designation: "",
      website: "",
      city: "",
      country: "",
      zipCode: "",
    },
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
      setLoading(true);
      // console.log(loading);
    },
  });

  //**change password */
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Please Enter Your New Password"),
      confirmPassword: Yup.string()
        .required("Please Confirm Your Password")
        .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
    }),
    onSubmit: (values, action) => {
      action.resetForm();
      // var formdata = new FormData();
      // formdata.append("appKey", "fde528f59ba1fdf9541d830407066862");
      // formdata.append("_operation", "GetDetails");
      // formdata.append("mode", "changePassword");
      // formdata.append("fieldadvisorid", hiddenIDS.current);
      // formdata.append("password", values.newPassword);

      // axios({
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   url: "http://q-mktops.com/idspl/modules/CertificatePortal/api.php",
      //   data: formdata,
      // })
      //   .then((res) => {
      //     // console.log("all ok");
      //     toast.success("Password change successfully", {
      //       position: toast.POSITION.TOP_CENTER,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  });

  document.title = "Profile Settings | VIP Numbers Seller";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img src={progileBg} className="profile-wid-img" alt="" />
              <div className="overlay-content">
                <div className="text-end p-3">
                  {/* <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                    />
                    <Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light"
                    >
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </Label>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  {/* {userDetails.map((items) => {
                    return ( */}
                      <div className="text-center" >
                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                          <img
                            src={avatar1}
                            className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                            alt="user-profile"
                          />
                          <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                            <Input
                              id="profile-img-file-input"
                              type="file"
                              className="profile-img-file-input"
                            />
                            <Label
                              htmlFor="profile-img-file-input"
                              className="profile-photo-edit avatar-xs"
                            >
                              <span className="avatar-title rounded-circle bg-light text-body">
                                <i className="ri-camera-fill"></i>
                              </span>
                            </Label>
                          </div>
                        </div>
                        <h5 className="fs-16 mb-1">Test</h5>
                        <p className="text-muted mb-0">
                          Lead Designer / Developer
                        </p>
                      </div>
                    {/* );
                  })} */}
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="d-flex align-items-center mb-5">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Complete Your Profile</h5>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        to="#"
                        className="badge bg-light text-primary fs-12"
                      >
                        <i className="ri-edit-box-line align-bottom me-1"></i>{" "}
                        Edit
                      </Link>
                    </div>
                  </div>
                  <div className="progress animated-progress custom-progress progress-label">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "30%" }}
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div className="label">30%</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Portfolio</h5>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        to="#"
                        className="badge bg-light text-primary fs-12"
                      >
                        <i className="ri-add-fill align-bottom me-1"></i> Add
                      </Link>
                    </div>
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                        <i className="ri-github-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="email"
                      className="form-control"
                      id="gitUsername"
                      placeholder="@daveadame"
                      // defaultValue="@daveadame"
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-primary">
                        <i className="ri-global-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="websiteInput"
                      placeholder="www.example.com"
                      // defaultValue="www.velzon.com"
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-success">
                        <i className="ri-dribbble-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="dribbleName"
                      placeholder="@dave_adame"
                      // defaultValue="@dave_adame"
                    />
                  </div>
                  <div className="d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-danger">
                        <i className="ri-pinterest-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="pinterestName"
                      placeholder="Advance Dave"
                      // defaultValue="Advance Dave"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}
                      >
                        <i className="fas fa-home"></i>
                        Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          tabChange("2");
                        }}
                        type="button"
                      >
                        <i className="far fa-user"></i>
                        Change Password
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          tabChange("3");
                        }}
                        type="button"
                      >
                        <i className="far fa-envelope"></i>
                        Experience
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "4" })}
                        onClick={() => {
                          tabChange("4");
                        }}
                        type="button"
                      >
                        <i className="far fa-envelope"></i>
                        Privacy Policy
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Form onSubmit={UpdateProfile.handleSubmit}>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label"
                              >
                                UserName
                              </Label>
                              <Input
                                type="text"
                                name="firstName"
                                className="form-control"
                                id="firstnameInput"
                                placeholder="Dave"
                                // onChange={UpdateProfile.handleChange}
                                // value={
                                //   !loading
                                //     ? labelStr
                                //     : UpdateProfile.values.firstName
                                // }
                              />
                            </div>
                          </Col>
                          {/* <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="lastnameInput"
                                className="form-label"
                              >
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                name="lastName"
                                className="form-control"
                                id="lastnameInput"
                                placeholder="Adame"
                                onChange={UpdateProfile.handleChange}
                                value={UpdateProfile.values.lastName}
                              />
                            </div>
                          </Col> */}
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="phonenumberInput"
                                className="form-label"
                              >
                                Phone Number
                              </Label>
                              <Input
                                type="text"
                                name="phoneNum"
                                className="form-control"
                                id="phonenumberInput"
                                placeholder="+(1) 987 6543"
                                // onChange={UpdateProfile.handleChange}
                                // value={
                                //   !loading
                                //     ? phoneStr
                                //     : UpdateProfile.values.phoneNum
                                // }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="emailInput"
                                className="form-label"
                              >
                                Email Address
                              </Label>
                              <Input
                                type="email"
                                name="emailId"
                                className="form-control"
                                id="emailInput"
                                placeholder="daveadame@velzon.com"
                                // onChange={UpdateProfile.handleChange}
                                // value={
                                //   !loading
                                //     ? emailStr
                                //     : UpdateProfile.values.emailId
                                // }
                              />
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="skillsInput"
                                className="form-label"
                              >
                                Skills
                              </Label>
                              <select
                                name="skills"
                                // value={UpdateProfile.values.skills}
                                // onChange={UpdateProfile.handleChange}
                                className="form-select mb-3"
                              >
                                <option>Select your Skill </option>
                                <option value="CSS">CSS</option>
                                <option value="HTML">HTML</option>
                                <option value="PYTHON">PYTHON</option>
                                <option value="JAVA">JAVA</option>
                                <option value="ASP.NET">ASP.NET</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="designationInput"
                                className="form-label"
                              >
                                Designation
                              </Label>
                              <Input
                                type="text"
                                name="designation"
                                className="form-control"
                                id="designationInput"
                                placeholder="Designation"
                                // value={UpdateProfile.values.designation}
                                // onChange={UpdateProfile.handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="websiteInput1"
                                className="form-label"
                              >
                                Website
                              </Label>
                              <Input
                                type="text"
                                name="website"
                                className="form-control"
                                id="websiteInput1"
                                placeholder="www.example.com"
                                // value={UpdateProfile.values.website}
                                // onChange={UpdateProfile.handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label htmlFor="cityInput" className="form-label">
                                City
                              </Label>
                              <Input
                                type="text"
                                name="city"
                                className="form-control"
                                id="cityInput"
                                // value={UpdateProfile.values.city}
                                // onChange={UpdateProfile.handleChange}
                                placeholder="America"
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label
                                htmlFor="countryInput"
                                className="form-label"
                              >
                                Country
                              </Label>
                              <Input
                                type="text"
                                name="country"
                                className="form-control"
                                id="countryInput"
                                placeholder="Country"
                                // value={UpdateProfile.values.country}
                                // onChange={UpdateProfile.handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Label
                                htmlFor="zipcodeInput"
                                className="form-label"
                              >
                                Zip Code
                              </Label>
                              <Input
                                type="text"
                                name="zipCode"
                                className="form-control"
                                minLength="5"
                                maxLength="6"
                                id="zipcodeInput"
                                placeholder="Enter zipcode"
                                // value={UpdateProfile.values.zipCode}
                                // onChange={UpdateProfile.handleChange}
                              />
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div className="mb-3 pb-2">
                              <Label
                                htmlFor="exampleFormControlTextarea"
                                className="form-label"
                              >
                                Description
                              </Label>
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea"
                                rows="3"
                                placeholder="Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family."
                              ></textarea>
                            </div>
                          </Col>
                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-success"
                              >
                                Cancel
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>

                    <TabPane tabId="2">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row className="g-2">
                          {/* <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="oldpasswordInput" className="form-label">Old
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="oldpasswordInput"
                                                                placeholder="Enter current password" />
                                                        </div>
                                                    </Col> */}

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="newPassword"
                                className="form-label"
                              >
                                New Password{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                // id="email"
                                name="newPassword"
                                className="form-control"
                                placeholder="Enter New Password"
                                type="password"
                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={validation.values.newPassword || ""}
                                invalid={
                                  validation.touched.newPassword &&
                                  validation.errors.newPassword
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.newPassword &&
                              validation.errors.newPassword ? (
                                <FormFeedback type="invalid">
                                  <div>{validation.errors.newPassword}</div>
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="confirmPassword"
                                className="form-label"
                              >
                                Confirm Password{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                // id="email"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                type="password"
                                // onChange={validation.handleChange}
                                // onBlur={validation.handleBlur}
                                // value={validation.values.confirmPassword || ""}
                                invalid={
                                  validation.touched.confirmPassword &&
                                  validation.errors.confirmPassword
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.confirmPassword &&
                              validation.errors.confirmPassword ? (
                                <FormFeedback type="invalid">
                                  <div>{validation.errors.confirmPassword}</div>
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="mb-3">
                              <Link
                                to="forgot-password"
                                className="link-primary text-decoration-underline"
                              >
                                Forgot Password ?
                              </Link>
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="text-end">
                              <button type="submit" className="btn btn-success">
                                Change Password
                              </button>
                              <ToastContainer />
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      {/* <div className="mt-4 mb-3 border-bottom pb-2">
                        <div className="float-end">
                          <Link to="#" className="link-primary">
                            All Logout
                          </Link>
                        </div>
                        <h5 className="card-title">Login History</h5>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-smartphone-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>iPhone 12 Pro</h6>
                          <p className="text-muted mb-0">
                            Los Angeles, United States - March 16 at 2:47PM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-tablet-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Apple iPad Pro</h6>
                          <p className="text-muted mb-0">
                            Washington, United States - November 06 at 10:43AM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-smartphone-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Galaxy S21 Ultra 5G</h6>
                          <p className="text-muted mb-0">
                            Conneticut, United States - June 12 at 3:24PM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-macbook-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Dell Inspiron 14</h6>
                          <p className="text-muted mb-0">
                            Phoenix, United States - July 26 at 8:10AM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div> */}
                    </TabPane>

                    <TabPane tabId="3">
                      <form>
                        <div id="newlink">
                          <div id="1">
                            <Row>
                              <Col lg={12}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="jobTitle"
                                    className="form-label"
                                  >
                                    Job Title
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="jobTitle"
                                    placeholder="Job title"
                                    defaultValue="Lead Designer / Developer"
                                  />
                                </div>
                              </Col>

                              <Col lg={6}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="companyName"
                                    className="form-label"
                                  >
                                    Company Name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    placeholder="Company name"
                                    defaultValue="Themesbrand"
                                  />
                                </div>
                              </Col>

                              <Col lg={6}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="experienceYear"
                                    className="form-label"
                                  >
                                    Experience Years
                                  </label>
                                  <Row>
                                    <Col lg={5}>
                                      <select
                                        className="form-control"
                                        data-choices
                                        data-choices-search-false
                                        name="experienceYear"
                                        id="experienceYear"
                                      >
                                        <option defaultValue="">
                                          Select years
                                        </option>
                                        <option value="Choice 1">2001</option>
                                        <option value="Choice 2">2002</option>
                                        <option value="Choice 3">2003</option>
                                        <option value="Choice 4">2004</option>
                                        <option value="Choice 5">2005</option>
                                        <option value="Choice 6">2006</option>
                                        <option value="Choice 7">2007</option>
                                        <option value="Choice 8">2008</option>
                                        <option value="Choice 9">2009</option>
                                        <option value="Choice 10">2010</option>
                                        <option value="Choice 11">2011</option>
                                        <option value="Choice 12">2012</option>
                                        <option value="Choice 13">2013</option>
                                        <option value="Choice 14">2014</option>
                                        <option value="Choice 15">2015</option>
                                        <option value="Choice 16">2016</option>
                                        <option value="Choice 17">2017</option>
                                        <option value="Choice 18">2018</option>
                                        <option value="Choice 19">2019</option>
                                        <option value="Choice 20">2020</option>
                                        <option value="Choice 21">2021</option>
                                        <option value="Choice 22">2022</option>
                                      </select>
                                    </Col>

                                    <div className="col-auto align-self-center">
                                      to
                                    </div>

                                    <Col lg={5}>
                                      <select
                                        className="form-control"
                                        data-choices
                                        data-choices-search-false
                                        name="choices-single-default2"
                                      >
                                        <option defaultValue="">
                                          Select years
                                        </option>
                                        <option value="Choice 1">2001</option>
                                        <option value="Choice 2">2002</option>
                                        <option value="Choice 3">2003</option>
                                        <option value="Choice 4">2004</option>
                                        <option value="Choice 5">2005</option>
                                        <option value="Choice 6">2006</option>
                                        <option value="Choice 7">2007</option>
                                        <option value="Choice 8">2008</option>
                                        <option value="Choice 9">2009</option>
                                        <option value="Choice 10">2010</option>
                                        <option value="Choice 11">2011</option>
                                        <option value="Choice 12">2012</option>
                                        <option value="Choice 13">2013</option>
                                        <option value="Choice 14">2014</option>
                                        <option value="Choice 15">2015</option>
                                        <option value="Choice 16">2016</option>
                                        <option value="Choice 17">2017</option>
                                        <option value="Choice 18">2018</option>
                                        <option value="Choice 19">2019</option>
                                        <option value="Choice 20">2020</option>
                                        <option value="Choice 21">2021</option>
                                        <option value="Choice 22">2022</option>
                                      </select>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>

                              <Col lg={12}>
                                <div className="mb-3">
                                  <Label
                                    htmlFor="jobDescription"
                                    className="form-label"
                                  >
                                    Job Description
                                  </Label>
                                  {/* <textarea className="form-control" id="jobDescription"
                                                                    defaultValue=""
                                                                        rows="3"
                                                                        placeholder="Enter description">You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. </textarea> */}
                                </div>
                              </Col>

                              <div className="hstack gap-2 justify-content-end">
                                <Link className="btn btn-success" to="#">
                                  Delete
                                </Link>
                              </div>
                            </Row>
                          </div>
                        </div>
                        <div id="newForm" style={{ display: "none" }}></div>

                        <Col lg={12}>
                          <div className="hstack gap-2">
                            <button type="submit" className="btn btn-success">
                              Update
                            </button>
                            <Link to="#" className="btn btn-primary">
                              Add New
                            </Link>
                          </div>
                        </Col>
                      </form>
                    </TabPane>

                    <TabPane tabId="4">
                      <div className="mb-4 pb-2">
                        <h5 className="card-title text-decoration-underline mb-3">
                          Security:
                        </h5>
                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                          <div className="flex-grow-1">
                            <h6 className="fs-14 mb-1">
                              Two-factor Authentication
                            </h6>
                            <p className="text-muted">
                              Two-factor authentication is an enhanced security
                              meansur. Once enabled, you'll be required to give
                              two types of identification when you log into
                              Google Authentication and SMS are Supported.
                            </p>
                          </div>
                          <div className="flex-shrink-0 ms-sm-3">
                            <Link to="#" className="btn btn-sm btn-primary">
                              Enable Two-facor Authentication
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                          <div className="flex-grow-1">
                            <h6 className="fs-14 mb-1">
                              Secondary Verification
                            </h6>
                            <p className="text-muted">
                              The first factor is a password and the second
                              commonly includes a text with a code sent to your
                              smartphone, or biometrics using your fingerprint,
                              face, or retina.
                            </p>
                          </div>
                          <div className="flex-shrink-0 ms-sm-3">
                            <Link to="#" className="btn btn-sm btn-primary">
                              Set up secondary method
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                          <div className="flex-grow-1">
                            <h6 className="fs-14 mb-1">Backup Codes</h6>
                            <p className="text-muted mb-sm-0">
                              A backup code is automatically generated for you
                              when you turn on two-factor authentication through
                              your iOS or Android Twitter app. You can also
                              generate a backup code on twitter.com.
                            </p>
                          </div>
                          <div className="flex-shrink-0 ms-sm-3">
                            <Link to="#" className="btn btn-sm btn-primary">
                              Generate backup codes
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <h5 className="card-title text-decoration-underline mb-3">
                          Application Notifications:
                        </h5>
                        <ul className="list-unstyled mb-0">
                          <li className="d-flex">
                            <div className="flex-grow-1">
                              <label
                                htmlFor="directMessage"
                                className="form-check-label fs-14"
                              >
                                Direct messages
                              </label>
                              <p className="text-muted">
                                Messages from people you follow
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="directMessage"
                                  defaultChecked
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="desktopNotification"
                              >
                                Show desktop notifications
                              </Label>
                              <p className="text-muted">
                                Choose the option you want as your default
                                setting. Block a site: Next to "Not allowed to
                                send notifications," click Add.
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="desktopNotification"
                                  defaultChecked
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="emailNotification"
                              >
                                Show email notifications
                              </Label>
                              <p className="text-muted">
                                {" "}
                                Under Settings, choose Notifications. Under
                                Select an account, choose the account to enable
                                notifications for.{" "}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="emailNotification"
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="chatNotification"
                              >
                                Show chat notifications
                              </Label>
                              <p className="text-muted">
                                To prevent duplicate mobile notifications from
                                the Gmail and Chat apps, in settings, turn off
                                Chat notifications.
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="chatNotification"
                                />
                              </div>
                            </div>
                          </li>
                          <li className="d-flex mt-2">
                            <div className="flex-grow-1">
                              <Label
                                className="form-check-label fs-14"
                                htmlFor="purchaesNotification"
                              >
                                Show purchase notifications
                              </Label>
                              <p className="text-muted">
                                Get real-time purchase alerts to protect
                                yourself from fraudulent charges.
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="form-check form-switch">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="purchaesNotification"
                                />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="card-title text-decoration-underline mb-3">
                          Delete This Account:
                        </h5>
                        <p className="text-muted">
                          Go to the Data & Privacy section of your profile
                          Account. Scroll to "Your data & privacy options."
                          Delete your Profile Account. Follow the instructions
                          to delete your account :
                        </p>
                        <div>
                          <Input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Enter your password"
                            defaultValue="make@321654987"
                            style={{ maxWidth: "265px" }}
                          />
                        </div>
                        <div className="hstack gap-2 mt-3">
                          <Link to="#" className="btn btn-soft-danger">
                            Close & Delete This Account
                          </Link>
                          <Link to="#" className="btn btn-light">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;

