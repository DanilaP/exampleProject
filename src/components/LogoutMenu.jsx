import './LogoutMenu.scss';
import { useNavigate } from 'react-router-dom';
import {useSelector}from 'react-redux';
import $api from './axios';

function LogoutMenu() {
  const history = useNavigate();
  const selector = useSelector(store => store.user);

  const logout = () => {
    localStorage.removeItem("userToken");
    history("/enter");
  }
  const showOtherPeople = () => {
    history("/peoples");
  }
  const goToProfile  = () => {
    $api.get('https://meetins.herokuapp.com/profile/my-profile')
      .then((response) => {
        history("/profile/" + response.data.login);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="LogoutMenu">
        <div>
            <button onClick={() => showOtherPeople()} className='other_people'>Люди</button>
            <button onClick={() => goToProfile()}>Домой</button>
            <button onClick={() => logout()}>Выйти</button>
        </div>
    </div>
  );
}

export default LogoutMenu;