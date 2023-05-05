import axios from "axios";

class FileService{

    static fileUpload(imageFile){
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "a09ikbyc");
        return axios.post("https://api.cloudinary.com/v1_1/dtxyz2s1g/image/upload", formData);
    }
}

export default FileService;