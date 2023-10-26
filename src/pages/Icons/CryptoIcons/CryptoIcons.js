import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Imported Images


const CryptoIcons = () => {
    document.title = "Crypto Icons | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Crypto Icons" pageTitle="Icons" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="card-title mb-1">Examples</h5>
                                    <p className="text-muted mb-0">Use <code>&lt;img src=" assets/images/svg/crypto-icons/**.svg"&gt;</code> class.</p>
                                </CardHeader>
                                <CardBody>
                                    <Row className="icon-demo-content">
                                        <Col xl={3} lg={4} sm={6}>
                                            <div className="text-muted hstack gap-2">
                                                {/* <img src={pac}
                                                    alt="" className="avatar-xxs" /> */}
                                                $pac
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CryptoIcons;