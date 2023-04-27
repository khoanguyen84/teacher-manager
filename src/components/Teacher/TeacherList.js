import React, { useState, useEffect } from "react";
import TeacherService from "../../Services/teacherService";
import Spinner from '../Layout/Spinner';
import DepartmentService from "../../Services/departmentService";

function TeacherList() {
    const [state, setState] = useState({
        teachers: [],
        departments: [],
        loading: false
    })

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let teacherRes = await TeacherService.getTeachers();
                let departmentRes = await DepartmentService.getDepartments();
                setState({
                    ...state,
                    teachers: teacherRes.data,
                    departments: departmentRes.data,
                    loading: false
                })
            }

            getData();
        } catch (error) {

        }
    }, [])

    const handleInput = async (e) => {
        let teacherRes = await TeacherService.getTeachers();
        let result = teacherRes.data;
        if(e.target.value){
            result = result.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
        }
        setState({
            ...state,
            teachers: result
        })
    }
    const getDepartmentById = (departId) => {
        let result = state.departments.filter((item) => item.id == departId)
        return result
    }
    const { teachers, departments, loading } = state;
    return (
        <>
            <section className="create-teacher-area">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                        <h3 className="fw-bolder">Teachers</h3>
                        <p className="fst-italic text-muted">Reprehenderit quis dolore</p>
                    </div>
                    <div className="w-25">
                        <form className="d-flex">
                            <input type="search" className="form-control"  
                                onInput={handleInput}
                            />
                            <button className="d-none">Search</button>
                        </form>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-add">
                            <i className="fa fa-user-plus me-2"></i>
                            New Teacher
                        </button>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : (
                    <section className="teacher-list mt-2">
                        <div className="row">
                            {
                                teachers.map((teacher) => (
                                    <div key={teacher.id} className="col-md-3 mb-4">
                                        <div className="card py-3 d-flex flex-row align-items-center justify-content-around">
                                            <img className="teacher-avatar" src={teacher.avatar} alt="" />
                                            <div className="d-flex flex-column align-items-start">
                                                <h5 className="fw-bolder teacher-name">{teacher.name}</h5>
                                                <p className="text-muted">{getDepartmentById(teacher.departmentId).departName}</p>
                                                <a href="">View profile</a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </section>
                )
            }
        </>
    )
}

export default TeacherList;