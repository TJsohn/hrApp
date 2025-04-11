import {persons} from './personsData';
import PersonCard from './PersonCard';

const PersonList = () => {
    return (
        <>
        <div className="boxes">
            {persons.map(person => 
                <PersonCard key={person.id} {...person}/>
                )}
            </div>
        </>    
    )
}

export default PersonList;