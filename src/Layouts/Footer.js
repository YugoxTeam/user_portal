import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
// import { useNavigate } from "react-router-dom";

const Footer = () => {
  // const navigate = useNavigate();
  // let idleTime = 0;
  //     document.addEventListener("mousemove", () => {
  //         idleTime = 0;
  //     });
  //     document.addEventListener("keypress", () => {
  //         idleTime = 0;
  //     });
  //     setInterval(() => {
  //         idleTime += 1;
  //         if (idleTime > 1) {
  //             navigate("/logout");
  //         }
  //     }, 1000);
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            {/* <Col sm={6}>
              © {new Date().getFullYear()}
            </Col> */}
            <Col sm={12}>
              <div className="text-sm-end d-none d-sm-block d-flex flex-end">
                <Link to="https://yugox.com/" target="_blank">
                  Design & Develop by Yugox Pvt. Ltd.
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
