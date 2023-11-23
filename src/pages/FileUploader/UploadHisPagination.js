import React, { useState, useEffect, useMemo, useCallback } from "react";
import TableContainer from "../../Components/Common/TableContainer";

//redux
import { Badge, Col } from "reactstrap";

import { Link } from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Common/Loader";

const UploadHisPagination = ({ chunkData }) => {
  const { REACT_APP_API_URL } = process.env;
  const columns = useMemo(() => [
    {
      Header: "File Name",
      filterable: false,
      accessor: "storename",
    },
    {
      Header: "Total Data",
      filterable: false,
      accessor: "total_data_count",
    },
    {
      Header: "Created Date",
      filterable: false,
      accessor: (row) => {
        return row.is_complete === "0" ? "-" : row.complete_at?.split(" ")[0];
      },
    },
    {
      Header: "Status",
      filterable: false,
      accessor: (row) => {
        return (
          <Badge color={row.is_complete == "0" ? "warning" : "success"}>
            {row.is_complete == "0" ? "In Progress" : "Completed"}
          </Badge>
        );
      },
    },
    {
      Header: "Action",
      filterable: false,
      accessor: (row) => {
        return (
          <a href={`${REACT_APP_API_URL}?dlc=true&id=${row.id}`} target="_blank">
            <i className="ri-download-2-line" style={{ cursor: "pointer" }} />
          </a>
        );
      },
    },
  ]);

  return (
    <React.Fragment>
      <div className="row">
        <Col lg={12}>
          <div className="card mb-0" id="tasksList">
            <div className="card-body pt-0">
              {chunkData && chunkData.length > 0 ? (
                <TableContainer
                  columns={columns}
                  data={(chunkData && chunkData) || []}
                  //   isGlobalFilter={true}
                //   isAddUserList={false}
                  customPageSize={6}
                  className="custom-header-css"
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  theadClass="table-light table-nowrap"
                  thClass="table-light text-muted"
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default UploadHisPagination;
