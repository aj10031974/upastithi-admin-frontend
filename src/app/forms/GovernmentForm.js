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

export function GovernmentForm() {
  const [values, setValues] = useState({
    createdBy: "admin",
    authorityGender: "Male",
  });
  const [open, setOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");

  const [errorState, seterrorState] = React.useState("error");

  const [active, setActive] = useState({
    authorityAddress: "true",
    authorityDesignation: "true",
    authorityEmail: "true",
    authorityGender: "true",
    authorityName: "true",
    authorityPhone: "true",
    authorityProfileImage: "true",
    authorityRegID: "true",
    authorityType: "true",
  });

  const [error, setError] = useState(false);

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
      console.log(values);
      // const form = {
      //   authorityAddress: '36571 Taylor Drives',
      //   authorityDesignation: 'Investor',
      //   authorityEmail: 'Hoyt_Kunze@hotmail.com',
      //   authorityGender: 'Male',
      //   authorityName: 'Wuckert, Hoppe and Anderson',
      //   authorityPhone: '825-392-5418',
      //   authorityProfileImage: 'http://placeimg.com/640/480/business',
      //   authorityRegID: '5260f7db-1669-46f8-b407-98cdd3262392',
      //   authorityType: 'Public',
      //   createdBy: 'admin'
      // }

      api
        .addAuthority(values)
        .then((response) => {
          console.log(response);
          // alert("SUCCESS")
          setOpen(true);
          seterrorMessage("Form submitted successfully");
          seterrorState("success");
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
    if (!values.authorityAddress) {
      setOpen(true);
      seterrorMessage("Authority Address name is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityDesignation) {
      setOpen(true);
      seterrorMessage("Authority Designation is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityEmail) {
      setOpen(true);
      seterrorMessage("Authority Email is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityGender) {
      setOpen(true);
      seterrorMessage("Authority Gender is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityName) {
      setOpen(true);
      seterrorMessage("Authority Name is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityPhone) {
      setOpen(true);
      seterrorMessage("Authority Phone is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityProfileImage) {
      setOpen(true);
      seterrorMessage("Authority Profile Image is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityRegID) {
      setOpen(true);
      seterrorMessage("Authority Reg ID is empty");
      seterrorState("error");
      return false;
    }
    if (!values.authorityType) {
      setOpen(true);
      seterrorMessage("Authority type is empty");
      seterrorState("error");
      return false;
    }
    if(!ValidateEmail(values.authorityEmail)){
      setOpen(true);
      seterrorMessage("Please Enter a Valid Email");
      seterrorState("error");
      return false;
    }
    if(!ValidatePhone(values.authorityPhone)){
      setOpen(true);
      seterrorMessage("Please Enter a Valid Phone number");
      seterrorState("error");
      return false;
    }
    return true;
  }

  console.log(values);

  const state = {
    formControls: {
      authorityAddress: {
        value: "",
        placeholder: "Authority Address",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityDesignation: {
        value: "",
        placeholder: "Authority Designation",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityEmail: {
        value: "",
        placeholder: "Authority Email",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityGender: {
        value: "",
        placeholder: "Authority Gender",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityName: {
        value: "",
        placeholder: "Authority Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityPhone: {
        value: "",
        placeholder: "Authority Phone",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityProfileImage: {
        value: "",
        placeholder: "Authority Image",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityRegID: {
        value: "",
        placeholder: "Authority Registration ID",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      authorityType: {
        value: "",
        placeholder: "Authority Type",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
    },
  };

  function ValidateEmail(mail) {
    if (!mail) {
      return 0;
    }
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mail.match(validRegex)) {
      return 1;
    }
    return 0;
  }

  function ValidatePhone(phone) {
    if (!phone) {
      return 0;
    }
    if (phone.length < 10) {
      return 0;
    }

    return 1;
  }

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
  }, []);


  return (
    <div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Government Form</h4>
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Authority Address</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="authorityAddress"
                          placeholder={
                            state.formControls.authorityAddress.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Authority Designation</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="authorityDesignation"
                          placeholder={
                            state.formControls.authorityDesignation.placeholder
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
                      <label>Authority Email</label>
                      <Form.Control
                        type="text"
                        name="authorityEmail"
                        placeholder={
                          state.formControls.authorityEmail.placeholder
                        }
                        onChange={onChange}
                      />
                      {!ValidateEmail(values.authorityEmail) &&
                      !active.authorityEmail ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid email
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Gender</label>
                      <div>
                        <select
                          className="form-control"
                          name="authorityGender"
                          placeholder={
                            state.formControls.authorityGender.placeholder
                          }
                          onChange={onChange}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Authority Profile Image</label>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          id="customFileLang"
                          lang="es"
                          name="authorityProfileImage"
                          placeholder={
                            state.formControls.authorityProfileImage.placeholder
                          }
                          onChange={onChange}
                        />

                        <label
                          className="custom-file-label"
                          htmlFor="customFileLang"
                        >
                          Upload image
                        </label>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Authority Registration</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="authorityRegID"
                          placeholder={
                            state.formControls.authorityRegID.placeholder
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
                      <label>Authority Name</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="authorityName"
                          placeholder={
                            state.formControls.authorityName.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Authority Type</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="authorityType"
                          placeholder={
                            state.formControls.authorityType.placeholder
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
                      <label>Authority Phone Number</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="authorityPhone"
                          placeholder={
                            state.formControls.authorityPhone.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidatePhone(values.authorityPhone) &&
                      !active.authorityPhone ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid phone number
                        </p>
                      ) : (
                        <p></p>
                      )}
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
                        style={{ height: "2.5rem", marginTop: "10%" }}
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
                      <button
                        type="submit"
                        className="btn btn-dark mr-2 w-100"
                        style={{ height: "2.5rem", marginTop: "10%" }}
                      >
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
        <Alert
          onClose={handleClose}
          severity={errorState}
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default GovernmentForm;