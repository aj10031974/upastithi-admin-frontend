import React, { Component, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import { useHistory } from "react-router-dom";
import validate from "./validator";
import api from "../services/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Papa from "papaparse";
import axios from "axios";
// import swal from ""
import swal from "sweetalert";
import countryList from "react-select-country-list";
import { JsonToTable } from "react-json-to-table";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function TeacherForm() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  const [errorState, seterrorState] = React.useState("error");

  const [dataTable, setdataTable] = React.useState({});
  const blankRows = [];
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
    teacherBloodGroup: "A+",
    teacherDesignation: "Associate Professor",
    teacherInstituteID: "1a0d5990eed511eca816cb00a51c40571655535957418",
    createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
    teacherGender: "Male",
  });
  const [active, setActive] = useState({
    firstname: "true",
    middlename: "true",
    lastname: "true",
    teacherEmail: "true",
    teacherExperience: "true",
    teacherPhoneNumber: "true",
    City: "true",
    Country: "true",
    Taluka: "true",
    District: "true",
    PinCode: "true",
    teacherDOB: "true",
    Address: "true",
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.teacherGender);

    if (!shouldSubmit()) {
      e.preventDefault();
      setError(true);
      // alert("Hello")

      return;
    }
    if (shouldSubmit()) {
      setError(false);
      console.log("Form is ready to be submitted");
      var str = values.teacherDOB;
      var pho = Number(values.teacherPhoneNumber);
      var pincode = parseInt(values.PinCode);
      values.dobYear = parseInt(str.slice(0, 4));
      values.dobMonth = parseInt(str.slice(5, 7));
      values.dobDate = parseInt(str.slice(8, 10));
      values.teacherPhoneNumber = pho;
      values.PinCode = pincode;
      delete values.teacherDOB;
      console.log(values);
      // const form = JSON.stringify(values);
      console.log("VALUES::", values);
      console.log("form: ", values.teacherFirstName);
      const form = {
        teacherFirstName: values.firstname,
        teacherLastName: values.lastname,
        teacherMiddleName: values.middlename,
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
        teacherEmail: values.teacherEmail,
        teacherDesignation: values.teacherDesignation,
        teacherExperience: values.teacherExperience,
        teacherGender: values.teacherGender, //CHANGE THIS
        teacherInstituteID: localStorage.getItem("InstituteID"),
        teacherPhoneNumber: values.teacherPhoneNumber,
        teacherProfileImage: "http://placeimg.com/640/480",
        teacherRegID: values.TeacherRegId, //CHANGE THIS
        teacherBloodGroup: values.teacherBloodGroup,
        createdBy: "rhAwejtzpSRt4Uw7mfeDP89R8NE2",
      };
      api
        .addTeacher(form)
        .then((response) => {
          console.log("response: ", response);

          setOpen(true);
          seterrorMessage("Teacher Register Successfully");
          seterrorState("success");
        })
        .catch((error) => {
          console.log("ERROR OCURED", error);
          setOpen(true);
          seterrorMessage("Error Occured");
          seterrorState("error");
        });
    }
  };

  const onChange = (e) => {
    setActive({ ...active, [e.target.name]: false });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fileparser = (e) => {
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
        },
      });
    }
  };

  function clean(obj) {
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
    swal("blank rows are", str);
    setdataTable(obj);
    return obj;
  }

  function valName(str) {
    if (!str) {
      return 0;
    }
    if (str.length < 2 || str.length > 30) {
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

  function shouldSubmit() {
    if (!valName(values.firstname)) {
      setOpen(true);
      seterrorMessage("First Name is empty");
      seterrorState("error");
      return false;
    } else if (!valName(values.lastname)) {
      setOpen(true);
      seterrorMessage("Last Name is empty");
      seterrorState("error");
      return false;
    } else if (!ValidateEmail(values.teacherEmail)) {
      setOpen(true);
      seterrorMessage("Email is empty");
      seterrorState("error");
      return false;
    } else if (!values.teacherPhoneNumber) {
      setOpen(true);
      seterrorMessage("Phone number is empty");
      seterrorState("error");
      return false;
    } else if (!values.Address) {
      setOpen(true);
      seterrorMessage("Address is empty");
      seterrorState("error");
      return false;
    } else if (!values.teacherDOB) {
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
    } else if (!values.TeacherRegId) {
      setOpen(true);
      seterrorMessage("Registration ID is empty");
      seterrorState("error");
      return false;
    }

    return true;
  }

  console.log(error);

  const state = {
    startDate: new Date(),
    formControls: {
      firstname: {
        value: "",
        placeholder: "First Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      middlename: {
        value: "",
        placeholder: "Middle Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      lastname: {
        value: "",
        placeholder: "Last Name",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      teacherBloodGroup: {
        value: "",
        placeholder: "Blood Group",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      teacherDesignation: {
        value: "",
        placeholder: "Designation",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      teacherEmail: {
        value: "",
        placeholder: "Email",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      teacherExperience: {
        value: "",
        placeholder: "Experience",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      teacherGender: {
        value: "",
        placeholder: "Gender",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      teacherPhoneNumber: {
        value: "",
        placeholder: "Phone Number",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
      teacherProfileImage: {
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
      TeacherRegId: {
        value: "",
        placeholder: "Teacher Registration Id",
        valid: false,
        touched: false,
        required: true,
        errormessage: "",
      },
    },

    /////////////////////---------Step 1 end
  };

  let history = useHistory();


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
  console.log(values)

  return (
    <div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Teacher Registration</h4>
              {/* <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={fileparser}
      />
       <JsonToTable json={dataTable} /> */}
              <form className="form-sample">
                <p className="card-description">Name </p>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group>
                      <label>First Name</label>
                      <Form.Control
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder={state.formControls.firstname.placeholder}
                        onChange={onChange}
                      />
                      {!valName(values.firstname) && !active.firstname ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          FirstName should be between 2 and 30 characters
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
                        placeholder={state.formControls.middlename.placeholder}
                        name="middlename"
                        onChange={onChange}
                      />
                      {!valName(values.middlename) && !active.middlename ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          MiddleName should be between 2 and 30 characters
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
                        id="lastname"
                        name="lastname"
                        placeholder={state.formControls.lastname.placeholder}
                        onChange={onChange}
                      />
                      {!valName(values.lastname) && !active.lastname ? (
                        <p style={{ fontSize: 10, color: "red" }}>
                          Lastname should be between 2 and 30 characters
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
                      <label>Blood Group</label>
                      <div>
                        <select
                          className="form-control"
                          name="teacherBloodGroup"
                          placeholder={
                            state.formControls.teacherBloodGroup.placeholder
                          }
                          onChange={onChange}
                        >
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>

                          <option>O+</option>

                          <option>O-</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group>
                      <label>Date of Birth</label>
                      <div>
                        <Form.Control
                          type="date"
                          name="teacherDOB"
                          onChange={onChange}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Designation</label>
                      <div>
                        <select
                          className="form-control"
                          name="teacherDesignation"
                          placeholder={
                            state.formControls.teacherDesignation.placeholder
                          }
                          onChange={onChange}
                        >
                          <option>Associate Professor</option>
                          <option>Assistant Professor</option>
                          <option>Support Staff</option>
                          <option>Non-teaching Staff</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Email</label>
                      <div>
                        <Form.Control
                          type="email"
                          name="teacherEmail"
                          placeholder={
                            state.formControls.teacherEmail.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidateEmail(values.teacherEmail) &&
                      !active.teacherEmail ? (
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
                      <label>Experience</label>
                      <div>
                        <Form.Control
                          type="number"
                          name="teacherExperience"
                          placeholder={
                            state.formControls.teacherExperience.placeholder
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
                          name="teacherGender"
                          placeholder={
                            state.formControls.teacherGender.placeholder
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
                          name="teacherPhoneNumber"
                          placeholder={
                            state.formControls.teacherPhoneNumber.placeholder
                          }
                          onChange={onChange}
                        />
                      </div>
                      {!ValidatePhone(values.teacherPhoneNumber) &&
                      !active.teacherPhoneNumber ? (
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
                          name="teacherProfileImage"
                          placeholder={
                            state.formControls.teacherProfileImage.placeholder
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
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Teacher Registration Id</label>
                      <div>
                        <Form.Control
                          type="text"
                          name="TeacherRegId"
                          placeholder={
                            state.formControls.TeacherRegId.placeholder
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

export default TeacherForm;
