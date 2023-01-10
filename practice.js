import logo from "../logo.png";
import { NavLink } from "react-router-dom";
import "../Homapage/Homepage.css"
import {DataTransfer} from '../DataTransfer'
import {useEffect,useState} from 'react'

function Homepage() {

  useEffect  (() => {
    DataTransfer().then((res) => {
      console.log(res.data)
      setList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const [list,setList]=useState([]);
  return (
    <>
      <header className="header-content header">
        <div className="logo-content">
          <img src={logo} alt="" />
          <div>
            <span className="emp-text">EMPLOYEE</span>
            <br />
            <span className="emp-payroll">PAYROLL</span>
            <br />
          </div>
        </div>
      </header>
      <div className="form-content">
        <form className="container">
          <div className="pageHeader">
            <label className="form-head">Employee Details</label>
            <input
              type="text"
              class="search-field"
              placeholder="Search …"
              name="s"
              title="Search for:"
            />
            <NavLink exact to="/">
              <button className="b"> + Add User</button>
            </NavLink>
          </div>
          <br />
          <br />
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Start Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((emp)=>{
                  return (
                  <><tr key={emp.employeeId}><td className="td1">{emp.name}</td><td className="td2">{emp.gender}</td><td className="td3">{emp.department}</td><td className="td4">{emp.salary}</td><td className="td5">{emp.startDate}</td><td>{}</td><td></td></tr></>
                  )
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}