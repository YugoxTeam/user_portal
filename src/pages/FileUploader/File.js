import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Dropzone from "react-dropzone";
import CountUp from "react-countup";
import "./file.css";
import FieldMapping from "./FieldMapping";
import { Tilt } from "react-tilt";

const File = () => {
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  const { REACT_APP_API_URL } = process.env;
  const session = localStorage.getItem("session");
  const value = JSON.parse(localStorage.getItem("Registered_User"));
  const user_name = value.username;
  const user_pass = value.password;
  const [selectedFiles, setselectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [chunk, setChunk] = useState([]);
  const [chunks, setChunks] = useState([]);
  const [totalChunks, setTotalChunks] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const folder_name = Date.now();
  const [header, setHeader] = useState([]);
  const [getCRMHeader, setGetCRMHeader] = useState([]);
  const [newCSVHeader, setNewCSVHeader] = useState(null);
  const [enble, setEnble] = useState(true);
  const [count, setCount] = useState(null);

  const [modal_center, setmodal_center] = useState(false);

  function tog_center() {
    setmodal_center(!modal_center);
  }
  const newHeader = (val) => {
    if (val) {
      setNewCSVHeader(Object.values(val));
    }
  };
  const [importLead, setImportLead] = useState([
    {
      id: 1,
      label: "Record successfully imported",
      counter: "0",
      decimals: 0,
      suffix: "",
      prefix: "",
      totalCounter: "0",
    },
  ]);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  function handleAcceptedFiles(files) {
    if (count && count["import"] == count["total"]) {
      if (files && files.length > 0 && files[0]["type"] == "text/csv") {
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size),
          })
        );
        setselectedFiles(files);
        // Use a state variable to store the content of the CSV file
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const fileContent = event.target.result;
          const textDecoder = new TextDecoder("utf-8");
          const fileContentString = textDecoder.decode(fileContent);
          const lines = fileContentString.split("\n");
          const _header = lines[0]; // Assuming the first line is the header
          const headerKeywords = _header.split(",");
          const trimmedKeywords = headerKeywords.map((keyword) =>
            keyword.trim()
          );
          setHeader(trimmedKeywords);
        };

        // Read the first file in the 'files' array
        if (files.length > 0) {
          fileReader.readAsArrayBuffer(files[0]);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Only CSV format type supported.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Import is in progress...",
      });
    }
  }
  useEffect(() => {
    const data = new FormData();
    data.append("_operation", "GetSampleFile");
    data.append("postdata", true);
    data.append("username", user_name);
    data.append("password", user_pass);
    data.append("_session", session);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    axios
      .post(REACT_APP_API_URL, data, { headers })
      .then((response) => {
        // console.log(response);
        setGetCRMHeader(response.result["fields"]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedFiles]);

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      const fileSize = selectedFiles[0].size;
      const chunkSize = 50 * 1024 * 1024; // 50MB
      const totalChunks = Math.ceil(fileSize / chunkSize);
      const filenames = [];
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, fileSize);
        const chunk = selectedFiles[0].slice(start, end);
        const uniqueFilename = generateUniqueFilename(
          selectedFiles[0].name,
          chunkIndex
        );
        filenames.push({ filename: uniqueFilename, size: chunk.size });
      }
      setChunk(filenames);
    }
  }, [selectedFiles]);
  const generateUniqueFilename = (originalFilename, chunkIndex) => {
    const fileExtension = originalFilename.split(".").pop(); // Get the file extension
    return `${originalFilename}_${chunkIndex}.${fileExtension}`;
  };
  const uploadChunk = (chunk, chunkIndex, totalChunks, uniqueFilename) => {
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("chunkIndex", chunkIndex);
    formData.append("totalChunks", totalChunks);
    formData.append("uniqueFilename", uniqueFilename);
    formData.append("folderName", folder_name);
    formData.append("fileSize", selectedFiles && selectedFiles[0]["size"]);
    formData.append("uploadFile", true);
    formData.append("fileName", selectedFiles && selectedFiles[0]["name"]);
    // You can replace this with your server endpoint for handling file chunks
    axios
      .post(REACT_APP_API_URL, formData, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercentage);
          setChunks((prevChunks) =>
            prevChunks.map((chunk, index) =>
              index === chunkIndex
                ? { ...chunk, progress: progressPercentage }
                : chunk
            )
          );
        },
      })
      .then((response) => {
        //**api call for each chunk */
        const formD = new FormData();
        formD.append("folderName", folder_name);
        formD.append("uniqueFilename", uniqueFilename);
        formD.append("uploadCSV", true);
        formD.append("_session", session);
        formD.append("chunkIndex", chunkIndex);
        formD.append("totalChunks", totalChunks);
        setmodal_center(!modal_center);

        axios
          .post(REACT_APP_API_URL, formD)
          .then((res) => {
            if (res.isuploaded == true) {
              setmodal_center(false);
              setselectedFiles([]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        if (response.lastupload == true) {
          setLoading(false);
          setEnble(true);
          setUploading(false);
        }
      })
      .catch((error) => {
      });
  };
  const startUpload = () => {
    setLoading(true);
    setUploading(true);
    if (selectedFiles && selectedFiles.length > 0) {
      const fileSize = selectedFiles[0].size;
      const chunkSize = 3 * 1024 * 1024; // 10MB
      const totalChunks = Math.ceil(fileSize / chunkSize);
      setTotalChunks(totalChunks);

      // Read the selected file as a Blob
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result; // The content of the entire file
        const textDecoder = new TextDecoder("utf-8");
        const fileContentString = textDecoder.decode(fileContent);
        const lines = fileContentString.split("\n");
        const header = lines[0]; // Assuming the first line is the header
        const linesPerChunk = Math.ceil(lines.length / totalChunks);
        setChunks(
          Array.from({ length: totalChunks }, (_, index) => {
            const start = index * chunkSize;
            const end = Math.min((index + 1) * chunkSize, fileSize);
            const chunk = selectedFiles[0].slice(start, end);
            const uniqueFilename = generateUniqueFilename(
              selectedFiles[0].name,
              index
            );
            return {
              filename: uniqueFilename,
              progress: 0,
              size: chunk.size,
            };
          })
        );
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
          const startLine = chunkIndex * linesPerChunk;
          // const end = Math.min(start + chunkSize, fileSize);
          const endLine = startLine + linesPerChunk;
          // const chunk = selectedFiles[0].slice(start, end);
          const chunkLines = lines.slice(startLine, endLine);
          const chunkContent =
            chunkIndex === 0
              ? chunkLines.join("\n")
              : [
                  newCSVHeader ? Object.values(newCSVHeader) : header,
                  ...chunkLines,
                ].join("\n");
          const chunkBlob = new Blob([chunkContent], {
            type: selectedFiles[0].type,
          });
          const uniqueFilename = generateUniqueFilename(
            selectedFiles[0].name,
            chunkIndex
          );
          uploadChunk(chunkBlob, chunkIndex, totalChunks, uniqueFilename);
        }
      };

      reader.readAsArrayBuffer(selectedFiles[0]);
    }
  };
  //**import file data */
  const fetch = () => {
    const data = new FormData();
    data.append("processData", true);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    axios
      .post(REACT_APP_API_URL, data, { headers })
      .then((response) => {
        setCount(response);
        setImportLead([
          {
            id: 1,
            label: "Record successfully imported",
            counter: response["import"],
            decimals: 0,
            suffix: "",
            prefix: "",
            totalCounter: response["total"],
          },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, 10000);
    return () => clearInterval(interval);
  }, []);

  //**disable submit button on header change  */
  const enable = (val) => {
    setEnble(val);
  };
  //**handle cancel button */
  const handleCancle = () => {
    setselectedFiles([]);
    setEnble(true);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">
                    {selectedFiles && selectedFiles.length > 0
                      ? "Field Mapping"
                      : "Upload Documents"}
                  </h4>
                </CardHeader>
                <CardBody>
                  {selectedFiles && selectedFiles.length > 0 ? (
                    <FieldMapping
                      header={header}
                      getCRMHeader={getCRMHeader}
                      newHeader={newHeader}
                      enable={enable}
                    />
                  ) : (
                    <>
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          handleAcceptedFiles(acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone dz-clickable">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <div className="mb-3">
                                <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div className="list-unstyled mb-0" id="file-previews">
                        {selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button className=" btn-label right mt-4 ">
                          <i className=" ri-download-line label-icon align-middle  fs-16 ms-2"></i>
                          <Link
                            to={`${REACT_APP_API_URL}?sampleData=true&s=${session}`}
                            target="_blank"
                            className="text-white"
                          >
                            Sample Download
                          </Link>
                        </Button>
                        <div className=" mt-3">
                          {(importLead || []).map((item, key) => (
                            <div key={key} className="">
                              <h3 className="text-muted text-uppercase fs-13">
                                {item.label}
                              </h3>
                              <h4 className="">
                                <span className="counter-value">
                                  <CountUp
                                    start={0}
                                    prefix={item.prefix}
                                    suffix={item.suffix}
                                    separator={item.separator}
                                    end={item.counter}
                                    decimals={item.decimals}
                                    duration={4}
                                  />
                                </span>
                                /
                                <span className="counter-value">
                                  {item.totalCounter}
                                </span>
                              </h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="d-flex justify-content-center">
                    {newCSVHeader && !enble && (
                      <>
                        <Button
                          className="btn mt-4 me-2"
                          color="danger"
                          id="cancel"
                          onClick={() => {
                            handleCancle();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          color="success"
                          id="upload"
                          className="btn-label right mt-4 me-2"
                          onClick={() => {
                            startUpload();
                            setCheck(true);
                            // setLoading(false);
                          }}
                          disabled={!selectedFiles[0] ? true : check && loading}
                        >
                          {check ? (
                            <span className="d-flex align-items-center">
                              <Spinner
                                size="sm"
                                className="flex-shrink-0"
                                style={{
                                  display: !loading ? "none" : "block",
                                }}
                              >
                                Import
                              </Spinner>
                              <span className="flex-grow-1 ms-2">
                                <i className=" ri-upload-line label-icon align-middle  fs-16 ms-2"></i>
                                Click to Import
                              </span>
                            </span>
                          ) : (
                            <span className="flex-grow-1 ms-2">
                              <i className="ri-upload-line label-icon align-middle fs-16 ms-2"></i>
                              Click to Import
                            </span>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card>
                {uploading &&
                  chunks &&
                  chunks.map((file, index) => (
                    <CardBody className="py-0 mt-2 mb-1">
                      <div className="vstack gap-2">
                        <div className="border rounded border-dashed p-2">
                          <Row>
                            <Col lg={12}>
                              <div
                                className="d-flex align-items-center"
                                id={index}
                                key={index}
                              >
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-sm">
                                    <div className="avatar-title bg-light text-secondary rounded fs-24">
                                      <i className="ri-folder-zip-line"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                  <div className="d-flex  justify-content-between">
                                    <h5 className="fs-13 mb-1 me-4">
                                      <p className="text-body text-truncate d-block">
                                        {file.filename}
                                      </p>
                                    </h5>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="progress-containers">
                                        <progress
                                          max="100"
                                          value={file.progress}
                                          className="progress-bars"
                                        />
                                        <p className="progress-labels">
                                          {file.progress}%
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="file-size"></div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </CardBody>
                  ))}
              </Card>
            </Col>
          </Row>
          <Modal
            isOpen={modal_center}
            toggle={() => {
              tog_center();
            }}
            centered
            backdrop="static"
            keyboard={false}
          >
            <Tilt options={defaultOptions}>
              <ModalBody>
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <div class="lds-facebook" id="load">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className="">
                    <h3 className="text-center">Import is in progress....</h3>
                    <p className="text-center">
                      It is estimated that this process may require
                      approximately 4 to 5 minutes to complete.
                    </p>
                  </div>
                </div>
              </ModalBody>
            </Tilt>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default File;
