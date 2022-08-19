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
    Country: "India",
    instituteUUID : "NCLy8xUoPlaSugnqLlyXohU0Wei1",
    createdBy : "admin",
  });
  const [active, setActive] = useState({
    instituteName: "true",
    instituteEmail: "true",
    institutePhoneNumber: "true",
    City: "true",
    Country: "true",
    Taluka: "true",
    District: "true",
    PinCode: "true",
    Address: "true",
    instituteRegistrationID :"true",
    instituteRegistration:'true',
    studentInstituteID:'true',
    instituteWebsite:'true'
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
    
      setError(false);
      console.log("Form is ready to be submitted");
      var pho = Number(values.institutePhoneNumber);
      var pincode = parseInt(values.PinCode);
      values.institutePhoneNumber = pho;
      values.PinCode = pincode;
      delete values.studentDOB;
      console.log(values);
      api.addInstitute(values).then((response)=>{
      console.log(response);
      // alert("Success")
      setOpen(true);
      seterrorMessage("Form submitted successfully")
      seterrorState("success")
      
    }).catch((error)=>{
      console.log("Error Occured while submitting form")
    })

    }

   
    
  };

  const onChange = (e) => {
    setActive({ ...active, [e.target.name]: false });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function valName(str) {
    if (!str) {
      return 0;
    }
    if (str.length < 2 || str.length > 100) {
      return 0;
    }
    return 1;
  }

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

  function isPinCode(PinCode) {
    
    if (!PinCode) {
      return 0;
    }
    if (PinCode.length === 6) {
      return 1;
    }
    return 0;
  }

  function isRoll(Roll){
    if (!Roll) {
      return 0;
    }
    if (Roll.length === 5) {
      return 1;
    }
    return 0;

  }

  function shouldSubmit() {
    if (!valName(values.instituteName)){
      setOpen(true)
      seterrorMessage("Institute Name is empty")
      seterrorState("error")
      return false;
    }else  if(!values.instituteWebsite){
      setOpen(true)
      seterrorMessage("Institute Website is empty")
      seterrorState("error")
      return false;
    }else  if(!values.instituteRegistrationID){
      setOpen(true)
      seterrorMessage("Institute Registration is empty")
      seterrorState("error")
      return false;
    }
    else  if(!ValidatePhone(values.institutePhoneNumber) ){
      setOpen(true)
      seterrorMessage("Institute Phone number is empty")
      seterrorState("error")
      return false;
    }else  if(!ValidateEmail(values.instituteEmail) ){
      setOpen(true)
      seterrorMessage("Institute Email is empty")
      seterrorState("error")
      return false;
    }else if (!isPinCode(values.PinCode)){
      setOpen(true)
      seterrorMessage("Pincode is empty")
      seterrorState("error")
      return false;
    }
    else if (!values.District){
      setOpen(true)
      seterrorMessage("District is empty")
      seterrorState("error")
      return false;
    } else if ( !values.Taluka){
      setOpen(true)
      seterrorMessage("Taluka is empty")
      seterrorState("error")
      return false;
    }
    else if (!values.City){
      setOpen(true)
      seterrorMessage("City is empty")
      seterrorState("error")
      return false;
    }
    else if (!values.State){
      setOpen(true)
      seterrorMessage("State is empty")
      seterrorState("error")
      return false;
    }
    else if (!values.Country){
      setOpen(true)
      seterrorMessage("Country is empty")
      seterrorState("error")
      return false;
    }

    
    return true;
    // console.log(values);
    // const form = {
    //   createdBy :  'rhAwejtzpSRt4Uw7mfeDP89R8NE2',
    //   instituteName :  '',
    //   Address :  '',
    //   City :  '',
    //   Taluka :  '',
    //   District :  '',
    //   State :  '',
    //   Country :  '',
    //   PinCode :  '',
    //   instituteEmail :  '',
    //   institutePhoneNumber :  '',
    //   instituteWebsite :  '',
    //   instituteRegistrationID :  '' 
    // }

    
  }


  const state = {
    startDate: new Date(),
    formControls: {
      instituteName: {
        value: "",
        placeholder: "Insitute Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      instituteRegistrationID : {
        value: "",
        placeholder: "Institute Registration ID",
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
      studentInstituteID: {
        value: "",
        placeholder: "Institute ID",
        valid: false,
        required: true,
        errormessage: "",
      },
      instituteWebsite:{
        value:"",
        placeholder:"Institute Website",
        valid:false,
        required:true,
        errormessage:"",
      }
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
              <h4 className="card-title">Institute Registration</h4>
              <form className="form-sample">
                <p className="card-description">Name</p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Institute Name</label>
                      <Form.Control
                        type="text"
                        id="instituteName"
                        name="instituteName"
                        placeholder={state.formControls.instituteName.placeholder}
                        onChange={onChange}
                      />
                      {!valName(values.instituteName) && !active.instituteName ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          FirstName should be between 2 and 30 characters
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Institute Website</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="instituteWebsite"
                          placeholder={
                            state.formControls.instituteWebsite.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <p className="card-description">Details</p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Institute Registration ID</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="instituteRegistrationID"
                          placeholder={state.formControls.instituteRegistrationID.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">

                  <div className="col-md-6">
                    <Form.Group>
                      <label>Email</label>
                      <div>
                        <Form.Control
                          type="email"
                          name="instituteEmail"
                          placeholder={
                            state.formControls.instituteEmail.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidateEmail(values.instituteEmail) &&
                      !active.instituteEmail ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid email
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
                      <label>Phone Number</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="institutePhoneNumber"
                          placeholder={
                            state.formControls.institutePhoneNumber.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidatePhone(values.institutePhoneNumber) &&
                      !active.institutePhoneNumber ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid phone number
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  
                  
                </div>

                <p className="card-description"> Address </p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Address </label>
                      <div>
                        <Form.Control
                          type="text"
                          name="Address"
                          placeholder={state.formControls.Address.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>City</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="City"
                          placeholder={state.formControls.City.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Taluka</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="Taluka"
                          placeholder={state.formControls.Taluka.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>District</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="District"
                          placeholder={state.formControls.District.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>State</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="State"
                          placeholder={state.formControls.State.placeholder}
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Country</label>
                      <div>
                        <select
                          className="form-control"
                          name="Country"
                          placeholder={state.formControls.Country.placeholder}
                          onChange={onChange}
                        >
                          <option>India</option>
                          <option>Italy</option>
                          <option>Russia</option>
                          <option>Britain</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Postal Code</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="PinCode"
                          placeholder={state.formControls.PinCode.placeholder}
                          onChange={onChange}
                        />
                      </div>
                      {!isPinCode(values.PinCode) && !active.PinCode ? (
                        // <p style={{ fontSize: 10, color: "red" }}>
                        //   Enter a valid Pincode
                        // </p>
                        <></>
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
