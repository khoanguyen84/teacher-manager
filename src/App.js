import './App.css';
import Navbar from './components/Layout/Navbar';
import TeacherList from './components/Teacher/TeacherList';
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <TeacherList />
      </div>
    </>
  );
}

export default App;
