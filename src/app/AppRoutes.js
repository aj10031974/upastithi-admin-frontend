import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const TeacherForm =  lazy(() => import('./forms/TeacherForm'));

const StudentForm =  lazy(() => import('./forms/StudentForm'));


const InstituteForm = lazy(() => import('./forms/InstituteForm'));
const ScholarshipForm = lazy(() => import('./forms/ScholarshipForm'));

const ClassForm = lazy(() => import('./forms/ClassForm'));
const SubjectForm = lazy(() => import('./forms/SubjectForm'));
const GovernmentForm = lazy(() => import('./forms/GovernmentForm'));


const TeacherFormBulk =  lazy(() => import('./bulk-forms/TeacherForm'));

const StudentFormBulk =  lazy(() => import('./bulk-forms/StudentForm'));


const TeacherViewData = lazy(() => import('./view-tables/TeacherData'));
const StudentViewData = lazy(() => import('./view-tables/StudentData'));
const InsitututeData = lazy(() => import('./view-tables/InstituteData'));

const ScholarshipData = lazy(() => import('./view-tables/ScholarshipData'));
const ClassData = lazy(() => import('./view-tables/ClassData'));
const SubjectData = lazy(() => import('./view-tables/SubjectData'));


const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

const Profile = lazy(() => import('./profile/Dashboard'));
const IndianMap = lazy(() => import('./charts/IndianMap'));
class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/Profile" component={ Profile } />
          
          <Route exact path="/register/teacherform" component={ TeacherForm } />
          <Route exact path="/view/teacherdata" component={ TeacherViewData } />
          <Route exact path="/view/studentdata" component={ StudentViewData } />
          <Route exact path="/view/instituteData" component={ InsitututeData } />
          <Route exact path="/view/ScholarshipData" component={ ScholarshipData } />
          
          <Route exact path="/chart/IndianMap" component={ IndianMap } />
          
          <Route exact path="/view/ClassData" component={ ClassData } />
          
          <Route exact path="/view/SubjectData" component={ SubjectData } />
          {/* ScholarshipData */}
          <Route exact path="/register/studentform" component={ StudentForm } />
          <Route exact path="/register/instituteform" component={ InstituteForm } />
          <Route exact path="/register/governmentform" component={ GovernmentForm } />
          
          <Route exact path="/register/ScholarshipForm" component={ ScholarshipForm } />
          <Route exact path="/register/SubjectForm" component={ SubjectForm } />
          <Route exact path="/register/ClassForm" component={ ClassForm } />

          <Route exact path="/bulk/TeacherForm" component={ TeacherFormBulk } />
        
          <Route exact path="/bulk/StudentForm" component={ StudentFormBulk } />
          

          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/icons/mdi" component={ Mdi } />

          <Route path="/charts/chart-js" component={ ChartJs } />


          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />


          <Redirect to="/user-pages/login-1" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;