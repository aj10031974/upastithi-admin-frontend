import React, { Component, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import { useHistory } from "react-router-dom";
import validate from "./validator";
import api from "../services/api";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function StudentForm() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  const [errorState, seterrorState] = React.useState("error");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [values, setValues] = useState({
    createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
  });
  const [active, setActive] = useState({
    academicScoreAbove: "true",
    attendanceAbove: "true",
    caste: "true",
    religion: "true",
    scholarshipDescription: "true",
    scholarshipName: "true",
    scholarshipImage:"true",
    scholarshipLink:"true",
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shouldSubmit()) {
      e.preventDefault();
      setError(true);
      return;
    }
    if (shouldSubmit()) {
      e.preventDefault();
      setError(false);
      var str1 = values.startingDate, str2 = values.endingDate;
      values.sStartYear = str1.slice(0, 4);
      values.sStartMonth = parseInt(str1.slice(5, 7));
      values.sStartDate = parseInt(str1.slice(8, 10));
      values.sEndYear = parseInt(str2.slice(0, 4));
      values.sEndMonth = parseInt(str2.slice(5, 7));
      values.sEndDate = parseInt(str2.slice(8, 10));

      console.log("Form is ready to be submitted");

      delete values.startingDate;
      delete values.endingDate;
      console.log(values);
      api.addScholarship(values).then((response) => {
        console.log(response); 
        setOpen(true);
        seterrorMessage("Form submitted successfully")
        seterrorState("success")
        
      }).catch((error)=>{
        console.log("Error Occured while submitting form")
      })
    }

    // const form = {
    //   createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
    //   academicScoreAbove: "85",
    //   attendanceAbove: "75",
    //   caste: "OPEN",
    //   religion: "HINDU",
    //   scholarshipDescription: "scholarship for disables",
    //   scholarshipName: "MAHADBT",
    //   sEndYear: "2023",
    //   sEndMonth: "07",
    //   sEndDate: "01",
    //   sStartYear: "2022",
    //   sStartMonth: "07",
    //   sStartDate: "01",
    //   scholarshipImage: "http://placeimg.com/640/480",
    //   scholarshipLink: "https://emmitt.name",
    // };
   
  };

  const onChange = (e) => {
    setActive({ ...active, [e.target.name]: false });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function shouldSubmit() {
    if (!values.scholarshipName){
      setOpen(true)
      seterrorMessage("Scholarship Name is empty")
      seterrorState("error")
      return false;
    }else  if( !values.scholarshipDescription ){
      setOpen(true)
      seterrorMessage("Scholarship Description is empty")
      seterrorState("error")
      return false;
    }else  if(!values.religion){
      setOpen(true)
      seterrorMessage("Religion is empty")
      seterrorState("error")
      return false;
    }
    else  if(!values.caste){
      setOpen(true)
      seterrorMessage("Caste is empty")
      seterrorState("error")
      return false;
    }else  if( !isValid(values.attendanceAbove)){
      setOpen(true)
      seterrorMessage("Attendance Criteria is empty")
      seterrorState("error")
      return false;
    }else  if( !isValid(values.academicScoreAbove)){
      setOpen(true)
      seterrorMessage("Academic Score is empty")
      seterrorState("error")
      return false;
    }else  if(!values.startingDate){
      setOpen(true)
      seterrorMessage("Starting Date is empty")
      seterrorState("error")
      return false;
    }else  if(!values.endingDate){
      setOpen(true)
      seterrorMessage("Ending Date is empty")
      seterrorState("error")
      return false;
    }else  if(!values.scholarshipLink){
      setOpen(true)
      seterrorMessage("Scholarship Link is empty")
      seterrorState("error")
      return false;
    }else  if(!values.scholarshipImage){
      setOpen(true)
      seterrorMessage("Scholarship is empty")
      seterrorState("error")
      return false;
    }
   
    return true;
  }

  function isValid(score) {
    if (!score) {
      return 0;
    }
    if (score < 0 || score > 100) {
      return 0;
    }
    return 1;
  }
  
  const state = {
    startDate: new Date(),
    endDate: new Date(),
    formControls: {
      instituteName: {
        value: "",
        placeholder: "Insitute Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      instituteRegistrationID: {
        value: "",
        placeholder: "Caste",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      instituteEmail: {
        value: "",
        placeholder: "Email",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      institutePhoneNumber: {
        value: "",
        placeholder: "Phone Number",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentProfileImage: {
        value: "",
        placeholder: "Profile Image",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      Address: {
        value: "",
        placeholder: "Address",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      City: {
        value: "",
        placeholder: "City",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      Taluka: {
        value: "",
        placeholder: "Taluka",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      District: {
        value: "",
        placeholder: "District",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      State: {
        value: "",
        placeholder: "State",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      Country: {
        value: "",
        placeholder: "Country",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      PinCode: {
        value: "",
        placeholder: "PinCode",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      academicScoreAbove: {
        value: "",
        placeholder: "Academic Score Above",
        valid: false,
        required: true,
        errormessage: "",
      },
      attendanceAbove: {
        value: "",
        placeholder: "Attendance Above",
        valid: false,
        required: true,
        errormessage: "",
      },
      scholarshipDescription: {
        value: "",
        placeholder: "Scholarship Description",
        valid: false,
        required: true,
        errormessage: "",
      },
      scholarshipName: {
        value: "",
        placeholder: "Scholarship Name",
        valid: false,
        required: true,
        errormessage: "",
      },
      caste: {
        value: "",
        placeholder: "Caste",
        valid: false,
        required: true,
        errormessage: "",
      },
      religion: {
        value: "",
        placeholder: "Religion",
        valid: false,
        required: true,
        errormessage: "",
      },
      scholarshipImage: {
        value: "",
        placeholder: "Scholarship Image",
        valid: false,
        required: true,
        errormessage: "",
      },
      scholarshipLink: {
        value: "",
        placeholder: "Scholarship Application Link",
        valid: false,
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
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">ScholarShip Registration</h4>
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Schlorship Name</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="scholarshipName"
                          placeholder={
                            state.formControls.scholarshipName.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Scholorship Description</label>
                      <div>
                        <Form.Control
                          type="textarea"
                          name="scholarshipDescription"
                          placeholder={
                            state.formControls.scholarshipDescription
                              .placeholder
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
                      <label>Academic Score Above</label>
                      <Form.Control
                        type="number"
                        name="academicScoreAbove"
                        placeholder={
                          state.formControls.academicScoreAbove.placeholder
                        }
                        onChange={onChange}
                      />
                      {!isValid(values.academicScoreAbove) &&
                      !active.academicScoreAbove ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid academic score!
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Attendance Above</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="attendanceAbove"
                          placeholder={
                            state.formControls.attendanceAbove.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!isValid(values.attendanceAbove) &&
                      !active.attendanceAbove ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid Attendence!
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Caste</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="caste"
                          placeholder={state.formControls.caste.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Religion</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="religion"
                          placeholder={state.formControls.religion.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Starting Date</label>
                      <div>
                        <Form.Control
                          type="date"
                          name="startingDate"
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group>
                      <label>Ending Date</label>
                      <div>
                        <Form.Control
                          type="date"
                          name="endingDate"
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                  <Form.Group>
                      <label>Scholarship Portal Image</label>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          id="customFileLang"
                          lang="es"
                          name="scholarshipImage"
                          placeholder={state.formControls.scholarshipImage.placeholder}
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
                      <label>Scholorship Application Link</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="scholarshipLink"
                          onChange={onChange}
                          placeholder={state.formControls.scholarshipLink.placeholder}
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
                        <p style={{ color: "red", fontSize: 10 }}>
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
        <Alert onClose={handleClose} severity={errorState} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StudentForm;
