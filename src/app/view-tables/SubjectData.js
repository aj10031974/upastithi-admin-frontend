import React, { Component, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import EnhancedTable from "../tables/TableComponent";
import DataTable from "../tables/FilterableTable";
import api from "../services/api";

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "subjectName",
    headerName: "Subject Name",

    width: 150,
  },
  {
    field: "subjectSemester",
    headerName: "Semester",
    description: "This column has a value getter and is not sortable.",

    width: 150,
  },
  {
    field: "subjectAcademicYear",
    headerName: "Academic Year",
    description: "This column has a value getter and is not sortable.",
    width: 150,
  },
  { field: "subjectPattern", headerName: "Subject Pattern", width: 150 },

  {
    field: "subjectCode",
    headerName: "Subject Code",
    description: "This column has a value getter and is not sortable.",

    width: 150,
  },

  { field: "subjectBranch", headerName: "Subject Branch", width: 300 },

  
];

const rows = [
  {
    id : 1,
    subjectName : "Cloud Computing",
    subjectSemester : "VI",
    subjectAcademicYear : "2021-2022",
    subjectPattern : "2019 Pattern",
    subjectCode : "C231A7",
    subjectBranch : "Computer Engineering",
  },
  {
    id : 2,
    subjectName : "Cloud Computing 3",
    subjectSemester : "VI",
    subjectAcademicYear : "2021-2022",
    subjectPattern : "2019 Pattern",
    subjectCode : "C231A7",
    subjectBranch : "Computer Engineering",
  },
  {
    id : 3,
    subjectName : "Cloud ",
    subjectSemester : "VI",
    subjectAcademicYear : "2021-2022",
    subjectPattern : "2019 Pattern",
    subjectCode : "C231A1",
    subjectBranch : "Computer Engineering",
  },
  
];

export function BasicElements() {
  const [rows1, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const history = useHistory();
  useEffect(() => {
    // setCols(columns);
    // setRows(rows);
    if(localStorage.getItem("setAuthority")=="3"){
      api.viewInstituteByUUID(localStorage.getItem("InstituteUUID")).then((response)=>{
        console.log('User is verified: DashBoard');
        api.viewAllSubjectsWeb().then((response) => {
          console.log("response: ", response.data);
          setRows(response.data.data);
          setCols(response.data.header)
        });
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else if(localStorage.getItem("setAuthority")=="1" ){
      api.viewAdminByUUID(localStorage.getItem("UUID")).then((response)=>{
        console.log('Admin is verified: DashBoard');
        api.viewAllSubjectsWeb().then((response) => {
          console.log("response: ", response.data);
          setRows(response.data.data);
          setCols(response.data.header)
        });
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else if(localStorage.getItem("setAuthority")=="2" ){
      api.viewAuthorityByUUID(localStorage.getItem("UUID")).then((response)=>{
        console.log('Auhtority is verified: DashBoard');
        api.viewAllSubjectsWeb().then((response) => {
        console.log("response: ", response.data);
        setRows(response.data.data);
        setCols(response.data.header)
      });
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else{
      history.push('/')
    }
    
   
    // const data = {
    //   "employees:[
    //     {id:"301", "name:"Shantanu", experience:"11", "collegename:"PICT", totalLectures:"101"},
    //     {id:"302", "name:"SJ", experience:"11", "collegename:"PICT", totalLectures:"101"},
    //     {id:"303", "name:"VC", experience:"11", "collegename:"PICT", totalLectures:"101"},
    //     {id:"304", "name:"Shantanu Ashok", experience:"11", "collegename:"XYZ", totalLectures:"105"},

    //   ]
    //   }
    //   data.employees.map((data)=>{
    //     const newData = createData(data[id],data["name"],data["experience"],data["collegename"],data["totalLectures"]);
    //     rows.push(newData)
    //   })
    // setteacherDate(data.employees);
  }, []);

  return (
    <div>
      <div classname="row">
        <div classname="col-12 grid-margin">
          <div classname="card">
            <div classname="card-body">
              <h4 classname="card-title">Subject Data</h4>
              {/* {
                  rows.map((data)=>{
                    console.log(data);
                  })
                } */}

              {/* <EnhancedTable rows={rows}/> */}
              <DataTable row={rows1} cols={cols} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicElements;
