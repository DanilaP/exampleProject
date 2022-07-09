import './App.css';
import StartPage from './pages/startPage';
import MainMenu from './components/mainMenu';
import { useEffect } from 'react';
import $api from './components/axios';
import { useNavigate } from 'react-router-dom';

function App() {
  let history = useNavigate();
  useEffect(() => {
    $api.get('https://meetins.herokuapp.com/profile/my-profile')
    .then((response) => {
      if(localStorage.getItem("userToken")) {
        history("/profile/" + response.data.login);
      }
    })
    .catch((error) => {
        console.log(error)
    })
  })
  return (
    <div className="App">
      <MainMenu/>
      <StartPage/>
    </div>
  );
}

export default App;
