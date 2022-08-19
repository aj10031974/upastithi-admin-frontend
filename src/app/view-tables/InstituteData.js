import React, { Component, useEffect } from "react";
import { useState } from "react";

import EnhancedTable from "../tables/TableComponent";
import DataTable from "../tables/FilterableTable";
import api from "../services/api";
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
  {
    field: "instituteRegistrationID",
    headerName: "Registration No",

    width: 150,
  },
  {
    field: "instituteName",
    headerName: "Name",
    description: "This column has a value getter and is not sortable.",

    width: 200,
  },
  {
    field: "instituteEmail",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    type: "boolean",
    width: 200,
  },
  { field: "institutePhoneNumber", headerName: "Phone Number", width: 300 },

  {
    field: "instituteWebsite",
    headerName: "Website",
    description: "This column has a value getter and is not sortable.",

    width: 100,
  },

  
];

const rows = [
  {
    id: 1,
    studentEmail: "cmackall0@mayoclinic.com",
    studentInstituteID: "Realcube",
    studentEnrollmentID: 1,
    studentGender: "Female",
    studentName: "Chrysa",
    studentScholarshipEligible: false,
    studentPhoneNumber: "787-654-7233",
  },
  {
    id: 2,
    studentEmail: "cpawle1@latimes.com",
    studentInstituteID: "Skiptube",
    studentEnrollmentID: 2,
    studentGender: "Non-binary",
    studentName: "Celestina",
    studentScholarshipEligible: true,
    studentPhoneNumber: "240-561-3475",
  },
  {
    id: 3,
    studentEmail: "bteliga2@ebay.co.uk",
    studentInstituteID: "Wordify",
    studentEnrollmentID: 3,
    studentGender: "Female",
    studentName: "Bernie",
    studentScholarshipEligible: true,
    studentPhoneNumber: "139-183-3350",
  },
  {
    id: 4,
    studentEmail: "pgreensted3@imdb.com",
    studentInstituteID: "Fliptune",
    studentEnrollmentID: 4,
    studentGender: "Female",
    studentName: "Perle",
    studentScholarshipEligible: true,
    studentPhoneNumber: "889-418-7565",
  },
  {
    id: 5,
    studentEmail: "mdaborn4@google.it",
    studentInstituteID: "Devcast",
    studentEnrollmentID: 5,
    studentGender: "Female",
    studentName: "Maryanna",
    studentScholarshipEligible: true,
    studentPhoneNumber: "573-125-7932",
  },
  {
    id: 6,
    studentEmail: "hjoesbury5@va.gov",
    studentInstituteID: "Gigashots",
    studentEnrollmentID: 6,
    studentGender: "Female",
    studentName: "Hyacinth",
    studentScholarshipEligible: false,
    studentPhoneNumber: "729-708-6987",
  },
  {
    id: 7,
    studentEmail: "jruff6@home.pl",
    studentInstituteID: "Oyoloo",
    studentEnrollmentID: 7,
    studentGender: "Female",
    studentName: "Jerrylee",
    studentScholarshipEligible: false,
    studentPhoneNumber: "426-485-3826",
  },
  {
    id: 8,
    studentEmail: "sivanyushkin7@google.com.hk",
    studentInstituteID: "Eadel",
    studentEnrollmentID: 8,
    studentGender: "Female",
    studentName: "Sofie",
    studentScholarshipEligible: true,
    studentPhoneNumber: "957-955-0078",
  },
  {
    id: 9,
    studentEmail: "ibunning8@livejournal.com",
    studentInstituteID: "Kaymbo",
    studentEnrollmentID: 9,
    studentGender: "Male",
    studentName: "Ignacio",
    studentScholarshipEligible: true,
    studentPhoneNumber: "547-223-1052",
  },
  {
    id: 10,
    studentEmail: "rvannoort9@miibeian.gov.cn",
    studentInstituteID: "Oloo",
    studentEnrollmentID: 10,
    studentGender: "Male",
    studentName: "Reuben",
    studentScholarshipEligible: false,
    studentPhoneNumber: "444-862-7102",
  },
  {
    id: 11,
    studentEmail: "amoralisa@dmoz.org",
    studentInstituteID: "Ozu",
    studentEnrollmentID: 11,
    studentGender: "Female",
    studentName: "Amitie",
    studentScholarshipEligible: true,
    studentPhoneNumber: "280-510-5393",
  },
  {
    id: 12,
    studentEmail: "gwickendonb@nps.gov",
    studentInstituteID: "Bubbletube",
    studentEnrollmentID: 12,
    studentGender: "Female",
    studentName: "Griselda",
    studentScholarshipEligible: false,
    studentPhoneNumber: "512-857-3150",
  },
  {
    id: 13,
    studentEmail: "lamorinec@bloglines.com",
    studentInstituteID: "Thoughtstorm",
    studentEnrollmentID: 13,
    studentGender: "Male",
    studentName: "Langsdon",
    studentScholarshipEligible: true,
    studentPhoneNumber: "433-515-3043",
  },
  {
    id: 14,
    studentEmail: "ldavydkovd@taobao.com",
    studentInstituteID: "Abata",
    studentEnrollmentID: 14,
    studentGender: "Female",
    studentName: "Lavinia",
    studentScholarshipEligible: false,
    studentPhoneNumber: "447-463-8326",
  },
  {
    id: 15,
    studentEmail: "dmaggse@sciencedaily.com",
    studentInstituteID: "Gabspot",
    studentEnrollmentID: 15,
    studentGender: "Male",
    studentName: "Dean",
    studentScholarshipEligible: true,
    studentPhoneNumber: "248-175-2973",
  },
  {
    id: 16,
    studentEmail: "bpuxleyf@parallels.com",
    studentInstituteID: "Kwinu",
    studentEnrollmentID: 16,
    studentGender: "Male",
    studentName: "Bartolomeo",
    studentScholarshipEligible: false,
    studentPhoneNumber: "240-970-9082",
  },
  {
    id: 17,
    studentEmail: "svoffg@foxnews.com",
    studentInstituteID: "Plajo",
    studentEnrollmentID: 17,
    studentGender: "Female",
    studentName: "Samantha",
    studentScholarshipEligible: false,
    studentPhoneNumber: "813-524-5706",
  },
  {
    id: 18,
    studentEmail: "bstorckeh@google.ca",
    studentInstituteID: "Topicblab",
    studentEnrollmentID: 18,
    studentGender: "Male",
    studentName: "Barr",
    studentScholarshipEligible: true,
    studentPhoneNumber: "585-121-0914",
  },
  {
    id: 19,
    studentEmail: "hspeedyi@archive.org",
    studentInstituteID: "Topdrive",
    studentEnrollmentID: 19,
    studentGender: "Male",
    studentName: "Hall",
    studentScholarshipEligible: false,
    studentPhoneNumber: "453-544-9768",
  },
  {
    id: 20,
    studentEmail: "tdoidgej@smugmug.com",
    studentInstituteID: "Geba",
    studentEnrollmentID: 20,
    studentGender: "Male",
    studentName: "Terrill",
    studentScholarshipEligible: false,
    studentPhoneNumber: "271-853-6650",
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

    api.viewInstitutes().then((response) => {
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
              <h4 classname="card-title">Institute Data</h4>
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
