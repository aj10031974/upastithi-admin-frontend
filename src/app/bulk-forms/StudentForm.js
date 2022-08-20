import React, { Component, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";

import validate from "./validator";
import api from "../services/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Papa from "papaparse";
// import swal from ""
import swal from "sweetalert";

import { JsonToTable } from "react-json-to-table";
const {Auth} = require('two-step-auth');
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function login(emailId, data_value){
  const data_email = await Auth(emailId);
  // You can follw the above approach, But we recommend you to follow the one below, as the mails will be treated as important
  // const data_email = await Auth(emailId, "Company Name");
  console.log(data_email);
  console.log(data_email.mail);
  console.log(data_email.OTP);
  console.log(data_email.success);
  var isValid = true;
  while(isValid){
    var promp = prompt("Enter OTP");
    if(promp == data_email.OTP){
      isValid = false;
      api.addStudentBulk(data_value).then((res)=>{
        console.log(res)
        // alert("Success")
        swal({
          title: "Success",
          text: "Data have been saved succesfully",
          icon: "success",
        });
      })
      
    }
  }
}
export function TeacherForm() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  const [errorState, seterrorState] = React.useState("error");

  const [dataTable, setdataTable] = React.useState({});

  const [errorTable, seterrorTable] = React.useState({});
  const [submitDisabled, setsubmitDisabled] = React.useState(true);

  const blankRows = [];
  const errorRows = [];

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataTable);
    const final_data  = (JSON.stringify(dataTable));
    let jsonData = {};
    // jsonData.push(final_data);
    // console.log('jsonData: ', jsonData);
    console.log('final_data: ', final_data);
   var data_value = {};
    //  data_value.put("student_data",final_data);
    data_value["student_data"] = final_data;
    console.log('grades: ', data_value);
    
    // grades.put(scienceGrade);
    // obj.put("grades", grades);

    // alert("Hi");
    login("shantanujain18@gmail.com",data_value)
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setdataTable({});
    seterrorTable({});
    setsubmitDisabled(true);
  };

  const fileparser = (e) => {
    seterrorTable({});
    const files = e.target.files;
    console.log(files);
    if (files) {
      console.log(files[0]);
      Papa.parse(files[0], {
        download: true,
        skipEmptyLines: true,
        header: true,
        complete: function (results) {
          // console.log("Finished2:", results.data);
          const j = JSON.parse(JSON.stringify(results.data));

          // console.log('j: ', j);

          // console.log(clean(j));
          console.log("clean(j): ", clean(j));
          setsubmitDisabled(false);
        },
      });
    }
  };

  function clean(obj) {
    seterrorTable({});
    for (var propName in obj) {
      console.log("propName: ", propName);
      console.log("obj[propName]: ", obj[propName]);
      for (var propName1 in obj[propName]) {
        console.log("obj[propName][propName1]: ", obj[propName][propName1]);
        if (
          obj[propName][propName1] === null ||
          obj[propName][propName1] === undefined ||
          obj[propName][propName1] === ""
        ) {
          blankRows.push(propName);
          errorRows.push(obj[propName]);
          console.log("obj[propName]: ", obj[propName]);
          delete obj[propName];
          break;
        }
      }
    }
    var str = "";
    blankRows.forEach((value, index) => {
      console.log("value: ", value);
      str += value + ", ";
    });
    console.log("errorTable.length: ", errorTable.length);

    const errTab = JSON.parse(JSON.stringify(errorRows));

    setdataTable(obj);
    seterrorTable(errTab);
    return obj;
  }

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <div>
      <div className="row" >
        <div className="col-12 grid-margin">
          <div className="card" >
            <div className="card-body">
              <h4 className="card-title">Student Registration</h4>
              
               <Form.Group>
                      <label>Upload File </label>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          id="customFileLang"
                          lang="es"
                          name="studentProfileImage"
                          accept=".csv,.xlsx,.xls"
                onChange={fileparser}
                          // placeholder={
                          //   state.formControls.studentProfileImage.placeholder
                          // }
                          // onChange={onChange}
                        />

                        <label
                          className="custom-file-label"
                          htmlFor="customFileLang"
                        >
                          Upload File (csv, xlsx, xls)
                        </label>
                      </div>
                    </Form.Group>
              <div className=" scroll">
              <JsonToTable json={dataTable} />
              </div>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-3">
                  <Form.Group>
                    <button
                      type="submit"
                      className="btn btn-primary mr-2 w-100"
                      onClick={handleSubmit}
                      style={{ height: "2.5rem", marginTop: "10%" }}
                      disabled={submitDisabled}
                    >
                      Submit
                    </button>
                    {error && (
                      <p style={{ color: "green", fontSize: 10 }}>
                        Fill all the fields before submitting
                      </p>
                    )}
                  </Form.Group>
                </div>
                <div className="col-md-3">
                  <Form.Group>
                    <button
                      type="submit"
                      className="btn btn-dark mr-2 w-100"
                      style={{ height: "2.5rem", marginTop: "10%" }}
                      onClick={handleCancel}
                    >
                      Clear 
                    </button>
                  </Form.Group>
                </div>
                <div className="col-md-3"></div>
              </div>

              {errorTable.length == null || errorTable.length == 0 ? (
                <></>
              ) : (
                <>
                  {" "}
                  <h4
                    className="card-title"
                    style={{ color: "red", marginTop: "2%" }}
                  >
                    We found error in following rows
                  </h4>
                  <div className="scroll"><JsonToTable json={errorTable} /></div>
                  
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherForm;
