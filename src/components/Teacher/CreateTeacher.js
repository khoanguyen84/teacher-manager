import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import DepartmentService from "../../Services/departmentService";
import noavatar from '../../assets/images/noavatar.png';
import TeacherService from "../../Services/teacherService";
import { toast } from 'react-toastify';

function CreateTeacher() {
    const [state, setState] = useState({
        teacher: {},
        departments: [],
        loading: false
    })

    useEffect(() => {
        try {
            setState({ ...state, loading: true })
            async function getData() {
                let departmentRes = await DepartmentService.getDepartments();
                setState({
                    ...state,
                    loading: false,
                    departments: departmentRes.data
                })
            }
            getData();
        } catch (error) {

        }
    }, [])

    const handleInput = (e) => {
        setState({
            ...state,
            teacher: {
                ...teacher,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleCreateTeacher = async (e) => {
        e.preventDefault()
        try {
            let createRes = await TeacherService.createTeacher(teacher);
            if (createRes.data) {
                toast.success(`Teacher name: ${createRes.data.name} created success`);
                setState({
                    ...state,
                    teacher: {
                        name: "",
                        email: "",
                        avatar: "",
                        mobile: "",
                        departmentId: 1
                    }
                })
            }

        } catch (error) {
            console.log(error.message);

        }
    }
    const { teacher, departments, loading } = state;
    return (
        <>
            <section className="teacher-info">
                <div className="container d-flex align-items-center">
                    <h3 className="text-success me-3">Create Teacher</h3>
                    <Link className="btn btn-dark btn-sm" to={"/teacher-manager"}>
                        <i className="fa fa-arrow-left me-2"></i>
                        Back
                    </Link>
                </div>
            </section>
            <section className="teacher-detail">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-4 align-items-center">
                            <form onSubmit={handleCreateTeacher}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Teacher Name</label>
                                    <input type="text" className="form-control" id="name"
                                        name="name"
                                        value={teacher.name}
                                        onInput={handleInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email"
                                        name="email"
                                        value={teacher.email}
                                        onInput={handleInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label">Mobile</label>
                                    <input type="tel" className="form-control" id="mobile"
                                        name="mobile"
                                        value={teacher.mobile}
                                        onInput={handleInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Department</label>
                                    <select className="form-control" name="departmentId"
                                        onChange={handleInput}
                                    >
                                        {
                                            departments.map((depart) => (
                                                <option key={depart.id} value={depart.id}>{depart.departName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="avatar" className="form-label">Avatar</label>
                                    <input type="url" className="form-control" id="avatar"
                                        name="avatar"
                                        value={teacher.avatar}
                                        onInput={handleInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-danger me-2"
                                    >Create</button>
                                    <Link className="btn btn-secondary" to={"/teacher-manager"}>Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-3">
                            <img className="teacher-avatar-lg" src={teacher.avatar || noavatar} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateTeacher;