
import axios from 'axios';


class Service {
    baseUrl = 'http://localhost:8080/emppayroll';
    getAllEmployee(){
       return  axios.get(`${this.baseUrl}/get`);
       }
    addEmployee(data) {
        return  axios.post(`${this.baseUrl}/save`, data);
    }
  
    getEmployeeById(employeeId){
        return  axios.get(`${this.baseUrl}/get/${employeeId}`);
    }

    updateEmployee(employeeId, data){
        return  axios.put(`${this.baseUrl}/update/${employeeId}`, data);
    }
    deleteEmployee(employeeId){
        return   axios.delete(`${this.baseUrl}/delete/${employeeId}`);
    }
}
    export default new Service();