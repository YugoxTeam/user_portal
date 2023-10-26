import React from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Table,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Spinner,
  Button,
  Input,
} from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import img from "../../../assets/images/faq.png";
import Loader from "../../../Components/Common/Loader";
import SimpleBar from "simplebar-react";
import back from '../../../assets/images/users/back.png'
import he from "he";
const FaqDetails = () => {
  const { REACT_APP_API_URL, REACT_APP_BASE_URL } = process.env;
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  const user_email = value.emailId;
  const user_pass = value.password;
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [faq, setFaq] = useState([]);
  const [FaqDetails, setFaqDetails] = useState([]);
  const [loadUploadDoc, setLoadUploadDoc] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [loadComment, setLoadComment] = useState("");
  const ip = localStorage.getItem("ip_add");

  let { id } = useParams();
  //   console.log(id);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };

    var formdata = new FormData();
    formdata.append("_operation", "FetchRecord");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("module", "RidgeFAQ");
    formdata.append("moduleLabel", "RidgeFAQ");
    formdata.append("recordId", id);
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("type", "details");

    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    axios({
      method: "post",
      headers: headers,
      redirect: "follow",
      url: REACT_APP_API_URL,
      data: JSON.stringify(data),
    })
      .then((res) => {
        if (res.success == true) {
          setLoading(true);
          setFaqDetails(res.result["record"]);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(faq);
  // useEffect(() => {
  //   faq.forEach((item) => {
  //     Object.keys(item).map((items) => {
  //       return Object.keys(item[items]).map((val) => {
  //         return item[items][val].map((value) => {
  //           if (value.id == id) {
  //             setFaqDetails(value);
  //           //   console.log(value);
  //           }
  //         });
  //       });
  //     });
  //   });
  // }, [faq]);

  const handleCommentChange = (val) => {
    setCommentValue(val);
  };
  const [postCommnetLoad, setPostCommnetLoad] = useState(false);
  const [commnetLoading, setCommnetLoading] = useState(true);
  const handleSubmitComment = () => {
    //comment
    var formdata1 = new FormData();
    formdata1.append("_operation", "AddComment");
    formdata1.append("username", user_email);
    formdata1.append("password", user_pass);
    formdata1.append("values[commentcontent]", commentValue);
    formdata1.append("values[related_to]", id);
    formdata1.append("token", localStorage.getItem("token"));
    formdata1.append("ip_address", ip);
    // formdata1.append(
    //   "values[assigned_user_id]",
    //   ticketDetails["assigned_user_id"]["value"]
    // );

    let data1 = {};
    formdata1.forEach(function (value, key) {
      data1[key] = value;
    });
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
      },
      url: REACT_APP_API_URL,
      data: JSON.stringify(data1),
    })
      .then((res) => {
        setCommnetLoading(false);
        // setLoading(true)
        if (res.success == true) {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Comment Add Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          // setLoading(true)
          setCommentValue("");
          setLoadComment((old) => [...old, "true"]);
        } else {
          Swal.fire({
            // position: "top-end",
            icon: "error",
            title: "Oops...",
            text: "Something went wrong",
            showConfirmButton: false,
            timer: 2000,
          });
          setCommnetLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //fetch comment
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };
    var formdata = new FormData();
    formdata.append("_operation", "FetchRelatedRecords");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("module", "RidgeFAQ");
    formdata.append("moduleLabel", "RidgeFAQ");
    formdata.append("relatedModule", "ModComments");
    formdata.append("relatedModuleLabel", "Comments");
    formdata.append("recordId", id);
    formdata.append("mode", "all");
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("ip_address", ip);
    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    axios({
      method: "post",
      headers: headers,
      redirect: "follow",
      url: REACT_APP_API_URL,
      data: JSON.stringify(data),
    })
      .then((res) => {
        // console.log(res);
        if (res.success == true) {
          setComment(res.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loadComment]);
  // console.log(comment);
  // console.log(FaqDetails["assigned_user_id"]);
  //**file uploading */
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [loadDoc, setLoadDoc] = useState("");
  const handleFileChange = (event) => {
    const files = event.target.files;
    // console.log(files[0].size)
    let totalSize = 0;

    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }
    if (
      totalSize > MAX_FILE_SIZE ||
      files.length > 3 ||
      (doc && files.length + doc.length > 3)
    ) {
      setSelectedFiles([]);
      document.getElementById("file-upload").value = "";
      Swal.fire({
        icon: "error",
        title: "File Limit Exceeded",
        text: "You can only upload a maximum of three files with a total size of 10MB.",
      });
    } else {
      const selected = Array.from(files).slice(0, 3); // Limit to three files
      setSelectedFiles(selected);
    }
  };
  // console.log(selectedFiles)

  const handleUploadDoc = () => {
    setDocLoading(false);
    if (selectedFiles !== null) {
      setDocLoading(true);
      var formdata1 = new FormData();
      formdata1.append("_operation", "UploadDocuments");
      formdata1.append("username", user_email);
      formdata1.append("password", user_pass);
      formdata1.append("module", "Documents");
      formdata1.append("parentId", id);
      formdata1.append("contactid", localStorage.getItem("contact_id"));
      formdata1.append("file_count", selectedFiles.length);
      formdata1.append("token", localStorage.getItem("token"));
      formdata1.append("ip_address", ip);
      selectedFiles.forEach((element, index) => {
        formdata1.append("file_" + (index + 1), element);
      });
      formdata1.append(
        "assigned_user_id",
        FaqDetails["assigned_user_id"]["value"]
      );

      axios({
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
        },
        url: REACT_APP_API_URL,
        data: formdata1,
      })
        .then((res) => {
          if (res.success == true) {
            setLoadDoc((old) => [...old, "true"]);
            Swal.fire({
              // position: "top-end",
              icon: "success",
              title: "Successfully Uploaded",
              showConfirmButton: false,
              timer: 2000,
            });
            setDocLoading(true);
            setSelectedFiles(null);
            document.getElementById("file-upload").value = "";
          } else {
            Swal.fire({
              // position: "top-end",
              icon: "error",
              title: "Oops...",
              text: "Something went wrong",
              showConfirmButton: false,
              timer: 2000,
            });
            setSelectedFiles(null);
            setDocLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    handleUploadDoc();
  }, [loadDoc]);

  //fetch upload doc
  const [doc, setDoc] = useState([]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };
    var formdata = new FormData();
    formdata.append("_operation", "FetchRelatedRecords");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("module", "RidgeFAQ");
    formdata.append("moduleLabel", "RidgeFAQ");
    formdata.append("relatedModule", "Documents");
    formdata.append("relatedModuleLabel", "Documents");
    formdata.append("recordId", id);
    formdata.append("mode", "all");
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("ip_address", ip);
    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    axios({
      method: "post",
      headers: headers,
      redirect: "follow",
      url: REACT_APP_API_URL,
      data: JSON.stringify(data),
    })
      .then((res) => {
        // console.log(res);
        if (res.success == true) {
          setDoc(res.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loadDoc]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {loading ? (
            <>
              <Row>
                <Col lg={12}>
                  <Card
                    className="mt-n4 mx-n4 mb-n5"
                    style={{ backgroundColor: "rgb(140, 198, 62)" }}
                  >
                    <div className="bg-soft-warning">
                      <CardBody className="pb-4 mb-5">
                        <Row>
                          <div className="col-md">
                            <Row className="align-items-center">
                              <div className="col-md-auto">
                                <div className="avatar-md mb-md-0 mb-4">
                                  <div className="d-flex">
                                    <Link to="/faq" className="mt-3 me-4 mx-3">
                                      <img
                                        src={back}
                                        style={{ height: "30px" }}
                                      />
                                    </Link>
                                  <div className="mt-3">
                                    <img
                                      src={img}
                                      alt=""
                                      className="avatar-sm"
                                    />
                                  </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md mx-5">
                                <h4
                                  className="fw-semibold"
                                  id="ticket-title"
                                  style={{
                                    color: "black",
                                  }}
                                >
                                  #{FaqDetails.ridgefaq_no} -{" "}
                                  {FaqDetails.ridgefaqname}
                                </h4>
                                <div className="hstack gap-3 flex-wrap">
                                  {/* <div className="text-muted"><i className="ri-building-line align-bottom me-1"></i> <span id="ticket-client">Themesbrand</span></div> */}
                                  {/* <div className="vr"></div> */}
                                  <div className="">
                                    Create Date :{" "}
                                    <span
                                      className="fw-medium"
                                      id="create-date"
                                    >
                                      {FaqDetails.createdtime}
                                    </span>
                                  </div>
                                  {/* <div className="vr"></div> */}
                                  {/* <div className="text-muted">Due Date : <span className="fw-medium" id="due-date">29 Dec, 2021</span></div> */}
                                  {/* <div className="vr"></div> */}
                                  {/* <div className="badge rounded-pill bg-info fs-12" id="ticket-status">New</div>
                                                <div className="badge rounded-pill bg-danger fs-12" id="ticket-priority">High</div> */}
                                </div>
                              </div>
                            </Row>
                          </div>
                          {/* <div className="col-md-auto mt-md-0 mt-4">
                            <div className="hstack gap-1 flex-wrap">
                              <button
                                type="button"
                                className="btn avatar-xs mt-n1 p-0 favourite-btn active"
                              >
                                <span className="avatar-title bg-transparent fs-15">
                                  <i className="ri-star-fill"></i>
                                </span>
                              </button>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  tag="button"
                                  type="button"
                                  className="btn py-0 fs-16 text-body"
                                >
                                  <i className="ri-share-line"></i>
                                </DropdownToggle>

                                <DropdownMenu>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                      View
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-share-forward-fill align-bottom me-2 text-muted"></i>{" "}
                                      Share with
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                      Delete
                                    </DropdownItem>
                                  </li>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                              <button
                                type="button"
                                className="btn py-0 fs-16 text-body"
                              >
                                <i className="ri-flag-line"></i>
                              </button>
                            </div>
                          </div> */}
                        </Row>
                      </CardBody>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xxl={9}>
                  <Card style={{ height: "314px" }}>
                    <CardBody className="p-4">
                      <h6>Question:</h6>
                      <h6 className="fw-semibold text-uppercase mb-3">
                        {FaqDetails.cf_2821}
                      </h6>
                      <h6>Answer:</h6>
                      {/* <p className="text-muted">{he.decode(FaqDetails.cf_2823)}</p> */}
                      <p
                        className="text-muted"
                        dangerouslySetInnerHTML={{
                          __html: he.decode(FaqDetails.cf_2823),
                        }}
                      />{" "}
                      {/* <h6 className="fw-semibold text-uppercase mb-3">
                    Create an Excellent UI for a Dashboard
                  </h6>
                  <ul className="text-muted vstack gap-2 mb-4">
                    <li>Pick a Dashboard Type</li>
                    <li>Categorize information when needed</li>
                    <li>Provide Context</li>
                    <li>On using colors</li>
                    <li>On using the right graphs</li>
                  </ul>
                  <div className="mt-4">
                    <h6 className="fw-semibold text-uppercase mb-3">
                      Here is the code you've requsted
                    </h6>
                  </div> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col xxl={3}>
                  <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">FAQ Details</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="table-responsive table-card">
                        <Table className="table-borderless align-middle mb-0">
                          <tbody>
                            <tr>
                              <td className="fw-medium">FAQ No.</td>
                              <td>
                                <span id="t-no">{FaqDetails.ridgefaq_no}</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Product</td>
                              <td id="t-client">{FaqDetails.cf_2815}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Category</td>
                              <td>{FaqDetails.cf_2817}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Created Time</td>
                              <td id="c-date">{FaqDetails.createdtime}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Modified Time</td>
                              <td id="d-date">{FaqDetails.modifiedtime}</td>
                            </tr>
                            <tr>
                              <td className="fw-medium">Keywords</td>
                              <td>{FaqDetails.cf_2825}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  {loading && (
                    <Card>
                      <CardHeader className="align-items-center bg-soft-info d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">
                          Comments
                        </h4>
                        <div className="flex-shrink-0">
                          <UncontrolledDropdown className="card-header-dropdown">
                            <DropdownToggle
                              tag="a"
                              className="text-reset dropdown-btn"
                            >
                              {/* <span className="text-muted">
                            Recent<i className="mdi mdi-chevron-down ms-1"></i>
                          </span> */}
                            </DropdownToggle>
                            {/* <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem>Recent</DropdownItem>
                          <DropdownItem>Top Rated</DropdownItem>
                          <DropdownItem>Previous</DropdownItem>
                        </DropdownMenu> */}
                          </UncontrolledDropdown>
                        </div>
                      </CardHeader>

                      <CardBody>
                        <SimpleBar
                          style={{ height: "300px" }}
                          className="px-3 mx-n3 mb-2"
                        >
                          {comment &&
                            comment.map((item, i) => {
                              return (
                                <div className="d-flex mb-4" key={i}>
                                  <div className="flex-shrink-0">
                                    {/* <img
                                  src={avatar8}
                                  alt=""
                                  className="avatar-xs rounded-circle"
                                /> */}
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <h5 className="fs-13">
                                      {item.customer === ""
                                        ? item.creator["label"] || item.creator
                                        : item.customer["label"]}
                                      <small className="text-muted ms-2">
                                        {item.createdtime}
                                      </small>
                                    </h5>
                                    <p className="text-muted">
                                      {item.commentcontent}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </SimpleBar>
                        <form className="">
                          <Row className="g-3">
                            <Col xs={12}>
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label text-body"
                              >
                                Leave a Comments
                              </label>
                              <textarea
                                className="form-control bg-light border-light"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Enter your comment..."
                                value={commentValue || ""}
                                onChange={(e) => {
                                  handleCommentChange(e.target.value);
                                }}
                              ></textarea>
                            </Col>
                            <Col xs={12} className="text-end">
                              {/* <button
                            type="button"
                            className="btn btn-ghost-secondary btn-icon waves-effect me-1"
                          >
                            <i className="ri-attachment-line fs-16"></i>
                          </button> */}
                              <Button
                                to="#"
                                className="btn btn-success"
                                onClick={() => {
                                  handleSubmitComment();
                                  setPostCommnetLoad(true);
                                  setCommnetLoading(true);
                                }}
                                disabled={postCommnetLoad && commnetLoading}
                              >
                                {postCommnetLoad ? (
                                  <span className="d-flex align-items-center">
                                    <Spinner
                                      size="sm"
                                      className="flex-shrink-0"
                                      style={{
                                        display: !commnetLoading
                                          ? "none"
                                          : "block",
                                      }}
                                    >
                                      Posting...
                                    </Spinner>
                                    <span className="flex-grow-1 ms-2">
                                      Post Comments
                                    </span>
                                  </span>
                                ) : (
                                  "Post Comments"
                                )}
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </CardBody>
                    </Card>
                  )}
                </Col>
                <Col lg={6}>
                  {loading && (
                    <Card
                      style={{
                        height: doc && doc.length >= 10 ? "565px" : "",
                        overflowY: "auto",
                      }}
                    >
                      <CardHeader className="align-items-center d-flex border-bottom-dashed">
                        <h4 className="card-title mb-0 flex-grow-1 me-3">
                          Attachments
                        </h4>
                        <div className="flex-shrink-0 d-flex ">
                          <Input
                            id="file-upload"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="me-2"
                            // onClick={handleUploadDoc}
                          />
                          <Button
                            type="button"
                            color="primary"
                            className="btn btn-load btn-soft-info btn-sm"
                            onClick={handleUploadDoc}
                            disabled={docLoading}
                          >
                            {docLoading ? (
                              <span className="d-flex align-items-center">
                                <Spinner
                                  size="sm"
                                  className="flex-shrink-0"
                                  animation="border"
                                  role="status"
                                />
                                <span className="flex-grow-1 ms-2">
                                  Uploading...
                                </span>
                              </span>
                            ) : (
                              <>
                                <i className="ri-upload-2-fill me-1 align-bottom"></i>
                                Upload
                              </>
                            )}
                          </Button>
                        </div>
                      </CardHeader>

                      <CardBody>
                        <div className="vstack gap-2">
                          <div className="border rounded border-dashed p-2">
                            {doc &&
                              doc.map((file, index) => (
                                <div
                                  className="d-flex align-items-center mb-2"
                                  id={file.id}
                                  key={index}
                                >
                                  <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm">
                                      <div className="avatar-title bg-light text-secondary rounded fs-24">
                                        <i className="ri-folder-zip-line"></i>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="fs-13 mb-1">
                                      <p
                                        to="#"
                                        className="text-body text-truncate d-block"
                                      >
                                        {file.filename}
                                      </p>
                                    </h5>
                                    <div>
                                      {file.filesize < 10000
                                        ? "0.01"
                                        : (
                                            file.filesize /
                                            (1024 * 1024)
                                          ).toFixed(2)}
                                      MB
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0 ms-2">
                                    <div className="d-flex gap-1">
                                      <Link
                                        to={`${REACT_APP_BASE_URL}/download?type=Documents&id=${
                                          file.id
                                        }&pid=${id}&u=${btoa(
                                          user_email
                                        )}&p=${btoa(user_pass)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-icon text-muted btn-sm fs-18"
                                        >
                                          <i className="ri-download-2-line"></i>
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <Loader />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FaqDetails;
