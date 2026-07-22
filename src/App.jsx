import useAxios from './hooks/useAxios';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import PersonList from './pages/Persons/PersonList';
import About from './pages/About/About';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import Root from './pages/Root';

const App = () => {
  const { get, patch } = useAxios();
  const [personsData, setPersonsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get("/employees")
      .then((res) => setPersonsData(res.data))
      .catch((err) => console.error("Failed to fetch data:", err))
      .finally(() => setLoading(false)); 
  }, [get]);

  const addEmployeeHandler = (newPerson) => {
    setPersonsData((prev) => [...prev, newPerson]);
  };

  const handleSalaryChange = (id, newSalary) => {
    patch(`/employees/${id}`, { salary: newSalary })
      .then((res) => {
        setPersonsData((prev) =>
          prev.map((person) => (person.id === id ? res.data : person))
        );
      })
      .catch((err) => console.error("Failed to update salary:", err));
  };

  const handleLocationChange = (id, newLocation) => {
    patch(`/employees/${id}`, { location: newLocation })
      .then((res) => {
        setPersonsData((prev) =>
          prev.map((person) => (person.id === id ? res.data : person))
        );
      })
      .catch((err) => console.error("Failed to update location:", err));
  };

  const handleDepartmentChange = (id, newDepartment) => {
    patch(`/employees/${id}`, { department: newDepartment })
      .then((res) => {
        setPersonsData((prev) =>
          prev.map((person) => (person.id === id ? res.data : person))
        );
      })
      .catch((err) => console.error("Failed to update department:", err));
  };

  const handleSkillsChange = (id, newSkills) => {
    patch(`/employees/${id}`, { skills: newSkills })
      .then((res) => {
        setPersonsData((prev) =>
          prev.map((person) => (person.id === id ? res.data : person))
        );
      })
      .catch((err) => console.error("Failed to update skills:", err));
  };

  const handleUpdate = (id, updatedData) => {
    setPersonsData((prev) =>
      prev.map((person) => (person.id === id ? { ...person, ...updatedData } : person))
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              // 3️⃣ 로딩 중일 때 스피너 화면 띄우기
              loading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <h3>Loading Employee Data...</h3>
                  <p className="server-notice">
                    💡 Free server tier takes about 30–50 seconds to wake up. Thank you for your patience!
                  </p>
                </div>
              ) : (
                <PersonList
                  personsData={personsData}
                  onSalaryChange={handleSalaryChange}
                  onLocationChange={handleLocationChange}
                  onDepartmentChange={handleDepartmentChange}
                  onSkillsChange={handleSkillsChange}
                  onUpdate={handleUpdate}
                />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddEmployee onAddEmployee={addEmployeeHandler} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;