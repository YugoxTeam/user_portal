import React, { useState } from "react";
import { Card, Col, Collapse, Container, Row } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
// Import Images
import faqImg from "../../../assets/images/faq-img.png";
import { useEffect } from "react";

const Faqs = () => {
  document.title = "FAQs";
  const { REACT_APP_API_URL } = process.env;
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  const user_email = value.emailId;
  const user_pass = value.password;
  const [faq, setFaq] = useState([]);
  const [faqProduct, setFaqProduct] = useState([]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
    };

    var formdata = new FormData();
    formdata.append("_operation", "FetchRecords");
    formdata.append("username", user_email);
    formdata.append("password", user_pass);
    formdata.append("module", "RidgeFAQ");
    formdata.append("moduleLabel", "RidgeFAQ");
    formdata.append("token", localStorage.getItem("token"));
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
          setFaq(res.result[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //   console.log(faqProduct)
  useEffect(() => {
    [faq].forEach((item) => {
      Object.keys(item).map((items) => {
        setFaqProduct(item[items]);
        // console.log(item[items])
      });
    });
  }, [faqProduct]);
  // console.log(faqProduct)
  const [col1, setcol1] = useState(true);

  const t_col1 = () => {
    setcol1(!col1);
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="rounded-0 bg-soft-success mx-n4 mt-n4 border-top">
                <div className="px-4">
                  <Row>
                    <Col xxl={5} className="align-self-center">
                      <div className="py-4">
                        <h4 className="display-6 coming-soon-text">
                          Frequently asked questions
                        </h4>
                        <p className="text-success fs-15 mt-3">
                          If you can not find answer to your question in our
                          FAQ, you can always contact us or email us. We will
                          answer you shortly!
                        </p>
                        {/* <div className="hstack flex-wrap gap-2">
                          <button
                            type="button"
                            className="btn btn-primary btn-label rounded-pill"
                          >
                            <i className="ri-mail-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                            Email Us
                          </button>
                          <button
                            type="button"
                            className="btn btn-info btn-label rounded-pill"
                          >
                            <i className="ri-twitter-line label-icon align-middle rounded-pill fs-16 me-2"></i>{" "}
                            Send Us Tweet
                          </button>
                        </div> */}
                      </div>
                    </Col>
                    <div className="col-xxl-3 ms-auto">
                      <div className="mb-n5 pb-1 faq-img d-none d-xxl-block">
                        <img src={faqImg} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </Row>
                </div>
              </Card>
              <Row className="justify-content-evenly">
                {faq &&
                  Object.keys(faq).map((item) => {
                    return (
                      <Col lg={4}>
                        <div className="mt-3">
                          <div className="d-flex align-items-center mb-2">
                            <div className="flex-shrink-0 me-1">
                              <i className="ri-question-line fs-24 align-middle text-success me-1"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="fs-16 mb-0 fw-semibold">{item}</h5>
                            </div>
                          </div>

                          <div
                            className="accordion accordion-border-box"
                            id="genques-accordion"
                          >
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id="genques-headingOne"
                              >
                                <button
                                  className={classnames(
                                    "accordion-button",
                                    "fw-medium",
                                    { collapsed: !col1 }
                                  )}
                                  type="button"
                                  onClick={t_col1}
                                  style={{ cursor: "pointer" }}
                                >
                                  What is Lorem Ipsum ?
                                </button>
                              </h2>
                              <Collapse
                                isOpen={col1}
                                className="accordion-collapse"
                              >
                                <div className="accordion-body">
                                  If several languages coalesce, the grammar of
                                  the resulting language is more simple and
                                  regular than that of the individual languages.
                                  The new common language will be more simple
                                  and regular than the existing European
                                  languages. It will be as simple their most
                                  common words.
                                </div>
                              </Collapse>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Faqs;
