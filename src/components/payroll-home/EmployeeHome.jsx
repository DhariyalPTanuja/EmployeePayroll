import React from 'react'
import './EmployeeHome.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/eplogo.png';
import DeleteIcon from '../../assets/action/delete-black-18dp.svg';
import EditIcon from '../../assets/action/create-black-18dp.svg';
import AddIcon from '../../assets/action/add-24px.svg';
import ServiceEmp from '../../service/EmployeeService';

export const withNavigation = (Component: Component) => {
  return props => <Component {...props} navigate={useNavigate()} />
}


class EmployeeHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employee: [], };
  } 

  fetchData(){
    ServiceEmp.getAllEmployee().then((response) => {
      console.log(response);
      this.setState({ employee: response.data.data });
    });
  }
//fetching the data in class component
  componentDidMount(){
    this.fetchData();
  }
  // getAllEmployee = () =>{
  //   this.ServiceEmp.getAllEmployee().then (data => {
  //     console.log("data after get", data);
  //     this.setState({employeeArray: data.DisplayData})
  //   }).catch(err => {
  //     console.log("err after", err);
  //   })
  // }
  // delete employee
  deleteEmployee = (employeeId) => {
    let id = employeeId;
    ServiceEmp.deleteEmployee(id).then((response) =>{
      console.log(response)
    });
    window.location.reload();
  }
  //update employee
  updateEmployee = (employeeId) => {
    console.log("Employee " , employeeId);
    this.props.navigate(`EmployeeForm/${employeeId}`);
  }



addUser = () => {
  this.props.navigate("/form")
}

  render() {
    return (
      <div>
        <div className="header-content header">
          <div className="logo-content">
            <img src={logo} alt="" />
            <div>
              <span className="emp-text">EMPLOYEE</span>
              <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="header-main-content">
            <div className="emp-detail-text">
              Employee Details <div className="emp-count">{this.state.employee.length}</div>
            </div>
            <div>
            <input type="text" name="search" placeholder="Search.." id='searchbar'></input></div>
            <NavLink exact to="/form" className="add-button">
            <img src={AddIcon}  alt="" /> Add User </NavLink>
           
               

          </div>
        </div>
      <div className="table-main">
      <table className="table" id="display">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Start Date</th>
              <th>Notes</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {this.state.employee.map((employees) => (
              <tr key = {employees.empId}>
                <td><img src={employees.profilePic} alt="ProfilePic" /></td>
                <td>{employees.name}</td>
              <td>{employees.gender}</td>
              <td> {employees.departments}</td>
              <td>{employees.salary}</td>
              <td>{employees.startDate}</td>
              <td>{employees.note}</td>
              <td>
                <img src={DeleteIcon} alt="delete" onClick={() => this.deleteEmployee(employees.empId)} />
                <img src={EditIcon} alt="edit" onClick={() => this.updateEmployee(employees.empId)} />
              </td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
       
      </div>
    )
  }
}
export default withNavigation(EmployeeHome);


