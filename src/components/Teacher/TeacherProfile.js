import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TeacherService from "../../Services/teacherService";
import DepartmentService from "../../Services/departmentService";
import Spinner from "../Layout/Spinner";
import { toast } from "react-toastify";
function TeacherProfile() {
    const { teacherId } = useParams();
    const [state, setState] = useState({
        teacher: {},
        department: {},
        loading: false
    })

    const navigate = useNavigate()

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let teacherRes = await TeacherService.getTeacher(teacherId);
                let departmentRes = await DepartmentService.getDepartment(teacherRes.data.departmentId);
                console.log(departmentRes.data);
                setState({
                    ...state,
                    teacher: teacherRes.data,
                    department: departmentRes.data,
                    loading: false
                })
            }

            getData();
        } catch (error) {

        }
    }, [])

    const handleRemoveTeacher = async (id) => {
        try {
            let confirmed = window.confirm("Are you sure to remove this teacher?")
            if (confirmed) {
                let deleteRes = await TeacherService.deleteTeacher(id);
                if (deleteRes.data) {
                    toast.info(`Teacher name: ${deleteRes.data.name} removed success`);
                    navigate("/teacher-manager")
                }
            }

        } catch (error) {

        }
    }
    const { teacher, department, loading } = state;
    return (
        <>
            <section className="teacher-info">
                <div className="container d-flex align-items-center">
                    <h3 className="text-success me-3">{teacher.name}'s Profile</h3>
                    <Link className="btn btn-dark btn-sm" to={"/teacher-manager"}>
                        <i className="fa fa-arrow-left me-2"></i>
                        Back
                    </Link>
                </div>
            </section>
            <section className="teacher-detail">
                {
                    loading ? <Spinner /> : (
                        <div className="container">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-3 align-items-center">
                                    <img className="rounded" src={teacher.avatar} alt="" />
                                </div>
                                <div className="col-md-9">
                                    <h3 className="text-primary fw-bolder">{teacher.name}</h3>
                                    <p>
                                        <i className="fa-solid fa-person-walking-luggage me-2"></i>
                                        {department.departName}
                                    </p>
                                    <p>
                                        <i className="fa fa-envelope me-2"></i>
                                        {teacher.email}
                                    </p>
                                    <p>
                                        <i className="fa fa-mobile me-2"></i>
                                        {teacher.mobile}
                                    </p>
                                    <button className="btn btn-danger btn-sm"
                                        onClick={() => handleRemoveTeacher(teacher.id)}
                                    >
                                        <i className="fa fa-trash me-2"></i>
                                        Remove Teacher
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>
        </>
    )
}

export default TeacherProfile;