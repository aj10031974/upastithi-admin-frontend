import React, { Component, useEffect } from "react";
import { useState } from "react";

import EnhancedTable from "../tables/TableComponent";
import DataTable from "../tables/FilterableTable";
import api from "../services/api";
import { useHistory } from "react-router-dom";
import Loader from "react-js-loader";
// function createData(id ,name, collegename, fat, totalLectures) {
//   return {
//     id,
//     name,
//     collegename,
//     fat,
//     totalLectures,

//   };
// }

// const rows = [
//   createData( 305,'Cupcake', 3.7, 67, 4.3),
//   createData( 452, 'Donut',25.0, 51, 4.9),
//   createData( 262,'Eclair', 16.0, 24, 6.0),
//   createData( 159,'Frozen yoghurt', 6.0, 24, 4.0),
//   createData( 356,'Gingerbread', 16.0, 49, 3.9),
//   createData( 408,'Honeycomb', 3.2, 87, 6.5),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   // createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   // createData('KitKat', 518, 26.0, 65, 7.0),
//   // createData('Lollipop', 392, 0.2, 98, 0.0),
//   // createData('Marshmallow', 318, 0, 81, 2.0),
//   // createData('Nougat', 360, 19.0, 9, 37.0),
//   // createData('Oreo', 437, 18.0, 63, 4.0),
// ];

const columns = [
  // scholarshipName: "cpawle1@latimes.com",
  //   scholarshipDescription: "Skiptube",
  //   caste: "OPEN",
  //   attendanceAbove: "80%",
  //   religion: "HINDU",
  //   academicScoreAbove: "75%",
  //   scholarshipLink: "www.xyz.com",
  
  {
    field: "scholarshipName",
    headerName: "Scholarship Name",

    width: 250,
  },
  {
    field: "scholarshipDescription",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",

    width: 300,
  },
  {
    field: "caste",
    headerName: "Caste Eligigble",
    description: "This column has a value getter and is not sortable.",
    // type: "boolean",
    width: 100,
  },
  { field: "attendanceAbove", headerName: "Attendance Criteria", width: 100 },

  {
    field: "religion",
    headerName: "Religion Criteria",
    description: "This column has a value getter and is not sortable.",

    width: 100,
  },

  { field: "academicScoreAbove", headerName: "Academic Score Above", width: 100 },

  {
    field: "scholarshipLink",
    headerName: "Application Link",
   
    width: 200,
  },
];

const rows = [
  {
    id: 2,
    scholarshipName: "cpawle1@latimes.com",
    scholarshipDescription: "Skiptube",
    caste: "OPEN",
    attendanceAbove: "80%",
    religion: "HINDU",
    academicScoreAbove: "75%",
    scholarshipLink: "www.xyz.com",
  },
  {
    id: 2,
    scholarshipName: "cpawle1@latimes.com",
    scholarshipDescription: "Skiptube",
    caste: "OPEN",
    attendanceAbove: "80%",
    religion: "HINDU",
    academicScoreAbove: "75%",
    scholarshipLink: "www.xyz.com",
  },
  
];

 // scholarshipDescription: "Et repellendus non sit impedit illo quisquam. Quia aliquid tenetur non aliquid ut ut doloribus. Et in facilis. Nihil in sint rerum quam quibusdam aperiam quam minima."
    // scholarshipEligibility: {caste: 'None', attendanceAbove: '75', religion: 'None', academicScoreAbove: '75'}
    // scholarshipEndDate: {_seconds: 1664562600, _nanoseconds: 0}
    // scholarshipID: "32fd34501b2811edb42b1b6cf017d7501660409498645"
    // scholarshipImage: "http://placeimg.com/640/480"
    // scholarshipLink: "https://makayla.net"
    // scholarshipName: "Tasty Steel Ball"
    // scholarshipStartDate: {_seconds: 1601490600, _nanoseconds: 0}
    // updatedBy: ""
    // updatedTime: ""

export function BasicElements() {
  const [rows1, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const  history= useHistory();

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
   
    api.viewScholarshipsWeb().then((response) => {
      console.log("response: ", response.data);
      setRows(response.data.data);
      setCols(response.data.header)
    });

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
              <h4 classname="card-title">Scholarship Data</h4>
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
