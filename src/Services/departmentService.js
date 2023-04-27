import axios from "axios";

class DepartmentService{
    static getDepartment(departId){
        return axios.get(`https://6449deff79279846dcd9e0f6.mockapi.io/department/${departId}`)
    }

    static getDepartments(){
        return axios.get(`https://6449deff79279846dcd9e0f6.mockapi.io/department`)
    }
}

export default DepartmentService;