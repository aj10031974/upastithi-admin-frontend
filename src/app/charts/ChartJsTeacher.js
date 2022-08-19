import React, { Component } from "react";
import { Line, Bar, Doughnut, Pie, Scatter } from "react-chartjs-2";
import axios from "axios";
import { Grid } from "react-loader-spinner";
import api from "../services/api";

export class ChartJs extends Component {
  data = {
    labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
    datasets: [
      {
        label: "# of Votes",
        data: [10, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  areaOptions = {
    plugins: {
      filler: {
        propagate: true,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
  };

  scatterChartData = {
    datasets: [
      {
        label: "First Dataset",
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 3,
          },
          {
            x: -25,
            y: 5,
          },
          {
            x: 40,
            y: 5,
          },
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255,99,132,1)"],
        borderWidth: 1,
      },
      {
        label: "Second Dataset",
        data: [
          {
            x: 10,
            y: 5,
          },
          {
            x: 20,
            y: -30,
          },
          {
            x: -25,
            y: 15,
          },
          {
            x: -10,
            y: 5,
          },
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  scatterChartOptions = {
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
  };

  state = {};

  getStudentData(response) {
    const arr = [],
      v = [],
      sch = [] , 
      total = [];
    arr.push(response.data.message.totalStudentGenderCount.Male);
    arr.push(response.data.message.totalStudentGenderCount.Female);

    sch.push(response.data.message.totalGenderWiseNonEligible.Male);
    sch.push(response.data.message.totalGenderWiseNonEligible.Female);

    v.push(response.data.message.totalGenderWiseEligible.Male);
    v.push(response.data.message.totalGenderWiseEligible.Female);

    total.push(response.data.message.totalScholarshipEligibleStudent);
    total.push(response.data.message.totalScholarshipNonEligibleStudent);

    const states_students = Object.keys(
      response.data.message.stateWiseStudentCount
    );
    const state_students_cnt = Object.values(
      response.data.message.stateWiseStudentCount
    );
    this.setState({ students: arr, isFetching: false });
    this.setState({ schlorShipElig: sch, isFetching: false });
    this.setState({ schlorShipNonElig: v, isFetching: false });
    this.setState({ total: total, isFetching: false });

    this.setState({
      statewiseStudents: states_students,
      isFetching: false,
    });
    this.setState({
      state_student_count: state_students_cnt,
      isFetching: false,
    });
  }

  getTeacherData(response) {
    const arr = [];
    const states_teachers = Object.keys(
      response.data.message.stateWiseTeacherCount
    );
    const state_teacher_cnt = Object.values(
      response.data.message.stateWiseTeacherCount
    );
    arr.push(response.data.message.genderWiseTeacherCount.Male);
    arr.push(response.data.message.genderWiseTeacherCount.Female);

    this.setState({ data: arr, isFetching: false });
    this.setState({ statewise: states_teachers, isFetching: false });
    this.setState({
      state_teacher_count: state_teacher_cnt,
      isFetching: false,
    });
  }

  componentDidMount() {
    this.setState({ ...this.state, isFetching: true });
    if (
      localStorage.getItem("setAuthority") == 1 ||
      localStorage.getItem("setAuthority") == 2
    ) {
      axios
        .get("https://upastithiapi.herokuapp.com/totalTeachers")
        .then((response) => {
          this.getTeacherData(response);
          console.log("response: ", response);
        });

      axios
        .get("https://upastithiapi.herokuapp.com/totalStudents")
        .then((response) => {
          this.getStudentData(response);
        });
    } else if (localStorage.getItem("setAuthority") == 3) {
      api
        .totalStudentsofInstitute(localStorage.getItem("InstituteID"))
        .then((response) => {
          this.getStudentData(response);
        });
      api
        .totalTeachersofInstitute(localStorage.getItem("InstituteID"))
        .then((response) => {
          console.log("response: ", response);

          this.getTeacherData(response);
        });
    }
  }

  render() {
    
    const doughnutPieData = {
      datasets: [
        {
          data: this.state.data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
        },
      ],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Male", "Female"],
    };

    const studentData = {
      datasets: [
        {
          data: this.state.students,
          backgroundColor: [
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 99, 132, 0.5)",

            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255,99,132,1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
        },
      ],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Male", "Female"],
    };

    const scholarship = {
      datasets: [
        {
          data: this.state.total,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Not-eligible", "Eligible"],
    };
    // console.log(this.state.schlorShipElig, this.state.schlorShipNonElig);

    const scholarshipEligible = {
      labels: ["Male" , "Female"],

      datasets: [
        {
          stack:'Stack 0',
          label: "Non Eligible",
          data: this.state.schlorShipElig,
          backgroundColor:'blue'
        },
        {
          stack:'Stack 0',
          label: "Eligible",
          data: this.state.schlorShipNonElig,
          backgroundColor:'red'
        },

        
      ],
   
      // These labels appear in the legend and in the tooltips when hovering different arcs
    };

    const doughnutPieOptions = {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    };

    const StatewiseTeachers = {
      labels: this.state.statewise,
      datasets: [
        {
          label: "No. of Teachers",
          data: this.state.state_teacher_count,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          fill: true, // 3: no fill
        },
      ],
    };

    const StatewiseStudents = {
      labels: this.state.statewiseStudents,
      datasets: [
        {
          label: "StateWise Data",
          data: this.state.state_student_count,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          fill: true, // 3: no fill
        },
      ],
    };

    return (
      <div>
        <div className="page-header">
          {/* <h3 className="page-title">Dashboard and Analysis</h3> */}
          {/* <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  DashBoard
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                DashBoard
              </li>
            </ol>
          </nav> */}
        </div>
        {/* <hr></hr>
        <h4 className="page-title">Students</h4>
        <hr></hr> */}
        {/* <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Student Gender Ratio</h4>
                {this.state.isFetching ? (
                  // <Grid color="#00BFFF" height={40} width={40} />
                  <Doughnut data={studentData} options={doughnutPieOptions} />
                ) : (
                  <Doughnut data={studentData} options={doughnutPieOptions} />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Scholarship Eligible Students</h4>
                {this.state.isFetching ? (
                  <Pie data={scholarship} options={doughnutPieOptions} />
                ) : (
                  <Pie data={scholarship} options={doughnutPieOptions} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">StateWise Students</h4>
                {this.state.isFetching ? (
                  // <Grid color="#00BFFF" height={40} width={40} />
                  <Bar data={StatewiseStudents} options={this.areaOptions} />
                ) : (
                  <Bar data={StatewiseStudents} options={this.areaOptions} />
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Male/Female Eligible</h4>
                {this.state.isFetching ? (
                  <Grid color="#00BFFF" height={40} width={40} />
                ) : (
                  // <Bar data={StatewiseStudents} options={this.areaOptions} />
                  <Bar data={scholarshipEligible} options={this.areaOptions} />
                )}
              </div>
            </div>
          </div>
        </div> */}

        {/* ####################    TEACHERS    ################## */}
        <hr></hr>
        <h4 className="page-title">Teachers</h4>
        <hr></hr>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Total Teachers</h4>
                {this.state.isFetching ? (
                  // <Grid color="#00BFFF" height={40} width={40} />
                  <Doughnut
                    data={doughnutPieData}
                    options={doughnutPieOptions}
                  />
                ) : (
                  <Doughnut
                    data={doughnutPieData}
                    options={doughnutPieOptions}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">StateWise Teachers</h4>
                {this.state.isFetching ? (
                  // <Grid color="#00BFFF" height={40} width={40} />
                  <Bar data={StatewiseTeachers} options={this.areaOptions} />
                ) : (
                  <Bar data={StatewiseTeachers} options={this.areaOptions} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartJs;
