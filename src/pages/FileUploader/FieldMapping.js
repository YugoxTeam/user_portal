import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CardBody, Col, Row, Button, Input } from "reactstrap";
import Swal from "sweetalert2";
import Loader from "../../Components/Common/Loader";
function FieldMapping({ header, getCRMHeader, newHeader, enable }) {
  const [load, setLoad] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});

  //   const [newHeader, setNewHeader] = useState(null);
  const handleSelectChange = (item, value) => {
    setLoad(false);
    enable(true);
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [item]: value,
    }));
  };

  const handleSubmit = () => {
    enable(false);
    setLoad(true);
    const valuesToSubmit = {};

    header.forEach((item) => {
      const correspondingCRMItem = getCRMHeader.find(
        (crmItem) => crmItem.label === item
      );
      const selectedValue = selectedValues[item] || "";

      valuesToSubmit[item] =
        selectedValue ||
        (correspondingCRMItem ? correspondingCRMItem.label : "");
    });
    newHeader(valuesToSubmit);
    // const matches = [];
    //     if(valuesToSubmit){
    //         Object.values(selectedValues).forEach((val)=>{
    //             if(Object.values(valuesToSubmit).includes(val)){
    //                 setLoad(false)
    //                 matches.push(val)
    //                 enable(true)
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: `Field mapped more than once ${matches[matches.length-1]}.`,
    //                   });
    //             }
    //         })
    //     }
    // console.log(matches)
    if (valuesToSubmit) {
      findDuplicates(
        Object.values(valuesToSubmit),
        Object.values(selectedValues)
      );
    }
  };
  function findDuplicates(arrayToCheck, arrayToCompare) {
    const duplicates = {};

    for (const value of arrayToCheck) {
      if (value !== "" && arrayToCompare.includes(value)) {
        if (!duplicates[value]) {
          duplicates[value] = 1;
        } else {
          duplicates[value]++;
        }
      }
    }

    const duplicateValues = Object.keys(duplicates).filter(
      (key) => duplicates[key] > 1
    );
    if (duplicateValues.length > 0) {
      setLoad(false);
      enable(true);
      Swal.fire({
        icon: "error",
        title: `Field mapped more than once ${duplicateValues}.`,
      });
    }
  }
  //   function findDuplicates(arrayToCheck, arrayToCompare) {
  //     const duplicates = [];

  //     const seen = {};
  //     for (const value of arrayToCheck) {
  //       if (arrayToCompare.includes(value) && !seen[value]) {
  //         seen[value] = 1;
  //       } else if (arrayToCompare.includes(value) && seen[value] === 1) {
  //         duplicates.push(value);
  //         seen[value] = 2;
  //       }
  //     }

  //     if (duplicates.length > 0) {
  //       setLoad(false);
  //       enable(true);
  //       Swal.fire({
  //         icon: "error",
  //         title: `Field mapped more than once ${duplicates}.`,
  //       });
  //     }
  //   }
  useEffect(() => {
    if (load && newHeader) {
      Swal.fire({
        icon: "success",
        title: "Ready to Import",
      });
    }
  }, [load]);
  return (
    <React.Fragment>
      <CardBody>
        {header && header?.length > 0 ? (
          <>
            <Row>
              <Col lg={6}>
                <h4>CSV Header</h4>
                {header?.map((item, index) => {
                  return (
                    <div className="d-flex">
                      <Input
                        key={index}
                        value={item}
                        name={item}
                        readOnly
                        className="mb-3"
                      />
                      <span
                        style={{
                          marginTop: "5px",
                          marginLeft: "10px",
                          fontSize: "20px",
                        }}
                      >
                        <i className="ri-arrow-right-line" />
                      </span>
                    </div>
                  );
                })}
              </Col>
              <Col lg={6}>
                <h4>CRM Fields</h4>
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
            <div className="modal-footer ">
              <Button onClick={handleSubmit} disabled={load} color="primary">
                Save changes
              </Button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </CardBody>
    </React.Fragment>
  );
}

export default FieldMapping;
