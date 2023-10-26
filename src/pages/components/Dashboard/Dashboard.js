import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import "simplebar-react/dist/simplebar.min.css";
import "./dashboard.css";
import mountains from "../../../assets/images/mountains.jpg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../Components/Common/Loader";
import fb from "../../../assets/images/facebook.png";
import li from "../../../assets/images/Link.png";
import lis from "../../../assets/images/Links.png";
import tw from "../../../assets/images/Twitterr.png";
import yu from "../../../assets/images/youtube.png";
import yus from "../../../assets/images/we.png";
import gl from "../../../assets/images/globe.png";
function Dashboard() {
  document.title = "Dashboard";
  const { REACT_APP_API_URL, REACT_APP_BASE_URL } = process.env;
  const [salesMang, setSalesMang] = useState([]);
  const [systemEng, setSystemEng] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [youtubeVideo, setYoutubeVideo] = useState([]);
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  const ip = localStorage.getItem("ip_add");

  const user_email = value.emailId;
  const user_pass = value.password;
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };

    var formdata = new FormData();
    formdata.append("_operation", "FetchProfile");
    // formdata.append("mode", "userProfile");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("ip_address", ip);

    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    axios({
      method: "post",
      headers: headers,
      url: REACT_APP_API_URL,
      data: JSON.stringify(data),
    })
      .then((res) => {
        if (res.success == true) {
          setLoading(true);
          setSalesMang(res.result.salesManager);
          setSystemEng(res.result.systemEngineer);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
      };

      var formdata = new FormData();
      formdata.append("_operation", "FetchRecords");
      // formdata.append("mode", "userProfile");
      formdata.append("username", user_email);
      formdata.append("password", user_pass);
      formdata.append("module", "Library");
      formdata.append("moduleLabel", "Library");
      formdata.append("mode", "all");
      formdata.append("for", "dashboard");
      formdata.append("role", role);
      formdata.append("token", localStorage.getItem("token"));
      formdata.append("ip_address", ip);

      let data = {};
      formdata.forEach(function (value, key) {
        data[key] = value;
      });
      axios({
        method: "post",
        headers: headers,
        url: REACT_APP_API_URL,
        data: JSON.stringify(data),
      })
        .then((res) => {
          if (res.success == true) {
            // console.log(res);
            setLibrary(res["result"][0]);
            //  console.log(res['result'])
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
    // Set up the interval to call the API every 30 minutes
    const interval = setInterval(fetchData, 1800000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  const convertSize = (bsize) => {
    // Convert to kilobytes (KB)
    const kb = Number(bsize) / 1024;

    // Convert to megabytes (MB)
    const mb = kb / 1024;

    if (mb > 1) {
      return mb.toFixed(2) + " MB";
    } else {
      return kb.toFixed(2) + " KB";
    }
  };

  const getDateFromTimestamp = (timestamp) => {
    // const timestamp = "2023-07-14 12:02:06";
    const dateObj = new Date(timestamp);

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  useEffect(() => {
    axios({
      method: "get",
      url: REACT_APP_BASE_URL + "/feed?type=youtube",
    })
      .then((res) => {
        setYoutubeVideo(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const dynamicValue1 = "Resource = Marketing Collateral";
  const dynamicValue2 = "Software Download = Software Download";

  const encodedValue1 = encodeURIComponent(dynamicValue1);
  const encodedValue2 = encodeURIComponent(dynamicValue2);

  //**portal news */
  const [portalNews, setPortalNews] = useState([]);
  const [portalActiveNews, setPortalActiveNews] = useState([]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };
    var formdata = new FormData();

    formdata.append("_operation", "FetchRecords");
    // formdata.append("mode", "userProfile");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("module", "ITS4YouNewsletter");
    formdata.append("moduleLabel", "ITS4YouNewsletter");
    formdata.append("mode", "all");
    formdata.append("type", "top");
    formdata.append("for", "dashboard");
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("ip_address", ip);

    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    axios({
      method: "post",
      headers: headers,
      url: REACT_APP_API_URL,
      data: JSON.stringify(data),
    })
      .then((res) => {
        if (res.success == true) {
          // console.log(res);
          setPortalNews(res.result[0]);
          //  console.log(res['result'])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };
    var formdata = new FormData();

    formdata.append("_operation", "FetchRecords");
    // formdata.append("mode", "userProfile");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("module", "ITS4YouNewsletter");
    formdata.append("moduleLabel", "ITS4YouNewsletter");
    formdata.append("mode", "all");
    formdata.append("type", "active");
    formdata.append("for", "dashboard");
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("ip_address", ip);

    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    axios({
      method: "post",
      headers: headers,
      url: REACT_APP_API_URL,
      data: JSON.stringify(data),
    })
      .then((res) => {
        if (res.success == true) {
          // console.log(res);
          setPortalActiveNews(res.result[0]);
          //  console.log(res['result'])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //**upcoming event */
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };
    var formdata = new FormData();

    formdata.append("_operation", "FetchRecords");
    // formdata.append("mode", "userProfile");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("module", "Calendar");
    formdata.append("moduleLabel", "Calendar");
    formdata.append("mode", "all");
    formdata.append("for", "Events");
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("ip_address", ip);

    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    axios({
      method: "post",
      headers: headers,
      url: REACT_APP_API_URL,
      data: JSON.stringify(data),
    })
      .then((res) => {
        // console.log(res);
        if (res.success == true) {
          setUpcomingEvent(res.result[0]);
          //  console.log(res['result'])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //**youtube feeds*/
  // useEffect(() => {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  //   fetch("https://portal-dev.ridgesecurity.ai/feed?type=youtube", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }, [])

  // console.log(upcomingEvent)
  return (
    <React.Fragment>
      <div className="page-content">
        {loading ? (
          <Container fluid>
            <Row>
              <Col xl={8}>
                <Col>
                  <Card style={{ height: "300px" }}>
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${mountains})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* <img
                        src={mountains}
                        style={{ width: "100%", height: "100%" }}
                      /> */}
                      <div className="text">
                        <h2 className="h2" style={{ color: "white" }}>
                          Welcome,&nbsp;
                          {localStorage.getItem("fullName")
                            ? localStorage
                                .getItem("fullName")
                                .split(" ")[0]
                                .toUpperCase()
                            : ""}
                        </h2>
                        <p className="p">
                          Thank you for vistting our Partner Portal, where
                          you'll find a variety of resources to increase your
                          experties, accelerate sales and drive demand for our
                          solutions.
                        </p>
                      </div>
                      <div className="button-container">
                        <Link
                          to={
                            role == "Employee and Portal Admin" ? "" : "/deals"
                          }
                        >
                          <Button
                            color="light"
                            className="buttonThree w-lg me-3"
                          >
                            Register a Deal
                          </Button>
                        </Link>
                        <Link
                          to={`/library-details/${encodedValue1}`}
                          // to={
                          //   role == "Employee and Portal Admin"
                          //     ? ""
                          //     : "/libraries"
                          // }
                        >
                          <Button
                            color="light"
                            className="buttonThree w-lg me-3"
                          >
                            Resources
                          </Button>
                        </Link>
                        <Link
                          to={`/library-details/${encodedValue2}`}
                          // to={
                          //   role == "Employee and Portal Admin"
                          //     ? ""
                          //     : "/libraries"
                          // }
                        >
                          <Button
                            color="light"
                            className="buttonThree w-lg me-3"
                          >
                            Software Download
                          </Button>
                        </Link>
                        <Link
                          to={
                            role == "Employee and Portal Admin"
                              ? ""
                              : "/tickets"
                          }
                        >
                          <Button color="light" className="buttonThree w-lg">
                            Get Support
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Row>
                  <Col xl={4} className="col2">
                    <Card style={{ height: "600px" }}>
                      <CardHeader
                        className="align-items-center d-flex"
                        style={{ backgroundColor: "black" }}
                      >
                        <h4 className="card-title mb-0 flex-grow-1 px-3 text-white">
                          Recently Added
                        </h4>
                        {/* <div>
                          <button
                            type="button"
                            className="btn btn-soft-primary btn-sm"
                          >
                            View all
                          </button>
                        </div> */}
                      </CardHeader>

                      <CardBody style={{overflowY:"auto"}}>
                        {library.length > 0 &&
                          library.map((item, key) => {
                            return (
                              <div
                                className={
                                  item.id === 1
                                    ? "d-flex align-middle"
                                    : "d-flex mt-4"
                                }
                                key={key}
                              >
                                <i
                                  className="mdi mdi-circle-medium align-middle mx-1"
                                  style={{ fontSize: "20px" }}
                                ></i>
                                {/* <div className="flex-shrink-0">
                                    <img
                                      src={item.img}
                                      className="rounded img-fluid"
                                      style={{ height: "60px" }}
                                      alt=""
                                    />
                                  </div> */}
                                <div className="flex-grow-1 ms-3">
                                  <Link
                                    to={
                                      "/library-details/" +
                                      item["cf_3043"] +
                                      "?" +
                                      item["cf_3045"]
                                    }
                                    style={{
                                      width: "150px",
                                    }}
                                    target="_blank"
                                  >
                                    <h6 className="mb-1 lh-base">
                                      {item.cf_3041}
                                    </h6>
                                    <p className="text-muted fs-12 mb-0">
                                      {item.cf_3037}
                                      <i className="mdi mdi-circle-medium align-middle mx-1"></i>
                                      {convertSize(item.cf_3035)}
                                      <i className="mdi mdi-circle-medium align-middle mx-1"></i>
                                      {getDateFromTimestamp(item.createdtime)}
                                    </p>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={8} className="col3">
                    <Card
                      style={{ height: "600px", overflowY: "auto" }}
                      id="style-3"
                    >
                      <CardHeader
                        className="d-flex flex-row align-items-center"
                        style={{ backgroundColor: "black", height: "52px" }}
                      >
                        <div
                          className="justify-content-start me-3"
                          style={{ marginLeft: "0px" }}
                        >
                          <h5 className="text-white  mt-2">Follow Us</h5>
                        </div>
                        <div className="justify-content-center">
                          <Link to="https://ridgesecurity.ai" target="_blank">
                            <img src={gl} className="icons-gl" />
                            {/* <i className="ri-facebook-box-fill icons"></i> */}
                          </Link>
                          <Link
                            to="https://www.facebook.com/RidgeBot"
                            target="_blank"
                          >
                            <img src={fb} className="icons-fb" />
                            {/* <i className="ri-facebook-box-fill icons"></i> */}
                          </Link>
                          <Link
                            to="https://twitter.com/ridgesecurityai"
                            target="_blank"
                          >
                            <img src={tw} className="icons" />
                            {/* <i className="ri-twitter-fill icons"></i> */}
                          </Link>
                          <Link
                            to="https://www.linkedin.com/company/37183366/"
                            target="_blank"
                          >
                            <img src={lis} className="icons" />
                            {/* <i className=" ri-linkedin-box-fill icons"></i> */}
                          </Link>
                          <Link
                            to="https://www.youtube.com/ridgesecurity"
                            target="_blank"
                          >
                            <img
                              src={yu}
                              className=""
                              style={{ fontSize: "20px", height: "30px" }}
                            />
                            {/* <i className=" ri-youtube-fill icons"></i> */}
                          </Link>
                        </div>
                      </CardHeader>
                      <CardBody>
                        {/* <SimpleBar style={{ height: "100%" }}> */}
                        <Row>
                          <Col lg={6}>
                            <Card>
                              <CardHeader
                                className="d-flex align-items-center"
                                style={{ height: "55px" }}
                              >
                                <img
                                  src={li}
                                  className=""
                                  style={{
                                    fontSize: "20px",
                                    height: "30px",
                                    marginRight: "10px",
                                  }}
                                />
                                <h4 className=" mt-2">LinkedIn</h4>
                              </CardHeader>
                            </Card>
                            <div
                              className="sk-ww-linkedin-page-post"
                              data-embed-id="210793"
                            ></div>
                            <Helmet>
                            <script src='https://widgets.sociablekit.com/linkedin-page-posts/widget.js' async defer></script>
                            </Helmet>
                          </Col>
                          <Col lg={6}>
                            <Card>
                              <CardHeader
                                className="d-flex align-items-center"
                                style={{ height: "55px" }}
                              >
                                <img
                                  src={yus}
                                  className=""
                                  style={{
                                    fontSize: "20px",
                                    height: "30px",
                                    marginRight: "10px",
                                  }}
                                />
                                <h4 className="mt-2">Youtube</h4>
                              </CardHeader>
                            </Card>
                            {youtubeVideo.length > 0 &&
                              youtubeVideo.map((item) => {
                                return (
                                  <Card>
                                    <Link to={item.link} target="_blank">
                                      <div className="ratio ratio-21x9">
                                        <iframe
                                          src={`https://www.youtube.com/embed/${item.id}`}
                                          allowfullscreen
                                        ></iframe>
                                      </div>
                                    </Link>
                                    <CardBody>
                                      <Link to={item.link} target="_blank">
                                        <h4
                                          className="card-title mb-2"
                                          style={{
                                            fontWeight: "700",
                                            color: "black",
                                          }}
                                        >
                                          {item.title}
                                        </h4>
                                      </Link>
                                    </CardBody>
                                  </Card>
                                );
                              })}
                          </Col>
                        </Row>
                        {/* </SimpleBar> */}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col xl={4}>
                <Col>
                  <Card style={{ height: "300px" }}>
                    <CardHeader className="align-items-center d-flex" style={{backgroundColor:"black"}}>
                      <h4 className="card-title mb-0 flex-grow-1 text-white">
                        Your Ridge Security Team
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <div className="mb-3 d-flex">
                        <img
                          src={
                            salesMang &&
                            salesMang.imagedata !== "" &&
                            salesMang.imagedata !== null
                              ? `data:${salesMang.imagetype};base64,${salesMang.imagedata}`
                              : ""
                          }
                          className="rounded-circle avatar-sm user-profile-image me-4"
                          // alt="Oops"
                        />
                        {salesMang ? (
                          <div>
                            <span style={{ fontWeight: "800" }}>
                              {salesMang.first_name + " " + salesMang.last_name}
                            </span>
                            <br />
                            <span c>{salesMang.title}</span>
                            <br />
                            <span style={{ color: "#00abff" }}>
                              {salesMang.email1}
                            </span>
                            <br />
                            <span>{salesMang.phone_mobile}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="d-flex">
                        <img
                          src={
                            systemEng &&
                            systemEng.imagedata != "" &&
                            systemEng.imagedata !== null
                              ? `data:${systemEng.imagetype};base64,${systemEng.imagedata}`
                              : ""
                          }
                          className="rounded-circle avatar-sm  user-profile-image me-4"
                          // alt="Oops"
                        />
                        {systemEng ? (
                          <div>
                            <span style={{ fontWeight: "800" }}>
                              {systemEng.first_name + " " + systemEng.last_name}
                            </span>
                            <br />
                            <span>{systemEng.title}</span>
                            <br />
                            <span style={{ color: " #00abff" }}>
                              {systemEng.email1}
                            </span>
                            <br />
                            <span>{systemEng.phone_mobile}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Row>
                  <Col xl={12} className="col4">
                    <Card style={{ height: "300px", overflowY: "auto" }}>
                      {/* <CardHeader
                        className="align-items-center d-flex"
                        style={{ fontWeight: "400" }}
                      >
                        <h5 className="card-title mb-0 flex-grow-1">
                          Top News and Announcements
                        </h5>
                      </CardHeader> */}
                      {/* {portalNews.length > 0
                        ? portalNews.map((item, i) => {
                            return (
                              <CardBody
                                key={i}
                                style={{ marginBottom: "-35px" }}
                              >
                                <h6
                                  style={{
                                    fontWeight: "100px",
                                    color: "gray",
                                    marginBottom: "0px",
                                  }}
                                >
                                  {new Date(
                                    item.modifiedtime.split(" ")[0]
                                  ).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}{" "}
                                </h6>
                                <Link
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  to={`/news-details/${item.id}`}
                                >
                                  <h5
                                    style={{
                                      fontWeight: "400",
                                      marginBottom: "-10px",
                                    }}
                                  >
                                    {item.newslettername}
                                  </h5>
                                </Link>
                                <hr />
                              </CardBody>
                            );
                          })
                        : ""} */}
                      <CardHeader
                        className="align-items-center d-flex"
                        style={{
                          // marginTop: "5px",
                          fontWeight: "400",
                          backgroundColor: "black",
                        }}
                      >
                        <h5 className="card-title mb-0 flex-grow-1 text-white">
                          Recent News and Announcements
                        </h5>
                      </CardHeader>
                      <CardBody style={{ marginBottom: "-35px" }}>
                        {portalActiveNews.length > 0
                          ? portalActiveNews.map((item, i) => {
                              return (
                                <div key={i} className="mb-4">
                                  <h6
                                    style={{
                                      fontWeight: "100px",
                                      color: "gray",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {new Date(
                                      item.modifiedtime.split(" ")[0]
                                    ).toLocaleString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}{" "}
                                  </h6>
                                  <Link
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    to={`/recent-news-details/${item.id}`}
                                  >
                                    <h5
                                      style={{
                                        fontWeight: "400",
                                        marginBottom: "-10px",
                                      }}
                                    >
                                      {item.newslettername}
                                    </h5>
                                  </Link>
                                </div>
                              );
                            })
                          : ""}
                      </CardBody>
                      <Link to="/all-news">
                        <CardHeader
                          className="align-items-center d-flex"
                          style={{ fontWeight: "400" }}
                        >
                          <h5 className="card-title mb-0 flex-grow-1">
                            News and Announcements Archive
                          </h5>
                        </CardHeader>
                      </Link>
                    </Card>
                  </Col>
                  <Col xl={12} className="col4">
                    <Card
                      className="mb-1"
                      style={{ height: "297px", overflowY: "auto" }}
                      s
                    >
                      <CardHeader
                        className="align-items-center d-flex"
                        style={{ backgroundColor: "black" }}
                      >
                        <h4 className="card-title mb-0 text-white">
                          Upcoming Events
                        </h4>
                      </CardHeader>
                      <CardBody>
                        {upcomingEvent.length > 0
                          ? upcomingEvent.map((item, i) => {
                              return (
                                <>
                                  <div className=" mb-2" key={i}>
                                    <p style={{ marginBottom: "-1px" }}>
                                      {item.start_date} / {item.end_date}
                                    </p>
                                    {item.cf_3143 ? (
                                      <Link
                                        to={item.cf_3143}
                                        target="_blank"
                                        style={{ color: "black" }}
                                      >
                                        <p
                                          style={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                            marginBottom: "-1px",
                                          }}
                                        >
                                          {item.subject} - {item.activitytype}
                                        </p>
                                        <p className="location">
                                          {item.location}
                                        </p>
                                      </Link>
                                    ) : (
                                      <>
                                        <p
                                          style={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                            marginBottom: "-1px",
                                          }}
                                        >
                                          {item.subject}
                                        </p>
                                        <p className="location">
                                          {item.location}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </>
                              );
                            })
                          : ""}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          <Loader />
        )}
      </div>
    </React.Fragment>
  );
}
export default Dashboard;
