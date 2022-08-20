import React, { Component, useEffect } from "react";
import { useState } from "react";

import EnhancedTable from "../tables/TableComponent";
import DataTable from "../tables/FilterableTable";
import api from "../services/api";
import { useHistory } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "className",
    headerName: "Class Name",

    width: 150,
  },
  {
    field: "classShift",
    headerName: "Class Shift",
    description: "This column has a value getter and is not sortable.",

    width: 100,
  },
  {
    field: "classBranch",
    headerName: "Class Branch",
    description: "This column has a value getter and is not sortable.",
    width: 200,
  },
  { field: "classSemeter", headerName: "Semester", width: 100 },

  {
    field: "classInsitituteID",
    headerName: "Institute Name",
    description: "This column has a value getter and is not sortable.",

    width: 300,
  },

  { field: "classAcademicYear", headerName: "Academic year", width: 300 },

  
];

const rows = [
  {
    id: 1,
    className: "TE04",
    classShift: "II",
    classBranch: "Computer Engineering",
    classSemeter: "VI",
    classInsitituteID: "Pune Institute Of Computer Technology",
    classAcademicYear: "2021-2022",
  },
  {
    id: 2,
    className: "TE03",
    classShift: "II",
    classBranch: "Computer Engineering",
    classSemeter: "VI",
    classInsitituteID: "Pune Institute Of Computer Technology",
    classAcademicYear: "2021-2022",
  },
  {
    id: 3,
    className: "TE02",
    classShift: "II",
    classBranch: "Computer Engineering",
    classSemeter: "VI",
    classInsitituteID: "Pune Institute Of Computer Technology",
    classAcademicYear: "2021-2022",
  },
  
];

export function BasicElements() {
  const [rows1, setRows] = useState([]);
  const [cols, setCols] = useState([]);

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
    api.viewAllClassWeb().then((response) => {
      console.log("response: ", response.data);
      setRows(response.data.data);
      setCols(response.data.header)
    });

  }, []);

  return (
    <div>
      <div classname="row">
        <div classname="col-12 grid-margin">
          <div classname="card">
            <div classname="card-body">
              <h4 classname="card-title">Class Data</h4>
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
