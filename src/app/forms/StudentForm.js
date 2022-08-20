import React, { Component, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import countryList from "react-select-country-list";
import validate from "./validator";
import api from "../services/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function StudentForm() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  const [errorState, seterrorState] = React.useState("error");
  let history = useHistory();
  const [data, setData] = useState([]);
  const [getcountry, setCountry] = useState([]);
  const [getState, setState] = useState([]);
  const [selectedState, setselectedState] = useState();
  const [cities, setCities] = useState([]);

  const options = countryList().getData();
  const countries = [];
  for (var i = 0; i < options.length; i++) {
    countries.push(options[i].label);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [values, setValues] = useState({
    Country: "India",
    studentBloodGroup: "A+",
    studentInstituteID: "1a0d5990eed511eca816cb00a51c40571655535957418",
    createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
    studentClassID: "a0a226501c8611edb6e7953685d4d3e41660560006454",
    studentGender: "Male",
    studentisHandicap: "No",
  });
  const [active, setActive] = useState({
    studentFirstName: "true",
    studentMiddleName: "true",
    studentLastName: "true",
    studentEmail: "true",
    studentPhoneNumber: "true",
    City: "true",
    Country: "true",
    Taluka: "true",
    District: "true",
    PinCode: "true",
    studentDOB: "true",
    Address: "true",
    studentRollNumber: "true",
    studentEnrollmentID: "true",
    studentInstituteID: "true",
    studentBMACAddress: "true",
    studentCaste: "true",
    studentReligion: "true",
    studentisHandicap: "true",
    studentSSCmark: "true",
    studentHSCmark: "true",
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // values
    console.log("values: ", values);

    if (!shouldSubmit()) {
      e.preventDefault();
      setError(true);
      return;
    }
    if (shouldSubmit()) {
      setError(false);
      console.log("Form is ready to be submitted");
      var str = values.studentDOB;
      var pho = Number(values.studentPhoneNumber);
      var pincode = parseInt(values.PinCode);
      values.dobYear = parseInt(str.slice(0, 4));
      values.dobMonth = parseInt(str.slice(5, 7));
      values.dobDate = parseInt(str.slice(8, 10));
      values.studentPhoneNumber = pho;
      values.PinCode = pincode;
      delete values.studentDOB;
      // var insituteID = localStorage.getItem("InstituteID")
      console.log(values);
      var form = {
        studentFirstName: values.studentFirstName,
        studentMiddleName: values.studentMiddleName,
        studentLastName: values.studentLastName,
        Address: values.Address,
        City: values.City,
        Taluka: values.Taluka,
        District: values.District,
        State: values.State,
        Country: values.Country,
        PinCode: values.PinCode,
        dobYear: values.dobYear,
        dobMonth: values.dobMonth,
        dobDate: values.dobDate,
        studentEmail: values.studentEmail,
        studentEnrollmentID: values.studentEnrollmentID,
        studentRollNumber: values.studentRollNumber,
        studentGender: values.studentGender,
        studentClassID: values.studentClassID,
        studentPhoneNumber: values.studentPhoneNumber,
        studentProfileImage: values.studentProfileImage,
        studentInstituteID: localStorage.getItem("InstituteID"),
        studentBloodGroup: values.studentBloodGroup,
        // studentBMACAddress: "00:11:22:33:FF:EE",
        studentBMACAddress: values.studentBMACAddress,
        studentCaste: values.studentCaste,
        studentReligion: values.studentReligion,
        studentisHandicap: values.studentisHandicap,
        studentSSCmark: values.studentSSCmark,
        studentHSCmark: values.studentHSCmark,
        createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
      };

      api
        .addStudent(form)
        .then((response) => {
          console.log(response);
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

  function valName(str) {
    if (!str) {
      return 0;
    }
    if (str.length < 1 || str.length > 100) {
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
    if (PinCode.length >= 6) {
      return 1;
    }
    return 0;
  }

  function isRoll(Roll) {
    if (!Roll) {
      return 0;
    }
    if (Roll.length === 5) {
      return 1;
    }
    return 0;
  }

  function ValidateMarks(marks) {
    if (marks >= 0 && marks <= 100) {
      return true;
    }
    return false;
  }

  function shouldSubmit() {
    if (!valName(values.studentFirstName)) {
      setOpen(true);
      seterrorMessage("First Name is empty");
      seterrorState("error");
      return false;
    } else if (!valName(values.studentLastName)) {
      setOpen(true);
      seterrorMessage("Last Name is empty");
      seterrorState("error");
      return false;
    } else if (!ValidateEmail(values.studentEmail)) {
      setOpen(true);
      seterrorMessage("Email is empty");
      seterrorState("error");
      return false;
    } else if (!values.studentPhoneNumber) {
      setOpen(true);
      seterrorMessage("Phone number is empty");
      seterrorState("error");
      return false;
    } else if (!values.Address) {
      setOpen(true);
      seterrorMessage("Address is empty");
      seterrorState("error");
      return false;
    } else if (!values.studentEnrollmentID) {
      setOpen(true);
      seterrorMessage("Enrollment ID is empty");
      seterrorState("error");
      return false;
    } else if (!values.studentDOB) {
      setOpen(true);
      seterrorMessage("Date of Birth is empty");
      seterrorState("error");
      return false;
    } else if (!isPinCode(values.PinCode)) {
      setOpen(true);
      seterrorMessage("Pincode is empty");
      seterrorState("error");
      return false;
    } else if (!values.District) {
      setOpen(true);
      seterrorMessage("District is empty");
      seterrorState("error");
      return false;
    } else if (!values.Taluka) {
      setOpen(true);
      seterrorMessage("Taluka is empty");
      seterrorState("error");
      return false;
    } else if (!values.City) {
      setOpen(true);
      seterrorMessage("City is empty");
      seterrorState("error");
      return false;
    } else if (!values.State) {
      setOpen(true);
      seterrorMessage("State is empty");
      seterrorState("error");
      return false;
    } else if (!values.Country) {
      setOpen(true);
      seterrorMessage("Country is empty");
      seterrorState("error");
      return false;
    } else if (!values.studentCaste) {
      setOpen(true);
      seterrorMessage("Please fill the caste section");
      seterrorState("error");
      return false;
    } else if (!values.studentReligion) {
      setOpen(true);
      seterrorMessage("Please fill the religion section");
      seterrorState("error");
      return false;
    } else if (!values.studentSSCmark) {
      setOpen(true);
      seterrorMessage("Please enter SSC marks");
      seterrorState("error");
      return false;
    } else if (!values.studentHSCmark) {
      setOpen(true);
      seterrorMessage("Please enter HSC marks");
      seterrorState("error");
      return false;
    }
    return true;
  }

  console.log(values);

  // console.log(shouldSubmit());
  // console.log(values)

  const state = {
    startDate: new Date(),
    formControls: {
      studentFirstName: {
        value: "",
        placeholder: "First Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentMiddleName: {
        value: "",
        placeholder: "Middle Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentLastName: {
        value: "",
        placeholder: "Last Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentRollNumber: {
        value: "",
        placeholder: "Student Roll no.",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentClassID: {
        value: "",
        placeholder: "Class ID",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentEmail: {
        value: "",
        placeholder: "Email",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentExperience: {
        value: "",
        placeholder: "Experience",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentGender: {
        value: "",
        placeholder: "Gender",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentPhoneNumber: {
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
      studentEnrollmentID: {
        value: "",
        placeholder: "Student Enrollment ID",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentClassID: {
        value: "",
        placeholder: "Student Class ID",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      studentBloodGroup: {
        value: "",
        placeholder: "Blood Group",
        valid: false,
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
      studentBMACAddress: {
        value: "",
        placeholder: "BMAC Address",
        valid: false,
        required: true,
        errormessage: "",
      },
      studentCaste: {
        value: "",
        placeholder: "Caste",
        valid: false,
        required: true,
        errormessage: "",
      },
      studentReligion: {
        value: "",
        placeholder: "Religion",
        valid: false,
        required: true,
        errormessage: "",
      },
      studentisHandicap: {
        value: "",
        placeholder: "Handicap Status",
        valid: false,
        required: true,
        errormessage: "",
      },
      studentSSCmark: {
        value: "",
        placeholder: "SSC mark",
        valid: false,
        required: true,
        errormessage: "",
      },
      studentHSCmark: {
        value: "",
        placeholder: "HSC mark",
        valid: false,
        required: true,
        errormessage: "",
      },
    },
  };

  // 'studentCaste': 'NA',
  // 'studentReligion': 'Hindu',
  // 'studentisHandicap': 'false',
  // 'studentSSCmark': '78',
  // 'studentHSCmark': '96'

  useEffect(() => {
    if (localStorage.getItem("setAuthority") == "3") {
      api
        .viewInstituteByUUID(localStorage.getItem("InstituteUUID"))
        .then((response) => {
          console.log("User is verified: DashBoard");
        })
        .catch((error) => {
          localStorage.clear();
          history.push("/");
        });
    } else if (localStorage.getItem("setAuthority") == "1") {
      api
        .viewAdminByUUID(localStorage.getItem("UUID"))
        .then((response) => {
          console.log("Admin is verified: DashBoard");
        })
        .catch((error) => {
          localStorage.clear();
          history.push("/");
        });
    } else if (localStorage.getItem("setAuthority") == "2") {
      api
        .viewAuthorityByUUID(localStorage.getItem("UUID"))
        .then((response) => {
          console.log("Auhtority is verified: DashBoard");
        })
        .catch((error) => {
          localStorage.clear();
          history.push("/");
        });
    } else {
      history.push("/");
    }
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    bsCustomFileInput.init();
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  const handleCountry = (e) => {
    setActive({ ...active, [e.target.name]: false });
    setValues({ ...values, [e.target.name]: e.target.value });
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    console.log(states);
    setState(states);
  };

  const handleState = (e) => {
    setActive({ ...active, [e.target.name]: false });
    setValues({ ...values, [e.target.name]: e.target.value });
    let cities = data.filter((city) => city.subcountry === e.target.value);
    cities = [...new Set(cities.map((item) => item.name))];
    cities.sort();
    setCities(cities);
  };
  console.log(values);

  return (
    <div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Student Registration</h4>
              <form className="form-sample">
                <p className="card-description">Name </p>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group>
                      <label>First Name</label>
                      <Form.Control
                        type="text"
                        id="studentFirstName"
                        name="studentFirstName"
                        placeholder={
                          state.formControls.studentFirstName.placeholder
                        }
                        onChange={onChange}
                      />
                      {!valName(values.studentFirstName) &&
                      !active.studentFirstName ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          FirstName should be between 1 and 100 characters
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <label>Middle Name</label>

                      <Form.Control
                        type="text"
                        id="exampleInputUsername1"
                        placeholder={
                          state.formControls.studentMiddleName.placeholder
                        }
                        name="studentMiddleName"
                        onChange={onChange}
                      />
                      {!valName(values.studentMiddleName) &&
                      !active.studentMiddleName ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          MiddleName should be between 1 and 100 characters
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <label>Last Name</label>

                      <Form.Control
                        type="text"
                        id="studentLastName"
                        name="studentLastName"
                        placeholder={
                          state.formControls.studentLastName.placeholder
                        }
                        onChange={onChange}
                      />
                      {!valName(values.studentLastName) &&
                      !active.studentLastName ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          LastName should be between 1 and 100 characters
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                </div>

                <p className="card-description">Details</p>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Roll Number</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="studentRollNumber"
                          placeholder={
                            state.formControls.studentRollNumber.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!isRoll(values.studentRollNumber) &&
                      !active.studentRollNumber ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid Roll no
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group>
                      <label>Date of Birth</label>
                      <div>
                        <Form.Control
                          type="date"
                          name="studentDOB"
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Student Enrollment ID</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="studentEnrollmentID"
                          placeholder={
                            state.formControls.studentEnrollmentID.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Email</label>
                      <div>
                        <Form.Control
                          type="email"
                          name="studentEmail"
                          placeholder={
                            state.formControls.studentEmail.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidateEmail(values.studentEmail) &&
                      !active.studentEmail ? (
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
                      <label>Institute ID</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="studentInstituteID"
                          placeholder={
                            state.formControls.studentInstituteID.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Gender</label>
                      <div>
                        <select
                          className="form-control"
                          name="studentGender"
                          placeholder={
                            state.formControls.studentGender.placeholder
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
                      <label>Phone Number</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="studentPhoneNumber"
                          placeholder={
                            state.formControls.studentPhoneNumber.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidatePhone(values.studentPhoneNumber) &&
                      !active.studentPhoneNumber ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter a valid phone number
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>File upload</label>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          id="customFileLang"
                          lang="es"
                          name="studentProfileImage"
                          placeholder={
                            state.formControls.studentProfileImage.placeholder
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
                      <label>Class ID</label>
                      <div>
                        <select
                          className="form-control"
                          name="studentClassID"
                          placeholder={
                            state.formControls.studentClassID.placeholder
                          }
                          onChange={onChange}
                        >
                          <option value="e3f2c6401c8511eda0e85904125eae4d1660559689893">
                            TE03
                          </option>
                          <option value="a0a226501c8611edb6e7953685d4d3e41660560006454">
                            TE04
                          </option>
                          {/* <option>C</option>
                          <option>D</option> */}
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Student Blood Group</label>
                      <div>
                        <select
                          className="form-control"
                          name="studentBloodGroup"
                          placeholder={
                            state.formControls.studentBloodGroup.placeholder
                          }
                          onChange={onChange}
                        >
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Student BMAC Address</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="studentBMACAddress"
                          placeholder={
                            state.formControls.studentBMACAddress.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <p className="card-description">Student Related Details</p>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Student Caste</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="studentCaste"
                          placeholder={
                            state.formControls.studentCaste.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Student Religion</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="studentReligion"
                          placeholder={
                            state.formControls.studentReligion.placeholder
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
                      <label>Handicap status (yes/no)</label>
                      <div>
                        <select
                          className="form-control"
                          name="studentisHandicap"
                          placeholder={
                            state.formControls.studentisHandicap.placeholder
                          }
                          onChange={onChange}
                        >
                          <option>No</option>
                          <option>Yes</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Student SSC marks</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="studentSSCmark"
                          placeholder={
                            state.formControls.studentSSCmark.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidateMarks(values.studentSSCmark) &&
                      !active.studentSSCmark ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter valid Marks
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
                      <label>Student HSC marks</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="studentHSCmark"
                          placeholder={
                            state.formControls.studentHSCmark.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidateMarks(values.studentHSCmark) &&
                      !active.studentHSCmark ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Enter valid Marks
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
                      <label>Address 1</label>
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
                      <select
                        className="form-control"
                        name="City"
                        placeholder={state.formControls.City.placeholder}
                        onChange={onChange}
                      >
                        {cities.map((values) => (
                          <option key={values}>{values}</option>
                        ))}
                      </select>
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
                      <select
                        className="form-control"
                        name="State"
                        placeholder={state.formControls.State.placeholder}
                        onChange={(e) => handleState(e)}
                      >
                        {getState.map((values) => (
                          <option key={values}>{values}</option>
                        ))}
                      </select>
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
                          onChange={handleCountry}
                        >
                          {country.map((values) => (
                            <option key={values}>{values}</option>
                          ))}
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
                        style={{ height: "2.5rem", marginTop: "10%" }}
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

export default StudentForm;
