import React, { Component, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import validate from "./validator";
import api from "../services/api";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SubjectForm() {
  const [values, setValues] = useState({
    createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
  });
  const [open, setOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  
  const [errorState, seterrorState] = React.useState("error");


  const [active, setActive] = useState({
    subjectName: "true",
    subjectBranch: "true",
    subjectCode: "true",
    subjectAcademicYear: "true",
    subjectSemester: "true",
    subjectPattern:"true",
  });

  const [error, setError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
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
    if(shouldSubmit()){
      setError(false);
      e.preventDefault();
      console.log("Form is ready to be submitted");
      console.log(values)
      api.addSubject(values).then((response)=>{
        console.log(response);
        // alert("SUCCESS")
        setOpen(true);
        seterrorMessage("Form submitted successfully")
        seterrorState("success")
      }).catch((error)=>{
        console.log("Error Occured")
      })
    }
  };

  const onChange = (e) => {
    setActive({ ...active, [e.target.name]: false });
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  function shouldSubmit() {
    if (!values.subjectName){
      setOpen(true)
      seterrorMessage("Subject name is empty")
      seterrorState("error")
      return false;
    }
    if(!values.subjectBranch){
      setOpen(true)
      seterrorMessage("Field subject Branch is empty")
      seterrorState("error")
      return false;
    }
    if(!values.subjectCode){
      setOpen(true)
      seterrorMessage("Field subject code is empty")
      seterrorState("error")
      return false;
    }
    if(!values.subjectSemester){
      setOpen(true)
      seterrorMessage("Field Subject semester is empty");
      seterrorState("error")
      return false;
    }
    if(!values.subjectPattern){
      setOpen(true)
      seterrorMessage("Field Subject pattern is empty");
      seterrorState("error")
      return false;
    }
    if(!values.subjectAcademicYear){
      setOpen(true)
      seterrorMessage("Field Subject Academic is empty")
      seterrorState("error")
    }
    return true;
  }

  console.log(values)
 

  const state = {
    formControls: {
      subjectName:{
        value:"",
        placeholder:"Subject Name",
        valid:false,
        touched:false,
        required:true,
        errormessage:"",
      },
      subjectBranch:{
        value:"",
        placeholder:"Subject Branch",
        valid:false,
        touched:false,
        required:true,
        errormessage:"",
      },
      subjectCode:{
        value:"",
        placeholder:"Subject Code",
        valid:false,
        touched:false,
        required:true,
        errormessage:"",
      },
      subjectAcademicYear:{
        value:"",
        placeholder:"Academic Year",
        valid:false,
        touched:false,
        required:true,
        errormessage:"",
      },
      subjectPattern:{
        value:"",
        placeholder:"Subject Pattern",
        valid:false,
        touched:false,
        required:true,
        errormessage:"",
      },
      subjectSemester:{
        value:"",
        placeholder:"Semester",
        valid:false,
        touched:false,
        required:true,
        errormessage:"",
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
              <h4 className="card-title">Subject Form</h4>
              <form className="form-sample">

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Subject Name</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="subjectName"
                          placeholder={
                            state.formControls.subjectName.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Subject Branch</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="subjectBranch"
                          placeholder={
                            state.formControls.subjectBranch
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
                      <label>Subject Code</label>
                      <Form.Control
                        type="text"
                        name="subjectCode"
                        placeholder={
                          state.formControls.subjectCode.placeholder
                        }
                        onChange={onChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Subject Academic Year</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="subjectAcademicYear"
                          placeholder={
                            state.formControls.subjectAcademicYear.placeholder
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
                      <label>Subject Semester</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="subjectSemester"
                          placeholder={state.formControls.subjectSemester.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Subject Pattern</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="subjectPattern"
                          placeholder={state.formControls.subjectPattern.placeholder}
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
        <Alert onClose={handleClose} severity={errorState} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubjectForm;
