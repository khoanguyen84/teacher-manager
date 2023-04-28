import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import TeacherList from './components/Teacher/TeacherList';
import TeacherProfile from './components/Teacher/TeacherProfile';
import CreateTeacher from './components/Teacher/CreateTeacher';
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/teacher-manager' element={<TeacherList />} />
          <Route path='/teacher-manager/create' element={<CreateTeacher />} />
          <Route path='/teacher-manager/profile/:teacherId' element={<TeacherProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
