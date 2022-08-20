import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true}); 
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},

      {path:'/register', state: 'registerElementsMenuOpen'},
      
      {path:'/bulk', state: 'registerBulkElementsMenuOpen'},
      
      {path:'/view', state: 'viewElementsMenuOpen'},
      // {path:'/StudentForm', state: 'StudentformElementsMenuOpen'},
      {path:'/chart', state: 'viewChartOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas " id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/dashboard">
            
           
           <span style={{color:"#fff", letterSpacing:"0.5rem"}}> UPASTITHI</span>
            </a>
          <a className="sidebar-brand brand-logo-mini" href="/dashboard"> <span style={{color:"#fff", fontWeight:"bold"}}> U</span></a>
        </div>
        <div className=''>
        <ul className="nav ">
        
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navigation</Trans></span>
          </li>

          <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>

          {/* ################# TO EDIT DATA #########################3 */}
          <li className={ this.isPathActive('/register') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.registerElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('registerElementsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Registration</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.registerElementsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  {
                    localStorage.getItem("setAuthority") == 1 ? <>
                     <li className="nav-item"> <Link className={ this.isPathActive('/register/InstituteForm') ? 'nav-link active' : 'nav-link' } to="/register/InstituteForm"><Trans>Institute Registration</Trans></Link></li>
                     <li className="nav-item"> <Link className={ this.isPathActive('/register/SubjectForm') ? 'nav-link active' : 'nav-link' } to="/register/SubjectForm"><Trans>Subject Registration</Trans></Link></li>
                     <li className="nav-item"> <Link className={ this.isPathActive('/register/GovernmentForm') ? 'nav-link active' : 'nav-link' } to="/register/GovernmentForm"><Trans>Authority Registration</Trans></Link></li>           
                    </>:


                    localStorage.getItem("setAuthority") == 2?<> <li className="nav-item"> <Link className={ this.isPathActive('/register/ScholarshipForm') ? 'nav-link active' : 'nav-link' } to="/register/ScholarshipForm"><Trans>ScholarShip Registration</Trans></Link></li>
                    
                    <li className="nav-item"> <Link className={ this.isPathActive('/register/InstituteForm') ? 'nav-link active' : 'nav-link' } to="/register/InstituteForm"><Trans>Institute Registration</Trans></Link></li>

                    <li className="nav-item"> <Link className={ this.isPathActive('/register/SubjectForm') ? 'nav-link active' : 'nav-link' } to="/register/SubjectForm"><Trans>Subject Registration</Trans></Link></li>
                  
                    </>
                    : 



                    localStorage.getItem("setAuthority") == 3 ? <> <li className="nav-item"> <Link className={ this.isPathActive('/register/TeacherForm') ? 'nav-link active' : 'nav-link' } to="/register/TeacherForm"><Trans>Teacher Registration</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/register/StudentForm') ? 'nav-link active' : 'nav-link' } to="/register/StudentForm"><Trans>Student Registration</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/register/ClassForm') ? 'nav-link active' : 'nav-link' } to="/register/ClassForm"><Trans>Class Registration</Trans></Link></li>
                    
                    </>:<></>
                  }
                  
                 
                </ul>
              </div>
            </Collapse>
          </li>


          {/* ################# TO EDIT DATA END #########################3 */}
{/* ################# TO VIEW DATA ############################################################# */}



          <li className={ this.isPathActive('/view') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.viewElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('viewElementsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>View</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.viewElementsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  {
                    localStorage.getItem("setAuthority") == 1 ? <>
                    
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/Teacherdata') ? 'nav-link active' : 'nav-link' } to="/view/Teacherdata"><Trans>Teacher Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/Studentdata') ? 'nav-link active' : 'nav-link' } to="/view/Studentdata"><Trans>Student Data</Trans></Link></li>
                    
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/InstituteData') ? 'nav-link active' : 'nav-link' } to="/view/InstituteData"><Trans>Institute Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/ScholarshipData') ? 'nav-link active' : 'nav-link' } to="/view/ScholarshipData"><Trans>Scholarship Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/ClassData') ? 'nav-link active' : 'nav-link' } to="/view/ClassData"><Trans>Class Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/SubjectData') ? 'nav-link active' : 'nav-link' } to="/view/SubjectData"><Trans>Subject Data</Trans></Link></li>
                    </>
                    
                    : 
                    
                    
                    localStorage.getItem("setAuthority") == 2 ?<> 
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/Teacherdata') ? 'nav-link active' : 'nav-link' } to="/view/Teacherdata"><Trans>Teacher Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/Studentdata') ? 'nav-link active' : 'nav-link' } to="/view/Studentdata"><Trans>Student Data</Trans></Link></li>
                    
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/InstituteData') ? 'nav-link active' : 'nav-link' } to="/view/InstituteData"><Trans>Institute Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/ScholarshipData') ? 'nav-link active' : 'nav-link' } to="/view/ScholarshipData"><Trans>Scholarship Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/SubjectData') ? 'nav-link active' : 'nav-link' } to="/view/SubjectData"><Trans>Subject Data</Trans></Link></li>
                    </>
                    
                    :
                    localStorage.getItem("setAuthority") == 3 ? <>
                     <li className="nav-item"> <Link className={ this.isPathActive('/view/Teacherdata') ? 'nav-link active' : 'nav-link' } to="/view/Teacherdata"><Trans>Teacher Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/Studentdata') ? 'nav-link active' : 'nav-link' } to="/view/Studentdata"><Trans>Student Data</Trans></Link></li>
                    
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/ScholarshipData') ? 'nav-link active' : 'nav-link' } to="/view/ScholarshipData"><Trans>Scholarship Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/ClassData') ? 'nav-link active' : 'nav-link' } to="/view/ClassData"><Trans>Class Data</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/view/SubjectData') ? 'nav-link active' : 'nav-link' } to="/view/SubjectData"><Trans>Subject Data</Trans></Link></li>
                    </>:
                    <></>
                  }
                  
                </ul>
              </div>
            </Collapse>
          </li>


          {/* ############ BULK DATA UPLOAD */}
          {localStorage.getItem("setAuthority") == 3 ?
                   
          <li className={ this.isPathActive('/bulk') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.registerBulkElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('registerBulkElementsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Registration Bulk</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.registerBulkElementsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  

                     <> <li className="nav-item"> <Link className={ this.isPathActive('/bulk/TeacherForm') ? 'nav-link active' : 'nav-link' } to="/bulk/TeacherForm"><Trans>Teacher Registration</Trans></Link></li>
                    <li className="nav-item"> <Link className={ this.isPathActive('/bulk/StudentForm') ? 'nav-link active' : 'nav-link' } to="/bulk/StudentForm"><Trans>Student Registration</Trans></Link></li>
                    {/* <li className="nav-item"> <Link className={ this.isPathActive('/bulk/ClassForm') ? 'nav-link active' : 'nav-link' } to="/bulk/ClassForm"><Trans>Class Registration</Trans></Link></li> */}
                    
                    </>
                  
                  
                 
                </ul>
              </div>
            </Collapse>
          </li>:<></>
          }

{/* 
<li className={ this.isPathActive('/chart') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.viewChartOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('viewChartOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Chart</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.viewChartOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  {
                    localStorage.getItem("setAuthority") == 1 ? <>
                    
                    <li className="nav-item"> <Link className={ this.isPathActive('/chart/IndianMap') ? 'nav-link active' : 'nav-link' } to="/chart/IndianMap"><Trans>Indian Map</Trans></Link></li>
                     </>
                    
                    : 
                    
                    
                    localStorage.getItem("setAuthority") == 2 ?<> 
                     <li className="nav-item"> <Link className={ this.isPathActive('/chart/IndianMap') ? 'nav-link active' : 'nav-link' } to="/chart/IndianMap"><Trans>Indian Map</Trans></Link></li>
                    </>
                    
                    :      <></>
                  }
                  
                </ul>
              </div>
            </Collapse>
          </li> */}

{/*        
          <li className={ this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link' } to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link' } to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link' } to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('formElementsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Form Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.formElementsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link' } to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/tables') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('tablesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title"><Trans>Tables</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.tablesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link' } to="/tables/basic-table"><Trans>Basic Table</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('chartsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title"><Trans>Charts</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.chartsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link' } to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title"><Trans>Icons</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } to="/icons/mdi"><Trans>Material</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.userPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>More</Trans></span>
          </li>
          <li className={ this.isPathActive('/error-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title"><Trans>Documentation</Trans></span>
            </a>
          </li> */}
        </ul>
        </div>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);