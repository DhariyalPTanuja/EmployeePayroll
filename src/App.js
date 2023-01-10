import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/payroll-form/EmployeeForm';
import Home from './components/payroll-home/EmployeeHome';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    {/* <Route index element={<Home/>} />  */}
    <Route  path='/' element={<Home/>} /> 
    <Route  path='/form' element={<EmployeeForm />} /> 
    <Route  path='/EmployeeForm/:id' element={<EmployeeForm />} /> 
    <Route path='/EmployeeHome/:id' element={<Home />} /> 
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;
