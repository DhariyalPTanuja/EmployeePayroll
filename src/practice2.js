import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './logo.svg';


export default class practice2 extends Component {
  render() {
    return (
        <>
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
                            Employee Details <div className="emp-count">0</div>
                        </div>
                        <input
              type="text"
              class="search-field"
              placeholder="Search …"
              name="s"
              title="Search for:"
            />
            <NavLink
    className="navbar-item"
    activeClassName="is-active"
    to="/"
    exact>
	+ Add User
</NavLink>
                    </div>
                </div>
                <table className="table" id="display">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Start Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    </table>
    </>
    )
  }
}
