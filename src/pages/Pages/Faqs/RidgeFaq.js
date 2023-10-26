import React, { useState, useEffect, useMemo } from "react";
import classnames from "classnames";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  AccordionItem,
  Accordion,
  Collapse,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../Components/Common/Loader";
import AddFaqModal from "../../components/Opportunity-Quotations/common-modal/AddFaqModal";
const RidgeFaq = () => {
  document.title = "FAQs";
  const { REACT_APP_API_URL } = process.env;
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  const user_email = value.emailId;
  const user_pass = value.password;
  const [loading, setLoading] = useState(false);
  const [faq, setFaq] = useState([]);
  const [faqProduct, setFaqProduct] = useState([]);
  const [updateMsg, setUpdateMsg] = useState("");
  const [filterData, setFilterData] = useState([]);
  const ip= localStorage.getItem("ip_add")
  const updaterMsg = (val) => {
    setUpdateMsg((old) => [...old, val]);
  };
  //   const [productTitle, setProductTitle] = useState("");
  const fetch_faq = () => {
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
          setLoading(true);
          setFaq([res.result[0]]);
          const faqList = res.result[0];
          const tempFaq = [];
          for (const key in faqList) {
            if (Object.hasOwnProperty.call(faqList, key)) {
              const faqs = faqList[key];
              for (const faqsKey in faqs) {
                if (Object.hasOwnProperty.call(faqs, faqsKey)) {
                  const element = faqs[faqsKey];
                  for (const i of element) {
                    const id = i["id"];
                    tempFaq.push({ [id]: i["ridgefaqname"] });
                    sessionStorage.setItem(i["ridgefaqname"], id);
                  }
                }
              }
            }
          }
          setFilterData(tempFaq);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch_faq();
    // Set up the interval to call the API every 30 minutes
    const interval = setInterval(fetch_faq, 3600000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [updateMsg]);
  // console.log(faq)
  useEffect(() => {
    faq.forEach((item) => {
      setFaqProduct(item);
    });
  }, [faq]);
  // console.log(faqProduct);
  const [accordionStates, setAccordionStates] = useState([]);
  const [accordionStates1, setAccordionStates1] = useState([]);

  const toggleAccordion = (index) => {
    setAccordionStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };
  const toggleAccordion1 = (val) => {
    setAccordionStates1((prevStates1) => {
      const updatedStates1 = [...prevStates1];
      updatedStates1[val] = !updatedStates1[val];
      return updatedStates1;
    });
    // console.log(accordionStates1)
  };

  useEffect(() => {
    // Initialize the accordion states based on the number of items
    if (faqProduct) {
      setAccordionStates(Array(faqProduct.length).fill(false));
      setAccordionStates((prevStates) => {
        const updatedStates = [...prevStates];
        // Set the index of the default item to true
        updatedStates[defaultOpenIndex] = true;
        return updatedStates;
      });
      setAccordionStates1(Array(faqProduct.length).fill(false));
      setAccordionStates1((prevStates1) => {
        const updatedStates1 = [...prevStates1];
        // Set the index of the default item to true
        updatedStates1[defaultOpenIndex1] = true;
        return updatedStates1;
      });
    }
  }, [faqProduct, updateMsg]);

  const defaultOpenIndex = 0;
  const defaultOpenIndex1 = 0;
  let cat_seq = 1;

  const [faq_modal_grid, setFaq_modal_grid] = useState(false);
  function faq_tog() {
    setFaq_modal_grid(!faq_modal_grid);
  }
  const [searchValue, setSearchValue] = useState("");
  const [searchLoad, setSearchLoad] = useState(false);
  const searchFaq = () => {
    setSearchLoad(true);
    const search = searchValue;
    

    const searchWord = new RegExp(String(search).trim(), "gi");
    // setSearchValue(search);
    const tempData = [];
    const items = { ...sessionStorage };
    if (search != "") {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${user_email}:${user_pass}`)}`,
      };
  
      var formdata = new FormData();
      formdata.append("_operation", "PortalLog");
      formdata.append("username", user_email);
      formdata.append("password", user_pass);
      formdata.append("ip_address", ip);
      formdata.append("cf_3247", `RidgeFAQ - ${search}`);
      formdata.append("cf_3297", "RidgeFAQ Searched");
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
        })
        .catch((error) => {
          console.log(error);
        });
      for (const key in items) {
        if (Object.hasOwnProperty.call(items, key)) {
          const element = items[key];
          if (key.match(searchWord)) {
            // console.log(search);
            tempData.push({ [element]: key });
          }
        }
      }
      setFilterData(tempData);
    } else {
      setSearchLoad(false);
      setFilterData([]);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <BreadCrumb
            title="Library Details"
            pageTitle="Library"
            link="/libraries"
          /> */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-end">
                    <div className="search-box me-2 d-flex">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search me-2"
                        placeholder="Search..."
                        // onChange={searchFaq}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                        // onKeyUp={(e) => searchList(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                      <Button
                        color="danger"
                        className="btn-icon"
                        onClick={searchFaq}
                      >
                        {" "}
                        <i className=" ri-search-eye-line" />{" "}
                      </Button>
                    </div>
                    <div>
                      <Button
                        color="success"
                        className="add-btn me-1"
                        id="create-btn"
                        onClick={() => {
                          setFaq_modal_grid(true);
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                      </Button>
                      <AddFaqModal
                        isOpen={faq_modal_grid}
                        toggle={faq_tog}
                        updaterMsg={updaterMsg}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    searchLoad && filterData ? (
                      <div>
                        <h3 className="d-flex justify-content-center">
                          Search Result
                        </h3>
                        {filterData.map((items) => {
                          const key = Object.keys(items)[0];
                          return (
                            <div key={key}>
                              <Link to={`/faq-details/${key}`}>
                                <h5>{items[key]}</h5>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="accordion" id="accordionExample">
                        {faq && Object.keys(faqProduct).length > 0 ? (
                          Object.keys(faqProduct).map((item, key) => {
                            return (
                              <Accordion
                                className="custom-accordionwithicon-plus"
                                id={`accordionWithplusicon${key}`}
                                key={key}
                                open={accordionStates}
                                toggle={() => toggleAccordion(key)}
                              >
                                <AccordionItem key={key}>
                                  <h2
                                    className="accordion-header"
                                    id={`accordionwithouticonExample${key}`}
                                  >
                                    <button
                                      className={classnames("card-header", {
                                        collapsed: !accordionStates[key],
                                      })}
                                      type="button"
                                      onClick={() => toggleAccordion(key)}
                                      style={{
                                        backgroundColor: "#8cc63f",
                                        color: "black",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        display: "flex",
                                        width: "100%",
                                        outline: "inherit",
                                        border: "none",
                                      }}
                                    >
                                      {/* {console.log(accordionStates[key])} */}
                                      <i
                                        className={classnames("mdi", {
                                          "mdi-minus": accordionStates[key],
                                          "mdi-plus": !accordionStates[key],
                                        })}
                                        style={{
                                          fontSize: "20px",
                                          color: "black",
                                          marginRight: "10px",
                                        }}
                                      />
                                      {item}
                                    </button>
                                  </h2>
                                  <Collapse
                                    isOpen={accordionStates[key]}
                                    className="accordion-collapse"
                                  >
                                    {Object.keys(faqProduct[item]).map(
                                      (val, keys) => {
                                        let items = [];
                                        items["id"] = val + "_" + cat_seq;
                                        cat_seq++;
                                        return (
                                          <React.Fragment key={items.id}>
                                            <div
                                              className="d-flex"
                                              style={{ margin: "10px 20px" }}
                                              id={items.id}
                                            >
                                              <h2
                                                className="accordion-header"
                                                id={`accordionwithouticonExample-nested-${items.id}`}
                                              >
                                                <button
                                                  className={classnames(
                                                    "card-header",
                                                    {
                                                      collapsed:
                                                        !accordionStates1[
                                                          items.id
                                                        ],
                                                    }
                                                  )}
                                                  type="button"
                                                  onClick={() =>
                                                    toggleAccordion1(
                                                      items.id.substring(
                                                        items.id.indexOf("_") +
                                                          1
                                                      )
                                                    )
                                                  }
                                                  style={{
                                                    backgroundColor: "white",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                    background: "none",
                                                    color: "inherit",
                                                    border: "none",
                                                    padding: 0,
                                                    cursor: "pointer",
                                                    outline: "inherit",
                                                  }}
                                                >
                                                  <i
                                                    className={classnames(
                                                      "mdi",
                                                      {
                                                        "mdi-minus":
                                                          accordionStates1[
                                                            items.id.substring(
                                                              items.id.indexOf(
                                                                "_"
                                                              ) + 1
                                                            )
                                                          ],
                                                        "mdi-plus":
                                                          !accordionStates1[
                                                            items.id.substring(
                                                              items.id.indexOf(
                                                                "_"
                                                              ) + 1
                                                            )
                                                          ],
                                                      }
                                                    )}
                                                    style={{
                                                      fontSize: "20px",
                                                      color: "black",
                                                      marginRight: "10px",
                                                    }}
                                                  />
                                                  {val}
                                                </button>
                                              </h2>
                                            </div>
                                            <Collapse
                                              isOpen={
                                                accordionStates1[
                                                  items.id.substring(
                                                    items.id.indexOf("_") + 1
                                                  )
                                                ]
                                              }
                                              className="accordion-collapse"
                                            >
                                              <div className="accordion-body">
                                                {faqProduct[item][val].map(
                                                  (que, keys) => {
                                                    return (
                                                      <Link
                                                        to={`/faq-details/${que.id}`}
                                                        // target="_blank"                             
                                                        // to="/faq-details"
                                                      >
                                                        <div className="d-flex">
                                                          <span
                                                            style={{
                                                              margin:
                                                                "-1px 5px 0px 0px",
                                                            }}
                                                          >
                                                            {keys + 1}.
                                                          </span>
                                                          {que.cf_2821.length >
                                                          250 ? (
                                                            <h6>
                                                              {que.cf_2821.slice(
                                                                0,
                                                                250
                                                              )}
                                                              ...? →
                                                            </h6>
                                                          ) : (
                                                            <h6>
                                                              {que.cf_2821} →
                                                            </h6>
                                                          )}
                                                        </div>
                                                      </Link>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </Collapse>
                                          </React.Fragment>
                                        );
                                      }
                                    )}
                                  </Collapse>
                                </AccordionItem>
                              </Accordion>
                            );
                          })
                        ) : (
                          <div className="d-flex justify-content-center">
                            No record to Display
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    <Loader />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export { RidgeFaq };
