import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TeacherService from './../../Services/teacherService';
import DepartmentService from "../../Services/departmentService";
import Spinner from "../Layout/Spinner";
import noavatar from '../../assets/images/noavatar.png';
import { toast } from "react-toastify";
import FileService from "../../Services/fileService";

function UpdateTeacher() {
    const [state, setState] = useState({
        teacher: {},
        loading: false,
        departments: []
    })
    const [avatar, setAvatar] = useState({
        file: null,
        upload: false
    })
    const { teacherId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        try {
            setState({ ...state, loading: true })
            async function getData() {
                let teacherRes = await TeacherService.getTeacher(teacherId);
                let DepartmentRes = await DepartmentService.getDepartments();
                setState({
                    ...state,
                    teacher: teacherRes.data,
                    departments: DepartmentRes.data,
                    loading: false
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
    const handleUpdateTeacher = async (e) => {
        e.preventDefault();
        let updateRes = await TeacherService.updateTeacher(state.teacher, teacherId);
        if (updateRes.data) {
            toast.info(`Teacher ${updateRes.data.name} updated success!`);
            navigate("/teacher-manager");
        }
        else {
            toast.error('Something went wrong, please try again later!')
        }
    }
    const handleSelectAvatar = (e) => {
        let urlFakeAvatar = URL.createObjectURL(e.target.files[0])
        setAvatar({ ...avatar, file: e.target.files[0] })
        setState({
            ...state,
            teacher: {
                ...teacher,
                avatar: urlFakeAvatar
            }
        })
    }
    const handleUploadAvatar = () => {
        try {
            if (avatar.file) {
                setAvatar({ ...avatar, upload: true })
                async function uploadAvatar() {
                    let uploadRes = await FileService.fileUpload(avatar.file);
                    if (uploadRes.data) {
                        state.teacher.avatar = uploadRes.data.url;
                        toast.info('Avatar uploaded success');
                    }
                    setAvatar({
                        ...avatar,
                        upload: false,
                        file: null
                    })
                }
                uploadAvatar();
            }
            else {
                toast.warn('Please select file!')
            }
        } catch (error) {

        }
    }
    const { teacher, departments, loading } = state;
    return (
        <>
            <section className="teacher-info">
                <div className="container d-flex align-items-center">
                    <h3 className="text-success me-3">Update Teacher</h3>
                    <Link className="btn btn-dark btn-sm" to={"/teacher-manager"}>
                        <i className="fa fa-arrow-left me-2"></i>
                        Back
                    </Link>
                </div>
            </section>
            <section className="teacher-detail">
                <div className="container">
                    {
                        loading ? <Spinner /> : (
                            <div className="row d-flex align-items-center">
                                <div className="col-md-4 align-items-center">
                                    <form onSubmit={handleUpdateTeacher}>
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
                                                value={teacher.departmentId}
                                                onChange={handleInput}
                                            >
                                                {
                                                    departments.map((depart) => (
                                                        <option key={depart.id} value={depart.id}>{depart.departName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3 d-none">
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
                                            >Save</button>
                                            <Link className="btn btn-secondary" to={"/teacher-manager"}>Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-3 d-flex flex-column align-items-center">
                                    <div className="avatar-container">
                                        <img role="button" className="teacher-avatar-lg avatar-hover" src={teacher.avatar || noavatar} alt=""
                                            onClick={() => document.getElementById('fileAvatar').click()}
                                        />
                                        <span>Select Avatar</span>
                                    </div>
                                    {
                                        avatar.upload ? (
                                            <button className="btn btn-primary btn-sm" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                Loading...
                                            </button>) : (
                                            <button className="btn btn-primary btn-sm" type="button"
                                                onClick={handleUploadAvatar}
                                            >
                                                <i className="fa fa-upload me-2"></i>
                                                Upload
                                            </button>
                                        )
                                    }
                                    <input type="file" id="fileAvatar" accept="image/*" className="d-none"
                                        onChange={handleSelectAvatar}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default UpdateTeacher;