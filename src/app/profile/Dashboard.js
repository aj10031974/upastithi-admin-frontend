import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";
import ChartJs from "../charts/ChartJs";
import TeacherChartJs from "../charts/ChartJsTeacher";
import api from "../services/api";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
// import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

const blue = {
  50: "#ecedf2",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#ecedf285",
  500: "#ffffff",
  600: "#172b4c",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

// #e8eff4 grey => black

// #2C343B black => grey

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #aab2bd;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #000;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class Dashboard extends Component {
  state = {
    firstname: "",
    middleName: "",
    lastname: "",
    authority: "",
    address: "",
    state: "",
    country: "",
    gender: "",
    profileImage: "",
    email: "",
    phone: "",
    id: "",
    pincode :""
  };
  componentDidMount() {
    if (localStorage.getItem("setAuthority") == "3") {
      api
        .viewInstituteByUUID(localStorage.getItem("InstituteUUID"))
        .then((response) => {
          console.log("Institute is verified: DashBoard", response);
          const d = response.data;
          this.setState({
            firstname: d.instituteName,
            authority: "Institute",
            middleName: d.instituteAddress.adminMiddleName,
            lastname: d.instituteAddress.adminLastName,
            address: d.instituteAddress.Address,
            state: d.instituteAddress.State,
            country: d.instituteAddress.Country,
            gender: "",
            profileImage: d.instituteProfileImage,
            email: d.instituteEmail,
            phone: d.institutePhoneNumber,
            id: d.instituteRegistrationID,
            pincode:d.instituteAddress.PinCode,
          });
          
          
        })
        .catch((error) => {
          localStorage.clear();
          this.props.history.push("/");
        });
    } else if (localStorage.getItem("setAuthority") == "1") {
      api
        .viewAdminByUUID(localStorage.getItem("UUID"))
        .then((response) => {
          console.log("response: ", response.data);
          console.log("Admin is verified: DashBoard");
          const d = response.data;
          this.setState({
            firstname: d.adminName.adminFirstName,
            authority: "Admin",
            middleName: d.adminName.adminMiddleName,
            lastname: d.adminName.adminLastName,
            address: d.adminAddress.Address,
            state: d.adminAddress.State,
            country: d.adminAddress.Country,
            gender: d.adminGender,
            profileImage: d.adminProfileImage,
            email: d.adminEmail,
            phone: d.adminPhone,
            id: d.adminID,
            pincode:d.adminAddress.Pincode,
          });
          // adminAddress: {Country: 'India', Pincode: '411023', State: 'Maharashtra', City: 'Pune', Address: 'PICT'}
          // adminEmail: "admin@mail.com"
          // adminGender: "Male"
          // adminID: "admin"
          // adminName: {adminFirstName: 'Vrushaket', adminLastName: 'Chaudhari', adminMiddleName: 'Pravin'}
          // adminPhone: 9595068833
          // adminProfileImage: "https://avatars.githubusercontent.com/u/82214275?v=4"
          // adminUUID: "9atnJZzNVCaD9IHwWEg6azTtUnE3"
        })
        .catch((error) => {
          localStorage.clear();
          this.props.history.push("/");
        });
    } else if (localStorage.getItem("setAuthority") == "2") {
      api
        .viewAuthorityByUUID(localStorage.getItem("UUID"))
        .then((response) => {
          console.log("response: ", response);
          const d = response.data;
          this.setState({
            firstname: d.authorityName,
            authority: "Authority",
            // middleName: d.authorityName,
            // lastname: d.adminName.adminLastName,
            address:"Mahadb MahaIT Pune",
            state: "Maharashtra",
            country: "",
            gender: d.adminGender,
            profileImage: d.authorityProfileImage,
            email: d.authorityEmail,
            phone: d.authorityPhone,
            id: d.authorityRegID,
            pincode:"411034",
          });
          // console.log('Auhtority is verified: DashBoard');
        })
        .catch((error) => {
          localStorage.clear();
          this.props.history.push("/");
        });
    } else {
      this.props.history.push("/");
    }

    // authenticateInstitute();
  }
  render() {
    // const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      // setValue(newValue);
      this.setState({ value: newValue });
    };
    return (
      <>
        <section style={{ backgroundColor: "#eee" }}>
          <div className="container">
            {/* <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">User</a></li>
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
      </div>
    </div> */}

            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={this.state.profileImage}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />
                    <h5 className="my-3">{this.state.firstname}</h5>
                    <p className="text-muted mb-1">{this.state.authority}</p>
                    <p className="text-muted mb-4">
                      {this.state.address}
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <button type="button" className="btn btn-primary">
                        Logout
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary ms-1"
                      >
                        Home
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card mb-4 mb-lg-0">
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <p className="mb-0" style={{fontWeight:"bold"}}>Developed By</p>
                        <i className="fas fa-globe fa-lg text-warning"></i>
                        <p className="mb-0" style={{fontWeight:"bold"}}>Bhole Chature</p>
                      </li>
                      {/* <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-github fa-lg"
                          style={{ color: "#333333" }}
                        ></i>
                        <p className="mb-0">Shantanu Jain</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-twitter fa-lg"
                          style={{ color: "#55acee" }}
                        ></i>
                        <p className="mb-0">Vrushaket Chaudhari</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-twitter fa-lg"
                          style={{ color: "#55acee" }}
                        ></i>
                        <p className="mb-0">Soham Rakhunde</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-twitter fa-lg"
                          style={{ color: "#55acee" }}
                        ></i>
                        <p className="mb-0">Tanvesh Chavan</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-twitter fa-lg"
                          style={{ color: "#55acee" }}
                        ></i>
                        <p className="mb-0">Anand Bhalerao</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <i
                          className="fab fa-twitter fa-lg"
                          style={{ color: "#55acee" }}
                        ></i>
                        <p className="mb-0">Gauri Takawane</p>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                  <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">ID</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{this.state.id}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{this.state.firstname} {this.state.middleName} {this.state.lastname}</p>
                      </div>
                    </div>
                    {/* <hr/> */}
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{this.state.email}</p>
                      </div>
                    </div>
                    {/* <hr/> */}
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Mobile</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{this.state.phone}</p>
                      </div>
                    </div>
                    {/* <hr/> */}
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Pincode</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{this.state.pincode}</p>
                      </div>
                    </div>
                    {/* <hr/> */}
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {this.state.address}, {this.state.state}, {this.state.country}, {this.state.country}, {this.state.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">
                            assigment
                          </span>{" "}
                          Project Status
                        </p>
                        <p className="mb-1" style={{ fontSize: "0.77rem" }}>
                          Web Design
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          Website Markup
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "72%" }}
                            aria-valuenow="72"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          One Page
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "89%" }}
                            aria-valuenow="89"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          Mobile Template
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "55%" }}
                            aria-valuenow="55"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          Backend API
                        </p>
                        <div
                          className="progress rounded mb-2"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "66%" }}
                            aria-valuenow="66"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4">
                          <span className="text-primary font-italic me-1">
                            assigment
                          </span>{" "}
                          Project Status
                        </p>
                        <p className="mb-1" style={{ fontSize: "0.77rem" }}>
                          Web Design
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          Website Markup
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "72%" }}
                            aria-valuenow="72"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          One Page
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "89%" }}
                            aria-valuenow="89"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          Mobile Template
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "55%" }}
                            aria-valuenow="55"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p
                          className="mt-4 mb-1"
                          style={{ fontSize: "0.77rem" }}
                        >
                          Backend API
                        </p>
                        <div
                          className="progress rounded mb-2"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "66%" }}
                            aria-valuenow="66"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Dashboard;
