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

  const API_URL = import.meta.env.VITE_API_URL;
  console.log("VITE_API_URL from env:", API_URL);

  useEffect(() => {
    get(`${API_URL}/employees`)
    .then((res) => setPersonsData(res.data))
    .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const addEmployeeHandler = (newPerson) => {
    post(`${API_URL}/employees`, newPerson)
    .then((res) => {
      setPersonsData((prev) => [...prev, res.data]);
    })
    .catch((err) => {
      console.error("Failed to add employee:", err);
    });
  };

  const handleSalaryChange = (id, newSalary) => {
    patch(`${API_URL}/employees/${id}`, {salary: newSalary})
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
  patch(`${API_URL}/employees/${id}`, {location: newLocation})
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
  patch(`${API_URL}/employees/${id}`, {department:newDepartment})
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
  patch(`${API_URL}/employees/${id}`, {skills:newSkills})
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
