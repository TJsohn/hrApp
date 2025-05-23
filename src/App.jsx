import useAxios from './hooks/useAxios';
import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import PersonList from './pages/Persons/PersonList';
import About from './pages/About/About';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import Root from './pages/Root';

const App = () => {
  const {get, post, patch} = useAxios();
  const [personsData, setPersonsData] = useState([]);

  useEffect(() => {
    get("http://localhost:3001/employees")
    .then((res) => setPersonsData(res.data))
    .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const addEmployeeHandler = (newPerson) => {
    post("http://localhost:3001/employees", newPerson)
    .then((res) => {
      setPersonsData((prev) => [...prev, res.data]);
    })
    .catch((err) => {
      console.error("Failed to add employee:", err);
    });
  };

  const handleSalaryChange = (id, newSalary) => {
    patch(`http://localhost:3001/employees/${id}`, {salary: newSalary})
    .then((res) => {
      setPersonsData((prev) =>
      prev.map((person) => (person.id === id ? res.data : person))
    );
  })
  .catch((err) => {
    console.error("Failed to update salary:", err);
  });
};

const handleLocationChange = (id, newLocation) => {
  patch(`http://localhost:3001/employees/${id}`, {location: newLocation})
  .then((res) => {
    setPersonsData((prev) =>
    prev.map((person) => (person.id === id ? res.data : person))
  );
  })
  .catch((err) => {
    console.error("Failed to update location:", err);
  });
};

const handleDepartmentChange = (id, newDepartment) => {
  patch(`http://localhost:3001/employees/${id}`, {department:newDepartment})
  .then((res) => {
    setPersonsData((prev) => 
    prev.map((person) => (person.id === id ? res.data : person))
  );
  })
  .catch((err) => {
    console.error("Failed to update department:", err);
  });
};

const handleSkillsChange = (id, newSkills) => {
  patch(`http://localhost:3001/employees/${id}`, {skills:newSkills})
  .then((res) => {
    setPersonsData((prev) =>
    prev.map((person) => (person.id === id ? res.data : person))
  );
  })
  .catch((err) => {
    console.error("Failed to update skills:", err);
  });
};

const handleUpdate = (id, updatedData) => {
  setPersonsData((prev) => 
  prev.map((person) => (person.id === id ? { ...person, ...updatedData} : person))
);
};

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />}>
      <Route index
      element={
        <PersonList
        personsData={personsData}
        onSalaryChange={handleSalaryChange}
        onLocationChange={handleLocationChange}
        onDepartmentChange={handleDepartmentChange}
        onSkillsChange={handleSkillsChange}
        onUpdate={handleUpdate}
        />
      }
      />
      <Route path="/about" element={<About />} />
      <Route path="/add" element={<AddEmployee onAddEmployee={addEmployeeHandler} />}
      />
      </Route></Routes></BrowserRouter>
  );
};

export default App;
