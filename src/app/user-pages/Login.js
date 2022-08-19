import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import api from "../services/api";
import swal from "sweetalert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCveDNeBQxMIqe0bfgqK751PmQzA1IlYsg",
  authDomain: "upastithi-01.firebaseapp.com",
  projectId: "upastithi-01",
  storageBucket: "upastithi-01.appspot.com",
  messagingSenderId: "131587034208",
  appId: "1:131587034208:web:27468404c96ecbf8d18705",
  measurementId: "G-810G9KTQ8S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const [open, setOpen] = React.useState(false);
// const [errorMessage, seterrorMessage] = React.useState("");
// const [errorState, seterrorState] = React.useState("error");
// let history = useHistory();


export class Login extends Component {
  state = { username: "", password: "", authority: "", open:false, errorMessage:"", errorState:"error" };

  handleUsernameInput = (username) =>
    this.setState({ username: username.target.value });
  handlePasswordInput = (password) =>
    this.setState({ password: password.target.value });
  onAuthorityChange = (authority) =>
    this.setState({ authority: authority.target.value });
  // handleChangeInput = (event) => {
  //   const { value, maxLength } = event.target;
  //   const message = value.slice(0, maxLength);

  //   this.setState({
  //     form: {
  //       message,
  //     },
  //   });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.state.username;
    const password = this.state.password;
    const authority = this.state.authority;
    if (email.length == 0) {
      // alert("Email is empty");
      this.setState({open:true, errorState:"error",errorMessage:"Email is empty"})
      return;
    }
    if (password.length == 0) {
      // alert("Password is empty");
      this.setState({open:true, errorState:"error",errorMessage:"Password is empty"})
      return;
    }
    if (authority.length == 0) {
      // alert("Please select authority");
      this.setState({open:true, errorState:"error",errorMessage:"Authority is empty"})
      return;
    }
    console.log(this.state.username);

    console.log(this.state.password);

    console.log(this.state.authority);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.username, this.state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // alert("Hello")
        if (authority == 3) {
          api
            .viewInstituteByUUID(user.uid)
            .then((response) => {
              console.log("response: ", response);
              // alert("We'll set in local storage")
              localStorage.setItem(
                "InstituteUUID",
                response.data.instituteUUID
              );

              localStorage.setItem("InstituteID", response.data.instituteID);
              localStorage.setItem("Name", response.data.instituteName);

              localStorage.setItem("setAuthority", 3);
              this.props.history.push("/dashboard");
            })
            .catch((error) => {
              // alert("Wrong ID or Password or wrong authority Institute");
              console.log("Authority 3, change to institute" )
          swal({
            title: "Error",
            text: "Invalid Credentials",
            icon: "error",
            button: "Try again!",
          });
            });
        } else if (authority == 1) {
          api
            .viewAdminByUUID(user.uid)
            .then((response) => {
              console.log("Admin response: ", response);
              // alert("We'll set in local storage")
              localStorage.setItem("UUID", response.data.adminUUID);

              localStorage.setItem("AdminID", response.data.adminID);
              localStorage.setItem(
                "Name",
                response.data.adminName.adminFirstName
              );

              localStorage.setItem("setAuthority", 1);
              this.props.history.push("/dashboard");
            })
            .catch((error) => {
              // alert("Wrong ID or Password or wrong authority Admin")
              console.log("Authority 1, change authority to admin");
              swal({
                title: "Error",
                text: "Invalid Credentials",
                icon: "error",
                button: "Try again!",
              });
            });
        } else if (authority == 2) {
          api
            .viewAuthorityByUUID(user.uid)
            .then((response) => {
              console.log("Authority response: ", response);
              // alert("We'll set in local storage")
              localStorage.setItem("UUID", response.data.authorityUUID);

              localStorage.setItem(
                "authorityRegID",
                response.data.authorityRegID
              );
              localStorage.setItem("Name", response.data.authorityName);

              localStorage.setItem("setAuthority", 2);
              this.props.history.push("/dashboard");
            })
            .catch((error) => {
              // alert("Wrong ID or Password or wrong authority Authority")
              console.log("Authority 2, change authority to authority");
              swal({
                title: "Error",
                text: "Invalid Credentials",
                icon: "error",
                button: "Try again!",
              });
              console.log(error);
            });
        } else {
          // alert("work in progress");
          // console.log("Authority 2, change authority" )
          swal({
            title: "Error",
            text: "Invalid Credentials",
            icon: "error",
            button: "Try again!",
          });
        }
        //
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage)
        // swal("Error")
        swal({
          title: "Error",
          text: "No user found",
          icon: "error",
          button: "Try again!",
        });
      });
  };
  render() {
    const handleClick = () => {
      // setOpen(true);
      this.setState({open:true});
    };
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    
      this.setState({open:false});
      // setOpen(false);
    };
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img src={require("../../assets/images/logo.svg")} alt="logo"  style={{marginLeft:"30%"}}/> */}
                  <span
                    style={{
                      color: "#000",
                      letterSpacing: "0.5rem",
                      fontSize: "30px",
                      marginLeft: "20%",
                    }}
                  >
                    {" "}
                    UPASTITHI
                  </span>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      placeholder="Username"
                      size="lg"
                      className="h-auto"
                      onChange={this.handleUsernameInput}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      size="lg"
                      className="h-auto"
                      onChange={this.handlePasswordInput}
                    />
                  </Form.Group>
                  {/* <Form.Group className="d-flex search-field">
                    <Form.Control type="dropdown" placeholder="Password" size="lg" className="h-auto" onChange={this.handlePasswordInput}/>
                  </Form.Group> */}
                  <Form.Group className="d-flex search-field">
                    <div
                      size="lg"
                      className="h-auto"
                      style={{ width: "100%", height: "100%", }}
                    >
                      <select
                        className="form-control h-auto d-flex"
                        name="studentBloodGroup"
                        // placeholder={
                        //   state.formControls.studentBloodGroup.placeholder
                        // }
                        onChange={this.onAuthorityChange}
                        size="lg"
                        style={{padding:"15px" }}
                      >
                        <option value="">Select User</option>
                        <option value="1">Admin</option>
                        <option value="2">Government Authority</option>
                        <option value="3">Institute</option>
                        <option value="4">Teacher</option>
                      </select>
                    </div>
                  </Form.Group>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={this.handleSubmit}
                    >
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a
                      href="!#"
                      onClick={(event) => event.preventDefault()}
                      className="auth-link text-muted"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mb-2">
                    <button
                      type="button"
                      className="btn btn-block btn-facebook auth-form-btn"
                    >
                      <i className="mdi mdi-cellphone-android mr-2"></i>
                      Download App
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/user-pages/register" className="text-primary">
                      Contact Admin
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <Snackbar open={this.state.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={this.state.errorState}
          sx={{ width: "100%" }}
        >
          {this.state.errorMessage}
        </Alert>
      </Snackbar>
      </div>
    );
  }
}

export default Login;
