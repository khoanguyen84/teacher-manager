import axios from "axios";

class TeacherService{
    static getTeachers(){
        return axios.get('https://6449deff79279846dcd9e0f6.mockapi.io/teacher')
    }
}

export default TeacherService;