import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Col,
  Container,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import classnames from "classnames";
import { Link } from "react-router-dom";
import '../../assets/scss/register.css'
import { useState } from "react";
import RequestAccess from "./RequestAccess";

const Register = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  document.title = "Signup";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-5 mt-5 text-white-50 logo">
                  <div>
                    {/* <img src={logoLight} alt=""  /> */}
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col xxl={9} md={8} lg={6} xl={5}>
                <Card
                  className="mt-xxl-n5 mx-auto mt-5 register_form "
                  // style={{ width: "59%" }}
                >
                  <CardHeader className="mx-auto">
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
                          type="button"
                        >
                          <i className="fas fa-home"></i>
                          Register User
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                  <CardBody className="p-4">
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <RequestAccess />
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="text-center">
            <p className="mb-0">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="fw-semibold text-primary text-decoration-underline"
              >
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Register;
