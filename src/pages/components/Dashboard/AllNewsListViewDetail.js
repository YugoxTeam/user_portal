import React from "react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Common/Loader";
import he from "he";
function AllNewsListViewDetail() {
  let { id } = useParams();
  document.title = "News";
  const { REACT_APP_API_URL } = process.env;
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  // const value =  JSON.parse(decryptData("Registered_User"))
  const user_email = value.emailId;
  const user_pass = value.password;
  const [portalNews, setPortalNews] = useState([]);
  const ip = localStorage.getItem("ip_add");

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
    // formdata.append("type", "active");
    formdata.append("for", "detailsList");
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
          //   console.log(res);
          setPortalNews(res.result[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const filterNews = portalNews.filter((item) => {
    return id == item.id;
  });
//   console.log(filterNews);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardHeader
              className="align-items-center d-flex"
              style={{ backgroundColor: "#aaebff" }}
            >
              <h4 className="card-title mb-0 flex-grow-1">
                News and Announcements Archive
              </h4>
            </CardHeader>
            {filterNews.length > 0 ? (
              filterNews.map((item, i) => {
                return (
                  <CardBody key={i}>
                    <div
                      dangerouslySetInnerHTML={{ __html: he.decode(item.body) }}
                    />
                    {/* <div className="mb-2">
                        <h4 style={{ fontWeight: "700" }} className="mb-3">
                          {item.newslettername}
                        </h4>
                        <h6
                          style={{
                            fontWeight: "100px",
                            color: "gray",
                            marginBottom: "0px",
                          }}
                        >
                          {item.modifiedtime.split(" ")[0]}
                        </h6>
                        <br />
                        <h6
                          style={{
                            fontWeight: "300",
                            color: "black",
                          }}
                        >
                          {item.cf_3054}
                        </h6>
                      </div> */}
                  </CardBody>
                );
              })
            ) : (
              <Loader />
            )}
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default AllNewsListViewDetail;
