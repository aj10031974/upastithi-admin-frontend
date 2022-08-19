
import React, { Component, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import validate from "./validator";
import api from "../services/api";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ClassForm() {
  const [values, setValues] = useState({
    createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
    classInsitituteID: "",
  });
  const [open, setOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  const [active, setActive] = useState({
    classInsitituteID: "true",
    classAcademicYear: "true",
    classBranch: "true",
    className: "true",
    classSemeter: "true",
    classShift: "true",
  });

  const [error, setError] = useState(false);
  
  const [errorState, seterrorState] = React.useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    if (!shouldSubmit()) {
      e.preventDefault();
      setError(true);
      return;
    }
    if (shouldSubmit()) {
      setError(false);
      e.preventDefault();
      console.log("Form is ready to be submitted");
      // const form = {
      //   classInsitituteID: "b81005501c8111ed8a85b7061d09f11f1660557898277",
      //   classAcademicYear: "2021-2022",
      //   classBranch: "Computer Engineering",
      //   className: "TE04",
      //   classSemeter: "VI",
      //   classShift: "II",
      //   createdBy: "b81005501c8111ed8a85b7061d09f11f1660557898277"
      // }
      console.log(values);
      api
        .addClass(values)
        .then((response) => {
          console.log(response);
          setOpen(true);
          seterrorMessage("Form submitted successfully")
          seterrorState("success")
        })
        .catch((error) => {
          console.log("Error Occured");
        });
    }
  };

  const onChange = (e) => {
    setActive({ ...active, [e.target.name]: false });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function shouldSubmit() {
    if (!values.classAcademicYear) {
      setOpen(true);
      seterrorMessage("Class Academic Year is empty!");
      seterrorState("error")
      return false;
    }
    if (!values.classBranch) {
      setOpen(true);
      seterrorMessage("Class Branch is empty!");
      seterrorState("error")
      return false;
    }
    if (!values.classSemeter) {
      setOpen(true);
      seterrorMessage("Class Semester is empty!");
      seterrorState("error")
      return false;
    }
    if (!values.classShift) {
      setOpen(true);
      seterrorMessage("Class shift is empty!");
      seterrorState("error")
      return false;
    }
    if (!values.className) {
      setOpen(true);
      seterrorMessage("Class Name is empty!");
      seterrorState("error")
      return false;
    }
    return true;
  }

  const state = {
    formControls: {
      classAcademicYear: {
        value: "",
        placeholder: "Academic Year",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      classBranch: {
        value: "",
        placeholder: "Branch",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      className: {
        value: "",
        placeholder: "Class Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      classSemeter: {
        value: "",
        placeholder: "Semester",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      classShift: {
        value: "",
        placeholder: "Shift",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
    },
  };

  let history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("setAuthority")=="3"){
      api.viewInstituteByUUID(localStorage.getItem("InstituteUUID")).then((response)=>{
        console.log('User is verified: DashBoard');
  
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else if(localStorage.getItem("setAuthority")=="1" ){
      api.viewAdminByUUID(localStorage.getItem("UUID")).then((response)=>{
        console.log('Admin is verified: DashBoard');
  
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else if(localStorage.getItem("setAuthority")=="2" ){
      api.viewAuthorityByUUID(localStorage.getItem("UUID")).then((response)=>{
        console.log('Auhtority is verified: DashBoard');
  
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else{
      history.push('/')
    }
    
    bsCustomFileInput.init();
    values.classInsitituteID = localStorage.getItem("InstituteID");
  }, []);

  return (
    <div>
      <div className="row" style={{height:"75vh"}}>
        <div className="col-12 grid-margin">
          <div className="card" >
            <div className="card-body" >
              <h4 className="card-title">Class Form</h4>
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Class Name</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="className"
                          placeholder={state.formControls.className.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Class Branch</label>
                      <Form.Control
                        type="text"
                        name="classBranch"
                        placeholder={state.formControls.classBranch.placeholder}
                        onChange={onChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Academic Year</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="classAcademicYear"
                          placeholder={
                            state.formControls.classAcademicYear.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Class Shift</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="classShift"
                          placeholder={
                            state.formControls.classShift.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Class Semester</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="classSemeter"
                          placeholder={
                            state.formControls.classSemeter.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-3">
                    <Form.Group>
                      <button
                        type="submit"
                        className="btn btn-primary mr-2 w-100"
                        onClick={handleSubmit}
                        style={{height:"2.5rem", marginTop:"10%"}}
                      >
                        Submit
                      </button>
                      {error && (
                        <p style={{ color: "green", fontSize: 10 }}>
                          {/* Fill all the fields before submitting */}
                        </p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-3">
                    <Form.Group>
                      <button type="submit" className="btn btn-dark mr-2 w-100" style={{height:"2.5rem", marginTop:"10%"}}>
                        Cancel
                      </button>
                    </Form.Group>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={errorState} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ClassForm;
