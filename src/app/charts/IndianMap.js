
import React, { useEffect, useState } from "react";

import DatamapsIndia from "react-datamaps-india";
import axios from "axios";
import { useHistory } from "react-router-dom";
import api from "../services/api";

const Example = () => {

  const [states, setStates] = useState({});
  const [values, setValues] = useState({});
  const [final, setFinal] = useState([]);
  const data = {};
  const mp = new Map();
  const history = useHistory();
  useEffect(() => {
    if(localStorage.getItem("setAuthority")=="3"){
      api.viewInstituteByUUID(localStorage.getItem("InstituteUUID")).then((response)=>{
        console.log('response: ', response.data);
        console.log('User is verified: DashBoard');
       
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })

      api.totalStudentsofInstitute(localStorage.getItem("InstituteID")).then((response)=>{
        console.log('reksdjdsjkdsdfjkdfjfdjks: ', response);
         setStates(response.data.message.stateWiseStudentCount);
          setValues(response.data.message.stateWiseStudentCount);
  

      })
    }else if(localStorage.getItem("setAuthority")=="1" ){
      api.viewAdminByUUID(localStorage.getItem("UUID")).then((response)=>{
        console.log('Admin is verified: DashBoard');
        api.totalStudents().then((response) => {
          console.log('response: ', response);
  
          setStates(response.data.message.stateWiseStudentCount);
          setValues(response.data.message.stateWiseStudentCount);
        });
  
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else if(localStorage.getItem("setAuthority")=="2" ){
      api.viewAuthorityByUUID(localStorage.getItem("UUID")).then((response)=>{
        console.log('Auhtority is verified: DashBoard');
        api.totalStudents().then((response) => {
          console.log('response: ', response);
  
          setStates(response.data.message.stateWiseStudentCount);
          setValues(response.data.message.stateWiseStudentCount);
        });
  
      }).catch((error)=>{
          localStorage.clear()
         history.push('/')
      })
    }else{
      history.push('/')
    }
  

      
  }, []);
  const arr1 = Object.keys(states);
  console.log('arr1: ', arr1);
  const arr2 = Object.values(values);
  console.log('arr2: ', arr2);
  var len = arr1.length;
  if (arr1.length > 0 && arr2.length > 0) {
    for (var i = 0; i < len; i++) {
      mp.set(arr1[i], arr2[i]);
      const person = new Object();
      person[arr1[i]] = {"value":arr2[i]}
      Object.assign(data, person);
    }
  }



  return (
    <div>
      <div className="row">
        <div
          className="col-xl-6 col-sm-6 grid-margin stretch-card"
          style={{ height: "80vh" }}
        >
          <div className="card">

            <DatamapsIndia
              regionData={data}
              hoverComponent={({ value }) => {
                return (
                  <>
                    <p>{value.name}</p>
                    <p>{value.value}</p>
                  </>
                );
              }}
              mapLayout={{
                title: "Student/State Data",
                legendTitle: "Legend Title",
                startColor: "#FFDAB9",
                endColor: "#FF6347",
                hoverTitle: "Count",
                noDataColor: "#f5f5f5",
                borderColor: "#8D8D8D",
                hoverBorderColor: "#8D8D8D",
                hoverColor: "green",
              }}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
