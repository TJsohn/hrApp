import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import PersonList from './Persons/PersonList';

const App = () => {

  return (
   <>
    <Header logo="HR App" />
    <main>
        <PersonList />
    </main>
    <Footer />
   </>
  )
}

export default App;
