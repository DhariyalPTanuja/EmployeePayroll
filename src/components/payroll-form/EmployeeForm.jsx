import './EmployeeForm.css';
import logo from '../../assets/logo/eplogo.png';
import profile1 from '../../assets/profile-images/profile1.png'
import profile2 from '../../assets/profile-images/profile2.png';
import profile3 from '../../assets/profile-images/profile3.png';
import profile4 from '../../assets/profile-images/profile4.png';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import ServiceEmp from '../../service/EmployeeService'

const EmployeeForm = (props) => {
    const params = useParams();
    const navigation = useNavigate();

    useEffect(() => {
        if (params.id) {
            getEmployeeId(params.id)
            console.log(params.id)
        }
    }, [params.id]);

    let userValues = {
        // allDepartments: ["HR","Sales","Finance","Engineer","Others"],
        name: '',
        gender: '',
        salary: '',
        startDate: '',
        note: '',
        departments: [],
        profilePic: '',
        isUpdate: false,
    }
    const [formValue, setFormValues] = useState(userValues)

    // const changeValue = (event) => {
    //     // setFormValues({name:event.target.value});
    //     setFormValues({ ...formValue, [event.target.name]: event.target.value });

    // }
    const changeValue = (event) => {
        if (event.target.name === 'departments') {
            let copy = { ...formValue }
            if (event.target.checked) {
                copy.departments.push(event.target.value)
            } else {
                copy.departments = copy.departments.filter(el => el !== event.target.value)
            }
            setFormValues(copy)
        } else {
            setFormValues(() => ({
                ...formValue, [event.target.name]: event.target.value
            }))
        }

    }



    // let navigation = useNavigate();
    const getEmployeeId = (employeeId) => {
        ServiceEmp.getEmployeeById(employeeId).then((response) => {
            console.log(response.data.data)
            const updateData = response.data.data;
            console.log(updateData)
            setUpdatedata(updateData);
        });
    }

    const setUpdatedata = (updateData) => {

        setFormValues
            ({
                ...formValue,
                ...updateData,
                id: updateData.employeeId,
                name: updateData.name,
                gender: updateData.gender,
                salary: updateData.salary,
                startDate: updateData.startDate,
                note: updateData.note,
                departments: updateData.departments,
                profilePic: updateData.profilePic,
                isUpdate: true
            });
    }




    const save = async (event) => {
        event.preventDefault();
        let empObj = {
            name: formValue.name,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: formValue.startDate,
            note: formValue.note,
            departments: formValue.departments,
            profilePic: formValue.profilePic

        };
        if (formValue.isUpdate) {
            ServiceEmp.updateEmployee(params.id, empObj).then((response) => {
                console.log("data update successfully", response);
            }).catch(err => {
                console.log("error while updating data ");
            })
        }
        else {
            console.log(empObj)
            ServiceEmp.addEmployee(empObj).then((response) => {
                console.log("data added successfully", response);
            }).catch(err => {
                console.log("error after data add");
            })
        }

    }
    // back to home page

    const cancel = () => {
        navigation('/')

    }

    //reset the data
    const reset = () => {
        setFormValues({
            name: "",
            salary: "",
            startDate: "",
            note: "",
            departments: "",
            profilePic: ""
        }
        )
    }



    return (
        <>
            <header className="header-content header">
                <div className="logo-content">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span>
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form action="#" className="form" onSubmit={save} >
                    <div className="form-head">
                        Employee Payroll Form</div>
                    <div className="row-content">
                        <label htmlFor="name" className="label text">Name</label>
                        <input type="text" className="input" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="your name.." required />
                    </div>
                    <div className="row-content">
                        <label htmlFor="profilePic" className="label text">Profile image</label>
                        <div className="profile-radio-content">

                            <label>
                                <input type="radio" name="profilePic" id="profile1" checked={formValue.profilePic === { profile1 }}
                                    value='../../assets/profile-images/profile1.png' onChange={changeValue} />
                                <img src={profile1} id="profile1" className="profile" />
                            </label>
                            <label>
                                <input type="radio" name="profilePic" id="profile2" checked={formValue.profilePic === { profile2 }}
                                    value='../../assets/profile-images/profile2.png' onChange={changeValue} />
                                <img src={profile2} id="profile2" className="profile" />
                            </label>
                            <label>
                                <input type="radio" name="profilePic" id="profile3" checked={formValue.profilePic === { profile3 }}
                                    value='../../assets/profile-images/profile3.png' onChange={changeValue} />
                                <img src={profile3} id="profile3" className="profile" />
                            </label>
                            <label>
                                <input type="radio" name="profilePic" id="profile4" checked={formValue.profilePic === { profile4 }}
                                    value='../../assets/profile-images/profile4.png' onChange={changeValue} />
                                <img src={profile4} id="profile4" className="profile" />
                            </label>
                        </div>
                    </div>

                    <div className="row-content">
                        <label htmlFor="gender" className="label text">Gender</label>
                        <div>
                            <input type="radio" name="gender" id="male" checked={formValue.gender === 'male'} onChange={changeValue} value="male" />
                            <label htmlFor="male" className="text">Male</label>
                            <input type="radio" name="gender" id="female" checked={formValue.gender === 'female'} onChange={changeValue} value="female" />
                            <label htmlFor="female" className="text">Female</label>
                            <input type="radio" name="gender" id="other" checked={formValue.gender === 'other'} onChange={changeValue} value="other" />
                            <label htmlFor="other" className="text">Other</label>

                        </div>
                    </div>
                    <div className="row-content">
                        <label htmlFor="department" className="label text">Department</label>
                        <div>

                            <input className="checkbox" type="checkbox" name="departments" id="hr" value="HR" onChange={changeValue} />
                            <label htmlFor="hr" className="text">HR</label>
                            <input className="checkbox" type="checkbox" name="departments" id="sales" value="Sales" onChange={changeValue} />
                            <label htmlFor="sales" className="text">Sales</label>
                            <input className="checkbox" type="checkbox" name="departments" id="finance" value="Finance" onChange={changeValue} />
                            <label htmlFor="finance" className="text">Finance</label>
                            <input className="checkbox" type="checkbox" name="departments" id="engineer" value="Engineer" onChange={changeValue} />
                            <label htmlFor="engineer" className="text">Engineer</label>
                            <input className="checkbox" type="checkbox" name="departments" id="others" value="Others" onChange={changeValue} />
                            <label htmlFor="others" className="text">Others</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label htmlFor="salary" className="label text"> Salary</label>
                        <input type="range" className="input" id="salary" name="salary" min="100000" max="5000000"
                            onChange={changeValue} value={formValue.salary} placeholder="Salary" />

                    </div>
                    <div className="row-content">
                        <label htmlFor="startDate" className="label">Start Date</label>
                        <input type="date" className="input" id="startDate" name="startDate"
                            onChange={changeValue} value={formValue.startDate} />
                    </div>

                    <div className="row-content">
                        <label htmlFor="notes" className="label text">Notes</label>
                        <textarea onChange={changeValue} name="note" id="note" className="input" value={formValue.note} placeholder="" style={{ height: '100%' }}></textarea>
                    </div>
                    <div className="buttonParent">
                        <button onClick={cancel} className="button resetButton cancelButton">Cancel</button>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton" onClick={save}>{formValue.isUpdate ? 'Update' : 'Submit'}</button>

                            {/* <button type="submit" className="button submitButton" id="submitButton" onClick={save}>Submit</button> */}
                            <button type="reset" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}


export default EmployeeForm;
