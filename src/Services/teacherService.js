import axios from "axios";

class TeacherService{
    static getTeachers(){
        return axios.get('https://6449deff79279846dcd9e0f6.mockapi.io/teacher')
    }

    static getTeacher(teacherId){
        return axios.get(`https://6449deff79279846dcd9e0f6.mockapi.io/teacher/${teacherId}`)
    }

    static createTeacher(teacher){
        return axios.post('https://6449deff79279846dcd9e0f6.mockapi.io/teacher', teacher)
    }

    static deleteTeacher(teacherId){
        return axios.delete(`https://6449deff79279846dcd9e0f6.mockapi.io/teacher/${teacherId}`)
    }
}

export default TeacherService;