import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const BreadCrumb1 = ({ title, pageTitle,innerTitle,link,innerLink }) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{title}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to={link}>{pageTitle}</Link></li>
                                <li className="breadcrumb-item active"><Link to={innerLink}>{innerTitle}</Link></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol> 
                        </div>

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BreadCrumb1;