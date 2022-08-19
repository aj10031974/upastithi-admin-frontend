import React, { Component, useEffect } from "react";
import { useState } from "react";

import EnhancedTable from "../tables/TableComponent";
import DataTable from "../tables/FilterableTable";
import api from "../services/api";
import Loader from "react-js-loader";
import { useHistory } from "react-router-dom";
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
  { field: "id", headerName: "ID", width: 70 },
  { field: "Name", headerName: "Name", width: 300 },
  { field: "CollegeName", headerName: "College Name", width: 300 },
  {
    field: "Experience",
    headerName: "Experience",
    type: "number",
    width: 200,
  },
  {
    field: "TotalLecturesTaken",
    headerName: "Total Lectures Taken",
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    type: "number",
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    Name: "Shantanu Jain",
    CollegeName: "Pune Insitutute Of Computer Technology",
    Experience: 35,
    TotalLecturesTaken: 10,
  },
  {
    id: 2,
    Name: "Shanty J",
    CollegeName: "Cersei",
    Experience: 42,
    TotalLecturesTaken: 11,
  },
  {
    id: 3,
    Name: "Shan",
    CollegeName: "Jaime",
    Experience: 45,
    TotalLecturesTaken: 11,
  },
  {
    id: 4,
    Name: "Stark",
    CollegeName: "Arya",
    Experience: 16,
    TotalLecturesTaken: 11,
  },
  {
    id: 5,
    Name: "Targaryen",
    CollegeName: "Daenerys",
    Experience: null,
    TotalLecturesTaken: 11,
  },
  {
    id: 6,
    Name: "Melisandre",
    CollegeName: null,
    Experience: 150,
    TotalLecturesTaken: 11,
  },
  {
    id: 7,
    Name: "Clifford",
    CollegeName: "Ferrara",
    Experience: 44,
    TotalLecturesTaken: 11,
  },
  {
    id: 8,
    Name: "Frances",
    CollegeName: "Rossini",
    Experience: 36,
    TotalLecturesTaken: 11,
  },
  {
    id: 9,
    Name: "Roxie Shantanu",
    CollegeName: "Harvey",
    Experience: 65,
    TotalLecturesTaken: 12,
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
        api.viewTeachersByInstitute(localStorage.getItem("InstituteID")).then((response) => {
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
        api.viewTeachers().then((response) => {
          console.log("response: ", response.data.data);
          
          console.log("response: ", response.data.header);
          setRows(response.data.data);
          setCols(response.data.header);
        });
  
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else if(localStorage.getItem("setAuthority")=="2" ){
      api.viewAuthorityByUUID(localStorage.getItem("UUID")).then((response)=>{
        console.log('Auhtority is verified: DashBoard');
        api.viewTeachers().then((response) => {
          console.log("response: ", response.data.data);
          
          console.log("response: ", response.data.header);
          setRows(response.data.data);
          setCols(response.data.header);
        });
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else{
      history.push('/')
    }

    
      

    // api.viewTeachersByInstitute(localStorage.getItem("InstituteID")).then((response) => {
    //   console.log("response: ", response.data);
    //   setRows(response.data.data);
    //   setCols(response.data.header)
    // });
   
    // const data = {
    //   "employees":[
    //     {"id":"301", "name":"Shantanu","experience":"11", "collegename":"PICT","totalLectures":"101"},
    //     {"id":"302", "name":"SJ","experience":"11", "collegename":"PICT","totalLectures":"101"},
    //     {"id":"303", "name":"VC","experience":"11", "collegename":"PICT","totalLectures":"101"},
    //     {"id":"304", "name":"Shantanu Ashok","experience":"11", "collegename":"XYZ","totalLectures":"105"},

    //   ]
    //   }
    //   data.employees.map((data)=>{
    //     const newData = createData(data["id"],data["name"],data["experience"],data["collegename"],data["totalLectures"]);
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
              <h4 classname="card-title">Teacher Data</h4>
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
