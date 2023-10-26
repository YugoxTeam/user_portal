import { useState, useEffect } from "react";
import Axios from "axios";
import { Container } from "reactstrap";
import React from "react";

function FaqSearch() {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${"yugoxwork@gmail.com"}:${"Admin@123"}`)}`,
    };

    var formdata = new FormData();
    formdata.append("_operation", "FetchRecords");
    formdata.append("username", "yugoxwork@gmail.com");
    formdata.append("password", "Admin@123");
    formdata.append("module", "RidgeFAQ");
    formdata.append("moduleLabel", "RidgeFAQ");
    formdata.append("token", localStorage.getItem("token"));
    let data = {};
    formdata.forEach(function (value, key) {
      data[key] = value;
    });

    Axios({
      method: "post",
      headers: headers,
      redirect: "follow",
      url: "https://portal-dev.ridgesecurity.ai/api",
      data: JSON.stringify(data),
    })
      .then((res) => {
        if (res.success == true) {
          const faqList = res.result[0];
          const tempFaq = [];
          for (const key in faqList) {
            if (Object.hasOwnProperty.call(faqList, key)) {
              const faqs = faqList[key];
              for (const faqsKey in faqs) {
                if (Object.hasOwnProperty.call(faqs, faqsKey)) {
                  const element = faqs[faqsKey];
                  for (const i of element) {
                    const id = i["id"];
                    tempFaq.push({ [id]: i["ridgefaqname"] });
                    sessionStorage.setItem(i["ridgefaqname"], id);
                  }
                }
              }
            }
          }
          setFaq(tempFaq);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

//   const getItem = () => {
//     const items = { ...sessionStorage };
//     for (const key in items) {
//       if (Object.hasOwnProperty.call(items, key)) {
//         const element = items[key];
//         if (key.search("task") == 0) {
//           console.log(key);
//         }
//       }
//     }
//   };
//   getItem();

  const searchFaq = (event) => {
    const search = event.target.value;
    const searchWord = new RegExp(search, "gi");
    const tempData = [];
    const items = { ...sessionStorage };
    for (const key in items) {
      if (Object.hasOwnProperty.call(items, key)) {
        const element = items[key];
        if (key.match(searchWord)) {
          // console.log(search);
          tempData.push({ [element]: key });
        }
      }
    }
    setFaq(tempData);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            <input type="text" name="search" id="search" onChange={searchFaq} />
            {faq.map((items) => {
              const key = Object.keys(items)[0];
              return (
                <div key={key}>
                  <h1>{items[key]}</h1>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
export default FaqSearch;
