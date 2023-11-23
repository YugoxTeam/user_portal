import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import Loader from "../../Components/Common/Loader";
import UploadHisPagination from "./UploadHisPagination";
function UploadHistory() {
  const { REACT_APP_API_URL } = process.env;
  const [data, setData] = useState([]);
  const [chunkData, setChunkData] = useState([]);
  const [folderName, setFolderName] = useState({
    file_Name: "",
    folder_Name: "",
  });
  const fetchImportList = () => {
    const formD = new FormData();
    formD.append("getimportlist", true);

    axios
      .post(REACT_APP_API_URL, formD)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImportList();
    const interval = setInterval(fetchImportList, 300000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    var formdata = new FormData();
    formdata.append("getimportsublist", true);
    formdata.append("f", folderName["folder_Name"]);
    axios
      .post(REACT_APP_API_URL, formdata)
      .then((res) => {
        setChunkData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [folderName]);

  const [modal_center, setmodal_center] = useState(false);

  function tog_center(folder_name, file_name) {
    setmodal_center(!modal_center);
    setFolderName({
      file_Name: file_name,
      folder_Name: folder_name,
    });
  }
  return (
    <React.Fragment>
      <Col>
        <Card lg={12}>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Import History</h4>
          </CardHeader>

          <CardBody>
            <div className="table-responsive table-card">
              <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                <thead className="table-light">
                  <tr className="text-muted">
                    <th scope="col">File Name</th>
                    <th scope="col">Total Data</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Completed Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data && data.length > 0 ? (
                    (data || []).map((item, index) => {
                      const dateTime = moment(item.complete_at);
                      const formattedDateTime = dateTime.format(
                        "YYYY-MM-DD h:mm:ss a"
                      );
                      return (
                        <tr key={index}>
                          <td>{item.storename}</td>
                          <td>{item.total_data}</td>
                          <td>{item.created_at?.split(" ")[0]}</td>
                          <td>
                            {item.complete_at == null
                              ? "-"
                              : formattedDateTime.split(" ")[1] +
                                " " +
                                formattedDateTime.split(" ")[2]}
                          </td>
                          <td>
                            <Badge
                              color={
                                item.is_complete == "0" ? "warning" : "success"
                              }
                            >
                              {item.is_complete == "0"
                                ? "In Progress"
                                : "Completed"}
                            </Badge>
                          </td>
                          <td>
                            <i
                              className="ri-eye-fill align-middle"
                              onClick={() =>
                                tog_center(item.foldername, item.storename)
                              }
                              style={{ cursor: "pointer" }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>No record found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Modal
        isOpen={modal_center}
        toggle={() => {
          tog_center();
        }}
        centered
        size="lg"
      >
        <ModalBody>
          <Card>
            <CardHeader className="align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">
                {folderName.file_Name} Sub Files
              </h4>
            </CardHeader>

            {chunkData && chunkData.length > 0 ? (
              <UploadHisPagination chunkData={chunkData} />
            ) : (
              <Loader />
            )}
          </Card>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default UploadHistory;
