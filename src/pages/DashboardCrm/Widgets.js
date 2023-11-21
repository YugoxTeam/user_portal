import React from "react";
import { crmWidgets } from "../../common/data";
import CountUp from "react-countup";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Widgets = () => {
  const { REACT_APP_API_URL } = process.env;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fomdata = new FormData();
    fomdata.append("datacounts", true);
    axios
      .post(REACT_APP_API_URL, fomdata)
      .then((res) => {
        // console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   console.log(typeof(data));

  return (
    <React.Fragment>
      <div className="col-xl-12">
        <div className="card crm-widget">
          <div className="card-body p-0">
            <div className="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <div className="col" key={index}>
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          {item.label}
                          <i
                            className={
                              "ri-arrow-up-circle-line text-success" + " fs-18 float-end align-middle"
                            }
                          ></i>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i
                              className={item.label =="Total Counts"?"ri-numbers-line"+ " display-6 text-muted":item.label=="Total Files"?"ri-file-excel-2-line"+ " display-6 text-muted":"ri-file-damage-line"+" display-6 text-muted" }
                            ></i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h2 className="mb-0">
                              <span className="counter-value" data-target="197">
                                <CountUp
                                  start={0}
                                  // prefix={item.prefix}
                                  // suffix={item.suffix}
                                //   separator={item.separator}
                                  end={item.count}
                                  decimals={item.decimals}
                                  duration={4}
                                />
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Widgets;
