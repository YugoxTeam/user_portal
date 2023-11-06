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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Dropzone from "react-dropzone";
import CountUp from "react-countup";
import "./file.css";
const File = () => {
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
  const [modal_animationZoom, setmodal_animationZoom] = useState(false);
  const [header, setHeader] = useState([]);
  const [getCRMHeader, setGetCRMHeader] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [newHeader, setNewHeader] = useState(null);
  const [laod, setLaod] = useState(false);
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

  function tog_animationZoom() {
    setmodal_animationZoom(!modal_animationZoom);
  }
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  function handleAcceptedFiles(files) {
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
        const trimmedKeywords = headerKeywords.map((keyword) => keyword.trim());
        setHeader(trimmedKeywords);
        if (header) {
          tog_animationZoom();
          // console.log(header);
        }
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
  }
  useEffect(() => {
    const data = new URLSearchParams();
    data.append("_operation", "describe");
    data.append("username", user_name);
    data.append("password", user_pass);
    data.append("module", "Leads");
    data.append("_session", session);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .post(REACT_APP_API_URL, data, { headers })
      .then((response) => {
        // console.log(response);
        setGetCRMHeader(response.result.describe["fields"]);
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
    // You can replace this with your server endpoint for handling file chunks
    axios
      .post("https://demo.crmexperts.in/fileupload/index.php", formData, {
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
        axios
          .post("https://demo.crmexperts.in/fileupload/uploadcsv.php", formD)
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
        if (response.lastupload == true) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Successfully Uploaded",
          });
        }
        // console.log(response);
        // setUploading(true)
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const startUpload = () => {
    setLoading(true);
    setUploading(true);
    if (selectedFiles && selectedFiles.length > 0) {
      const fileSize = selectedFiles[0].size;
      const chunkSize = 10 * 1024 * 1024; // 10MB
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
                  newHeader ? Object.values(newHeader) : header,
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
  const handleSelectChange = (item, value) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [item]: value,
    }));
  };

  const handleSubmit = () => {
    setLaod(true);
    // Create an object to store the values to submit
    const valuesToSubmit = {};

    header.forEach((item) => {
      const correspondingCRMItem = getCRMHeader.find(
        (crmItem) => crmItem.label === item
      );
      const selectedValue = selectedValues[item] || ""; // Use the selected value or an empty string

      // If the selected value is empty, send the default value; otherwise, send the selected value
      valuesToSubmit[item] =
        selectedValue ||
        (correspondingCRMItem ? correspondingCRMItem.label : "");
    });

    // Log or submit the values
    setNewHeader(valuesToSubmit);
    // if (newHeader && Object.values(newHeader).includes(value)) {
    //   alert("sdlkjf");
    // }
    // You can also submit the values to your API or perform other actions here
  };
  useEffect(() => {
    if (laod && newHeader) {
      Swal.fire({
        icon: "success",
        title: "Ready to upload",
      });
      tog_animationZoom();
    }
  }, [laod]);
  //**import file data */
  useEffect(() => {
    const data = new URLSearchParams();
    data.append("_operation", "GetUploadStatus");
    data.append("username", user_name);
    data.append("password", user_pass);
    data.append("_session", session);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .post(REACT_APP_API_URL, data, { headers })
      .then((response) => {
        setImportLead([
          {
            id: 1,
            label: "Record successfully imported",
            counter: response.result["insert_data"],
            decimals: 0,
            suffix: "",
            prefix: "",
            totalCounter: response.result["all_data"],
          },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header">
                  <h4 className="card-title mb-0">Upload Documents</h4>
                </CardHeader>
                <CardBody>
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
                  <div className="d-flex justify-content-center">
                    <Button
                      color="success"
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
                            Uploading
                          </Spinner>
                          <span className="flex-grow-1 ms-2">
                            <i className=" ri-upload-line label-icon align-middle  fs-16 ms-2"></i>
                            Upload
                          </span>
                        </span>
                      ) : (
                        <span className="flex-grow-1 ms-2">
                          <i className="ri-upload-line label-icon align-middle fs-16 ms-2"></i>
                          Upload
                        </span>
                      )}
                    </Button>
                    <Button className=" btn-label right mt-4 ">
                      <i className=" ri-download-line label-icon align-middle  fs-16 ms-2"></i>
                      <Link
                        to="https://demo.crmexperts.in/fileupload/getSampleData.php"
                        target="_blank"
                        className="text-white"
                      >
                        Sample Download
                      </Link>
                    </Button>
                  </div>
                  <div className="d-flex justify-content-end">
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
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="vstack gap-2">
                    <div className="border rounded border-dashed p-2">
                      {uploading &&
                        chunks &&
                        chunks.map((file, index) => (
                          <Row>
                            <Col lg={12}>
                              <div
                                className="d-flex align-items-center mb-3"
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
                        ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal
            id="flipModal"
            isOpen={modal_animationZoom}
            toggle={() => {
              tog_animationZoom();
            }}
            modalClassName="zoomIn"
            centered
            // backdrop={false}
          >
            <ModalHeader
              className="modal-title"
              id="flipModalLabel"
              toggle={() => {
                tog_animationZoom();
              }}
            >
              Fields Mapping
            </ModalHeader>
            <form>
              <ModalBody>
                <Row>
                  <Col lg={6}>
                    <p>CSV Header</p>
                    {header?.map((item, index) => {
                      return (
                        <Input
                          key={index}
                          value={item}
                          name={item}
                          readOnly
                          className="mb-3"
                        />
                      );
                    })}
                  </Col>
                  <Col lg={6}>
                    <p>CRM Fields</p>
                    {header &&
                      getCRMHeader &&
                      header.map((item, index) => {
                        const correspondingCRMItem = getCRMHeader.find(
                          (crmItem) => crmItem.label === item
                        );

                        return (
                          <Input
                            type="select"
                            id="type"
                            name={item}
                            className="form-control mb-3"
                            placeholder="Select value"
                            key={index}
                            onChange={(e) => {
                              handleSelectChange(item, e.target.value);
                            }}
                            // value={ correspondingCRMItem?correspondingCRMItem.name:''}
                          >
                            <option value="">Select an Option</option>
                            {getCRMHeader.length > 0 &&
                              getCRMHeader.map((crmItem, i) => (
                                <option
                                  value={crmItem.label}
                                  key={i}
                                  selected={
                                    correspondingCRMItem &&
                                    crmItem.label === correspondingCRMItem.label
                                  }
                                >
                                  {crmItem.label}
                                </option>
                              ))}
                          </Input>
                        );
                      })}
                  </Col>
                </Row>
              </ModalBody>
              <div className="modal-footer">
                <Button
                  color="light"
                  onClick={() => {
                    tog_animationZoom();
                  }}
                >
                  Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Save changes
                </Button>
              </div>
            </form>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default File;
