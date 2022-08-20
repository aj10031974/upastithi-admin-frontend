// import global from "../../global/global";
import global from "../global/global";
import axios from "axios";

const instance = axios.create({
  baseURL: global.apiServerURL,
});

// const socketServer = axios.create({

//     socketURL:global.socketServerURL
//   });

export default {
  otpCheck: (tempOTP) =>
    instance({
      method: "POST",
      url: "/checkOTP",

      params: {
        tempOTP: tempOTP,
      },
    }),

  // addTeacher: (form) =>
  // instance({
  //     method: "POST",
  //     url: "/addTeacher",
  //     body:JSON.stringify(form),
  //   }

  //   ),

  viewTeachers: () =>
    instance({
      method: "GET",
      url: "/viewTeachers",
    }),

  addTeacher: (form) =>
    instance({
      method: "POST",
      url: "/addTeacher",
      data: form,
    }),

  addInstitute: (form) =>
    instance({
      method: "POST",
      url: "/addInstitute",
      data: form,
    }),

  addScholarship: (form) =>
    instance({
      method: "POST",
      url: "/addScholarship",
      data: form,
    }),
  addStudent: (form) =>
    instance({
      method: "POST",
      url: "/addStudent",
      data: form,
    }),
  addClass: (form) =>
    instance({
      method: "POST",
      url: "/addClass",
      data: form,
    }),
  addSubject: (form) =>
    instance({
      method: "POST",
      url: "/addSubject",
      data: form,
    }),
  addAuthority: (form) =>
    instance({
      method: "POST",
      url: "/addAuthority",
      data: form,
    }),
  viewStudents: () =>
    instance({
      method: "GET",
      url: "/viewStudents",
    }),

  viewInstitutes: () =>
    instance({
      method: "GET",
      url: "/viewInstitutes",
    }),

  viewScholarshipsWeb: () =>
    instance({
      method: "GET",
      url: "/viewScholarshipsWeb",
    }),

  viewInstituteByUUID: (uuid) =>
    instance({
      method: "GET",
      url: "/viewInstituteByUUID?instituteUUID=" + uuid,
    }),
  viewAdminByUUID: (uuid) =>
    instance({
      method: "GET",
      url: "/viewAdminByUUID?adminUUID=" + uuid,
    }),
    viewAuthorityByUUID: (uuid) =>
    instance({
      method: "GET",
      url: "/viewAuthorityByUUID?authorityUUID=" + uuid,
    }),

    viewClassByInstitute: (id) =>
    instance({
      method: "GET",
      url: "/viewClassByInstitute?insitituteID=" + id,
    }),

  totalTeachers: () =>
    instance({
      method: "GET",
      url: "/totalTeachers",
    }),

  totalStudents: () =>
    instance({
      method: "GET",
      url: "/totalStudents",
    }),

  totalStudentsofInstitute: (instituteid) =>
    instance({
      method: "GET",
      url: "/totalStudentsofInstitute?instituteID=" + instituteid,
    }),

  totalTeachersofInstitute: (instituteid) =>
    instance({
      method: "GET",
      url: "/totalTeachersofInstitute?instituteID=" + instituteid,
    }),

  viewStudentsByInstitute: (instituteid) =>
    instance({
      method: "GET",
      url: "/viewStudentsByInstitute?instituteID=" + instituteid,
    }),

  viewTeachersByInstitute: (instituteid) =>
    instance({
      method: "GET",
      url: "/viewTeachersByInstitute?instituteID=" + instituteid,
    }),


    viewAllSubjectsWeb: () =>
    instance({
      method: "GET",
      url: "/viewAllSubjectsWeb",
    }),

    viewAllClassWeb: () =>
    instance({
      method: "GET",
      url: "/viewAllClassWeb",
    }),
    addStudentBulk: (form) =>
    instance({
      method: "POST",
      url: "/addStudentBulk",
      data: form,
    }),
    


};
