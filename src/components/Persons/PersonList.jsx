import axios from "axios";
import {useEffect, useState} from "react";
import PersonCard from './PersonCard';

const PersonList = () => {
    const [personsData, setPersonsData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/employees").then((res) => {
            setPersonsData(res.data);
        });
    }, []);
    
    return (
        <>
        <div className="boxes">
            {personsData.map(person => 
                <PersonCard key={person.id} {...person}/>
                )}
            </div>
        </>    
    )
}

export default PersonList;